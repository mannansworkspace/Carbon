import { addProjectApi, getProjectListApi, getProjectStateApi } from "@constants/admConstant";
import { HttpResponse, ProjectForm, ProjectInterface } from "@models/.";
import http from "services/core/HttpService";

export const addProjectService = async (project : ProjectForm) : Promise<string> =>{
    try{
        const {data} = await http.post<HttpResponse<string>>(addProjectApi , project)
        console.log("Response to add Product : ", data.result)
        return Promise.resolve(data.result)
    }catch(error){
        return  Promise.resolve(null!)
    }
}

export const getProjectListService = async () : Promise<Array<ProjectInterface>> =>{
    try{
        const {data} = await http.get<HttpResponse<Array<ProjectInterface>>>(getProjectListApi)
        console.log("Response to get Project list : ", data.result)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}

export const getProjectStateService = async (id : string)  : Promise<string> =>{
    try{
        const {data} = await http.get<HttpResponse<string>>(`${getProjectStateApi}?opid=${id}`)
        console.log("response for project state : ", data.result)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}