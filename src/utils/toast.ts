import toast from "react-hot-toast";

// Custom toast functions with app-specific styling
export const showToast = {
	success: (message: string) =>
		toast.success(message, {
			position: "bottom-right",
			style: {
				background: "rgba(220, 252, 231, 0.9)",
				color: "#16a34a",
				border: "1px solid #86efac",
				fontSize: "14px",
				fontWeight: "500",
				padding: "12px 16px",
				borderRadius: "12px",
				maxWidth: "400px",
				backdropFilter: "blur(8px)",
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
			iconTheme: {
				primary: "#16a34a",
				secondary: "#dcfce7",
			},
		}),

	error: (message: string) =>
		toast.error(message, {
			position: "bottom-right",
			style: {
				background: "rgba(254, 226, 226, 0.9)",
				color: "#dc2626",
				border: "1px solid #fca5a5",
				fontSize: "14px",
				fontWeight: "500",
				padding: "12px 16px",
				borderRadius: "12px",
				maxWidth: "400px",
				backdropFilter: "blur(8px)",
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
			iconTheme: {
				primary: "#dc2626",
				secondary: "#fee2e2",
			},
		}),

	loading: (message: string) =>
		toast.loading(message, {
			position: "bottom-right",
			style: {
				background: "rgba(241, 245, 249, 0.9)",
				color: "#475569",
				border: "1px solid #cbd5e1",
				fontSize: "14px",
				fontWeight: "500",
				padding: "12px 16px",
				borderRadius: "12px",
				maxWidth: "400px",
				backdropFilter: "blur(8px)",
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
		}),

	info: (message: string) =>
		toast(message, {
			icon: "ℹ️",
			position: "bottom-right",
			style: {
				background: "rgba(239, 246, 255, 0.9)",
				color: "#2563eb",
				border: "1px solid #93c5fd",
				fontSize: "14px",
				fontWeight: "500",
				padding: "12px 16px",
				borderRadius: "12px",
				maxWidth: "400px",
				backdropFilter: "blur(8px)",
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
		}),

	warning: (message: string) =>
		toast(message, {
			icon: "⚠️",
			position: "bottom-right",
			style: {
				background: "rgba(255, 251, 235, 0.9)",
				color: "#d97706",
				border: "1px solid #fcd34d",
				fontSize: "14px",
				fontWeight: "500",
				padding: "12px 16px",
				borderRadius: "12px",
				maxWidth: "400px",
				backdropFilter: "blur(8px)",
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
		}),

	custom: (
		message: string,
		emoji: string,
		colors: { bg: string; text: string; border: string }
	) =>
		toast(message, {
			icon: emoji,
			position: "bottom-right",
			style: {
				background: colors.bg,
				color: colors.text,
				border: `1px solid ${colors.border}`,
				fontSize: "14px",
				fontWeight: "500",
				padding: "12px 16px",
				borderRadius: "12px",
				maxWidth: "400px",
				backdropFilter: "blur(8px)",
				boxShadow:
					"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
			},
		}),
};
