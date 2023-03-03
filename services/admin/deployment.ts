import { getDeploymentInfoApi } from "@constants/admConstant";
import { DeploymentInfo ,HttpResponse} from "@models/.";
import http from "services/core/HttpService";

export const getDeploymentInfoService = async() : Promise<DeploymentInfo> =>{
    try{
        const {data} = await http.post<HttpResponse<DeploymentInfo>>(getDeploymentInfoApi)
        return Promise.resolve(data.result)
    }catch(error){
        return Promise.resolve(null!)
    }
}