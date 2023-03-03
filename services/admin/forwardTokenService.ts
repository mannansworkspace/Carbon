import {getForwardTokenUpdatesList, getForwardTokenListApi, getUpsertTokenStateApi, upsertForwardTokenApi, getTransferForwardTokensApi, transferForwardTokenApi, transferStateForwardTokenApi } from "@constants/admConstant";
import {  HttpResponse, ForwardTokenInterface, UpserTokenResponseInterface, ForwardTransferTokenInterface } from "@models/.";
import {getFwTokensRatesApi} from '@constants/constants';
import http from "services/core/HttpService";
import { getFwTokenRatesInterface } from "@models/TransferForwardToken";

export const getForwardTokenListService = async (): Promise<Array<ForwardTokenInterface>> => {
    try {
        const { data } = await http.get<HttpResponse<Array<ForwardTokenInterface>>>(`${getForwardTokenListApi}`)
        return Promise.resolve(data.result)
    }
    catch (error) {
        return Promise.resolve(null!)
    }
}

export const getForwardTokenUpdatesListService = async (): Promise<Array<UpserTokenResponseInterface>> => {
    try {
        const { data } = await http.get<HttpResponse<Array<UpserTokenResponseInterface>>>(`${getForwardTokenUpdatesList}`)
        return Promise.resolve(data.result)
    }
    catch (error) {
        return Promise.resolve(null!)
    }
}

export const upsertForwardTokenService = async (token: any): Promise<UpserTokenResponseInterface> => {
    try {
        const { data } = await http.post<HttpResponse<UpserTokenResponseInterface>>(upsertForwardTokenApi, token)
        return Promise.resolve(data.result)

    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getUpsertTokenStateService = async (id:string) : Promise<string> => {
    try {
        const { data } = await http.get<HttpResponse<string>>(`${getUpsertTokenStateApi}?uuid=${id}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}


export const getTransferForwardTokenStateService = async (id:string) : Promise<string> => {
    try {
        const { data } = await http.get<HttpResponse<string>>(`${transferStateForwardTokenApi}?uuid=${id}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getTransferForwardTokensService = async () : Promise<ForwardTransferTokenInterface[]> => {
    try {
        const { data } = await http.get<HttpResponse<ForwardTransferTokenInterface[]>>(getTransferForwardTokensApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const transferForwardTokenService = async (token: any): Promise<ForwardTransferTokenInterface> => {
    try {
        const { data } = await http.post<HttpResponse<ForwardTransferTokenInterface>>(transferForwardTokenApi, token)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}
export const getFwTokensRates= async (): Promise<getFwTokenRatesInterface[]> => {
    try {
        const { data } = await http.get<HttpResponse<getFwTokenRatesInterface[]>>(getFwTokensRatesApi)
        console.log("data",data)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}