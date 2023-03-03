import { addAdminApi, getAdminsListApi, getPrivillagesApi, setAdminPrivilagesApi, setAdminsDisableFlagApi, setPassApi } from "@constants/admConstant";
import { Admin,HttpResponse ,ManageAdmin ,AdminsUpdatePrivillages, AdminSetPass} from "@models/.";
import http from "services/core/HttpService";

export const addAdminService = async (newAdmin : Admin ) : Promise<boolean> =>{
    try{
        await http.post<HttpResponse<Admin>>(addAdminApi , newAdmin)
        return Promise.resolve(true)
    }catch(error){
        return Promise.resolve(false)
    }
}

export const setPasswordService = async (newPass : AdminSetPass ) : Promise<boolean> =>{
    try{
        await http.post<HttpResponse<Admin>>(setPassApi , newPass)
        return Promise.resolve(true)
    }catch(error){
        return Promise.resolve(false)
    }
}

export const getAdminsListService = async () : Promise<Admin[]> =>{
    try{
        const {data} = await http.get<HttpResponse<Admin[]>>(getAdminsListApi)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
} 

export const setAdminsDisableFlagservice = async (admin : ManageAdmin) : Promise<Admin> =>{
    try{
        const {data} = await http.post<HttpResponse<Admin>>(setAdminsDisableFlagApi , admin)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
} 

export const setAdminPrivilagesService = async (admin : AdminsUpdatePrivillages) : Promise<Admin> =>{
    try{
        const {data} = await http.post<HttpResponse<Admin>>(setAdminPrivilagesApi , admin)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
} 

export const getPrivillagesService = async () : Promise<[string]> =>{
    try{
        const {data} = await http.get<HttpResponse<[string]>>(getPrivillagesApi)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
} 
