import { TransactionStatusEnum } from '@constants/constants'

export interface TransferForwardTokenInterface {
    id: number;
    projectId: string;
    amount:string;
    address: string;
    info: string;
} 

export interface ForwardTransferTokenInterface {
    uuid: string;
    status: TransactionStatusEnum;
    txHash: string;
    createdAt: Date;
    updatedAt: Date;
    configId: number;
    amount: number;
    ethAddress: string
}

export interface TokenRate {
    configId: number,
    name: string,
    rate: number
}

export interface getFwTokenRatesInterface {
    configId: number,
    name: string,
    rates: TokenRate[],
    vintageEnd: Date
  }