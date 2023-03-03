export default interface MintInterface{
      uuid: string,
      status: string,
      txHash: string,
      createdAt: string,
      updatedAt: string,
      serialNum: string,
      tokenConfigId: number,
      snBlockStart: number,
      snBlockEnd: number,
      projectId: number,
      vintageStart: string,
      vintageEnd: string,
      creditType: string,
      certifications: string,
      amount: number,
      callId : number,
      zeroMint :boolean
}