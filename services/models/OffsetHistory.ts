interface OffsetHistory {
    txHash: string;
    blockNumber: number;
    dt: number;
    ethAddr: string;
    offsetAmount: number;
    tokenConfigId: number;
}

export default OffsetHistory;