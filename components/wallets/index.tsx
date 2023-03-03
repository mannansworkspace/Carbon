import { TransactionStatusEnum } from '@constants/constants';
import { getWalletListAsync, selectSystemInfo, selectWalletList } from '@reducers/appSlice';
import { setError } from '@reducers/errorSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FC, useEffect, useState } from 'react';
import { bindWallet, getWalletList, requestBindChallenge, unbindWallet } from 'services/appService';
import web3Service from 'services/core/Web3Service';

enum WalletStates {
	WALLET_LIST = 'normal',
	BIND_WALLET = 'bindWallet',
	UNBIND_WALLET = 'unbindWallet',
}

const Wallets: FC<any> = () => {
	const [transactionStatus, setTransactionStatus] = useState(TransactionStatusEnum.NONE);
	const [activeState, setActiveState] = useState(WalletStates.WALLET_LIST);
	const [isMetaMaskSupported, setIsMetaMaskSupported] = useState(false);
	const [ethAddress, setEthAddress] = useState('');
	const [selectedWalletAccount, setSelectedWalletAccount] = useState('');
	const [bindChallenge, setBindChallenge] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const walletList = useAppSelector(selectWalletList);
	const { chainId } = useAppSelector(selectSystemInfo);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getWalletListAsync());
	}, []);

	const handleBindWalletClick = async () => {
		setTransactionStatus(TransactionStatusEnum.PROCESSING);
		if (web3Service.isMetaMaskSupported()) {
			setIsMetaMaskSupported(true);
			try {
				console.log(this);
				const address = await web3Service.getAccount();
				setEthAddress(address);
				setActiveState(WalletStates.BIND_WALLET);
				setTransactionStatus(TransactionStatusEnum.NONE);
			} catch (error: any) {
				setTransactionStatus(TransactionStatusEnum.ERROR);
				console.log('failed to get ethAccount => ', error);
			}
		} else {
			setTransactionStatus(TransactionStatusEnum.ERROR);
			setIsMetaMaskSupported(false);
			web3Service.dispatchMetaMaskNotFoundEvent();
		}
	};

	const handleContinueClick = () => {
		if (activeState === WalletStates.BIND_WALLET) {
			bindWalletToAccount();
		} else if (activeState === WalletStates.UNBIND_WALLET) {
			unbindWalletFromAccount();
		}
	};

	const bindWalletToAccount = async () => {
		if (!ethAddress) {
			return;
		}
		try {
			setTransactionStatus(TransactionStatusEnum.PROCESSING);
			const bindChallenge = await requestBindChallenge(ethAddress.toLowerCase());
			setBindChallenge(bindChallenge);
			console.log('bindChallenge => ', bindChallenge);
			const signedData = await web3Service.signData(bindChallenge, chainId);
			const result = await bindWallet(bindChallenge, signedData, userPassword);
			dispatch(
				setError({ error: 'Wallet binding completed', errorMessage: `Your wallet <strong><code>${ethAddress}</code></strong> has been successfully bound to your account.`, isError: false })
			);
			setUserPassword('');
			dispatch(getWalletListAsync());
			console.log(result);
			setTransactionStatus(TransactionStatusEnum.COMPLETED);
			setActiveState(WalletStates.WALLET_LIST);
		} catch (error: any) {
			setTransactionStatus(TransactionStatusEnum.ERROR);
			console.log('failed to bind wallet => ', error);
			if (error.hasOwnProperty('code')) {
				web3Service.dispatchMetaMaskError(error);
			}
		}
	};

	const handleUnbindClick = async (walletAddress: string) => {
		setSelectedWalletAccount(walletAddress);
		setActiveState(WalletStates.UNBIND_WALLET);
	};

	const unbindWalletFromAccount = async () => {
		try {
			const result = await unbindWallet(selectedWalletAccount, userPassword);
			dispatch(
				setError({
					error: 'Wallet unbinding completed',
					errorMessage: `Your wallet <strong><code>${selectWalletList}</code></strong> has been successfully unbound from your account.`,
					isError: false,
				})
			);
			setUserPassword('');
			dispatch(getWalletListAsync());
			console.log(result);
			setTransactionStatus(TransactionStatusEnum.COMPLETED);
			setActiveState(WalletStates.WALLET_LIST);
		} catch (error: any) {
			console.log('failed to unbind wallet => ', error);
		}
	};

	return (
		<div className="content">
			<div id="comments">
				<h2
					style={{
						margin: '0 0 20px 0',
						fontSize: '1.4rem',
						lineHeight: 'normal',
						fontWeight: 'normal',
						textTransform: 'capitalize',
					}}
				>
					Wallets
				</h2>
				<div className="page-body">
					<ul className="three_quarter wallet-list">
						{walletList && walletList.length ? (
							walletList.map((wallet) => (
								<li key={wallet.ethAddress} className="flex items-center justify-between">
									<span>
										<strong>
											<code>{wallet.ethAddress}</code>
										</strong>
									</span>
									<button className="app-btn list-item-btn" onClick={() => handleUnbindClick(wallet.ethAddress)}>
										Unbind
									</button>
								</li>
							))
						) : (
							<>
								<p>No Wallets Found.</p>
								<p>Click on Bind Wallet button to bind your wallet to your account.</p>
							</>
						)}
					</ul>
					{(activeState === WalletStates.BIND_WALLET || activeState === WalletStates.WALLET_LIST) && (
						<div className="one_third first flex items-center justify-between btmspace-20">
							<button className="app-btn" disabled={transactionStatus === TransactionStatusEnum.PROCESSING} onClick={handleBindWalletClick}>
								Bind Wallet
							</button>
						</div>
					)}
					{(activeState === WalletStates.BIND_WALLET || activeState === WalletStates.UNBIND_WALLET) && (
						<div className="three_quarter first btmspace-30">
							{activeState === WalletStates.BIND_WALLET && (
								<label className="name">
									You are going to bind this wallet
									<strong>
										<code> {ethAddress} </code>
									</strong>
									to your account, please enter the password to continue.
								</label>
							)}
							{activeState === WalletStates.UNBIND_WALLET && (
								<label className="name">
									You are going to unbind this wallet
									<strong>
										<code> {selectedWalletAccount} </code>
									</strong>
									to your account, please enter the password to continue.
								</label>
							)}
							<div className="three_quarter first flex items-center justify-between">
								<input className="rgtspace-5" type="password" name="password" autoComplete='current-password' onInput={(e: any) => setUserPassword(e.target.value)} placeholder="Enter password" />
								<button className="app-btn" disabled={!userPassword || !userPassword.length || transactionStatus === TransactionStatusEnum.PROCESSING} onClick={handleContinueClick}>
									Continue
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Wallets;
