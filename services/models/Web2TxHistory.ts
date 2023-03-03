interface Web2TxHistory {
    uuid: string;
    status: string;
    txHash: string;
    createdAt: Date;
    updatedAt: Date;
    opType: string;
    userUuid: string;
    ethAddr: string;
    tokenConfigId: number;
    amount: string;
    transferToAddr: string;
    fillUuid: string;
    blockNum: number;
    addTxHashesJson: string;
}

export default Web2TxHistory;