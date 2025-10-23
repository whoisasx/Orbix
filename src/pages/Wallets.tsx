import { SiSolana } from "react-icons/si";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useWalletStore } from "../store/walletStore";
import { Solana } from "../components/Solana";
import { Ethereum } from "../components/Ethereum";
import { Bitcoin } from "../components/Bitcoin";
import { generateMnemonic, validateMnemonic, mnemonicToSeedSync } from "bip39";
import { MdContentCopy, MdSecurity, MdImportExport } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiSparkles, HiEye, HiEyeSlash } from "react-icons/hi2";
import { motion, AnimatePresence } from "motion/react";
import bs58 from "bs58";
import { showToast } from "../utils/toast";

export default function Wallets() {
	const [secrets, setSecrets] = useState<string[]>([]);
	const { wallet, setWallet } = useWalletStore();

	const [firstSecrets, setfirstSecrets] = useState<string[]>([]);
	const [firstMnemonic, setFirstMnemonic] = useState("");
	const [seed, setSeed] = useState("");
	const [inputData, setInputData] = useState("");
	const [showSeed, setShowSeed] = useState(false);
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		let secretString = localStorage.getItem("secrets");
		if (!secretString) return;

		let localSecrets = secretString.split(" ");
		if (localSecrets.length < 12) {
			localStorage.removeItem("secrets");
			return;
		}

		setSecrets(localSecrets);
		const seed = mnemonicToSeedSync(secretString);
		setSeed(bs58.encode(seed));
	}, []);

	useEffect(() => {
		if (localStorage.getItem("secrets")) return;
		const mnemonic = generateMnemonic();
		const secrets = mnemonic.split(" ");
		setFirstMnemonic(mnemonic);
		setfirstSecrets(secrets);
	}, []);

	const handleConnectWallet = () => {
		let secret = firstMnemonic;
		if (inputData.length > 0) {
			let tempSecret = inputData.trim().toLowerCase();
			if (!validateMnemonic(tempSecret)) {
				showToast.error("Invalid mnemonic phrase");
				setInputData("");
				return;
			}
			secret = tempSecret;
			setInputData("");
		}
		localStorage.setItem("secrets", secret);
		setSecrets(secret.split(" "));

		const seed = mnemonicToSeedSync(secret);
		setSeed(bs58.encode(seed));

		showToast.success("Wallet connected successfully! 🎉");
	};

	const copyToClipboard = (text: string, label: string) => {
		navigator.clipboard.writeText(text);
		showToast.success(`${label} copied to clipboard! 📋`);
	};

	const walletTypes = [
		{
			id: "sol",
			name: "Solana",
			icon: SiSolana,
			color: "from-purple-500 to-pink-500",
		},
		{
			id: "eth",
			name: "Ethereum",
			icon: FaEthereum,
			color: "from-blue-500 to-cyan-500",
		},
		{
			id: "bit",
			name: "Bitcoin",
			icon: FaBitcoin,
			color: "from-orange-500 to-yellow-500",
		},
	];

	return (
		<section className="min-h-screen bg-linear-to-br from-white via-slate-50 to-gray-100 dark:from-black dark:via-slate-900 dark:to-slate-800 font-vendsans">
			<Navbar />

			<main className="relative">
				{/* Background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute top-20 right-20 w-32 h-32 bg-red-500/5 rounded-full blur-xl"
						animate={{
							x: [0, 20, -15, 0],
							y: [0, -15, 20, 0],
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
						}}
					/>
				</div>

				<div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
					{secrets.length === 0 ? (
						// Wallet Setup Section
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-center"
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.2, duration: 0.5 }}
								className="mb-8"
							>
								<div className="w-16 h-16 mx-auto bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mb-6">
									<MdSecurity className="w-8 h-8 text-red-500" />
								</div>
								<h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
									Create Your Wallet
								</h1>
								<p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
									Generate a secure hierarchical deterministic
									wallet with a 12-word mnemonic phrase. Keep
									your seed phrase safe - it's the only way to
									recover your wallet.
								</p>
							</motion.div>

							{/* Mnemonic Display */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.5 }}
								className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-8 mb-8"
							>
								<div className="flex items-center gap-2 mb-6">
									<HiSparkles className="w-5 h-5 text-red-500" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Your Secret Recovery Phrase
									</span>
								</div>

								<div className="relative group mb-6">
									<div className="absolute inset-0 z-10 bg-gray-900/50 dark:bg-black/50 backdrop-blur-sm group-hover:opacity-0 transition-all duration-300 rounded-xl flex items-center justify-center">
										<p className="text-white text-sm font-medium">
											Hover to reveal
										</p>
									</div>
									<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
										{firstSecrets.map((secret, idx) => (
											<div
												key={idx}
												className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
											>
												<span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-6">
													{idx + 1}
												</span>
												<span className="font-mono text-sm text-gray-900 dark:text-white">
													{secret}
												</span>
											</div>
										))}
									</div>
								</div>

								<motion.button
									onClick={() =>
										copyToClipboard(
											firstMnemonic,
											"Mnemonic phrase"
										)
									}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200 border border-red-200 dark:border-red-800"
								>
									<MdContentCopy className="w-4 h-4" />
									<span className="text-sm font-medium">
										Copy to Clipboard
									</span>
								</motion.button>
							</motion.div>

							{/* Import Section */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6, duration: 0.5 }}
								className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-8 mb-8"
							>
								<div className="flex items-center gap-2 mb-4">
									<MdImportExport className="w-5 h-5 text-gray-500" />
									<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
										Or Import Existing Wallet
									</span>
								</div>

								<div className="relative">
									<input
										id="input-data"
										type="text"
										placeholder="Enter your 12-word secret phrase"
										value={inputData}
										onChange={(e) =>
											setInputData(e.target.value)
										}
										className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
									/>
								</div>
							</motion.div>

							{/* Connect Button */}
							<motion.button
								onClick={handleConnectWallet}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8, duration: 0.5 }}
								className="relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
							>
								<div className="absolute inset-0 bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<span className="relative">Connect Wallet</span>
							</motion.button>
						</motion.div>
					) : (
						// Wallet Management Section
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6 }}
						>
							{/* Security Warning */}
							<div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl mb-2">
								<p className="text-sm text-amber-700 dark:text-amber-400">
									<span className="font-medium">
										Security Notice:
									</span>{" "}
									Never share your private key with anyone.
									Store it securely offline.
								</p>
							</div>
							{/* Wallet Credentials */}
							<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6 mb-8">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
										Wallet Credentials
									</h2>
									<motion.button
										onClick={() => setClicked(!clicked)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
									>
										{clicked ? (
											<IoIosArrowUp className="w-5 h-5" />
										) : (
											<IoIosArrowDown className="w-5 h-5" />
										)}
									</motion.button>
								</div>

								{/* Security Warning for Credentials */}
								<div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl mb-4">
									<div className="flex items-start gap-3">
										<MdSecurity className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
										<div>
											<p className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">
												Critical Security Warning
											</p>
											<p className="text-xs text-red-600 dark:text-red-400">
												Your seed phrase is the master
												key to your wallet. Never share
												it with anyone. Anyone with
												access to your seed phrase can
												control your funds. Store it
												securely offline.
											</p>
										</div>
									</div>
								</div>

								{clicked && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										transition={{ duration: 0.3 }}
									>
										{/* Secret Phrase with Hover Overlay */}
										<div className="mb-6">
											<div className="flex items-center justify-between mb-3">
												<div className="flex items-center gap-2">
													<HiSparkles className="w-4 h-4 text-red-500" />
													<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
														Secret Recovery Phrase
													</span>
												</div>
												<motion.button
													onClick={() =>
														copyToClipboard(
															secrets.join(" "),
															"Secret phrase"
														)
													}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-all duration-200 border border-red-200 dark:border-red-800"
												>
													<MdContentCopy className="w-3 h-3" />
													<span className="text-xs font-medium">
														Copy
													</span>
												</motion.button>
											</div>

											<div className="relative group">
												<div className="absolute inset-0 z-10 bg-gray-900/70 dark:bg-black/70 backdrop-blur-sm group-hover:opacity-0 transition-all duration-300 rounded-xl flex items-center justify-center">
													<div className="text-center">
														<HiEye className="w-6 h-6 text-white mx-auto mb-2" />
														<p className="text-white text-sm font-medium">
															Hover to reveal
															phrase
														</p>
														<p className="text-white/70 text-xs">
															Keep it private and
															secure
														</p>
													</div>
												</div>
												<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
													{secrets.map(
														(secret, idx) => (
															<div
																key={idx}
																className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700"
															>
																<span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-6">
																	{idx + 1}
																</span>
																<span className="font-mono text-sm text-gray-900 dark:text-white">
																	{secret}
																</span>
															</div>
														)
													)}
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
													Master Seed
												</p>
												<p className="font-mono text-xs text-gray-500 dark:text-gray-400 truncate">
													{showSeed
														? seed
														: "•".repeat(50)}
												</p>
											</div>
											<div className="flex items-center gap-2">
												<motion.button
													onClick={() =>
														setShowSeed(!showSeed)
													}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
												>
													{showSeed ? (
														<HiEyeSlash className="w-4 h-4" />
													) : (
														<HiEye className="w-4 h-4" />
													)}
												</motion.button>
												<motion.button
													onClick={() =>
														copyToClipboard(
															seed,
															"Master seed"
														)
													}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
												>
													<MdContentCopy className="w-4 h-4" />
												</motion.button>
											</div>
										</div>
									</motion.div>
								)}
							</div>

							{/* Wallet Type Selection */}
							<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 p-6 mb-8">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
									Select Blockchain
								</h2>
								<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
									{walletTypes.map((type) => {
										const Icon = type.icon;
										return (
											<motion.button
												key={type.id}
												onClick={() =>
													setWallet(type.id as any)
												}
												whileHover={{
													scale: 1.02,
													y: -2,
												}}
												whileTap={{ scale: 0.98 }}
												className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
													wallet === type.id
														? "border-red-500 bg-red-50 dark:bg-red-950/30 shadow-lg shadow-red-500/10"
														: "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-red-300 dark:hover:border-red-700 hover:shadow-lg"
												}`}
											>
												<div className="flex flex-col items-center gap-3">
													<div
														className={`w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br ${type.color}`}
													>
														<Icon className="w-6 h-6 text-white" />
													</div>
													<span className="font-semibold text-gray-900 dark:text-white">
														{type.name}
													</span>
												</div>
											</motion.button>
										);
									})}
								</div>
							</div>

							{/* Wallet Content */}
							<AnimatePresence mode="wait">
								<motion.div
									key={wallet}
									initial={{ opacity: 0, x: 20, scale: 0.95 }}
									animate={{ opacity: 1, x: 0, scale: 1 }}
									exit={{ opacity: 0, x: -20, scale: 0.95 }}
									transition={{
										duration: 0.3,
										ease: "easeInOut",
									}}
								>
									{wallet === "sol" && <Solana />}
									{wallet === "eth" && <Ethereum />}
									{wallet === "bit" && <Bitcoin />}
								</motion.div>
							</AnimatePresence>
						</motion.div>
					)}
				</div>
			</main>

			<Footer />
		</section>
	);
}
