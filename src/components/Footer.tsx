import { motion } from "motion/react";
import { FiHeart } from "react-icons/fi";
import { RiGithubLine, RiTwitterXLine, RiLinkedinLine } from "react-icons/ri";

export const Footer = () => {
	return (
		<footer className="border-t border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					{/* Left Section - Brand and Description */}
					<div className="flex flex-col items-center md:items-start gap-2">
						<div className="flex items-center gap-2">
							<span className="text-gray-600 dark:text-gray-400 text-sm">
								Designed & Developed with
							</span>
							<FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
							<span className="text-gray-600 dark:text-gray-400 text-sm">
								by{" "}
								<span className="font-semibold text-gray-900 dark:text-white">
									Adil
								</span>
							</span>
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-left">
							Building the future of Web3 wallets
						</p>
					</div>

					{/* Right Section - Social Links */}
					<div className="flex items-center gap-4">
						<span className="text-xs text-gray-500 dark:text-gray-500 hidden sm:block">
							Connect with us:
						</span>
						<div className="flex items-center gap-3">
							<motion.a
								href="https://github.com/whoisasx/Orbix"
								whileHover={{ scale: 1.1, y: -2 }}
								whileTap={{ scale: 0.9 }}
								className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
								aria-label="GitHub"
							>
								<RiGithubLine className="w-4 h-4" />
							</motion.a>
							<motion.a
								href="https://x.com/whoisasx"
								whileHover={{ scale: 1.1, y: -2 }}
								whileTap={{ scale: 0.9 }}
								className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
								aria-label="Twitter"
							>
								<RiTwitterXLine className="w-4 h-4" />
							</motion.a>
							<motion.a
								href="https://www.linkedin.com/in/adilshaikh4064/"
								whileHover={{ scale: 1.1, y: -2 }}
								whileTap={{ scale: 0.9 }}
								className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200"
								aria-label="LinkedIn"
							>
								<RiLinkedinLine className="w-4 h-4" />
							</motion.a>
						</div>
					</div>
				</div>

				{/* Bottom Section - Copyright */}
				<div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
						<p className="text-xs text-gray-500 dark:text-gray-500 text-center sm:text-left">
							© 2025 Orbix. All rights reserved.
						</p>
						<div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-500">
							<a
								href="#"
								className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							>
								Privacy Policy
							</a>
							<a
								href="#"
								className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							>
								Terms of Service
							</a>
							<a
								href="#"
								className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
							>
								Support
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
