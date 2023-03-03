import {  transferForwardTokenApi, getListTransferApi, transferApi, getTransferStateApi} from "@constants/admConstant";
import { HttpResponse , AdminTransfer , AdminTransferForm, ForwardTransferTokenInterface } from "@models/.";
import http from "../core/HttpService";


export const getListTransferService = async(tokenConfigId :number) : Promise<Array<AdminTransfer>> =>{
    try{
        const {data} = await http.get<HttpResponse<Array<AdminTransfer>>>(`${getListTransferApi}?tokenConfigId=${tokenConfigId}`)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

export const addTransferService = async (transferForm : AdminTransferForm) : Promise<string>=>{
    try{
        const {data} = await http.post<HttpResponse<string>>(transferApi ,  transferForm)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
} 

export const getTransferStateService =  async(transferId : string) : Promise<string> =>{
    try{
        const {data} = await http.get<HttpResponse<string>>(  `${getTransferStateApi}?transferId=${transferId}`)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

