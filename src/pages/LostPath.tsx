import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HiHome, HiArrowLeft } from "react-icons/hi2";
import { TbError404 } from "react-icons/tb";
import { RiSearchLine, RiCompassLine } from "react-icons/ri";

export default function LostPath() {
	const navigate = useNavigate();

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
		hidden: { opacity: 0, y: 30 },
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
					<motion.div
						className="absolute bottom-20 left-20 w-48 h-48 bg-slate-400/3 rounded-full blur-xl"
						animate={{
							x: [0, -18, 25, 0],
							y: [0, 18, -12, 0],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							delay: 5,
						}}
					/>
				</div>

				<motion.div
					className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-20"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="text-center">
						{/* 404 Icon */}
						<motion.div
							className="flex justify-center mb-8"
							animate={{
								y: [0, -10, 0],
								rotate: [0, 5, -5, 0],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
							}}
						>
							<div className="relative">
								<motion.div
									className="w-32 h-32 bg-red-50 dark:bg-red-950/30 rounded-3xl flex items-center justify-center"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									<TbError404 className="w-16 h-16 text-red-500" />
								</motion.div>

								{/* Floating elements around the icon */}
								<motion.div
									className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full opacity-20"
									animate={{
										scale: [1, 1.2, 1],
										opacity: [0.2, 0.4, 0.2],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										delay: 0.5,
									}}
								/>
								<motion.div
									className="absolute -bottom-2 -left-2 w-4 h-4 bg-slate-500 rounded-full opacity-20"
									animate={{
										scale: [1, 1.3, 1],
										opacity: [0.2, 0.5, 0.2],
									}}
									transition={{
										duration: 2.5,
										repeat: Infinity,
										delay: 1,
									}}
								/>
							</div>
						</motion.div>

						{/* Main Heading */}
						<motion.h1
							variants={itemVariants}
							className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6"
						>
							4<span className="text-red-500">0</span>4
						</motion.h1>

						{/* Subheading */}
						<motion.h2
							variants={itemVariants}
							className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
						>
							Oops! You've Lost Your Way
						</motion.h2>

						{/* Description */}
						<motion.p
							variants={itemVariants}
							className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
						>
							The page you're looking for seems to have wandered
							off into the digital void. Don't worry though – even
							the best explorers occasionally take a wrong turn in
							the Web3 universe.
						</motion.p>

						{/* Action Buttons */}
						<motion.div
							variants={itemVariants}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
						>
							<motion.button
								onClick={() => navigate("/")}
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className="group relative w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
							>
								<div className="absolute inset-0 bg-linear-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								<div className="relative flex items-center justify-center gap-3">
									<HiHome className="w-5 h-5" />
									<span>Return Home</span>
								</div>
							</motion.button>

							<motion.button
								onClick={() => navigate(-1)}
								whileHover={{ scale: 1.02, y: -2 }}
								whileTap={{ scale: 0.98 }}
								className="group w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-semibold rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 shadow-sm hover:shadow-md transition-all duration-300"
							>
								<div className="flex items-center justify-center gap-3">
									<HiArrowLeft className="w-5 h-5 group-hover:text-red-500 transition-colors" />
									<span>Go Back</span>
								</div>
							</motion.button>
						</motion.div>

						{/* Help Section */}
						<motion.div
							variants={itemVariants}
							className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
						>
							<div className="group p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 hover:shadow-lg">
								<div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<RiSearchLine className="w-6 h-6 text-red-500" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Search Our Site
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Try searching for what you were looking for,
									or browse our main sections.
								</p>
							</div>

							<div className="group p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-all duration-300 hover:shadow-lg">
								<div className="w-12 h-12 bg-red-50 dark:bg-red-950/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
									<RiCompassLine className="w-6 h-6 text-red-500" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Explore Orbix
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									Discover our wallet features and DApp
									ecosystem to get back on track.
								</p>
							</div>
						</motion.div>

						{/* Fun Message */}
						<motion.div
							variants={itemVariants}
							className="mt-16 p-6 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30"
						>
							<p className="text-red-600 dark:text-red-400 text-sm italic">
								"Not all who wander are lost, but this page
								definitely is." 📍
							</p>
						</motion.div>
					</div>
				</motion.div>
			</main>

			<Footer />
		</section>
	);
}
