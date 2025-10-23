import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdGridView } from "react-icons/md";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { WalletCard } from "./WalletCard";

export interface Bitcoin {
	publickey: string;
	privatekey: string;
}

export const Bitcoin = () => {
	const [bitcoins, setBitcoins] = useState<Bitcoin[]>([]);

	const [warning, setWarning] = useState(false);

	useEffect(() => {
		const localBitcoins = localStorage.getItem("bitcoins");
		if (!localBitcoins) return;

		setBitcoins(JSON.parse(localBitcoins));
	}, []);

	const handleAddWallet = () => {
		const len = bitcoins.length;
		const path = `m/44'/0'/${len}'/0'`;
		const mnemonic = localStorage.getItem("secrets");

		const seed = mnemonicToSeedSync(mnemonic!);
		const derivedSeed = derivePath(path, seed.toString("hex")).key;
		const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

		const kp = Keypair.fromSecretKey(secret);
		const publicKey = new PublicKey(kp.publicKey).toBase58();
		const privateKey = bs58.encode(kp.secretKey);

		const newEntry: Bitcoin = {
			publickey: publicKey,
			privatekey: privateKey,
		};
		const updated = [...bitcoins, newEntry];

		setBitcoins(updated);
		localStorage.setItem("bitcoins", JSON.stringify(updated));
	};

	const handleClearWallets = () => {
		localStorage.removeItem("bitcoins");
		setBitcoins([]);
		setWarning(false);
	};

	return (
		<section className="relative">
			{bitcoins.length === 0 ? (
				<div>
					<button onClick={handleAddWallet}>create wallet</button>
				</div>
			) : (
				<div>
					<div>
						<h1>Bitcoin Wallet</h1>
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
								{bitcoins.map((bitcoin, idx) => (
									<div key={idx}>
										<WalletCard
											wallet={bitcoin}
											idx={idx}
										/>
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
