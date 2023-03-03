import SystemInfo from "@models/SystemInfo";
import http from "./core/HttpService"
import { HttpResponse, OffsetHistory, Wallet } from "./models";
import { bindWalletApi, getWeb2TxHistoryApi, offsetHistoryApi, requestBindChallengeApi, requestRetireStatusApi, retireApi, systemInfoApi, transferTokenApi, twitterLoginApi, unbindWalletApi, walletInfoApi, walletListApi } from "./constants/constants"
import { WalletInfo } from "@models/WalletInfo";

export const getSystemInfo = async (): Promise<SystemInfo> => {
    try {
        const response = await http.get<HttpResponse<SystemInfo>>(systemInfoApi);
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}
export const requestBindChallenge = async (ethAddress: string): Promise<string> => {
    try {
        const response = await http.post<HttpResponse<string>>(requestBindChallengeApi, { ethAddress });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const bindWallet = async (challenge: string, signature: string, password: string): Promise<any> => {
    try {
        const response = await http.post<HttpResponse<any>>(bindWalletApi, { challenge, signature, password });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const unbindWallet = async (ethAddress: string, password: string): Promise<any> => {
    try {
        const response = await http.post<HttpResponse<any>>(unbindWalletApi, { ethAddress, password });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getWalletList = async (): Promise<Wallet[]> => {
    try {
        const response = await http.get<HttpResponse<Wallet[]>>(walletListApi);
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getOffsetHistory = async (ethAddress: string): Promise<OffsetHistory[]> => {
    try {
        const response = await http.get<HttpResponse<OffsetHistory[]>>(offsetHistoryApi, { params: { ethAddress } });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const twitterLogin = async (): Promise<string> => {
    try {
        const response = await http.post<HttpResponse<string>>(twitterLoginApi);
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getWeb2WalletInfo = async (): Promise<WalletInfo> => {
    try {
        const response = await http.get<HttpResponse<WalletInfo>>(walletInfoApi);
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const retireWeb2 = async (toBeRetired: string, tokenConfigId: number, captcha: string): Promise<string> => {
    try {
        const response = await http.post<HttpResponse<any>>(retireApi, { toBeRetired, tokenConfigId, captcha });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const requestRetireStatus = async (id: string): Promise<any> => {
    try {
        const response = await http.get<HttpResponse<any>>(requestRetireStatusApi, { params: { id } });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const transferToken = async (toAddr: string, amount: string, tokenConfigId: number, captcha: string): Promise<string> => {
    try {
        const response = await http.post<HttpResponse<any>>(transferTokenApi, { toAddr, amount, tokenConfigId, captcha });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getWeb2TxHistory = async (dtFrom: Date, dtTo: Date): Promise<any> => {
    try {
        const response = await http.post<HttpResponse<any>>(getWeb2TxHistoryApi, { dtFrom, dtTo });
        return Promise.resolve(response.data.result);
    } catch (error) {
        return Promise.reject(error);
    }
}