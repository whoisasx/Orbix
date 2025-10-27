import { motion } from "motion/react";

interface LoadingSkeletonProps {
	className?: string;
	variant?: "text" | "circular" | "rectangular";
	width?: string | number;
	height?: string | number;
	animation?: "pulse" | "wave";
}

export const LoadingSkeleton = ({
	className = "",
	variant = "rectangular",
	width = "auto",
	height = "auto",
	animation = "pulse",
}: LoadingSkeletonProps) => {
	const baseClasses = "bg-gray-200 dark:bg-slate-700";

	const variantClasses = {
		text: "rounded",
		circular: "rounded-full",
		rectangular: "rounded-lg",
	};

	const animationClasses = {
		pulse: "animate-pulse",
		wave: "animate-pulse", // Could be enhanced with a wave animation
	};

	const style = {
		width: typeof width === "number" ? `${width}px` : width,
		height: typeof height === "number" ? `${height}px` : height,
	};

	return (
		<motion.div
			className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
			style={style}
			initial={{ opacity: 0.6 }}
			animate={{ opacity: [0.6, 1, 0.6] }}
			transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
		/>
	);
};
