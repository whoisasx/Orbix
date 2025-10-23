import { useEffect, useState } from "react";
import { MdAdd, MdDeleteSweep, MdGridView } from "react-icons/md";
import { SiBitcoin } from "react-icons/si";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import { WalletCard } from "./WalletCard";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export interface Bitcoin {
	publickey: string;
	privatekey: string;
}

export const Bitcoin = () => {
	const [bitcoins, setBitcoins] = useState<Bitcoin[]>([]);
	const [warning, setWarning] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	useEffect(() => {
		const localBitcoins = localStorage.getItem("bitcoins");
		if (!localBitcoins) return;
		setBitcoins(JSON.parse(localBitcoins));
	}, []);

	const handleAddWallet = () => {
		const len = bitcoins.length;
		const path = `m/44'/0'/${len}'/0'`;
		const mnemonic = localStorage.getItem("secrets");

		if (!mnemonic) {
			toast.error("No seed phrase found. Please create a wallet first.");
			return;
		}

		try {
			const seed = mnemonicToSeedSync(mnemonic);
			const derivedSeed = derivePath(path, seed.toString("hex")).key;
			const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

			const kp = Keypair.fromSecretKey(secret);
			const publicKey = new PublicKey(kp.publicKey).toBase58();
			const privateKey = bs58.encode(kp.secretKey);

			const newEntry: Bitcoin = {
				publickey: publicKey,
				privatekey: privateKey,
			};
			const updated = [...bitcoins, newEntry];

			setBitcoins(updated);
			localStorage.setItem("bitcoins", JSON.stringify(updated));

			toast.success(`Bitcoin wallet ${len + 1} created successfully!`);
		} catch (error) {
			toast.error("Failed to create wallet. Please try again.");
			console.error("Wallet creation error:", error);
		}
	};

	const handleDeleteWallet = (index: number) => {
		const updated = bitcoins.filter((_, idx) => idx !== index);
		setBitcoins(updated);
		localStorage.setItem("bitcoins", JSON.stringify(updated));
		toast.success("Wallet deleted successfully!");
	};

	const handleClearWallets = () => {
		localStorage.removeItem("bitcoins");
		setBitcoins([]);
		setWarning(false);
		toast.success("All wallets cleared successfully!");
	};

	return (
		<section className="relative">
			{bitcoins.length === 0 ? (
				// Empty state
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center py-16"
				>
					<div className="w-20 h-20 mx-auto bg-linear-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6">
						<SiBitcoin className="w-10 h-10 text-white" />
					</div>
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						No Bitcoin Wallets Yet
					</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
						Create your first Bitcoin wallet to store and manage
						your BTC with complete security and control.
					</p>
					<motion.button
						onClick={handleAddWallet}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						<MdAdd className="w-5 h-5" />
						Create Your First Bitcoin Wallet
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
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-linear-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
								<SiBitcoin className="w-6 h-6 text-white" />
							</div>
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
									Bitcoin Wallets
								</h2>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{bitcoins.length} wallet
									{bitcoins.length !== 1 ? "s" : ""} created
								</p>
							</div>
						</div>

						{/* View Toggle */}
						<div className="flex items-center gap-3">
							<div className="hidden md:flex items-center gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
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

							<motion.button
								onClick={handleAddWallet}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 shadow-md hover:shadow-lg"
							>
								<MdAdd className="w-4 h-4" />
								Add Wallet
							</motion.button>

							{bitcoins.length > 0 && (
								<motion.button
									onClick={() => setWarning(true)}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200 border border-red-200 dark:border-red-800"
								>
									<HiOutlineTrash className="w-4 h-4" />
									Clear All
								</motion.button>
							)}
						</div>
					</div>

					{/* Wallets Grid/List */}
					<div
						className={`grid gap-6 ${
							viewMode === "grid"
								? "grid-cols-1 lg:grid-cols-2"
								: "grid-cols-1"
						}`}
					>
						<AnimatePresence mode="popLayout">
							{bitcoins.map((bitcoin, idx) => (
								<WalletCard
									key={`bitcoin-${idx}`}
									wallet={bitcoin}
									idx={idx}
									onDelete={() => handleDeleteWallet(idx)}
								/>
							))}
						</AnimatePresence>
					</div>
				</motion.div>
			)}

			{/* Delete Confirmation Modal */}
			<AnimatePresence>
				{warning && (
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
							className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-slate-700"
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
								{bitcoins.length} Bitcoin wallets? Make sure you
								have backed up your private keys before
								proceeding.
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
				)}
			</AnimatePresence>
		</section>
	);
};
