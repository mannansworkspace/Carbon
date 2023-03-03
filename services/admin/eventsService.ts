import { cancleRetirementApi, listOffsetsApi, listRetirementEventsApi, resolveRetirementApi } from "@constants/admConstant";
import {HttpResponse, RetirementEvent ,OffsetHistory} from "@models/.";
import http from "services/core/HttpService";

export const listRetirementEventsService = async (dtFrom : Date , dtTo : Date ,tokenConfigId : number) : Promise<RetirementEvent[]> =>{
    try{
        const {data} = await http.post<HttpResponse<RetirementEvent[]>>(listRetirementEventsApi , {
            dtFrom,
            dtTo,
            tokenConfigId
        })
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}


export const listBurnEventsService = async (dtFrom: Date, dtTo: Date , tokenConfigId : number): Promise<OffsetHistory[]> => {
    try {
        const { data } = await http.post<HttpResponse<OffsetHistory[]>>(listOffsetsApi, { dtFrom, dtTo ,tokenConfigId})
        return Promise.resolve(data.result)
    } catch (error) {
        console.log("Error : ", error)
        return Promise.resolve(null!)
    }
}


export const resolveRetirementService = async (uuid : string)  : Promise<RetirementEvent> => {
    try{
        const { data } = await http.post<HttpResponse<RetirementEvent>>(resolveRetirementApi, {uuid})
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

export const cancleRetirementService = async (uuid : string)  : Promise<RetirementEvent> => {
    try{
        const { data } = await http.post<HttpResponse<RetirementEvent>>(cancleRetirementApi, {uuid})
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}