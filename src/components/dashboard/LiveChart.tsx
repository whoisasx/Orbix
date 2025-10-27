import { motion } from "motion/react";
import type { ChartDataPoint } from "../../types/solana";
import { useMemo } from "react";

interface LiveChartProps {
	data: ChartDataPoint[];
	title: string;
	color?: string;
	height?: number;
	showGrid?: boolean;
	unit?: string;
	type?: "line" | "area";
}

export const LiveChart = ({
	data,
	title,
	color = "red-500",
	height = 200,
	showGrid = true,
	unit = "",
	type = "area",
}: LiveChartProps) => {
	const { maxValue, minValue, chartPath, gradientId, colorClass } =
		useMemo(() => {
			if (!data || data.length === 0) {
				return {
					maxValue: 0,
					minValue: 0,
					chartPath: "",
					gradientId: `gradient-${Math.random()}`,
					colorClass: "text-red-500",
				};
			}

			// Color mapping for avoiding dynamic classes
			const colorMappings = {
				"red-500": "text-red-500",
				"blue-500": "text-blue-500",
				"green-500": "text-green-500",
				"purple-500": "text-purple-500",
				"orange-500": "text-orange-500",
				"yellow-500": "text-yellow-500",
			};

			const colorClass =
				colorMappings[color as keyof typeof colorMappings] ||
				"text-red-500";

			const values = data.map((d) => d.value);
			const maxValue = Math.max(...values);
			const minValue = Math.min(...values);
			const range = maxValue - minValue || 1;

			// Ensure values are valid numbers
			if (!isFinite(maxValue) || !isFinite(minValue)) {
				return {
					maxValue: 0,
					minValue: 0,
					chartPath: "",
					gradientId: `gradient-${Math.random()}`,
					colorClass,
				};
			}

			const svgWidth = 400;
			const svgHeight = height - 40; // Leave space for labels
			const padding = 20;

			const points = data.map((point, index) => {
				// Handle case where data.length === 1 to avoid NaN
				const x =
					data.length === 1
						? svgWidth / 2
						: padding +
						  (index / (data.length - 1)) *
								(svgWidth - 2 * padding);
				const y =
					padding +
					((maxValue - point.value) / range) *
						(svgHeight - 2 * padding);

				// Ensure coordinates are valid
				return `${isFinite(x) ? x : svgWidth / 2},${
					isFinite(y) ? y : svgHeight / 2
				}`;
			});

			let chartPath = "";
			if (type === "area") {
				chartPath = `M${padding},${svgHeight - padding} L${points.join(
					" L"
				)} L${svgWidth - padding},${svgHeight - padding} Z`;
			} else {
				chartPath = `M${points.join(" L")}`;
			}

			const gradientId = `gradient-${Math.random()
				.toString(36)
				.substr(2, 9)}`;

			return { maxValue, minValue, chartPath, gradientId, colorClass };
		}, [data, height, type, color]);

	if (!data || data.length === 0) {
		return (
			<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					{title}
				</h3>
				<div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
					No data available
				</div>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
		>
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
				<div className="text-right">
					<div className={`text-2xl font-bold ${colorClass}`}>
						{data[data.length - 1]?.value.toLocaleString()}
						{unit}
					</div>
					<div className="text-xs text-gray-500 dark:text-gray-400">
						Current
					</div>
				</div>
			</div>

			<div className="relative">
				<svg
					width="100%"
					height={height}
					viewBox={`0 0 400 ${height}`}
					className="overflow-visible"
				>
					<defs>
						<linearGradient
							id={gradientId}
							x1="0%"
							y1="0%"
							x2="0%"
							y2="100%"
						>
							<stop
								offset="0%"
								className={colorClass}
								stopColor="currentColor"
								stopOpacity="0.3"
							/>
							<stop
								offset="100%"
								className={colorClass}
								stopColor="currentColor"
								stopOpacity="0.05"
							/>
						</linearGradient>
					</defs>

					{/* Grid lines */}
					{showGrid && (
						<g
							className="text-gray-200 dark:text-slate-700"
							stroke="currentColor"
							strokeWidth="1"
							opacity="0.3"
						>
							{[0, 25, 50, 75, 100].map((percent) => {
								const y = 20 + (percent / 100) * (height - 40);
								return (
									<line
										key={percent}
										x1="20"
										y1={y}
										x2="380"
										y2={y}
									/>
								);
							})}
						</g>
					)}

					{/* Chart path */}
					<motion.path
						d={chartPath}
						fill={type === "area" ? `url(#${gradientId})` : "none"}
						stroke="currentColor"
						strokeWidth="2"
						className={colorClass}
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{ duration: 2, ease: "easeInOut" }}
					/>

					{/* Data points */}
					{data.map((point, index) => {
						// Handle case where data.length === 1 to avoid NaN
						const x =
							data.length === 1
								? 200 // Center of 400px width
								: 20 + (index / (data.length - 1)) * 360;
						const y =
							20 +
							((maxValue - point.value) /
								(maxValue - minValue || 1)) *
								(height - 40);

						// Ensure coordinates are valid numbers
						const validX = isFinite(x) ? x : 200;
						const validY = isFinite(y) ? y : height / 2;

						return (
							<motion.circle
								key={index}
								cx={validX}
								cy={validY}
								r="3"
								fill="currentColor"
								className={colorClass}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									delay: index * 0.1,
									duration: 0.3,
								}}
							/>
						);
					})}
				</svg>

				{/* Y-axis labels */}
				<div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 py-5">
					<span>{maxValue.toLocaleString()}</span>
					<span>{((maxValue + minValue) / 2).toLocaleString()}</span>
					<span>{minValue.toLocaleString()}</span>
				</div>
			</div>

			<div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
				Last {data.length} samples
			</div>
		</motion.div>
	);
};
