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
import toast, { Toaster } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Wallets() {
	const [secrets, setSecrets] = useState<string[]>([]);
	const { wallet, setWallet } = useWalletStore();

	const [firstSecrets, setfirstSecrets] = useState<string[]>([]);
	const [firstMnemonic, setFirstMnemonic] = useState("");
	const [seed, setSeed] = useState("");
	const [inputData, setInputData] = useState("");

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
		setSeed(Buffer.from(seed).toString("base64"));
	}, []);

	useEffect(() => {
		const mnemonic = generateMnemonic();
		const secrets = mnemonic.split(" ");
		setFirstMnemonic(mnemonic);
		setfirstSecrets(secrets);
	}, []);

	const handleConnectWallet = () => {
		let secret = firstMnemonic;
		if (inputData.length > 0) {
			let tempSecret = inputData.trim().toLocaleLowerCase();
			if (!validateMnemonic(tempSecret)) {
				toast.error("invalid phrase", {
					position: "bottom-right",
				});
				setInputData("");
				return;
			}
			secret = tempSecret;
			setInputData("");
		}
		localStorage.setItem("secrets", secret);
		setSecrets(secret.split(" "));

		const seed = mnemonicToSeedSync(secret);
		setSeed(Buffer.from(seed).toString("base64"));
	};

	const [clicked, setClicked] = useState(false);

	return (
		<main>
			<div>
				<Toaster />
			</div>
			<Navbar />
			<section>
				{secrets.length === 0 && (
					<div>
						<h3>
							Generate a secure hierarchical deterministic wallet
							with a 12-word mnemonic phrase. Keep your seed
							phrase safe - it's the only way to recover your
							wallet.
						</h3>
						<div>
							<div className="relative group">
								<div className="absolute inset-0 z-10 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-200 pointer-events-none"></div>
								<div className="grid grid-cols-3 ">
									{firstSecrets.map((secret, idx) => (
										<p key={idx} className="">
											{secret}
										</p>
									))}
								</div>
							</div>
							<p>
								<button
									onClick={() => {
										navigator.clipboard.writeText(
											firstMnemonic
										);
									}}
								>
									<div>
										<span>click to copy</span>{" "}
										<MdContentCopy />
									</div>
								</button>
							</p>
							<div> or </div>
							<div>
								<input
									id="input-data"
									type="text"
									placeholder="enter your secret phrase"
									value={inputData}
									onChange={(e) =>
										setInputData(e.target.value)
									}
								/>
							</div>
							<button
								className="border"
								onClick={handleConnectWallet}
							>
								Connect to wallet
							</button>
						</div>
					</div>
				)}
				{secrets.length > 0 && (
					<section>
						<div>
							<div>
								<p>Wallet Credentials</p>
								{clicked && (
									<button
										onClick={() =>
											setClicked((prev) => !prev)
										}
									>
										<IoIosArrowUp />
									</button>
								)}
								{!clicked && (
									<button
										onClick={() =>
											setClicked((prev) => !prev)
										}
									>
										<IoIosArrowDown />
									</button>
								)}
							</div>
							<div className="grid grid-cols-3">
								{secrets.map((secret, idx) => (
									<p key={idx}> {secret} </p>
								))}
							</div>
							<div>
								<p>{seed}</p>
								<button>
									<span>copy</span> <MdContentCopy />
								</button>
							</div>
						</div>
						<div>
							<button onClick={() => setWallet("sol")}>
								<div>
									<SiSolana />
									<span> Solana</span>
								</div>
							</button>
							<button onClick={() => setWallet("eth")}>
								<div>
									<FaEthereum />
									<span>Ethereum</span>
								</div>
							</button>
							<button onClick={() => setWallet("bit")}>
								<div>
									<FaBitcoin />
									<span>Bitcoin</span>
								</div>
							</button>
						</div>
						{wallet === "sol" && <Solana />}
						{wallet === "eth" && <Ethereum />}
						{wallet === "bit" && <Bitcoin />}
					</section>
				)}
			</section>
			<Footer />
		</main>
	);
}
