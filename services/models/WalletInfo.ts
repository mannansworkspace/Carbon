export interface WalletInfo {
    ethAddr: string;
    balances: { [key: string]: number };
    ethBalance: number;
}