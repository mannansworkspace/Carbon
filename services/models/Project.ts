export default interface  projectInterface{
  uuid: string,
  status: string,
  txHash: string,
  createdAt: string,
  updatedAt: string,
  projId: number,
  name: string,
  projectType: string,
  callId : number,
  protocols : string,
  country: string,
}
export interface ProjectForm{
projId: number,
callId: number,
name: string,
projectType: string,
country: string,
protocols: string
}