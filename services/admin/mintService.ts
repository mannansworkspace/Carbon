import { mintListsApi, verraMintApi, verraMintStateApi, listTokenizationRequests, updateTokenizationRequestStatusApi,
deleteExclusionApi, addExclusionApi, getForwardMintApi, addForwardMintApi, getMintStateApi } from "@constants/admConstant";
import { HttpResponse, ManualMintForm , MintInterface } from "@models/.";
import { Tokenization, UpdateTokenization, Exclusions } from "@models/Admin";
import http from "../core/HttpService";
import { addManualMintApi, 
    getManualMintstateApi,
    getExclusionsApi } from "@constants/admConstant";

export const mintListsService = async (tokenConfigId : number): Promise<Array<MintInterface>> => {

    try {
        const { data } = await http.get<HttpResponse<Array<MintInterface>>>(`${mintListsApi}?tokenConfigId=${tokenConfigId}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve([])
    }

}

export const addVerraMintService = async (batchId: string ,tokenConfigId : number): Promise<string> => {
    try {
        const {data} = await http.post<HttpResponse<string>>(verraMintApi , {serialNum : batchId,tokenConfigId})
        return data.result
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getVerraMintStateService = async (mintId : string) : Promise<string> => {
    try{
        const {data} = await http.get<HttpResponse<string>>(`${verraMintStateApi}?mintId=${mintId}`)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
} 

export const addManualMintService = async (manualMint : ManualMintForm ) : Promise<string> =>{
    try{    
        const {data} = await http.post<HttpResponse<string>>(addManualMintApi,manualMint)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

export const getManualMintStateService = async  (mintId : string) : Promise<string> =>{
    try{    
        const {data} = await http.get<HttpResponse<string>>(`${getManualMintstateApi}?mintId=${mintId}`)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

export const getTokenizationTableService = async(): Promise<Array<Tokenization>> => {
    try{    
        const {data} = await http.post<HttpResponse<Array<Tokenization>>>(`${listTokenizationRequests}`)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }    
}

export const updateTokenizationService =async (params:UpdateTokenization): Promise<UpdateTokenization> => {
      try{    
        const {data} = await http.post<HttpResponse<UpdateTokenization>>(`${updateTokenizationRequestStatusApi}`, params)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }  
}

export const getExclusions =async (): Promise<Array<Exclusions>> => {
      try{    
        const {data} = await http.get<HttpResponse<Array<Exclusions>>>(`${getExclusionsApi}`)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }  
}
export const deleteExclusion =async (params: {id: string}): Promise<string | null> => {
    try{    
        const {data} = await http.post<HttpResponse<string | null>>(`${deleteExclusionApi}?id=${params.id}`)
        return Promise.resolve(data.errorMessage)
    }catch(error){
        return Promise.resolve(undefined!)
    }  
}

export const addExclusionService =async (params: any): Promise<any> => {
      try{    
        const {data} = await http.post<HttpResponse<any>>(`${addExclusionApi}`, params)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }  
}

export const getForwardMint = async() => {
    try {
        const {data} = await http.get<HttpResponse<any>>(`${getForwardMintApi}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null)
    }
}

export const addForwardMint = async(params: any) => {
    try {
        const {data} = await http.post<HttpResponse<any>>(`${addForwardMintApi}`, params)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null)
    }
}

export const getMintState = async(id: string) => {
    try {
        const {data} = await http.get<HttpResponse<any>>(`${getMintStateApi}?uuid=${id}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null)
    }
}