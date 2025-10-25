import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { showToast } from "../utils/toast";
import type { Ethereum } from "../components/Ethereum";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { FaEthereum } from "react-icons/fa";
import {
	HiArrowUpRight,
	HiArrowDownLeft,
	HiEye,
	HiEyeSlash,
	HiArrowLeft,
	HiClipboardDocument,
	HiSparkles,
	HiCurrencyDollar,
} from "react-icons/hi2";
import { MdContentCopy, MdRefresh, MdClose } from "react-icons/md";
import { RiExternalLinkLine } from "react-icons/ri";

interface WalletData {
	address: string;
	balance: number;
	tokenBalance: any[];
	transactions: any[];
	network: {
		chainId: number;
		blockNumber: number;
		gasPrice: string;
		network: string;
	};
}

interface SendModalProps {
	isOpen: boolean;
	onClose: () => void;
	balance: number;
	onSend: (receiver: string, amount: string) => void;
}

const SendModal = ({ isOpen, onClose, balance, onSend }: SendModalProps) => {
	const [receiver, setReceiver] = useState("");
	const [amount, setAmount] = useState("");
	const [isAmountError, setIsAmountError] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (parseFloat(amount) > balance) {
				setIsAmountError(true);
			} else {
				setIsAmountError(false);
			}
		}, 300);
		return () => clearTimeout(timeoutId);
	}, [amount, balance]);

	const handleSend = () => {
		if (!receiver || !amount || isAmountError) return;
		onSend(receiver, amount);
		setReceiver("");
		setAmount("");
		onClose();
	};

	if (!isOpen) return null;

	return createPortal(
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
				onClick={onClose}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
					onClick={(e) => e.stopPropagation()}
				>
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-xl font-bold text-gray-900 dark:text-white">
							Send ETH
						</h3>
						<motion.button
							onClick={onClose}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
						>
							<MdClose className="w-5 h-5" />
						</motion.button>
					</div>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Recipient Address
							</label>
							<input
								type="text"
								value={receiver}
								onChange={(e) => setReceiver(e.target.value)}
								placeholder="Enter recipient's wallet address"
								className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Amount (ETH)
							</label>
							<input
								type="number"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="0.0"
								className={`w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
									isAmountError
										? "border-red-300 focus:ring-red-500"
										: "border-gray-200 dark:border-slate-700 focus:ring-blue-500"
								}`}
							/>
							{isAmountError && (
								<p className="text-red-500 text-sm mt-1">
									Insufficient balance
								</p>
							)}
							<p className="text-gray-500 text-sm mt-1">
								Available: {balance.toFixed(4)} ETH
							</p>
						</div>
					</div>

					<div className="flex gap-3 mt-6">
						<motion.button
							onClick={onClose}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="flex-1 px-4 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
						>
							Cancel
						</motion.button>
						<motion.button
							onClick={handleSend}
							disabled={!receiver || !amount || isAmountError}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							Send
						</motion.button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		document.body
	);
};

export default function EthereumWallet() {
	const { address } = useParams<{ address: string }>();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [walletData, setWalletData] = useState<WalletData | null>(null);
	const [secret, setSecret] = useState("");
	const [showSendModal, setShowSendModal] = useState(false);
	const [showPrivateKey, setShowPrivateKey] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	// Load wallet data
	useEffect(() => {
		if (!address) {
			showToast.error("Invalid wallet address.");
			navigate("/wallets");
			return;
		}

		const localEthereums = localStorage.getItem("ethereums");
		const ethereums = JSON.parse(localEthereums || "[]") as Ethereum[];

		const wallet = ethereums.find(
			(ethereum) => ethereum.publickey === address
		);
		if (!wallet) {
			showToast.error("Wallet not found.");
			navigate("/wallets");
			return;
		}

		setSecret(wallet.privatekey);
		fetchWalletData();
	}, [address, navigate]);

	const fetchWalletData = async () => {
		// TODO: Implement actual Ethereum data fetching
		// For now, using demo data
		setTimeout(() => {
			setWalletData({
				address: address!,
				balance: 2.5847, // Demo balance in ETH
				tokenBalance: [], // Demo token balance
				transactions: [
					{
						hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
						from: address,
						to: "0xabcdef1234567890abcdef1234567890abcdef12",
						value: "0.5",
						gasUsed: "21000",
						gasPrice: "20",
						blockNumber: 18500000,
						status: "success",
					},
					{
						hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
						from: "0x9876543210fedcba9876543210fedcba98765432",
						to: address,
						value: "1.0",
						gasUsed: "21000",
						gasPrice: "18",
						blockNumber: 18499985,
						status: "success",
					},
				],
				network: {
					chainId: 1,
					blockNumber: 18500125,
					gasPrice: "22.5",
					network: "mainnet",
				},
			});
			setIsLoading(false);
			setIsRefreshing(false);
		}, 1500);
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await fetchWalletData();
		showToast.success("Wallet data refreshed! 🔄");
	};

	const handleSendTransaction = async (receiver: string, amount: string) => {
		// TODO: Implement actual Ethereum transaction sending
		try {
			showToast.success("Transaction sent successfully! 🚀");
			console.log("Sending ETH:", { receiver, amount });

			// Refresh wallet data after transaction
			setTimeout(() => handleRefresh(), 2000);
		} catch (error) {
			console.error("Transaction error:", error);
			showToast.error("Transaction failed. Please try again.");
		}
	};

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		showToast.success(`${label} copied! 📋`);
	};

	const formatAddress = (addr: string) => {
		return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
	};

	if (isLoading) {
		return (
			<section className="min-h-screen bg-linear-to-br from-white via-slate-50 to-gray-100 dark:from-black dark:via-slate-900 dark:to-slate-800">
				<Navbar />
				<main className="relative pt-24 pb-12 px-6 sm:px-8 lg:px-12">
					<div className="max-w-7xl mx-auto">
						<div className="animate-pulse space-y-6">
							<div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
								<div className="lg:col-span-2 space-y-4">
									<div className="h-40 bg-gray-200 dark:bg-slate-700 rounded-2xl"></div>
									<div className="h-60 bg-gray-200 dark:bg-slate-700 rounded-2xl"></div>
								</div>
								<div className="space-y-4">
									<div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-2xl"></div>
									<div className="h-32 bg-gray-200 dark:bg-slate-700 rounded-2xl"></div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</section>
		);
	}

	return (
		<section className="min-h-screen bg-linear-to-br from-white via-slate-50 to-gray-100 dark:from-black dark:via-slate-900 dark:to-slate-800 font-vendsans">
			<Navbar />

			{/* Background Effects */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute top-20 right-20 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"
					animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
					transition={{ duration: 20, repeat: Infinity }}
				/>
				<motion.div
					className="absolute bottom-20 left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-xl"
					animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
					transition={{ duration: 25, repeat: Infinity }}
				/>
			</div>

			<main className="relative pt-24 pb-12 px-6 sm:px-8 lg:px-12">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex items-center justify-between mb-8"
					>
						<div className="flex items-center gap-4">
							<motion.button
								onClick={() => navigate("/wallets")}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="p-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200"
							>
								<HiArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
							</motion.button>
							<div>
								<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
									<div className="w-8 h-8 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
										<FaEthereum className="w-5 h-5 text-white" />
									</div>
									Ethereum Wallet
								</h1>
								<p className="text-gray-600 dark:text-gray-400 mt-1">
									{formatAddress(address!)}
								</p>
							</div>
						</div>

						<motion.button
							onClick={handleRefresh}
							disabled={isRefreshing}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
						>
							<MdRefresh
								className={`w-4 h-4 ${
									isRefreshing ? "animate-spin" : ""
								}`}
							/>
							<span className="hidden sm:inline">
								{isRefreshing ? "Refreshing..." : "Refresh"}
							</span>
						</motion.button>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-6">
							{/* Balance Card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 }}
								className="bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden"
							>
								<div className="absolute inset-0 bg-black/10"></div>
								<div className="relative">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-2">
											<HiCurrencyDollar className="w-5 h-5" />
											<span className="text-white/80">
												Total Balance
											</span>
										</div>
										<div className="flex items-center gap-2">
											<span className="text-white/60 text-sm">
												ETH
											</span>
											<div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
												<FaEthereum className="w-3 h-3" />
											</div>
										</div>
									</div>
									<div className="mb-6">
										<h2 className="text-3xl sm:text-4xl font-bold mb-1">
											{walletData
												? walletData.balance.toFixed(4)
												: "0.0000"}
										</h2>
										<p className="text-white/60 text-sm">
											≈ $
											{walletData
												? (
														walletData.balance *
														2400
												  ).toFixed(2)
												: "0.00"}{" "}
											USD
										</p>
									</div>
									<div className="flex gap-3">
										<motion.button
											onClick={() =>
												setShowSendModal(true)
											}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200"
										>
											<HiArrowUpRight className="w-4 h-4" />
											<span className="font-medium">
												Send
											</span>
										</motion.button>
										<motion.button
											onClick={() =>
												copyToClipboard(
													address!,
													"Receive address"
												)
											}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200"
										>
											<HiArrowDownLeft className="w-4 h-4" />
											<span className="font-medium">
												Receive
											</span>
										</motion.button>
									</div>
								</div>
							</motion.div>

							{/* Transactions */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
								className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
							>
								<div className="flex items-center gap-2 mb-6">
									<HiClipboardDocument className="w-5 h-5 text-gray-600 dark:text-gray-400" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										Recent Transactions
									</h3>
								</div>

								{walletData?.transactions &&
								walletData.transactions.length > 0 ? (
									<div className="space-y-3">
										{walletData.transactions.map(
											(tx: any, idx: number) => (
												<motion.div
													key={tx.hash}
													initial={{
														opacity: 0,
														x: -20,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														delay: 0.1 * idx,
													}}
													className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors group cursor-pointer"
													onClick={() =>
														copyToClipboard(
															tx.hash,
															"Transaction hash"
														)
													}
												>
													<div className="flex items-center gap-3">
														<div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
															{tx.from.toLowerCase() ===
															address?.toLowerCase() ? (
																<HiArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
															) : (
																<HiArrowDownLeft className="w-5 h-5 text-green-600 dark:text-green-400" />
															)}
														</div>
														<div>
															<p className="font-medium text-gray-900 dark:text-white">
																{tx.from.toLowerCase() ===
																address?.toLowerCase()
																	? "Sent"
																	: "Received"}{" "}
																{tx.value} ETH
															</p>
															<p className="text-sm text-gray-500 dark:text-gray-400">
																{tx.status} •
																Block{" "}
																{tx.blockNumber.toLocaleString()}
															</p>
														</div>
													</div>
													<RiExternalLinkLine className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
												</motion.div>
											)
										)}
									</div>
								) : (
									<div className="text-center py-8">
										<div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
											<HiClipboardDocument className="w-8 h-8 text-gray-400" />
										</div>
										<p className="text-gray-500 dark:text-gray-400">
											No transactions yet
										</p>
									</div>
								)}
							</motion.div>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Wallet Info */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
								className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
							>
								<div className="flex items-center gap-2 mb-4">
									<HiSparkles className="w-5 h-5 text-gray-600 dark:text-gray-400" />
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
										Wallet Details
									</h3>
								</div>

								<div className="space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
											Public Address
										</label>
										<div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
											<span className="flex-1 font-mono text-sm text-gray-900 dark:text-white truncate">
												{address}
											</span>
											<motion.button
												onClick={() =>
													copyToClipboard(
														address!,
														"Public address"
													)
												}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
											>
												<MdContentCopy className="w-4 h-4" />
											</motion.button>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
											Private Key
										</label>
										<div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
											<span className="flex-1 font-mono text-sm text-gray-900 dark:text-white truncate">
												{showPrivateKey
													? secret
													: "•".repeat(20)}
											</span>
											<motion.button
												onClick={() =>
													setShowPrivateKey(
														!showPrivateKey
													)
												}
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
											>
												{showPrivateKey ? (
													<HiEyeSlash className="w-4 h-4" />
												) : (
													<HiEye className="w-4 h-4" />
												)}
											</motion.button>
											{showPrivateKey && (
												<motion.button
													onClick={() =>
														copyToClipboard(
															secret,
															"Private key"
														)
													}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
												>
													<MdContentCopy className="w-4 h-4" />
												</motion.button>
											)}
										</div>
									</div>
								</div>
							</motion.div>

							{/* Network Info */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
								className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6"
							>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Network Status
								</h3>

								{walletData?.network && (
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Network
											</span>
											<span className="font-medium text-gray-900 dark:text-white capitalize">
												{walletData.network.network}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Chain ID
											</span>
											<span className="font-medium text-gray-900 dark:text-white">
												{walletData.network.chainId}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Block
											</span>
											<span className="font-medium text-gray-900 dark:text-white">
												{walletData.network.blockNumber?.toLocaleString()}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600 dark:text-gray-400">
												Gas Price
											</span>
											<span className="font-medium text-gray-900 dark:text-white">
												{walletData.network.gasPrice}{" "}
												Gwei
											</span>
										</div>
									</div>
								)}
							</motion.div>
						</div>
					</div>
				</div>
			</main>

			<Footer />

			{/* Send Modal */}
			<SendModal
				isOpen={showSendModal}
				onClose={() => setShowSendModal(false)}
				balance={walletData?.balance || 0}
				onSend={handleSendTransaction}
			/>
		</section>
	);
}
