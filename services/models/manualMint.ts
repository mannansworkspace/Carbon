export default interface ManualMintForm{
    serialNum: string,
    tokenConfigId: number,
    projectId: number,
    vintageStart: string,
    vintageEnd: string,
    creditType: string,
    amount: number,
    certifications: string,
    parsedVintageStart?: string,
    parsedVintageEnd?: string,
    callId? : number,
    zeroMint? : boolean 
} 
