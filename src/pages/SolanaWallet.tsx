import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "../utils/toast";
import {
	Keypair,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import type { Solana } from "../components/Solana";

interface WalletData {
	address: any;
	balance: any;
	tokenBalance: any;
	transaction: any;
	network: any;
}

export default function SolanaWallet() {
	const { address } = useParams();

	const navigate = useNavigate();
	const [datafetched, setDatafetched] = useState(false);
	const [isAirdropped, setIsAirdropped] = useState(false);
	const [walletData, setWalletData] = useState<WalletData | null>(null);

	const [reciever, setReciever] = useState("");
	const [amount, setAmount] = useState("");
	const [isAmountError, setIsAmountError] = useState(false);
	const [secret, setSecret] = useState("");

	useEffect(() => {
		const apiKey = "2qBzn9AIjY7lcSlbvri1k";
		const rpcUrl = `https://solana-devnet.g.alchemy.com/v2/${apiKey}`;
		const pubkey = address;

		const localSolanas = localStorage.getItem("solanas");
		const solanas = JSON.parse(localSolanas || "[]") as Solana[];

		const keypairs =
			solanas.find((solana) => solana.publickey === address) ?? null;
		if (keypairs === null) {
			showToast.error("Invalid address.");
			navigate("/wallets");
			return;
		} else setSecret((keypairs as any).privateKey);

		(async () => {
			try {
				await axios.post(
					rpcUrl,
					{
						jsonrpc: "2.0",
						id: 1,
						method: "requestAirdrop",
						params: [pubkey, 1e9],
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				showToast.success("successfully airdroped for local test.");
				setIsAirdropped(true);
			} catch (error) {
				console.log(
					"Error: ",
					error instanceof Error ? error.message : "unknown error"
				);
				showToast.error("error doing airdropping.");
				navigate("/wallets");
			}
		})();
	}, [address]);

	useEffect(() => {
		if (!isAirdropped) return;

		(async function getWalletData() {
			const apiKey = "2qBzn9AIjY7lcSlbvri1k";
			const rpcUrl = `https://solana-devnet.g.alchemy.com/v2/${apiKey}`;
			const pubkey = address;

			try {
				const balanceResponse = await axios.post(
					rpcUrl,
					{
						jsonrpc: "2.0",
						id: 1,
						method: "getBalance",
						params: [pubkey],
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const tokenBalanceResponse = await axios.post(
					rpcUrl,
					{
						jsonrpc: "2.0",
						id: 1,
						method: "getTokenAccountsByOwner",
						params: [
							pubkey,
							{
								programId:
									"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", // standard SPL Token Program ID
							},
						],
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const transactionsResponse = await axios.post(
					rpcUrl,
					{
						jsonrpc: "2.0",
						id: 1,
						method: "getSignaturesForAddress",
						params: [pubkey],
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const slotReq = { jsonrpc: "2.0", id: 1, method: "getSlot" };
				const epochReq = {
					jsonrpc: "2.0",
					id: 2,
					method: "getEpochInfo",
				};

				const [slotRes, epochRes] = await Promise.all([
					axios.post(rpcUrl, slotReq),
					axios.post(rpcUrl, epochReq),
				]);

				setWalletData({
					address,
					balance: balanceResponse.data.result.value,
					tokenBalance: tokenBalanceResponse.data.result.value,
					transaction: transactionsResponse.data.result,
					network: {
						slot: slotRes.data.result,
						epoch: epochRes.data.result.epoch,
						cluster: "devnet",
					},
				});
				setDatafetched(true);
			} catch (error) {
				console.error(
					"Error: ",
					error instanceof Error ? error.message : "unknown error"
				);
				showToast.error("error while getting data.please reload!");
			}
		})();
	}, [isAirdropped]);

	useEffect(() => {
		let timeoutId = null;
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			if (Number(amount) * 1e9 > walletData?.balance)
				setIsAmountError(true);
			else setIsAmountError(false);
		}, 300);
	}, [amount]);

	const handleSendAmount = async () => {
		const apiKey = "2qBzn9AIjY7lcSlbvri1k";
		const rpcUrl = `https://solana-devnet.g.alchemy.com/v2/${apiKey}`;
		const pubkey = address;

		const tx = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: new PublicKey(address as string),
				toPubkey: new PublicKey(reciever as string),
				lamports: Number(amount) * 1e9,
			})
		);

		try {
			const response = await axios.post(
				rpcUrl,
				{
					jsonrpc: "2.0",
					id: 1,
					method: "getLatestBlockhash",
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const blockhash = response.data.result.value.blockhash;

			tx.recentBlockhash = blockhash;
			tx.feePayer = new PublicKey(address!);
			tx.sign(Keypair.fromSecretKey(Buffer.from(secret)));
			const serialised = tx.serialize().toString("base64");

			const { data } = await axios.post(rpcUrl, {
				jsonrpc: "2.0",
				id: 1,
				method: "sendTransaction",
				params: [serialised],
			});
			console.log("data: ", data.result);
		} catch (error) {}
	};

	return !datafetched ? (
		<>loading skeleton</>
	) : (
		<div>
			<p>solana wallet dashboard</p>
			<section>
				<div>
					wallet data:
					<p>{JSON.stringify(walletData)}</p>
				</div>{" "}
				{/*
                    1. add send and recieve button.
                    2. onclick send , show sendmodel and then let the button disabled for the amount.length===0 or the amount>balance
                    
                 */}
			</section>
		</div>
	);
}
