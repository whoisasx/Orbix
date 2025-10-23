import { MdContentCopy, MdDeleteOutline } from "react-icons/md";
import type { Solana } from "./Solana";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { RiWallet3Line } from "react-icons/ri";
import type { Ethereum } from "./Ethereum";
import type { Bitcoin } from "./Bitcoin";
import { motion } from "motion/react";
import toast from "react-hot-toast";

export const WalletCard = ({
	wallet,
	idx,
	onDelete,
}: {
	wallet: Solana | Ethereum | Bitcoin;
	idx: number;
	onDelete?: () => void;
}) => {
	const [watching, setWatching] = useState(false);

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${label} copied to clipboard!`, {
			position: "bottom-right",
			style: {
				background: "#eff6ff",
				color: "#2563eb",
				border: "1px solid #93c5fd",
			},
		});
	};

	const formatKey = (key: string, isVisible: boolean) => {
		if (!isVisible) return "•".repeat(50);
		if (key.length > 50) {
			return `${key.substring(0, 20)}...${key.substring(
				key.length - 20
			)}`;
		}
		return key;
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: idx * 0.1 }}
			className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 overflow-hidden"
		>
			{/* Header */}
			<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center">
						<RiWallet3Line className="w-5 h-5 text-red-500" />
					</div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
						Wallet {idx + 1}
					</h3>
				</div>

				{onDelete && (
					<motion.button
						onClick={onDelete}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
						title="Delete wallet"
					>
						<MdDeleteOutline className="w-5 h-5" />
					</motion.button>
				)}
			</div>

			{/* Content */}
			<div className="p-6 space-y-6">
				{/* Public Key */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
						Public Key
					</label>
					<div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700">
						<div className="flex-1 min-w-0">
							<p className="font-mono text-sm text-gray-900 dark:text-white truncate">
								{wallet.publickey}
							</p>
						</div>
						<motion.button
							onClick={() =>
								copyToClipboard(wallet.publickey, "Public key")
							}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="shrink-0 p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
							title="Copy public key"
						>
							<MdContentCopy className="w-4 h-4" />
						</motion.button>
					</div>
				</div>

				{/* Private Key */}
				<div>
					<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
						Private Key
					</label>
					<div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700">
						<div className="flex-1 min-w-0">
							<p className="font-mono text-sm text-gray-900 dark:text-white truncate">
								{formatKey(wallet.privatekey, watching)}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<motion.button
								onClick={() => setWatching(!watching)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="shrink-0 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
								title={
									watching
										? "Hide private key"
										: "Show private key"
								}
							>
								{watching ? (
									<HiEyeSlash className="w-4 h-4" />
								) : (
									<HiEye className="w-4 h-4" />
								)}
							</motion.button>
							<motion.button
								onClick={() =>
									copyToClipboard(
										wallet.privatekey,
										"Private key"
									)
								}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="shrink-0 p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
								title="Copy private key"
							>
								<MdContentCopy className="w-4 h-4" />
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
