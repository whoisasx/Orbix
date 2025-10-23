import { MdContentCopy, MdDeleteOutline } from "react-icons/md";
import type { Solana } from "./Solana";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import type { Ethereum } from "./Ethereum";
import type { Bitcoin } from "./Bitcoin";

export const WalletCard = ({
	wallet,
	idx,
}: {
	wallet: Solana | Ethereum | Bitcoin;
	idx: number;
}) => {
	const [watching, setWatching] = useState(false);
	return (
		<div>
			<div>
				<h3>{`Wallet ${idx}`}</h3>
				<div>
					<MdDeleteOutline />
				</div>
			</div>
			<div>
				<div>
					<p>Public Key</p>
					<div>
						<p> {`${wallet.publickey}`} </p>
						<button
							onClick={() => {
								navigator.clipboard.writeText(wallet.publickey);
							}}
						>
							<MdContentCopy />
						</button>
					</div>
				</div>
				<div>
					<p>Private Key</p>
					<div>
						<p>
							{" "}
							{`${
								watching
									? wallet.privatekey
									: "*********************************************"
							}`}{" "}
						</p>
						<button onClick={() => setWatching((prev) => !prev)}>
							{watching ? <IoMdEye /> : <IoMdEyeOff />}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
