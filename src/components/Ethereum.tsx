import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdAdd, MdDeleteSweep, MdGridView } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import { WalletCard } from "./WalletCard";
import { motion, AnimatePresence } from "motion/react";
import { showToast } from "../utils/toast";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export interface Ethereum {
	publickey: string;
	privatekey: string;
}

export const Ethereum = () => {
	const [ethereums, setEthereums] = useState<Ethereum[]>([]);
	const [warning, setWarning] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	useEffect(() => {
		const localEthereums = localStorage.getItem("ethereums");
		if (!localEthereums) return;
		setEthereums(JSON.parse(localEthereums));
	}, []);

	const handleAddWallet = () => {
		const len = ethereums.length;
		const path = `m/44'/60'/${len}'/0'`;
		const mnemonic = localStorage.getItem("secrets");

		if (!mnemonic) {
			showToast.error(
				"No seed phrase found. Please create a wallet first."
			);
			return;
		}

		try {
			const seed = mnemonicToSeedSync(mnemonic);
			const derivedSeed = derivePath(path, seed.toString("hex")).key;
			const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

			const kp = Keypair.fromSecretKey(secret);
			const publicKey = new PublicKey(kp.publicKey).toBase58();
			const privateKey = bs58.encode(kp.secretKey);

			const newEntry: Ethereum = {
				publickey: publicKey,
				privatekey: privateKey,
			};
			const updated = [...ethereums, newEntry];

			setEthereums(updated);
			localStorage.setItem("ethereums", JSON.stringify(updated));

			showToast.success(
				`Ethereum wallet ${len + 1} created successfully! 💎`
			);
		} catch (error) {
			showToast.error("Failed to create wallet. Please try again.");
			console.error("Wallet creation error:", error);
		}
	};

	const handleDeleteWallet = (index: number) => {
		const updated = ethereums.filter((_, idx) => idx !== index);
		setEthereums(updated);
		localStorage.setItem("ethereums", JSON.stringify(updated));
		showToast.success("Wallet deleted successfully! 🗑️");
	};

	const handleClearWallets = () => {
		localStorage.removeItem("ethereums");
		setEthereums([]);
		setWarning(false);
		showToast.success("All wallets cleared successfully! 🧹");

		const solanas = localStorage.getItem("solanas");
		const bitcoins = localStorage.getItem("bitcoins");
		if (!solanas && !bitcoins) {
			localStorage.removeItem("secrets");
			window.location.reload();
		}
	};

	return (
		<section className="relative">
			{ethereums.length === 0 ? (
				// Empty state
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center py-16"
				>
					<div className="w-20 h-20 mx-auto bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
						<FaEthereum className="w-10 h-10 text-white" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						No Ethereum Wallets Yet
					</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
						Create your first Ethereum wallet to start managing your
						ETH tokens and interact with DeFi protocols.
					</p>
					<motion.button
						onClick={handleAddWallet}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						<MdAdd className="w-5 h-5" />
						Create Your First Ethereum Wallet
					</motion.button>
				</motion.div>
			) : (
				// Wallets list
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					{/* Header */}
					<div className="mb-8">
						{/* Title Section */}
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
								<FaEthereum className="w-6 h-6 text-white" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Ethereum Wallets
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{ethereums.length} wallet
									{ethereums.length !== 1 ? "s" : ""} created
								</p>
							</div>
						</div>

						{/* Controls Section */}
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							{/* View Toggle */}
							<div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
								<button
									onClick={() => setViewMode("grid")}
									className={`p-2 rounded-md transition-all duration-200 ${
										viewMode === "grid"
											? "bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 shadow-sm"
											: "text-gray-400 dark:text-gray-500"
									}`}
								>
									<MdGridView className="w-4 h-4" />
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={`p-2 rounded-md transition-all duration-200 ${
										viewMode === "list"
											? "bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 shadow-sm"
											: "text-gray-400 dark:text-gray-500"
									}`}
								>
									<IoMenu className="w-4 h-4" />
								</button>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center gap-3 w-full sm:w-auto">
								<motion.button
									onClick={handleAddWallet}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
								>
									<MdAdd className="w-4 h-4" />
									<span className="hidden xs:inline">
										Add Wallet
									</span>
									<span className="xs:hidden">Add</span>
								</motion.button>

								{ethereums.length > 0 && (
									<motion.button
										onClick={() => setWarning(true)}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200 border border-red-200 dark:border-red-800"
									>
										<HiOutlineTrash className="w-4 h-4" />
										<span className="hidden xs:inline">
											Clear All
										</span>
										<span className="xs:hidden">Clear</span>
									</motion.button>
								)}
							</div>
						</div>
					</div>

					{/* Wallets Grid/List */}
					<div
						className={`grid gap-4 sm:gap-6 ${
							viewMode === "grid"
								? "grid-cols-1 xl:grid-cols-2"
								: "grid-cols-1"
						}`}
					>
						<AnimatePresence mode="popLayout">
							{ethereums.map((ethereum, idx) => (
								<WalletCard
									key={`ethereum-${idx}`}
									wallet={ethereum}
									idx={idx}
									onDelete={() => handleDeleteWallet(idx)}
								/>
							))}
						</AnimatePresence>
					</div>
				</motion.div>
			)}

			{/* Delete Confirmation Modal */}
			{warning &&
				createPortal(
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
							onClick={() => setWarning(false)}
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.9, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.9, y: 20 }}
								transition={{ duration: 0.2 }}
								className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto"
								onClick={(e) => e.stopPropagation()}
							>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center">
										<MdDeleteSweep className="w-6 h-6 text-red-500" />
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
											Clear All Wallets
										</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											This action cannot be undone
										</p>
									</div>
								</div>

								<p className="text-gray-700 dark:text-gray-300 mb-6">
									Are you sure you want to delete all{" "}
									{ethereums.length} Ethereum wallets? Make
									sure you have backed up your private keys
									before proceeding.
								</p>

								<div className="flex items-center gap-3">
									<motion.button
										onClick={() => setWarning(false)}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200"
									>
										Cancel
									</motion.button>
									<motion.button
										onClick={handleClearWallets}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										className="flex-1 px-4 py-3 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
									>
										Delete All
									</motion.button>
								</div>
							</motion.div>
						</motion.div>
					</AnimatePresence>,
					document.body
				)}
		</section>
	);
};
