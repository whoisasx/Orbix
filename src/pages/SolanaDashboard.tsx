import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import {
	HiChartBarSquare,
	HiCubeTransparent,
	HiServerStack,
	HiClock,
	HiCurrencyDollar,
	HiArrowTrendingUp,
	HiCpuChip,
	HiGlobeAlt,
} from "react-icons/hi2";
import { SiSolana } from "react-icons/si";
import {
	MetricCard,
	ProgressRing,
	LiveChart,
	ValidatorTable,
	RecentBlocks,
	StakeDistribution,
} from "../components/dashboard";
import { useDashboardData } from "../hooks/useDashboardData";
import { Footer } from "../components/Footer";

export default function SolanaDashboard() {
	const apiKey = "2qBzn9AIjY7lcSlbvri1k";
	const rpcUrl = `https://solana-mainnet.g.alchemy.com/v2/${apiKey}`;

	const {
		metrics,
		loading,
		error,
		lastUpdated,
		tpsData,
		blockTimeData,
		refreshAll,
	} = useDashboardData({
		rpcUrl,
		realTimeInterval: 5000,
		semiRealTimeInterval: 30000,
		monetaryInterval: 300000,
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const formatLastUpdated = (timestamp: number) => {
		if (!timestamp) return "";
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], {
			hour12: false,
			timeStyle: "medium",
		});
	};

	return (
		<section className="min-h-screen bg-linear-to-br from-white via-slate-50 to-gray-100 dark:from-black dark:via-slate-900 dark:to-slate-800 font-vendsans">
			<Navbar />

			{/* Background Effects */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute top-20 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"
					animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
					transition={{ duration: 20, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-20 left-20 w-40 h-40 bg-pink-500/5 rounded-full blur-xl"
					animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
					transition={{ duration: 25, repeat: Infinity }}
				/>
				<motion.div
					className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"
					animate={{
						scale: [1, 1.5, 1],
						x: [-20, 20, -20],
						y: [-10, 10, -10],
					}}
					transition={{ duration: 15, repeat: Infinity }}
				/>
			</div>

			<main className="relative">
				<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-8"
					>
						<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
									<SiSolana className="w-8 h-8 text-white" />
								</div>
								<div>
									<h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
										Solana Network Dashboard
									</h1>
									<p className="text-gray-600 dark:text-gray-400 mt-1">
										Real-time insights into the Solana
										blockchain
									</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								{lastUpdated && (
									<div className="text-sm text-gray-500 dark:text-gray-400">
										Last updated:{" "}
										{formatLastUpdated(lastUpdated)}
									</div>
								)}
								<motion.button
									onClick={refreshAll}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
								>
									<HiArrowTrendingUp className="w-4 h-4" />
									Refresh
								</motion.button>
							</div>
						</div>
					</motion.div>

					{/* Error State */}
					{error && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-red-100 dark:bg-red-950/50 rounded-xl flex items-center justify-center">
									<HiCubeTransparent className="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 className="font-semibold text-red-700 dark:text-red-400">
										Error Loading Dashboard Data
									</h3>
									<p className="text-red-600 dark:text-red-300 text-sm">
										{error}
									</p>
								</div>
							</div>
						</motion.div>
					)}

					{/* Dashboard Content */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="space-y-8"
					>
						{/* Real-time Metrics Row */}
						<motion.div variants={itemVariants}>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<HiChartBarSquare className="w-5 h-5 text-purple-500" />
								Real-time Performance
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<MetricCard
									title="TPS (Transactions/sec)"
									value={metrics?.tps.toFixed(2) || "0"}
									icon={
										<HiChartBarSquare className="w-6 h-6" />
									}
									color="purple"
									loading={loading}
								/>
								<MetricCard
									title="Average Block Time"
									value={`${
										metrics?.averageBlockTime.toFixed(2) ||
										"0"
									}s`}
									icon={<HiClock className="w-6 h-6" />}
									color="blue"
									loading={loading}
								/>
								<MetricCard
									title="Block Height"
									value={metrics?.blockHeight || 0}
									icon={
										<HiCubeTransparent className="w-6 h-6" />
									}
									color="green"
									loading={loading}
								/>
								<MetricCard
									title="Current Slot"
									value={metrics?.currentSlot || 0}
									icon={<HiServerStack className="w-6 h-6" />}
									color="orange"
									loading={loading}
								/>
							</div>
						</motion.div>

						{/* Charts Row */}
						<motion.div variants={itemVariants}>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<LiveChart
									data={tpsData}
									title="TPS Trend"
									color="purple-500"
									unit=" TPS"
								/>
								<LiveChart
									data={blockTimeData}
									title="Block Time Trend"
									color="blue-500"
									unit="s"
								/>
							</div>
						</motion.div>

						{/* Validators & Network Health */}
						<motion.div variants={itemVariants}>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<HiServerStack className="w-5 h-5 text-green-500" />
								Network Health & Validators
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
								<MetricCard
									title="Active Validators"
									value={metrics?.activeValidators || 0}
									icon={<HiServerStack className="w-6 h-6" />}
									color="green"
									loading={loading}
								/>
								<MetricCard
									title="Delinquent Validators"
									value={metrics?.delinquentValidators || 0}
									icon={<HiCpuChip className="w-6 h-6" />}
									color="red"
									loading={loading}
								/>
								<MetricCard
									title="Total Staked SOL"
									value={`${(
										metrics?.totalStakedSol || 0
									).toFixed(0)}M`}
									subtitle="SOL tokens staked"
									icon={<SiSolana className="w-6 h-6" />}
									color="purple"
									loading={loading}
								/>
								<MetricCard
									title="Network Uptime"
									value={`${(
										metrics?.networkUptime || 0
									).toFixed(1)}%`}
									icon={<HiGlobeAlt className="w-6 h-6" />}
									color="green"
									loading={loading}
								/>
							</div>

							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<div className="lg:col-span-2">
									<ValidatorTable
										validators={
											metrics?.stakeDistribution || []
										}
										loading={loading}
									/>
								</div>
								<StakeDistribution
									validators={
										metrics?.stakeDistribution || []
									}
									loading={loading}
								/>
							</div>
						</motion.div>

						{/* Epoch Progress & Recent Activity */}
						<motion.div variants={itemVariants}>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<HiCubeTransparent className="w-5 h-5 text-blue-500" />
								Epoch & Recent Activity
							</h2>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								{/* Epoch Progress */}
								<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
										Epoch Progress
									</h3>
									{loading ? (
										<div className="flex items-center justify-center h-48">
											<div className="w-32 h-32 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
										</div>
									) : (
										<div className="flex flex-col items-center gap-4">
											<ProgressRing
												progress={
													metrics?.epochProgress || 0
												}
												color="blue-500"
												size={140}
											/>
											<div className="text-center">
												<div className="text-lg font-semibold text-gray-900 dark:text-white">
													Epoch{" "}
													{metrics?.epochInfo
														?.epoch || 0}
												</div>
												<div className="text-sm text-gray-500 dark:text-gray-400">
													Slot{" "}
													{metrics?.epochInfo?.slotIndex?.toLocaleString()}{" "}
													/{" "}
													{metrics?.epochInfo?.slotsInEpoch?.toLocaleString()}
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Recent Blocks */}
								<div className="lg:col-span-2">
									<RecentBlocks
										blocks={metrics?.recentBlocks || []}
										loading={loading}
									/>
								</div>
							</div>
						</motion.div>

						{/* Economic Metrics */}
						<motion.div variants={itemVariants}>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<HiCurrencyDollar className="w-5 h-5 text-green-500" />
								Economic Metrics
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								<MetricCard
									title="SOL Price"
									value={`$${(metrics?.solPrice || 0).toFixed(
										2
									)}`}
									icon={
										<HiCurrencyDollar className="w-6 h-6" />
									}
									color="green"
									loading={loading}
								/>
								<MetricCard
									title="DeFi TVL"
									value={`$${(
										(metrics?.defiTvl || 0) / 1e9
									).toFixed(2)}B`}
									subtitle="Total Value Locked"
									icon={
										<HiChartBarSquare className="w-6 h-6" />
									}
									color="purple"
									loading={loading}
								/>
								<MetricCard
									title="Total Supply"
									value={`${(
										(metrics?.totalSupply || 0) / 1e6
									).toFixed(1)}M`}
									subtitle="SOL tokens"
									icon={<SiSolana className="w-6 h-6" />}
									color="orange"
									loading={loading}
								/>
								<MetricCard
									title="Inflation Rate"
									value={`${(
										(metrics?.inflationRate || 0) * 100
									).toFixed(2)}%`}
									subtitle="Annual"
									icon={
										<HiArrowTrendingUp className="w-6 h-6" />
									}
									color="blue"
									loading={loading}
								/>
							</div>
						</motion.div>

						{/* Transaction Metrics */}
						<motion.div variants={itemVariants}>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
								<HiChartBarSquare className="w-5 h-5 text-orange-500" />
								Transaction Metrics
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<MetricCard
									title="Avg Transactions/Block"
									value={(
										metrics?.averageTransactionsPerBlock ||
										0
									).toFixed(0)}
									icon={
										<HiCubeTransparent className="w-6 h-6" />
									}
									color="orange"
									loading={loading}
								/>
								<MetricCard
									title="Recent Tx Volume"
									value={(
										metrics?.recentTransactionVolume || 0
									).toLocaleString()}
									subtitle="Last 5 samples"
									icon={
										<HiChartBarSquare className="w-6 h-6" />
									}
									color="blue"
									loading={loading}
								/>
								<MetricCard
									title="Average Fee"
									value={`${(
										(metrics?.averageFeePerTx || 0) / 1e9
									).toFixed(6)} SOL`}
									subtitle="Per transaction"
									icon={
										<HiCurrencyDollar className="w-6 h-6" />
									}
									color="green"
									loading={loading}
								/>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</main>
			<Footer />
		</section>
	);
}
