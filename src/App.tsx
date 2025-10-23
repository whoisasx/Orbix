import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Wallets from "./pages/Wallets";
import Dapps from "./pages/Dapps";
import LostPath from "./pages/LostPath";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="wallets" element={<Wallets />} />
			<Route path="dapps" element={<Dapps />} />
			<Route path="*" element={<LostPath />} />
		</Routes>
	);
}

export default App;
