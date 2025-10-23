import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdGridView } from "react-icons/md";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { WalletCard } from "./WalletCard";

export interface Solana {
	publickey: string;
	privatekey: string;
}

export const Solana = () => {
	const [solanas, setSolanas] = useState<Solana[]>([]);

	const [warning, setWarning] = useState(false);

	useEffect(() => {
		const localSolanas = localStorage.getItem("solanas");
		if (!localSolanas) return;

		setSolanas(JSON.parse(localSolanas));
	}, []);

	const handleAddWallet = () => {
		const len = solanas.length;
		const path = `m/44'/501'/${len}'/0'`;
		const mnemonic = localStorage.getItem("secrets");

		const seed = mnemonicToSeedSync(mnemonic!);
		const derivedSeed = derivePath(path, seed.toString("hex")).key;
		const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

		const kp = Keypair.fromSecretKey(secret);
		const publicKey = new PublicKey(kp.publicKey).toBase58();
		const privateKey = bs58.encode(kp.secretKey);

		const newEntry: Solana = {
			publickey: publicKey,
			privatekey: privateKey,
		};
		const updated = [...solanas, newEntry];

		setSolanas(updated);
		localStorage.setItem("solanas", JSON.stringify(updated));
	};

	const handleClearWallets = () => {
		localStorage.removeItem("solanas");
		setSolanas([]);
		setWarning(false);
	};

	return (
		<section className="relative">
			{solanas.length === 0 ? (
				<div>
					<button onClick={handleAddWallet}>create wallet</button>
				</div>
			) : (
				<div>
					<div>
						<h1>Solana Wallet</h1>
						<div>
							<div>
								<MdGridView />
								<IoMenu />
							</div>
							<div>
								<button onClick={handleAddWallet}>
									add wallet
								</button>
								<button onClick={() => setWarning(true)}>
									clear wallets
								</button>
							</div>
							<div>
								{solanas.map((solana, idx) => (
									<div key={idx}>
										<WalletCard wallet={solana} idx={idx} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}

			{warning && (
				<div className="absolut inset-0 z-50">
					<div>
						<p>it will delete all the wallets</p>
						<div>
							<button onClick={() => setWarning(false)}>
								cancel
							</button>
							<button onClick={handleClearWallets}>delete</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};
