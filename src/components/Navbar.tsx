import { IoMoonSharp } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { TbHexagonMinusFilled } from "react-icons/tb";
import { useThemeStore } from "../store/themeStore";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export const Navbar = () => {
	const { theme, setTheme } = useThemeStore();
	const navigate = useNavigate();

	return (
		<nav className="sticky top-0 z-50 w-full h-20 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full h-full flex items-center gap-2 sm:gap-0 justify-between">
				{/* Logo Section */}
				<motion.div
					className="flex items-center gap-3 cursor-pointer"
					onClick={() => navigate("/")}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
						<TbHexagonMinusFilled className="w-6 h-6 text-white" />
					</div>
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white hidden min-[480px]:block">
						Orbix
					</h1>
				</motion.div>

				{/* Navigation Items */}
				<div className="flex items-center gap-6">
					{/* Navigation Links */}
					<div className="hidden md:flex items-center gap-1">
						<motion.button
							onClick={() => navigate("/wallets")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
						>
							Wallets
						</motion.button>
						<motion.button
							onClick={() => navigate("/dapps")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
						>
							DApps
						</motion.button>
					</div>

					{/* Theme Toggle */}
					<motion.button
						onClick={() =>
							setTheme(theme === "dark" ? "light" : "dark")
						}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="relative p-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 overflow-hidden"
						aria-label="Toggle theme"
					>
						<motion.div
							key={theme}
							initial={{ rotate: -180, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 180, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="relative z-10"
						>
							{theme === "light" ? (
								<IoMoonSharp className="w-5 h-5" />
							) : (
								<LuSun className="w-5 h-5" />
							)}
						</motion.div>

						{/* Background animation */}
						<motion.div
							className="absolute inset-0 bg-linear-to-r from-yellow-400/20 to-orange-400/20 rounded-xl"
							initial={{ scale: 0, opacity: 0 }}
							animate={
								theme === "light"
									? { scale: 1, opacity: 1 }
									: { scale: 0, opacity: 0 }
							}
							transition={{ duration: 0.3 }}
						/>
						<motion.div
							className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-400/20 rounded-xl"
							initial={{ scale: 0, opacity: 0 }}
							animate={
								theme === "dark"
									? { scale: 1, opacity: 1 }
									: { scale: 0, opacity: 0 }
							}
							transition={{ duration: 0.3 }}
						/>
					</motion.button>

					{/* Mobile Menu (Navigation Links for small screens) */}
					<div className="md:hidden flex items-center gap-0.5 sm:gap-2">
						<motion.button
							onClick={() => navigate("/wallets")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
						>
							Wallets
						</motion.button>
						<motion.button
							onClick={() => navigate("/dapps")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
						>
							DApps
						</motion.button>
					</div>
				</div>
			</div>
		</nav>
	);
};
