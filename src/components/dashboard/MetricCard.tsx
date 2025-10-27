import { motion } from "motion/react";
import type { ReactNode } from "react";

interface MetricCardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	icon?: ReactNode;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	color?: string;
	loading?: boolean;
	size?: "sm" | "md" | "lg";
}

export const MetricCard = ({
	title,
	value,
	subtitle,
	icon,
	trend,
	color = "red",
	loading = false,
	size = "md",
}: MetricCardProps) => {
	const sizeClasses = {
		sm: "p-4",
		md: "p-6",
		lg: "p-8",
	};

	const titleClasses = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	const valueClasses = {
		sm: "text-xl",
		md: "text-2xl",
		lg: "text-3xl",
	};

	// Define color mappings to avoid dynamic class generation issues
	const colorMappings = {
		red: {
			border: "border-red-200 dark:border-red-800",
			hoverBorder: "hover:border-red-300 dark:hover:border-red-700",
			titleHover: "group-hover:text-red-500",
			iconBg: "bg-red-50 dark:bg-red-950/30",
			iconText: "text-red-500",
		},
		blue: {
			border: "border-blue-200 dark:border-blue-800",
			hoverBorder: "hover:border-blue-300 dark:hover:border-blue-700",
			titleHover: "group-hover:text-blue-500",
			iconBg: "bg-blue-50 dark:bg-blue-950/30",
			iconText: "text-blue-500",
		},
		green: {
			border: "border-green-200 dark:border-green-800",
			hoverBorder: "hover:border-green-300 dark:hover:border-green-700",
			titleHover: "group-hover:text-green-500",
			iconBg: "bg-green-50 dark:bg-green-950/30",
			iconText: "text-green-500",
		},
		purple: {
			border: "border-purple-200 dark:border-purple-800",
			hoverBorder: "hover:border-purple-300 dark:hover:border-purple-700",
			titleHover: "group-hover:text-purple-500",
			iconBg: "bg-purple-50 dark:bg-purple-950/30",
			iconText: "text-purple-500",
		},
		orange: {
			border: "border-orange-200 dark:border-orange-800",
			hoverBorder: "hover:border-orange-300 dark:hover:border-orange-700",
			titleHover: "group-hover:text-orange-500",
			iconBg: "bg-orange-50 dark:bg-orange-950/30",
			iconText: "text-orange-500",
		},
		yellow: {
			border: "border-yellow-200 dark:border-yellow-800",
			hoverBorder: "hover:border-yellow-300 dark:hover:border-yellow-700",
			titleHover: "group-hover:text-yellow-500",
			iconBg: "bg-yellow-50 dark:bg-yellow-950/30",
			iconText: "text-yellow-500",
		},
	};

	const colors =
		colorMappings[color as keyof typeof colorMappings] || colorMappings.red;

	if (loading) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 ${sizeClasses[size]} animate-pulse`}
			>
				<div className="flex items-start justify-between mb-4">
					<div
						className={`h-4 bg-gray-300 dark:bg-slate-600 rounded w-24`}
					></div>
					{icon && (
						<div className="w-6 h-6 bg-gray-300 dark:bg-slate-600 rounded"></div>
					)}
				</div>
				<div
					className={`h-8 bg-gray-300 dark:bg-slate-600 rounded w-32 mb-2`}
				></div>
				{subtitle && (
					<div className="h-3 bg-gray-300 dark:bg-slate-600 rounded w-20"></div>
				)}
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ y: -2, scale: 1.02 }}
			className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 ${colors.hoverBorder} transition-all duration-300 hover:shadow-lg ${sizeClasses[size]} group`}
		>
			<div className="flex items-start justify-between mb-4">
				<h3
					className={`font-medium text-gray-600 dark:text-gray-400 ${colors.titleHover} transition-colors ${titleClasses[size]}`}
				>
					{title}
				</h3>
				{icon && (
					<div
						className={`w-10 h-10 ${colors.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
					>
						<div className={colors.iconText}>{icon}</div>
					</div>
				)}
			</div>

			<div className="flex items-end gap-3">
				<span
					className={`font-bold text-gray-900 dark:text-white ${valueClasses[size]}`}
				>
					{typeof value === "number" ? value.toLocaleString() : value}
				</span>

				{trend && (
					<span
						className={`text-sm font-medium px-2 py-1 rounded-lg ${
							trend.isPositive
								? "text-green-600 bg-green-50 dark:bg-green-950/30"
								: "text-red-600 bg-red-50 dark:bg-red-950/30"
						}`}
					>
						{trend.isPositive ? "+" : ""}
						{trend.value.toFixed(2)}%
					</span>
				)}
			</div>

			{subtitle && (
				<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
					{subtitle}
				</p>
			)}
		</motion.div>
	);
};
