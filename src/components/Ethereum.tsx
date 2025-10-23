import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdGridView } from "react-icons/md";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { WalletCard } from "./WalletCard";

export interface Ethereum {
	publickey: string;
	privatekey: string;
}

export const Ethereum = () => {
	const [ethereums, setEthereums] = useState<Ethereum[]>([]);

	const [warning, setWarning] = useState(false);

	useEffect(() => {
		const localEthereums = localStorage.getItem("ethereums");
		if (!localEthereums) return;

		setEthereums(JSON.parse(localEthereums));
	}, []);

	const handleAddWallet = () => {
		const len = ethereums.length;
		const path = `m/44'/60'/${len}'/0'`;
		const mnemonic = localStorage.getItem("secrets");

		const seed = mnemonicToSeedSync(mnemonic!);
		const derivedSeed = derivePath(path, seed.toString("hex")).key;
		const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

		const kp = Keypair.fromSecretKey(secret);
		const publicKey = new PublicKey(kp.publicKey).toBase58();
		const privateKey = bs58.encode(kp.secretKey);

		const newEntry: Ethereum = {
			publickey: publicKey,
			privatekey: privateKey,
		};
		const updated = [...ethereums, newEntry];

		setEthereums(updated);
		localStorage.setItem("ethereums", JSON.stringify(updated));
	};

	const handleClearWallets = () => {
		localStorage.removeItem("ethereums");
		setEthereums([]);
		setWarning(false);
	};

	return (
		<section className="relative">
			{ethereums.length === 0 ? (
				<div>
					<button onClick={handleAddWallet}>create wallet</button>
				</div>
			) : (
				<div>
					<div>
						<h1>Ethereum Wallet</h1>
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
								{ethereums.map((ethereum, idx) => (
									<div key={idx}>
										<WalletCard
											wallet={ethereum}
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
