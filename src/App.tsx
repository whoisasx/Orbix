import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Home from "./pages/Home";
import Wallets from "./pages/Wallets";
import Dapps from "./pages/Dapps";
import LostPath from "./pages/LostPath";
import SolanaWallet from "./pages/SolanaWallet";

// Temporary placeholder components for wallet dashboards
const WalletPlaceholder = ({
	title,
	color,
}: {
	title: string;
	color: string;
}) => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md">
				<h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
					{title} Dashboard
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Coming Soon! This feature is under development.
				</p>
				<button
					onClick={() => navigate("/wallets")}
					className={`px-6 py-3 ${color} text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium`}
				>
					Back to Wallets
				</button>
			</div>
		</div>
	);
};

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="wallets" element={<Wallets />} />
				<Route path="dapps" element={<Dapps />} />
				<Route path="solana/:address" element={<SolanaWallet />} />
				{/* TODO: Create dedicated EthereumWallet and BitcoinWallet components */}
				<Route
					path="ethereum/:address"
					element={
						<WalletPlaceholder
							title="Ethereum Wallet"
							color="bg-blue-500"
						/>
					}
				/>
				<Route
					path="bitcoin/:address"
					element={
						<WalletPlaceholder
							title="Bitcoin Wallet"
							color="bg-orange-500"
						/>
					}
				/>
				<Route path="*" element={<LostPath />} />
			</Routes>
			<Toaster
				position="bottom-right"
				gutter={8}
				containerStyle={{
					bottom: 20,
					right: 20,
				}}
				toastOptions={{
					duration: 2500,
					style: {
						fontSize: "14px",
						fontWeight: "500",
						padding: "12px 16px",
						borderRadius: "12px",
						maxWidth: "400px",
						backdropFilter: "blur(8px)",
						boxShadow:
							"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
					},
				}}
				reverseOrder={false}
			/>
		</>
	);
}

export default App;
