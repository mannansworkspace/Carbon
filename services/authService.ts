import { loginApi, logoutApi, captchaApi, requestSignLoginApi, sendVerificationCodeApi, signLoginApi, signupApi, verifyVerificationCodeApi, whoamiApi, contactUsApi } from "./constants/constants"
import http from "./core/HttpService"
import { User, HttpResponse, LoginInterface , ContactUsForm } from "@models/."
import { verificationInterface } from "@models/verificationCode"
import AppConfig from "AppConfig.json";

export const authLoginService = async (credentials: LoginInterface): Promise<User> => {
    try {
        const { data } = await http.post<HttpResponse<User>>(loginApi, credentials)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const authLogoutService = async (): Promise<User> => {
    try {
        const { data } = await http.post<HttpResponse<User>>(logoutApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const authSingupService = async (credentials: User): Promise<User> => {
    try {
        const { data } = await http.post<HttpResponse<User>>(signupApi, credentials)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }

}

export const sendVerificationCodeService = async (email: string): Promise<boolean> => {
    try {
        await http.post<HttpResponse<User>>(sendVerificationCodeApi, { email: email })
        return Promise.resolve(true)
    } catch (error) {
        return Promise.resolve(false)
    }
}

export const verifyVerificationCodeService = async (credentials: verificationInterface): Promise<boolean> => {
    try {
        await http.post<HttpResponse<User>>(verifyVerificationCodeApi, credentials)
        return Promise.resolve(true)
    } catch (error) {
        return Promise.resolve(false)
    }
}

export const whoamiService = async (): Promise<User> => {
    try {
        const { data } = await http.get<HttpResponse<User>>(whoamiApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const requestSignLogin = async (ethAddr: string): Promise<string> => {
    try {
        const { data } = await http.post<HttpResponse<string>>(requestSignLoginApi, { ethAddr })
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const signLogin = async (challenge: string, signature: string): Promise<User> => {
    try {
        const { data } = await http.post<HttpResponse<User>>(signLoginApi, { challenge, signature })
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

const getBase64 = async (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
          const base64data = reader.result;   
          resolve(base64data as string);
        }
    });
}

export const loadCaptchaAction = async (): Promise<string> => {
    try {
        const data = await fetch(`${AppConfig.API_URL}${captchaApi}`, { credentials: 'include' });
        const blob = await data.blob();
        
        const base64 = await getBase64(blob)
        return Promise.resolve(base64)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const submitContactUsFormService = async (contactUsForm : ContactUsForm): Promise<boolean> => {
    try {
        await http.post<HttpResponse>(contactUsApi , contactUsForm, { withCredentials: true })
        
        return Promise.resolve(true)
    } catch (error) {
        return Promise.resolve(false)
    }
}