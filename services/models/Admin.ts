export default interface Admin {
    login: string,
    disabled: boolean,
    registeredAt?: Date,
    privileges: Array<string>
    password? : string
}

export interface AdminSetPass {
    login: string,
    newPassword: string
}
export interface AdminsUpdatePrivillages{
    login : string , 
    privs : Array<string>
}

export interface AdminTransferForm {
    amount: number,
    ethAddress: string,
    buyerInfo: string,
    tokenConfigId : number
}

//Getlist of admins return array of string 
export interface ManageAdmin{
    login : string,
    disabled : boolean
}

export interface AdminTransfer{
    uuid: string,
    status: string,
    txHash: string,
    createdAt: string,
    updatedAt: string,
    amount: number,
    ethAddress: string,
    buyerInfo: string
}

export interface AdminLogs {
    uuid: string,
    dt: string,
    operation: string,
    objId: string,
    info: string,
    actorId: string
}

export interface Tokenization {
    uuid: string,
    updatedAt: string,
    email: string,
    batchId: string,
    status: string,
    statusLabel?:string,
    amount: string,
    tokenConfigId?: number | string,
    tokenName?: string,
    requestId?: string
    id?: number,
}

export interface UpdateTokenization {
    requestId: string,
    status: string,
    tokenConfigId?: string,
}

export interface Exclusions{
    uuid?: string,
    projectId: number,
    vintageStart: string,
    vintageEnd: string
}

export interface AdminBusinessLogs{
    operation: string,
    dt: string,
    actorId: string,
    info: string
}

export interface ForwardMint{
    updatedAt: string,
    configId: number,
    vintageEnd: string,
    txHash: string,
    status: string,
    amount: string,
}