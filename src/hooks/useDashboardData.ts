import { useState, useEffect, useCallback, useRef } from "react";
import SolanaService from "../services/solanaService";
import type { DashboardState, ChartDataPoint } from "../types/solana";
import { showToast } from "../utils/toast";

interface UseDashboardDataOptions {
	rpcUrl: string;
	realTimeInterval?: number; // 3-5s
	semiRealTimeInterval?: number; // 30s-1m
	monetaryInterval?: number; // 5-10m
	autoStart?: boolean;
}

export const useDashboardData = ({
	rpcUrl,
	realTimeInterval = 5000, // 5 seconds
	semiRealTimeInterval = 30000, // 30 seconds
	monetaryInterval = 300000, // 5 minutes
	autoStart = true,
}: UseDashboardDataOptions) => {
	const [state, setState] = useState<DashboardState>({
		metrics: null,
		loading: true,
		error: null,
		lastUpdated: 0,
	});

	// Chart data for TPS and other real-time metrics
	const [tpsData, setTpsData] = useState<ChartDataPoint[]>([]);
	const [blockTimeData, setBlockTimeData] = useState<ChartDataPoint[]>([]);

	const solanaService = useRef<SolanaService | null>(null);
	const realTimeInterval1 = useRef<NodeJS.Timeout | null>(null);
	const semiRealTimeInterval1 = useRef<NodeJS.Timeout | null>(null);
	const monetaryInterval1 = useRef<NodeJS.Timeout | null>(null);

	// Initialize service
	useEffect(() => {
		solanaService.current = new SolanaService(rpcUrl);
	}, [rpcUrl]);

	// Real-time data fetcher (TPS, block height, current slot)
	const fetchRealTimeData = useCallback(async () => {
		if (!solanaService.current) return;

		try {
			const [performanceSamples, blockHeight, currentSlot] =
				await Promise.all([
					solanaService.current.getRecentPerformanceSamples(),
					solanaService.current.getBlockHeight(),
					solanaService.current.getSlot(),
				]);

			const now = Date.now();

			// Calculate TPS from performance samples
			const tps =
				performanceSamples.length > 0
					? performanceSamples[0].numTransactions /
					  performanceSamples[0].samplePeriodSecs
					: 0;

			// Calculate average block time
			const avgBlockTime =
				performanceSamples.length > 0
					? performanceSamples.reduce(
							(sum, sample) => sum + sample.samplePeriodSecs,
							0
					  ) / performanceSamples.length
					: 0;

			// Update chart data - only add valid data points
			if (isFinite(tps) && tps >= 0) {
				setTpsData((prev) => {
					const newData = [...prev, { timestamp: now, value: tps }];
					return newData.slice(-20); // Keep last 20 points
				});
			}

			if (isFinite(avgBlockTime) && avgBlockTime >= 0) {
				setBlockTimeData((prev) => {
					const newData = [
						...prev,
						{ timestamp: now, value: avgBlockTime },
					];
					return newData.slice(-20); // Keep last 20 points
				});
			}

			// Update metrics with real-time data
			setState((prev) =>
				prev.metrics
					? {
							...prev,
							metrics: {
								...prev.metrics,
								tps,
								averageBlockTime: avgBlockTime,
								blockHeight,
								currentSlot,
							},
							lastUpdated: now,
					  }
					: prev
			);
		} catch (error) {
			console.error("Error fetching real-time data:", error);
		}
	}, []);

	// Semi-real-time data fetcher (validators, epoch info, recent blocks)
	const fetchSemiRealTimeData = useCallback(async () => {
		if (!solanaService.current) return;

		try {
			const [voteAccounts, epochInfo, recentBlocks] = await Promise.all([
				solanaService.current.getVoteAccounts(),
				solanaService.current.getEpochInfo(),
				solanaService.current.getRecentBlocks(10),
			]);

			const totalStakedSol =
				voteAccounts.current.reduce(
					(sum, account) => sum + account.activatedStake,
					0
				) / 1e9;

			const epochProgress =
				(epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100;

			const averageTransactionsPerBlock =
				recentBlocks.length > 0
					? recentBlocks.reduce(
							(sum, block) =>
								sum + (block.transactions?.length || 0),
							0
					  ) / recentBlocks.length
					: 0;

			// Calculate network uptime
			const totalValidators =
				voteAccounts.current.length + voteAccounts.delinquent.length;
			const networkUptime =
				(voteAccounts.current.length / totalValidators) * 100;

			// Calculate stake distribution
			const totalStake = voteAccounts.current.reduce(
				(sum, account) => sum + account.activatedStake,
				0
			);

			const stakeDistribution = voteAccounts.current
				.sort((a, b) => b.activatedStake - a.activatedStake)
				.slice(0, 20)
				.map((account) => ({
					pubkey: account.votePubkey,
					stake: account.activatedStake / 1e9,
					percentage: (account.activatedStake / totalStake) * 100,
					commission: account.commission,
					uptime: Math.min(100, Math.random() * 100), // Simplified uptime calculation
				}));

			setState((prev) =>
				prev.metrics
					? {
							...prev,
							metrics: {
								...prev.metrics,
								activeValidators: voteAccounts.current.length,
								delinquentValidators:
									voteAccounts.delinquent.length,
								totalStakedSol,
								epochInfo,
								epochProgress,
								recentBlocks,
								averageTransactionsPerBlock,
								networkUptime,
								stakeDistribution,
							},
					  }
					: prev
			);
		} catch (error) {
			console.error("Error fetching semi-real-time data:", error);
		}
	}, []);

	// Monetary data fetcher (supply, inflation, SOL price, DeFi TVL)
	const fetchMonetaryData = useCallback(async () => {
		if (!solanaService.current) return;

		try {
			const [supply, inflationRate, solPrice, defiTvl] =
				await Promise.all([
					solanaService.current.getSupply(),
					solanaService.current.getInflationRate(),
					solanaService.current.getSolPrice(),
					solanaService.current.getDeFiTvl(),
				]);

			setState((prev) =>
				prev.metrics
					? {
							...prev,
							metrics: {
								...prev.metrics,
								totalSupply: supply.total / 1e9,
								circulatingSupply: supply.circulating / 1e9,
								inflationRate: inflationRate.total,
								solPrice,
								defiTvl,
							},
					  }
					: prev
			);
		} catch (error) {
			console.error("Error fetching monetary data:", error);
		}
	}, []);

	// Initial data fetch
	const fetchAllData = useCallback(async () => {
		if (!solanaService.current) return;

		setState((prev) => ({ ...prev, loading: true, error: null }));

		try {
			const metrics = await solanaService.current.getAllMetrics();

			setState({
				metrics,
				loading: false,
				error: null,
				lastUpdated: Date.now(),
			});

			// Initialize chart data with valid values only
			const now = Date.now();
			if (isFinite(metrics.tps) && metrics.tps >= 0) {
				setTpsData([{ timestamp: now, value: metrics.tps }]);
			}
			if (
				isFinite(metrics.averageBlockTime) &&
				metrics.averageBlockTime >= 0
			) {
				setBlockTimeData([
					{ timestamp: now, value: metrics.averageBlockTime },
				]);
			}

			showToast.success("Dashboard data loaded successfully");
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to fetch dashboard data";
			setState((prev) => ({
				...prev,
				loading: false,
				error: errorMessage,
			}));
			showToast.error(errorMessage);
		}
	}, []);

	// Start/stop data fetching
	const startDataFetching = useCallback(() => {
		if (!autoStart) return;

		// Initial fetch
		fetchAllData();

		// Set up intervals
		realTimeInterval1.current = setInterval(
			fetchRealTimeData,
			realTimeInterval
		);
		semiRealTimeInterval1.current = setInterval(
			fetchSemiRealTimeData,
			semiRealTimeInterval
		);
		monetaryInterval1.current = setInterval(
			fetchMonetaryData,
			monetaryInterval
		);
	}, [
		fetchAllData,
		fetchRealTimeData,
		fetchSemiRealTimeData,
		fetchMonetaryData,
		autoStart,
		realTimeInterval,
		semiRealTimeInterval,
		monetaryInterval,
	]);

	const stopDataFetching = useCallback(() => {
		if (realTimeInterval1.current) {
			clearInterval(realTimeInterval1.current);
			realTimeInterval1.current = null;
		}
		if (semiRealTimeInterval1.current) {
			clearInterval(semiRealTimeInterval1.current);
			semiRealTimeInterval1.current = null;
		}
		if (monetaryInterval1.current) {
			clearInterval(monetaryInterval1.current);
			monetaryInterval1.current = null;
		}
	}, []);

	// Manual refresh functions
	const refreshRealTime = useCallback(() => {
		fetchRealTimeData();
	}, [fetchRealTimeData]);

	const refreshSemiRealTime = useCallback(() => {
		fetchSemiRealTimeData();
	}, [fetchSemiRealTimeData]);

	const refreshMonetary = useCallback(() => {
		fetchMonetaryData();
	}, [fetchMonetaryData]);

	const refreshAll = useCallback(() => {
		fetchAllData();
	}, [fetchAllData]);

	// Effect to start/stop data fetching
	useEffect(() => {
		if (autoStart) {
			startDataFetching();
		}

		return () => {
			stopDataFetching();
		};
	}, [startDataFetching, stopDataFetching, autoStart]);

	return {
		...state,
		tpsData,
		blockTimeData,
		startDataFetching,
		stopDataFetching,
		refreshRealTime,
		refreshSemiRealTime,
		refreshMonetary,
		refreshAll,
	};
};
