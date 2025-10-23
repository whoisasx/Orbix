import { PiWallet } from "react-icons/pi";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { HiSparkles } from "react-icons/hi2";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineSpeed } from "react-icons/md";
import { showToast } from "../utils/toast";

export default function Home() {
	const navigate = useNavigate();

	const handleWalletNavigation = () => {
		showToast.info("Launching HD Wallet... 🚀");
		navigate("/wallets");
	};

	const handleDappsNavigation = () => {
		showToast.info("Launching dApp Explorer... 🔍");
		navigate("/dapps");
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	return (
		<section className="min-h-screen bg-linear-to-br from-white via-slate-50 to-gray-100 dark:from-black dark:via-slate-900 dark:to-slate-800 font-vendsans">
			<Navbar />

			<main className="relative">
				{/* Background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute top-32 right-16 w-40 h-40 bg-red-500/8 rounded-full blur-2xl"
						animate={{
							x: [0, 15, -10, 0],
							y: [0, -10, 15, 0],
							scale: [1, 1.05, 0.95, 1],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<motion.div
						className="absolute bottom-32 left-16 w-56 h-56 bg-slate-400/4 rounded-full blur-2xl"
						animate={{
							x: [0, -12, 18, 0],
							y: [0, 12, -8, 0],
							scale: [1, 0.9, 1.1, 1],
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 3,
						}}
					/>
					<motion.div
						className="absolute top-1/3 left-1/3 w-32 h-32 bg-gray-400/3 rounded-full blur-xl"
						animate={{
							x: [0, 8, -5, 0],
							y: [0, -8, 12, 0],
							rotate: [0, 45, -30, 0],
						}}
						transition={{
							duration: 18,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 6,
						}}
					/>
				</div>

				<motion.div
					className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-32"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Hero Section */}
					<div className="text-center max-w-4xl mx-auto">
						<motion.div variants={itemVariants} className="mb-6">
							<span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full border border-red-200 dark:border-red-800">
								<HiSparkles className="w-4 h-4" />
								Next-Generation Web3 Wallet
							</span>
						</motion.div>

						<motion.h1
							variants={itemVariants}
							className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
						>
							Your world of{" "}
							<span className="bg-linear-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
								crypto
							</span>
							,<br />
							in one wallet.
						</motion.h1>

						<motion.p
							variants={itemVariants}
							className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
						>
							Orbix is a next-generation Web3 wallet designed for
							simplicity, security, and control. Manage your
							crypto, NFTs, and digital identity — all in one
							beautifully unified experience. With Orbix, your
							assets truly revolve around you.
						</motion.p>

						{/* Action Buttons */}
						<motion.div
							variants={itemVariants}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
						>
							<motion.button
								onClick={handleWalletNavigation}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="group relative w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
							>
								<div className="absolute inset-0 bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<div className="relative flex items-center justify-center gap-3">
									<PiWallet className="w-5 h-5" />
									<span>Launch HD Wallet</span>
								</div>
							</motion.button>

							<motion.button
								onClick={handleDappsNavigation}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="group w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-semibold rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 shadow-sm hover:shadow-md transition-all duration-300"
							>
								<div className="flex items-center justify-center gap-3">
									<CiLocationArrow1 className="w-5 h-5 group-hover:text-red-500 transition-colors" />
									<span>Launch DApp</span>
								</div>
							</motion.button>
						</motion.div>

						{/* Feature Cards */}
						<motion.div
							variants={itemVariants}
							className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
						>
							<div className="group p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 hover:shadow-lg">
								<div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<RiSecurePaymentLine className="w-6 h-6 text-red-500" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Bank-Grade Security
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Your private keys are encrypted and stored
									securely on your device.
								</p>
							</div>

							<div className="group p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 hover:shadow-lg">
								<div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<MdOutlineSpeed className="w-6 h-6 text-red-500" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Lightning Fast
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Optimized for speed with instant
									transactions and real-time updates.
								</p>
							</div>

							<div className="group p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 hover:shadow-lg">
								<div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<HiSparkles className="w-6 h-6 text-red-500" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Beautiful Design
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Clean, intuitive interface that makes crypto
									accessible to everyone.
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</main>

			<Footer />
		</section>
	);
}
