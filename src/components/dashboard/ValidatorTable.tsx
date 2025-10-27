import { motion } from "motion/react";
import type { ValidatorStakeInfo } from "../../types/solana";

interface ValidatorTableProps {
	validators: ValidatorStakeInfo[];
	loading?: boolean;
	maxRows?: number;
}

export const ValidatorTable = ({
	validators,
	loading = false,
	maxRows = 10,
}: ValidatorTableProps) => {
	if (loading) {
		return (
			<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Top Validators by Stake
				</h3>
				<div className="space-y-3">
					{Array.from({ length: 5 }).map((_, index) => (
						<div
							key={index}
							className="flex items-center justify-between p-3 bg-gray-100 dark:bg-slate-700 rounded-lg animate-pulse"
						>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full"></div>
								<div className="w-32 h-4 bg-gray-300 dark:bg-slate-600 rounded"></div>
							</div>
							<div className="w-20 h-4 bg-gray-300 dark:bg-slate-600 rounded"></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	const displayValidators = validators.slice(0, maxRows);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
		>
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					Top Validators by Stake
				</h3>
				<span className="text-sm text-gray-500 dark:text-gray-400">
					{validators.length} total validators
				</span>
			</div>

			<div className="overflow-hidden">
				<div className="space-y-2">
					{displayValidators.map((validator, index) => (
						<motion.div
							key={validator.pubkey}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors"
						>
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
									{index + 1}
								</div>
								<div>
									<div className="font-mono text-sm text-gray-900 dark:text-white">
										{validator.pubkey.slice(0, 8)}...
										{validator.pubkey.slice(-6)}
									</div>
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{validator.commission}% commission
									</div>
								</div>
							</div>

							<div className="text-right">
								<div className="font-semibold text-gray-900 dark:text-white">
									{validator.stake.toLocaleString()} SOL
								</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">
									{validator.percentage.toFixed(2)}% share
								</div>
							</div>

							<div className="hidden sm:block text-right">
								<div
									className={`text-sm font-medium ${
										validator.uptime >= 95
											? "text-green-600 dark:text-green-400"
											: validator.uptime >= 90
											? "text-yellow-600 dark:text-yellow-400"
											: "text-red-600 dark:text-red-400"
									}`}
								>
									{validator.uptime.toFixed(1)}%
								</div>
								<div className="text-xs text-gray-500 dark:text-gray-400">
									uptime
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{validators.length > maxRows && (
					<div className="mt-4 text-center">
						<span className="text-sm text-gray-500 dark:text-gray-400">
							+{validators.length - maxRows} more validators
						</span>
					</div>
				)}
			</div>
		</motion.div>
	);
};
