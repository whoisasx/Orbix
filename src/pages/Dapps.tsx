import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { motion } from "motion/react";
import {
	RiApps2Line,
	RiGamepadLine,
	RiExchangeLine,
	RiNftLine,
	RiArrowRightUpLine,
	RiStarLine,
	RiFireLine,
} from "react-icons/ri";
import { HiSparkles } from "react-icons/hi2";
import { showToast } from "../utils/toast";

export default function Dapps() {
	const handleCategoryClick = (categoryName: string) => {
		showToast.info(`Exploring ${categoryName} dApps... 🔍`);
	};

	const handleDappClick = (dappName: string) => {
		showToast.custom(`Opening ${dappName}...`, "🚀", {
			bg: "rgba(239, 246, 255, 0.9)",
			text: "#2563eb",
			border: "#93c5fd",
		});
	};

	const handleConnectWallet = () => {
		const hasWallet = localStorage.getItem("secrets");
		if (hasWallet) {
			showToast.success("Wallet already connected! 🎉");
		} else {
			showToast.warning(
				"Please create a wallet first in the Wallets section!"
			);
		}
	};
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
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

	const dappCategories = [
		{
			id: 1,
			title: "DeFi",
			description: "Decentralized Finance applications",
			icon: RiExchangeLine,
			count: "240+ dApps",
			color: "bg-green-500",
			apps: ["Uniswap", "Aave", "Compound", "SushiSwap"],
		},
		{
			id: 2,
			title: "NFT Marketplaces",
			description: "Trade and collect digital assets",
			icon: RiNftLine,
			count: "85+ dApps",
			color: "bg-purple-500",
			apps: ["OpenSea", "Blur", "LooksRare", "Magic Eden"],
		},
		{
			id: 3,
			title: "Gaming",
			description: "Web3 games and metaverse",
			icon: RiGamepadLine,
			count: "150+ dApps",
			color: "bg-blue-500",
			apps: [
				"Axie Infinity",
				"The Sandbox",
				"Decentraland",
				"Gods Unchained",
			],
		},
		{
			id: 4,
			title: "Utilities",
			description: "Tools and productivity apps",
			icon: RiApps2Line,
			count: "120+ dApps",
			color: "bg-orange-500",
			apps: ["ENS", "IPFS", "Arweave", "Chainlink"],
		},
	];

	const featuredDapps = [
		{
			name: "Uniswap",
			description: "The largest decentralized exchange",
			category: "DeFi",
			tvl: "$4.2B",
			logo: "🦄",
			trending: true,
		},
		{
			name: "OpenSea",
			description: "Leading NFT marketplace",
			category: "NFT",
			volume: "$1.8B",
			logo: "🌊",
			featured: true,
		},
		{
			name: "Aave",
			description: "Decentralized lending protocol",
			category: "DeFi",
			tvl: "$6.1B",
			logo: "👻",
			trending: true,
		},
		{
			name: "The Sandbox",
			description: "Virtual world and gaming platform",
			category: "Gaming",
			users: "2M+",
			logo: "🏖️",
			featured: true,
		},
	];

	return (
		<section className="min-h-screen bg-linear-to-br from-white via-slate-50 to-gray-100 dark:from-black dark:via-slate-900 dark:to-slate-800 font-vendsans">
			<Navbar />

			<main className="relative">
				{/* Background decorative elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						className="absolute top-32 right-16 w-40 h-40 bg-purple-500/8 rounded-full blur-2xl"
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
						className="absolute bottom-32 left-16 w-56 h-56 bg-blue-400/4 rounded-full blur-2xl"
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
				</div>

				<motion.div
					className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-32"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Header Section */}
					<div className="text-center max-w-4xl mx-auto mb-16">
						<motion.div variants={itemVariants} className="mb-6">
							<span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full border border-purple-200 dark:border-purple-800">
								<HiSparkles className="w-4 h-4" />
								Explore Web3 Applications
							</span>
						</motion.div>

						<motion.h1
							variants={itemVariants}
							className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
						>
							Discover{" "}
							<span className="bg-linear-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
								dApps
							</span>
						</motion.h1>

						<motion.p
							variants={itemVariants}
							className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
						>
							Explore the vast ecosystem of decentralized
							applications. From DeFi protocols to NFT
							marketplaces, gaming platforms to productivity tools
							- discover the future of decentralized internet.
						</motion.p>
					</div>

					{/* Categories Grid */}
					<motion.div variants={itemVariants} className="mb-20">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
							Browse by Category
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{dappCategories.map((category) => (
								<motion.div
									key={category.id}
									whileHover={{ scale: 1.02, y: -5 }}
									onClick={() =>
										handleCategoryClick(category.title)
									}
									className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700 cursor-pointer transition-all duration-300 hover:shadow-xl"
								>
									<div className="flex items-center gap-4 mb-4">
										<div
											className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}
										>
											<category.icon className="w-6 h-6 text-white" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900 dark:text-white">
												{category.title}
											</h3>
											<p className="text-sm text-gray-500 dark:text-gray-400">
												{category.count}
											</p>
										</div>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
										{category.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{category.apps
											.slice(0, 2)
											.map((app) => (
												<span
													key={app}
													className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300"
												>
													{app}
												</span>
											))}
										<span className="text-xs text-gray-500 dark:text-gray-400">
											+{category.apps.length - 2} more
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Featured dApps */}
					<motion.div variants={itemVariants} className="mb-20">
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
							Featured dApps
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{featuredDapps.map((dapp, index) => (
								<motion.div
									key={index}
									whileHover={{ scale: 1.02, y: -5 }}
									onClick={() => handleDappClick(dapp.name)}
									className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700 cursor-pointer transition-all duration-300 hover:shadow-xl"
								>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<span className="text-2xl">
												{dapp.logo}
											</span>
											<div>
												<h3 className="font-semibold text-gray-900 dark:text-white">
													{dapp.name}
												</h3>
												<span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md text-gray-600 dark:text-gray-300">
													{dapp.category}
												</span>
											</div>
										</div>
										{dapp.trending && (
											<RiFireLine className="w-5 h-5 text-orange-500" />
										)}
										{dapp.featured && (
											<RiStarLine className="w-5 h-5 text-yellow-500" />
										)}
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
										{dapp.description}
									</p>
									<div className="flex items-center justify-between">
										<div className="text-sm">
											<span className="text-gray-500 dark:text-gray-400">
												{dapp.tvl
													? "TVL: "
													: dapp.volume
													? "Volume: "
													: "Users: "}
											</span>
											<span className="font-semibold text-gray-900 dark:text-white">
												{dapp.tvl ||
													dapp.volume ||
													dapp.users}
											</span>
										</div>
										<RiArrowRightUpLine className="w-5 h-5 text-gray-400" />
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Call to Action */}
					<motion.div
						variants={itemVariants}
						className="text-center bg-linear-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-purple-200 dark:border-purple-800"
					>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
							Ready to Explore?
						</h2>
						<p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
							Connect your wallet to start interacting with
							thousands of decentralized applications across
							multiple blockchains.
						</p>
						<motion.button
							onClick={handleConnectWallet}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-linear-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
						>
							Connect Wallet
						</motion.button>
					</motion.div>
				</motion.div>
			</main>

			<Footer />
		</section>
	);
}
