import { motion } from "motion/react";
import type { ValidatorStakeInfo } from "../../types/solana";

interface StakeDistributionProps {
	validators: ValidatorStakeInfo[];
	loading?: boolean;
	showTop?: number;
}

export const StakeDistribution = ({
	validators,
	loading = false,
	showTop = 5,
}: StakeDistributionProps) => {
	if (loading) {
		return (
			<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Stake Distribution
				</h3>
				<div className="flex items-center justify-center h-64">
					<div className="w-48 h-48 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
				</div>
			</div>
		);
	}

	const topValidators = validators.slice(0, showTop);
	const othersPercentage = validators
		.slice(showTop)
		.reduce((sum, v) => sum + v.percentage, 0);

	const colors = [
		{ text: "text-red-500", bg: "bg-red-500" },
		{ text: "text-blue-500", bg: "bg-blue-500" },
		{ text: "text-green-500", bg: "bg-green-500" },
		{ text: "text-yellow-500", bg: "bg-yellow-500" },
		{ text: "text-purple-500", bg: "bg-purple-500" },
		{ text: "text-gray-500", bg: "bg-gray-500" },
	];

	const chartData = [
		...topValidators.map((validator, index) => ({
			...validator,
			colorText: colors[index]?.text || colors[colors.length - 1].text,
			colorBg: colors[index]?.bg || colors[colors.length - 1].bg,
		})),
		...(othersPercentage > 0
			? [
					{
						pubkey: "others",
						stake: 0,
						percentage: othersPercentage,
						commission: 0,
						uptime: 0,
						colorText: colors[colors.length - 1].text,
						colorBg: colors[colors.length - 1].bg,
					},
			  ]
			: []),
	];

	const size = 200;
	const strokeWidth = 30;
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;

	let currentAngle = 0;
	const segments = chartData.map((item) => {
		const segmentAngle = (item.percentage / 100) * 360;
		const segment = {
			...item,
			startAngle: currentAngle,
			endAngle: currentAngle + segmentAngle,
			strokeDasharray: circumference,
			strokeDashoffset:
				circumference - (item.percentage / 100) * circumference,
		};
		currentAngle += segmentAngle;
		return segment;
	});

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
		>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
				Stake Distribution
			</h3>

			<div className="flex flex-col items-center gap-6">
				{/* Donut Chart */}
				<div className="relative">
					<svg
						width={size}
						height={size}
						className="transform -rotate-90"
					>
						{/* Background circle */}
						<circle
							cx={size / 2}
							cy={size / 2}
							r={radius}
							fill="none"
							stroke="currentColor"
							strokeWidth={strokeWidth}
							className="text-gray-200 dark:text-slate-700"
						/>

						{/* Segments */}
						{segments.map((segment, index) => {
							const x1 =
								size / 2 +
								radius *
									Math.cos(
										((segment.startAngle - 90) * Math.PI) /
											180
									);
							const y1 =
								size / 2 +
								radius *
									Math.sin(
										((segment.startAngle - 90) * Math.PI) /
											180
									);
							const x2 =
								size / 2 +
								radius *
									Math.cos(
										((segment.endAngle - 90) * Math.PI) /
											180
									);
							const y2 =
								size / 2 +
								radius *
									Math.sin(
										((segment.endAngle - 90) * Math.PI) /
											180
									);

							const largeArcFlag =
								segment.endAngle - segment.startAngle > 180
									? 1
									: 0;

							const pathData = [
								`M ${size / 2} ${size / 2}`,
								`L ${x1} ${y1}`,
								`A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
								"Z",
							].join(" ");

							return (
								<motion.path
									key={index}
									d={pathData}
									fill="currentColor"
									className={segment.colorText}
									opacity={0.8}
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										delay: index * 0.2,
										duration: 0.6,
									}}
								/>
							);
						})}
					</svg>

					{/* Center text */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center">
							<div className="text-2xl font-bold text-gray-900 dark:text-white">
								{validators.length}
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Validators
							</div>
						</div>
					</div>
				</div>

				{/* Legend */}
				<div className="space-y-3 min-w-0 flex-1">
					{chartData.map((item, index) => (
						<motion.div
							key={item.pubkey}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-3 min-w-0">
								<div
									className={`w-3 h-3 rounded-full ${item.colorBg}`}
								></div>
								<div className="min-w-0">
									<div className="text-sm font-medium text-gray-900 dark:text-white truncate">
										{item.pubkey === "others"
											? `Others (${
													validators.length - showTop
											  })`
											: `${item.pubkey.slice(0, 8)}...`}
									</div>
									{item.pubkey !== "others" && (
										<div className="text-xs text-gray-500 dark:text-gray-400">
											{item.commission}% commission
										</div>
									)}
								</div>
							</div>
							<div className="text-right">
								<div className="text-sm font-semibold text-gray-900 dark:text-white">
									{item.percentage.toFixed(1)}%
								</div>
								{item.pubkey !== "others" && (
									<div className="text-xs text-gray-500 dark:text-gray-400">
										{item.stake.toLocaleString()} SOL
									</div>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
};
