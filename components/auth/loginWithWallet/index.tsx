import { selectSystemInfo } from '@reducers/appSlice';
import { LoginWithWalletAction } from '@reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FC } from 'react';
import { requestSignLogin } from 'services/authService';
import web3Service from 'services/core/Web3Service';

const LoginWithWallet: FC<any> = () => {
	const { chainId } = useAppSelector(selectSystemInfo);
	const dispatch = useAppDispatch();

	const handleLoginWithWalletBtnClick = async () => {
		const ethAddress = await getEthAccount();
		const challenge = ethAddress && (await getLoginChallenge(ethAddress));
		const signature = challenge && (await web3Service.signData(challenge, chainId));
		signature && dispatch(LoginWithWalletAction(challenge, signature));
	};

	const getEthAccount = async (): Promise<string> => {
		if (web3Service.isMetaMaskSupported()) {
			try {
				return web3Service.getAccount();
			} catch (error: any) {
				console.log('failed to get ethAccount => ', error);
				return '';
			}
		} else {
			web3Service.dispatchMetaMaskNotFoundEvent();
			return '';
		}
	};

	const getLoginChallenge = async (ethAddress: string): Promise<string> => {
		try {
			return requestSignLogin(ethAddress);
		} catch (error: any) {
			console.log('failed to get site login challenge => ', error);
			return '';
		}
	};

	return (
		<button className="app-btn" style={{ width: '100%' }} onClick={handleLoginWithWalletBtnClick}>
			Login with Wallet
		</button>
	);
};

export default LoginWithWallet;
