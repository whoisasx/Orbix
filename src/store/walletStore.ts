import { create } from "zustand";

type walletType = "sol" | "eth" | "bit";
interface walletStore {
	wallet: walletType;
	setWallet: (wallet: walletType) => void;
}

export const useWalletStore = create<walletStore>()((set) => ({
	wallet: "sol",
	setWallet: (wallet: walletType) => {
		set({ wallet: wallet });
	},
}));
