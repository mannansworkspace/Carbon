import { ErrorMessage, ErrorTypeEnums, MetaMaskError } from "@models/Errors";
import { setError } from "@reducers/errorSlice";
import store from "app/store";
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import appConfig from "../../AppConfig.json";
import IGaiaToken from '../../assets/abi/IGaiaToken.json';
import IGaiaRegistry from '../../assets/abi/IGaiaRegistry.json';
import IGaiaRegistryMain from '../../assets/abi/IGaiaRegistryMain.json';
import { bufferToHex, fromRpcSig, intToHex } from 'ethereumjs-util';
import { setIsMetaMaskInstalled } from "@reducers/web3Slice";
import { BlockInfoInterface } from "@models/blockInfo";
import http from "./HttpService";
import { getBlockInfoApi } from "@constants/constants";

declare const window: any;
class Web3Service {
    public currentWeb3Provider!: Web3;
    public web3!: Web3;
    constructor() {
        if (this.isBrowser && typeof window.ethereum !== 'undefined') {
            this.web3 = new Web3(window.ethereum);
        } else {
            console.log("Please install metamask");
        }
    }
    isBrowser = typeof window !== "undefined";
    
    isMetaMaskSupported = () => {
        const isSupported = this.isBrowser && typeof window.ethereum !== 'undefined';
        if(store && !!store.dispatch) {
            store.dispatch(setIsMetaMaskInstalled(isSupported));
        }
        return isSupported;
    }

    async getAccount(): Promise<string> {
        if (!this.isMetaMaskSupported()) {
            this.dispatchMetaMaskNotFoundEvent();
            return Promise.reject('Please install MetaMask.');
        }
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log(accounts);
            return Promise.resolve(accounts[0]);
        } catch (error: any) {
            console.log('Failed to get accounts');
            this.dispatchMetaMaskError(error);
            return Promise.reject(error);
        };
    }

    async getChainId(): Promise<number> {
        if (!this.isMetaMaskSupported()) {
            this.dispatchMetaMaskNotFoundEvent();
            return Promise.reject('Please install MetaMask.');
        }
        try {
            const chainId = await window.ethereum.request({ method: "eth_chainId" });
            return Promise.resolve(parseInt(chainId));
        } catch (error: any) {
            console.log('Failed to get chainId from Metamask');
            this.dispatchMetaMaskError(error);
            return Promise.reject(error);
        };
    }

    getGaiaTokenAbi = () => {
        return IGaiaToken.abi;
    }

    getGaiaRegistryAbi = () => {
        return IGaiaRegistry.abi;
    }

    getGaiaRegistryMainAbi = () => {
        return IGaiaRegistryMain.abi;
    }

    getSmartContractByAbi = (abi: any, address: string): Promise<Contract> => {
        try {
            const contract = new this.web3.eth.Contract(abi, address);
            return Promise.resolve(contract);
        } catch (error: any) {
            if (!this.isMetaMaskSupported()) {
                this.dispatchMetaMaskNotFoundEvent();
            } else {
                this.dispatchMetaMaskError(error);
                console.log('Error while loading smart contract => ', error);
            }
            return Promise.reject('Error while loading smart contract');
        }
    }

    async signData(dataToSign: string, chainId: number): Promise<string> {
        try {
            let domain = [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" }
            ]

            let authMessage = [
                { "name": 'content', "type": 'string' },
            ]

            let domainData = {
                name: "Rhea.Ge",
                version: "0.1",
                chainId
            }

            let message = {
                content: dataToSign
            }

            let eip712TypedData = {
                types: {
                    EIP712Domain: domain,
                    AuthMessage: authMessage
                },
                primaryType: "AuthMessage",
                domain: domainData,
                message: message
            }
            let data = JSON.stringify(eip712TypedData)
            const signer = await this.getAccount();
            const signedData = await window.ethereum.request({
                method: 'eth_signTypedData_v4',
                params: [signer, data],
                from: signer
            })
            console.log('signData => ', { signer, dataToSign, signedData });
            return Promise.resolve(this.getSignatureAsVRS(signedData));
        } catch (error: any) {
            this.dispatchMetaMaskError(error);
            console.log(error);
            return Promise.reject(error);
        }
    }

    getSignatureAsVRS = (signedData: string): string => {
        const sig = fromRpcSig(signedData);
        const v = intToHex(sig.v).slice(2);
        const r = bufferToHex(sig.r).slice(2);
        const s = bufferToHex(sig.s).slice(2);

        const signature = `${v}.${r}.${s}`.toUpperCase();
        console.log('signature => ', signature);
        return signature;
    }

    dispatchMetaMaskError(error: MetaMaskError): void {
        if (typeof error === 'string') {
            store.dispatch(setError({ error: error, isError: true }));
        } else if (typeof error === 'object') {
            store.dispatch(setError({ error: `MetaMask Error [${error.code}]`, errorMessage: error.message, isError: true }));
        }
    }

    dispatchMetaMaskNotFoundEvent(): void {
        store.dispatch(setIsMetaMaskInstalled(false));
        store.dispatch(setError({ error: 'MetaMask not found.', isError: true, errorType: ErrorTypeEnums.METAMASK_NOT_FOUND_ERROR }));
    }

    getBlockInfoService = async () : Promise<BlockInfoInterface> =>{
        try{
            const {data} = await http.get(getBlockInfoApi)
            return Promise.resolve(data.result)
        }catch(error){
            return Promise.resolve(null!)
        }
    }
}

const web3Service = new Web3Service();
export default web3Service;