import { motion } from "motion/react";

interface ProgressRingProps {
	progress: number; // 0-100
	size?: number;
	strokeWidth?: number;
	color?: string;
	backgroundColor?: string;
	showText?: boolean;
	text?: string;
	className?: string;
}

export const ProgressRing = ({
	progress,
	size = 120,
	strokeWidth = 8,
	color = "red-500",
	backgroundColor = "gray-200",
	showText = true,
	text,
	className = "",
}: ProgressRingProps) => {
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	// Define color mappings to avoid dynamic class generation issues
	const colorMappings = {
		"red-500": "text-red-500",
		"blue-500": "text-blue-500",
		"green-500": "text-green-500",
		"purple-500": "text-purple-500",
		"orange-500": "text-orange-500",
		"yellow-500": "text-yellow-500",
	};

	const backgroundMappings = {
		"gray-200": "text-gray-200 dark:text-slate-700",
		"gray-300": "text-gray-300 dark:text-slate-600",
	};

	const progressColor =
		colorMappings[color as keyof typeof colorMappings] || "text-red-500";
	const bgColor =
		backgroundMappings[
			backgroundColor as keyof typeof backgroundMappings
		] || "text-gray-200 dark:text-slate-700";

	return (
		<div
			className={`relative ${className}`}
			style={{ width: size, height: size }}
		>
			<svg width={size} height={size} className="transform -rotate-90">
				{/* Background circle */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					className={bgColor}
				/>

				{/* Progress circle */}
				<motion.circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					strokeLinecap="round"
					strokeDasharray={strokeDasharray}
					className={progressColor}
					initial={{ strokeDashoffset: circumference }}
					animate={{ strokeDashoffset }}
					transition={{ duration: 1, ease: "easeInOut" }}
				/>
			</svg>

			{showText && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<motion.div
							className="text-2xl font-bold text-gray-900 dark:text-white"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.5, duration: 0.5 }}
						>
							{text || `${Math.round(progress)}%`}
						</motion.div>
						<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							Progress
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
