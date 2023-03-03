import { changePasswordApi, generateRawEthApi, loginApi, logoutApi, whoAmIApi } from "@constants/admConstant";
import { HttpResponse, AdminLoginInterface, ChangePassword, Admin } from "@models/.";
import http from "../core/HttpService";

export const loginService = async (credentials: AdminLoginInterface): Promise<Admin> => {
    try {
        const { data } = await http.post<HttpResponse<Admin>>(loginApi, credentials)
        return Promise.resolve(data.result)
    } catch (error) {
        console.log("Error : ", error)
        return Promise.resolve(null!)
    }
}

export const logoutService = async (): Promise<boolean> => {
    try {
        await http.post<HttpResponse>(logoutApi)
        return Promise.resolve(true)
    } catch (error) {
        console.log("Error : ", error)
        return Promise.resolve(false)
    }
}


export const whoAmIService = async (): Promise<Admin> => {
    try {
        const { data } = await http.get<HttpResponse<Admin>>(whoAmIApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }

}


export const generateRawETHService = async() : Promise<void> =>{
    try{
        await http.get(generateRawEthApi)
    }catch(error){
        console.log("error : ", error )
    }
}

export const changePasswordService = async (credentials : ChangePassword) : Promise<boolean> => {
    try{
        await http.post(changePasswordApi , credentials)
        return Promise.resolve(true)
    }catch(error){
        return Promise.resolve(false)
    }
} 