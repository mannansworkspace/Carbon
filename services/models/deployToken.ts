export default interface deployTokenInterface{
    uuid: string,
    status: string,
    txHash: string,
    createdAt: string,
    updatedAt: string,
    name?: string,
    tokenConfigId : number
}