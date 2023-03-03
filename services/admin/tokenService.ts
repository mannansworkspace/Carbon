import {getForwardTokenUpdatesList, addUpdateAdminTokenApi, getAdminTokenConfigListApi, getDeployTokenIdApi, getDeployTokenStatusApi, getForwardTokenListApi, getListDeployTokensApi, getTokenDeploymentDetailsApi, getUpsertTokenStateApi, upsertForwardTokenApi, getTransferForwardTokensApi, transferForwardTokenApi } from "@constants/admConstant";
import { getCertContractApi, getContractApi, getTokenizationRequestsApi, tokenizationFormApi } from "@constants/constants";
import { DeployToken, HttpResponse, Token, TokenizationRequestInterface, TokenizationFormInterface, ForwardTokenInterface, UpserTokenResponseInterface, ForwardTransferTokenInterface } from "@models/.";
import http from "services/core/HttpService";
import fileDownload from "js-file-download";

export const getListTokenConfigService = async (): Promise<Token[]> => {
    try {
        const { data } = await http.get<HttpResponse<Token[]>>(getAdminTokenConfigListApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const addUpdateAdminTokenService = async (token: Token): Promise<Token> => {
    try {
        const { data } = await http.post(addUpdateAdminTokenApi, token)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getDeployTokenIdService = async (token: Token): Promise<string> => {
    try {
        const { data } = await http.post(getDeployTokenIdApi, token)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getDeployTokenStatusService = async (status: string): Promise<string> => {
    try {
        const { data } = await http.get(`${getDeployTokenStatusApi}/?opid=${status}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getTokenDeploymentDetailsService = async (id: string): Promise<string> => {
    try {
        const { data } = await http.post(`${getTokenDeploymentDetailsApi}/?opid=${id}`)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getDeployTokenListService = async (): Promise<DeployToken[]> => {
    try {
        const { data } = await http.get<HttpResponse<DeployToken[]>>(getListDeployTokensApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getTokenizationRequestsService = async (): Promise<TokenizationRequestInterface[]> => {
    try {
        const { data } = await http.get<HttpResponse<TokenizationRequestInterface[]>>(getTokenizationRequestsApi)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const tokenizationFormService = async (body: TokenizationFormInterface): Promise<string> => {
    try {
        const { data } = await http.post<HttpResponse<string>>(tokenizationFormApi, body)
        return Promise.resolve(data.result)
    } catch (error) {
        return Promise.resolve(null!)
    }
}

export const getContractService = async (id: string) => {
    try {
        const { data } = await http.get(`${getContractApi}/${id}`, { responseType: 'blob', })
        fileDownload(data, "Contract.pdf")
    }
    catch (error) {
        return Promise.resolve(null!)
    }
}

export const getCertContractService = async (id: string) => {
    try {
        const { data } = await http.get(`${getCertContractApi}/${id}`, { responseType: 'blob', })
        fileDownload(data, "Contract-Certificate.pdf")
    }
    catch (error) {
        return Promise.resolve(null!)
    }
}

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