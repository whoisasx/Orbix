// Solana Dashboard Data Types

export interface PerformanceSample {
	slot: number;
	numTransactions: number;
	samplePeriodSecs: number;
}

export interface VoteAccount {
	votePubkey: string;
	nodePubkey: string;
	activatedStake: number;
	epochCredits: [number, number, number][];
	commission: number;
	lastVote: number;
	epochVoteAccount: boolean;
	rootSlot: number;
}

export interface VoteAccountsResult {
	current: VoteAccount[];
	delinquent: VoteAccount[];
}

export interface EpochInfo {
	absoluteSlot: number;
	blockHeight: number;
	epoch: number;
	slotIndex: number;
	slotsInEpoch: number;
	transactionCount: number;
}

export interface SupplyInfo {
	total: number;
	circulating: number;
	nonCirculating: number;
	nonCirculatingAccounts: string[];
}

export interface BlockInfo {
	blockhash: string;
	previousBlockhash: string;
	parentSlot: number;
	transactions: any[];
	rewards: any[];
	blockTime: number;
}

export interface LeaderSchedule {
	[validatorPubkey: string]: number[];
}

export interface InflationRate {
	total: number;
	validator: number;
	foundation: number;
	epoch: number;
}

export interface SolanaMetrics {
	tps: number;
	averageBlockTime: number;
	blockHeight: number;
	currentSlot: number;
	activeValidators: number;
	delinquentValidators: number;
	totalStakedSol: number;
	epochInfo: EpochInfo;
	epochProgress: number;
	currentLeader?: string;
	nextLeader?: string;
	recentBlocks: BlockInfo[];
	averageTransactionsPerBlock: number;
	averageFeePerTx: number;
	totalSupply: number;
	circulatingSupply: number;
	inflationRate: number;
	networkUptime: number;
	solPrice: number;
	defiTvl: number;
	recentTransactionVolume: number;
	stakeDistribution: ValidatorStakeInfo[];
}

export interface ValidatorStakeInfo {
	pubkey: string;
	stake: number;
	percentage: number;
	commission: number;
	uptime: number;
}

export interface ChartDataPoint {
	timestamp: number;
	value: number;
	label?: string;
}

export interface DashboardState {
	metrics: SolanaMetrics | null;
	loading: boolean;
	error: string | null;
	lastUpdated: number;
}

// External API types
export interface CoinGeckoPrice {
	solana: {
		usd: number;
	};
}

export interface DeFiLlamaResponse {
	tvl: number;
}

// Chart configuration types
export interface ChartConfig {
	type: "line" | "bar" | "donut" | "progress";
	data: ChartDataPoint[];
	color: string;
	title: string;
	unit?: string;
	refreshInterval?: number;
}

// Dashboard configuration
export interface DashboardConfig {
	refreshIntervals: {
		realTime: number; // 3-5s
		semiRealTime: number; // 30s-1m
		monetary: number; // 5-10m
	};
	rpcEndpoint: string;
	apiKeys: {
		alchemy?: string;
		helius?: string;
	};
}
