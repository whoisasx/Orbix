import { PiWallet } from "react-icons/pi";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigate } from "react-router";

export default function Home() {
	const navigate = useNavigate();
	return (
		<section className="font-vendsans">
			<Navbar />
			<main>
				<div>
					<h1>Your world of crypto, in one wallet.</h1>
					<p>
						Orbix is a next-generation Web3 wallet designed for
						simplicity, security, and control. Manage your crypto,
						NFTs, and digital identity — all in one beautifully
						unified experience. With Orbix, your assets truly
						revolve around you.
					</p>
				</div>
				<div>
					<button onClick={() => navigate("/wallets")}>
						<div>
							<PiWallet />
							<span>Launch your HD Wallet</span>
						</div>
					</button>
					<button onClick={() => navigate("/dapps")}>
						<div>
							<CiLocationArrow1 />
							<span>Launch DApp</span>
						</div>
					</button>
				</div>
			</main>
			<Footer />
		</section>
	);
}
