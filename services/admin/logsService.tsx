import { getAdminLogsApi, getAdminBusinessLogs} from "@constants/admConstant";
import { AdminLogs , HttpResponse} from "@models/.";
import { AdminBusinessLogs } from '@models/Admin';
import http from "services/core/HttpService";

export const getAdminLogsService = async (dtFrom : Date , dtTo : Date) : Promise<AdminLogs[]> => {
    try{
        const {data} = await http.post<HttpResponse<AdminLogs[]>>(getAdminLogsApi ,{dtFrom,dtTo})
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

export const getBusinessLogsService = async (dtFrom : Date , dtTo : Date) : Promise<AdminBusinessLogs[]> => {
    try{
        const {data} = await http.post<HttpResponse<AdminBusinessLogs[]>>(getAdminBusinessLogs ,{dtFrom,dtTo})
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}