interface SystemInfo {
    chainId: number;
    "rheage.registry.address": string;
    "registration.enabled": boolean;
    "walletconnect.project.id": string;
    "chain.maxBlockRequest": number;
    "carbon.tokens": TokenInfo[];
    "uniswap.tokens": TokenInfo[];
    "all.tokens": TokenInfo[];
    "min.send.amount": string;
}

export default SystemInfo;

export interface TokenInfo {
    address: string;
    chainId: number;
    decimals: number;
    logoURI: string;
    name: string;
    symbol: string;
    tokenId?: number;
    color?: string;
}