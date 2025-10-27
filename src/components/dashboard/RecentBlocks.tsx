import { motion } from "motion/react";
import type { BlockInfo } from "../../types/solana";
import { HiClock, HiCube } from "react-icons/hi2";

interface RecentBlocksProps {
	blocks: BlockInfo[];
	loading?: boolean;
	maxBlocks?: number;
}

export const RecentBlocks = ({
	blocks,
	loading = false,
	maxBlocks = 8,
}: RecentBlocksProps) => {
	if (loading) {
		return (
			<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Recent Blocks
				</h3>
				<div className="space-y-3">
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-700 rounded-lg animate-pulse"
						>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-gray-300 dark:bg-slate-600 rounded-lg"></div>
								<div>
									<div className="w-24 h-4 bg-gray-300 dark:bg-slate-600 rounded mb-1"></div>
									<div className="w-16 h-3 bg-gray-300 dark:bg-slate-600 rounded"></div>
								</div>
							</div>
							<div className="text-right">
								<div className="w-12 h-4 bg-gray-300 dark:bg-slate-600 rounded mb-1"></div>
								<div className="w-16 h-3 bg-gray-300 dark:bg-slate-600 rounded"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	const displayBlocks = blocks.slice(0, maxBlocks);

	const formatTime = (timestamp: number) => {
		if (!timestamp) return "Unknown";
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString([], {
			hour12: false,
			timeStyle: "medium",
		});
	};

	const getTimeAgo = (timestamp: number) => {
		if (!timestamp) return "";
		const now = Date.now();
		const diff = now - timestamp * 1000;
		const seconds = Math.floor(diff / 1000);

		if (seconds < 60) return `${seconds}s ago`;
		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;
		const hours = Math.floor(minutes / 60);
		return `${hours}h ago`;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
		>
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					Recent Blocks
				</h3>
				<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
					<HiCube className="w-4 h-4" />
					<span>{blocks.length} blocks</span>
				</div>
			</div>

			<div className="space-y-3">
				{displayBlocks.map((block, index) => (
					<motion.div
						key={block.blockhash}
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 }}
						className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors group"
					>
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
								<HiCube className="w-5 h-5 text-white" />
							</div>
							<div>
								<div className="font-mono text-sm text-gray-900 dark:text-white">
									{block.blockhash.slice(0, 12)}...
								</div>
								<div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
									<HiClock className="w-3 h-3" />
									<span>{formatTime(block.blockTime)}</span>
									<span>•</span>
									<span>{getTimeAgo(block.blockTime)}</span>
								</div>
							</div>
						</div>

						<div className="text-right">
							<div className="font-semibold text-gray-900 dark:text-white">
								{block.transactions?.length || 0}
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400">
								transactions
							</div>
						</div>

						<div className="hidden sm:block text-right">
							<div className="text-sm font-medium text-gray-700 dark:text-gray-300">
								{block.rewards?.length || 0}
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400">
								rewards
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{blocks.length === 0 && !loading && (
				<div className="text-center py-8 text-gray-500 dark:text-gray-400">
					<HiCube className="w-12 h-12 mx-auto mb-3 opacity-50" />
					<p>No recent blocks available</p>
				</div>
			)}
		</motion.div>
	);
};
