import { ConnectToAWalletAsync, selectWalletConnectionStatus, selectWeb3Provider, WalletConnectionStatusEnums, Web3ProviderEnums, selectIsMetaMaskInstalled } from '@reducers/web3Slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FC, useEffect, useState } from 'react';
import Modal from '../Modal';
import Image from 'next/image';
import MetaMaskImg from '@images/metamask-fox.svg';
import LoaderImg from '@images/loader.png';
import TwitterImg from '@images/twitter.svg';
import WalletConnectImg from '@images/walletconnect-logo.svg';
const Web3ProviderOptions: FC<{ onClose: () => void; onProviderChange?: (provider: Web3ProviderEnums) => void; showWeb2Option?: boolean }> = (props) => {
	const dispatch = useAppDispatch();
	const walletConnectionStatus = useAppSelector(selectWalletConnectionStatus);
	const web3ProviderType = useAppSelector(selectWeb3Provider);
	const [isConnecting, setIsConnecting] = useState<boolean>(false);
	const isMetaMaskInstalled = useAppSelector(selectIsMetaMaskInstalled);
	useEffect(() => {
		setIsConnecting(walletConnectionStatus === WalletConnectionStatusEnums.CONNECTING);
		if (walletConnectionStatus === WalletConnectionStatusEnums.ERROR) {
			if (!isMetaMaskInstalled) {
				props.onClose();
			}
		}
	}, [walletConnectionStatus]);

	const handleBtnClick = (provider: Web3ProviderEnums) => {
		if (props.onProviderChange) {
			props.onProviderChange(provider);
		} else {
			dispatch(ConnectToAWalletAsync(provider));
		}
	};
	return (
		<div className="wallet-options">
			<Modal.Header title="Connect wallet" showCloseBtn={true} onClose={props.onClose}></Modal.Header>
			<Modal.Body>
				<div className="flex flex-col gap-[24px]">
					{/* MetaMask Button */}
					<button
						className={`ca-btn wallet-btn ${isConnecting && web3ProviderType === Web3ProviderEnums.METAMASK && 'active'}`}
						disabled={isConnecting}
						onClick={() => {
							handleBtnClick(Web3ProviderEnums.METAMASK);
						}}
					>
						{isConnecting && (
							<div className="loader">
								<Image src={LoaderImg} alt="" unoptimized={true} />
							</div>
						)}
						<span className="btn-text">MetaMask</span>
						<Image src={MetaMaskImg} alt="" height="30" unoptimized={true} />
					</button>
					{/* WalletConnect Button */}
					<button
						className={`ca-btn wallet-btn ${isConnecting && web3ProviderType === Web3ProviderEnums.WALLET_CONNECT && 'active'}`}
						disabled={isConnecting}
						onClick={() => {
							handleBtnClick(Web3ProviderEnums.WALLET_CONNECT);
						}}
					>
						{isConnecting && (
							<div className="loader">
								<Image src={LoaderImg} alt="" unoptimized={true} />
							</div>
						)}
						<span className="btn-text">Wallet Connect</span>
						<Image src={WalletConnectImg} alt="" width="30" height="30" unoptimized={true} />
					</button>
					{/* Web2 Button */}
					{props.showWeb2Option && (
						<button
							className={`ca-btn wallet-btn ${isConnecting && web3ProviderType === Web3ProviderEnums.WEB2 && 'active'}`}
							disabled={isConnecting}
							onClick={() => {
								handleBtnClick(Web3ProviderEnums.WEB2);
							}}
						>
							{isConnecting && (
								<div className="loader">
									<Image src={LoaderImg} alt="" unoptimized={true} />
								</div>
							)}
							<span className="btn-text">Web2</span>
							<Image src={TwitterImg} alt="" width="30" height="30" unoptimized={true} />
						</button>
					)}
				</div>
			</Modal.Body>
		</div>
	);
};

export default Web3ProviderOptions;
