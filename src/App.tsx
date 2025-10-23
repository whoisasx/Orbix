import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Wallets from "./pages/Wallets";
import Dapps from "./pages/Dapps";
import LostPath from "./pages/LostPath";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="wallets" element={<Wallets />} />
				<Route path="dapps" element={<Dapps />} />
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
