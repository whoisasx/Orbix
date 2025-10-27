import axios from "axios";
import type {
	PerformanceSample,
	VoteAccountsResult,
	EpochInfo,
	SupplyInfo,
	BlockInfo,
	LeaderSchedule,
	InflationRate,
	CoinGeckoPrice,
	DeFiLlamaResponse,
	SolanaMetrics,
	ValidatorStakeInfo,
} from "../types/solana";

class SolanaService {
	private rpcUrl: string;
	private axiosInstance;

	constructor(rpcUrl: string) {
		this.rpcUrl = rpcUrl;
		this.axiosInstance = axios.create({
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	private async makeRpcCall<T>(
		method: string,
		params: any[] = []
	): Promise<T> {
		try {
			const response = await this.axiosInstance.post(this.rpcUrl, {
				jsonrpc: "2.0",
				id: 1,
				method,
				params,
			});

			if (response.data.error) {
				throw new Error(`RPC Error: ${response.data.error.message}`);
			}

			return response.data.result;
		} catch (error) {
			console.error(`Error calling ${method}:`, error);
			throw error;
		}
	}

	// Real-time metrics (3-5s refresh)
	async getRecentPerformanceSamples(): Promise<PerformanceSample[]> {
		return this.makeRpcCall<PerformanceSample[]>(
			"getRecentPerformanceSamples",
			[20]
		);
	}

	async getBlockHeight(): Promise<number> {
		return this.makeRpcCall<number>("getBlockHeight");
	}

	async getSlot(): Promise<number> {
		return this.makeRpcCall<number>("getSlot");
	}

	async getLeaderSchedule(slot?: number): Promise<LeaderSchedule> {
		return this.makeRpcCall<LeaderSchedule>(
			"getLeaderSchedule",
			slot ? [slot] : []
		);
	}

	// Semi-real-time metrics (30s-1m refresh)
	async getVoteAccounts(): Promise<VoteAccountsResult> {
		return this.makeRpcCall<VoteAccountsResult>("getVoteAccounts");
	}

	async getEpochInfo(): Promise<EpochInfo> {
		return this.makeRpcCall<EpochInfo>("getEpochInfo");
	}

	async getBlocks(startSlot: number, endSlot: number): Promise<number[]> {
		return this.makeRpcCall<number[]>("getBlocks", [startSlot, endSlot]);
	}

	async getBlock(slot: number): Promise<BlockInfo> {
		return this.makeRpcCall<BlockInfo>("getBlock", [
			slot,
			{
				encoding: "json",
				transactionDetails: "signatures",
				rewards: true,
			},
		]);
	}

	async getFeeForMessage(message: string): Promise<number> {
		return this.makeRpcCall<number>("getFeeForMessage", [message]);
	}

	// Monetary metrics (5-10m refresh)
	async getSupply(): Promise<SupplyInfo> {
		return this.makeRpcCall<SupplyInfo>("getSupply");
	}

	async getInflationRate(): Promise<InflationRate> {
		return this.makeRpcCall<InflationRate>("getInflationRate");
	}

	// External APIs
	async getSolPrice(): Promise<number> {
		try {
			const response = await axios.get<CoinGeckoPrice>(
				"https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
			);
			return response.data.solana.usd;
		} catch (error) {
			console.error("Error fetching SOL price:", error);
			return 0;
		}
	}

	async getDeFiTvl(): Promise<number> {
		try {
			const response = await axios.get<DeFiLlamaResponse>(
				"https://api.llama.fi/tvl/solana"
			);
			return response.data.tvl;
		} catch (error) {
			console.error("Error fetching DeFi TVL:", error);
			return 0;
		}
	}

	// Computed metrics
	private calculateTPS(performanceSamples: PerformanceSample[]): number {
		if (!performanceSamples || performanceSamples.length === 0) return 0;

		const recentSample = performanceSamples[0];
		return recentSample.numTransactions / recentSample.samplePeriodSecs;
	}

	private calculateAverageBlockTime(
		performanceSamples: PerformanceSample[]
	): number {
		if (!performanceSamples || performanceSamples.length < 2) return 0;

		const avgSamplePeriod =
			performanceSamples.reduce(
				(sum, sample) => sum + sample.samplePeriodSecs,
				0
			) / performanceSamples.length;

		return avgSamplePeriod;
	}

	private calculateStakeDistribution(
		voteAccounts: VoteAccountsResult
	): ValidatorStakeInfo[] {
		const totalStake = voteAccounts.current.reduce(
			(sum, account) => sum + account.activatedStake,
			0
		);

		return voteAccounts.current
			.sort((a, b) => b.activatedStake - a.activatedStake)
			.slice(0, 20) // Top 20 validators
			.map((account) => ({
				pubkey: account.votePubkey,
				stake: account.activatedStake / 1e9, // Convert lamports to SOL
				percentage: (account.activatedStake / totalStake) * 100,
				commission: account.commission,
				uptime: this.calculateValidatorUptime(account.epochCredits),
			}));
	}

	private calculateValidatorUptime(
		epochCredits: [number, number, number][]
	): number {
		if (!epochCredits || epochCredits.length === 0) return 0;

		// Calculate uptime based on recent epoch credits
		const recentEpochs = epochCredits.slice(-10); // Last 10 epochs
		const avgCredits =
			recentEpochs.reduce((sum, credits) => sum + credits[1], 0) /
			recentEpochs.length;

		// Normalize to percentage (this is a simplified calculation)
		return Math.min(100, (avgCredits / 500000) * 100); // Assuming ~500k credits per epoch is 100%
	}

	private calculateNetworkUptime(voteAccounts: VoteAccountsResult): number {
		const totalValidators =
			voteAccounts.current.length + voteAccounts.delinquent.length;
		const activeValidators = voteAccounts.current.length;

		return (activeValidators / totalValidators) * 100;
	}

	async getRecentBlocks(count: number = 10): Promise<BlockInfo[]> {
		try {
			const currentSlot = await this.getSlot();
			const blocks: BlockInfo[] = [];

			for (let i = 0; i < count; i++) {
				try {
					const block = await this.getBlock(currentSlot - i);
					if (block) {
						blocks.push(block);
					}
				} catch (error) {
					// Skip if block not found
					continue;
				}
			}

			return blocks;
		} catch (error) {
			console.error("Error fetching recent blocks:", error);
			return [];
		}
	}

	// Main function to get all dashboard metrics
	async getAllMetrics(): Promise<SolanaMetrics> {
		try {
			// Fetch all data in parallel where possible
			const [
				performanceSamples,
				blockHeight,
				currentSlot,
				voteAccounts,
				epochInfo,
				supply,
				inflationRate,
				leaderSchedule,
				recentBlocks,
				solPrice,
				defiTvl,
			] = await Promise.all([
				this.getRecentPerformanceSamples(),
				this.getBlockHeight(),
				this.getSlot(),
				this.getVoteAccounts(),
				this.getEpochInfo(),
				this.getSupply(),
				this.getInflationRate(),
				this.getLeaderSchedule(),
				this.getRecentBlocks(10),
				this.getSolPrice(),
				this.getDeFiTvl(),
			]);

			// Calculate derived metrics
			const tps = this.calculateTPS(performanceSamples);
			const averageBlockTime =
				this.calculateAverageBlockTime(performanceSamples);
			const totalStakedSol =
				voteAccounts.current.reduce(
					(sum, account) => sum + account.activatedStake,
					0
				) / 1e9; // Convert to SOL
			const epochProgress =
				(epochInfo.slotIndex / epochInfo.slotsInEpoch) * 100;
			const stakeDistribution =
				this.calculateStakeDistribution(voteAccounts);
			const networkUptime = this.calculateNetworkUptime(voteAccounts);

			// Get current and next leader
			const leaderSlots = Object.entries(leaderSchedule);
			const currentLeaderEntry = leaderSlots.find(([_, slots]) =>
				slots.includes(currentSlot % epochInfo.slotsInEpoch)
			);
			const currentLeader = currentLeaderEntry
				? currentLeaderEntry[0]
				: undefined;

			// Calculate average transactions per block
			const averageTransactionsPerBlock =
				recentBlocks.length > 0
					? recentBlocks.reduce(
							(sum, block) =>
								sum + (block.transactions?.length || 0),
							0
					  ) / recentBlocks.length
					: 0;

			// Calculate recent transaction volume
			const recentTransactionVolume = performanceSamples
				.slice(0, 5)
				.reduce((sum, sample) => sum + sample.numTransactions, 0);

			return {
				tps,
				averageBlockTime,
				blockHeight,
				currentSlot,
				activeValidators: voteAccounts.current.length,
				delinquentValidators: voteAccounts.delinquent.length,
				totalStakedSol,
				epochInfo,
				epochProgress,
				currentLeader,
				nextLeader: undefined, // Could be calculated from leader schedule
				recentBlocks,
				averageTransactionsPerBlock,
				averageFeePerTx: 5000, // Default value, would need actual fee calculation
				totalSupply: supply.total / 1e9, // Convert to SOL
				circulatingSupply: supply.circulating / 1e9, // Convert to SOL
				inflationRate: inflationRate.total,
				networkUptime,
				solPrice,
				defiTvl,
				recentTransactionVolume,
				stakeDistribution,
			};
		} catch (error) {
			console.error("Error fetching dashboard metrics:", error);
			throw error;
		}
	}
}

export default SolanaService;
