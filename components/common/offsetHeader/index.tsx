import React, { FC ,Fragment,useState,useEffect} from "react";
import Link from "next/link";
import Modal from 'components/common/Modal';
import Web3ProviderOptions from 'components/common/Web3ProviderOptions';
import Logo from 'assets/images/logo_white.svg';
import WalletImg from 'assets/images/wallet_icon.svg';
import DropDownImg from 'assets/images/dropdown.svg';
import DDReceiveImg from 'assets/images/receive_icon.svg';
import DDHomeImg from 'assets/images/dd_home.svg';
import DDChangeWalletImg from 'assets/images/dd_change_wallet.svg';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Image from 'next/image';
import { formattedAddress } from 'app/utils';
import { Menu, Transition } from '@headlessui/react';
import ReceiveTokenModal from 'components/common/receiveTokenModal';
import SendTokenModal from 'components/offsetPage/sendTokenModal';
import {
	selectWalletConnectionStatus,
	selectETHAddress,
	WalletConnectionStatusEnums,
	DisconnectWalletAsync,
	GetOffsetHistoryAsync,
	selectIsMetaMaskInstalled,
	ReadBalanceOfAllCarbonTokensAsync,
	selectIsWeb2,
	GetWeb2TxHistoryAsync,
} from '@reducers/web3Slice';


const OffsetHeader: FC <{closeReceiveTokenModal:Function,show:boolean}> = ({show,closeReceiveTokenModal})=> {
    const ethAddress = useAppSelector(selectETHAddress);

	const walletConnectionStatus = useAppSelector(selectWalletConnectionStatus);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showSendTokenModal, setShowSendTokenModal] = useState<boolean>(false);
	const isMetaMaskInstalled = useAppSelector(selectIsMetaMaskInstalled);
	const isWeb2 = useAppSelector(selectIsWeb2);
	const dispatch = useAppDispatch();
    useEffect(() => {
		setIsConnected(WalletConnectionStatusEnums.CONNECTED === walletConnectionStatus);
		if (walletConnectionStatus === WalletConnectionStatusEnums.CONNECTED) {
			hideModal();
		}
	}, [walletConnectionStatus]);
    const hideModal = () => {
		setShowModal(false);
	};
	const handleClick = () => {
		setShowModal(true);
	};

	const handleChangeWalletClick = () => {
		dispatch(DisconnectWalletAsync());
		setShowModal(true);
	};

	const handleRefreshClick = () => {
		dispatch(ReadBalanceOfAllCarbonTokensAsync());
		dispatch(GetOffsetHistoryAsync());
		isWeb2 && dispatch(GetWeb2TxHistoryAsync());
	};

	const hideReceiveTokenModal = () => {
		closeReceiveTokenModal(false)
	};

	const handleReceiveClick = () => {
		closeReceiveTokenModal(true)
	};

	const handleSendClick = () => {
		setShowSendTokenModal(true);
	};

	const hideSendTokenModal = () => {
		setShowSendTokenModal(false);
	};


	const showReceiveModalWithDelay = () => {
		setTimeout(() => {
			closeReceiveTokenModal(true)
		}, 500)
	}

	const handleSendModalForWeb2onError = () => {
		setShowSendTokenModal(false);
		showReceiveModalWithDelay()
	}
 
    return (
        <>
         	<header className="page-header">
					<div className="site-logo">
						<Link href="/">
							<a>
								<Image src={Logo} unoptimized={true} alt="Logo" />
								<span className="logo-text">Gaia</span>
							</a>
						</Link>
					</div>
					<div className="flex justify-end items-center gap-[12px]">
						{isConnected ? (
							<>
								<button className="ca-secondary-btn refresh-btn" onClick={handleRefreshClick}>
									Refresh
								</button>
								<Menu as="div" className="relative inline-block text-left ca-dropdown">
									<div>
										<Menu.Button as="button" className="dd-btn">
											<Image src={WalletImg} unoptimized={true} height={24} width={24} alt="" />
											<div>
												<span>{formattedAddress(ethAddress)}</span>
												<Image src={DropDownImg} unoptimized={true} height={24} width={24} alt="" className="arrow-img" />
											</div>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="dd-items">
											<Menu.Item>
												{({ active }) => (
													<Link href="/">
														<a className="dd-item">
															<Image src={DDHomeImg} unoptimized={true} alt="" height={24} width={24} />
															<span>Home</span>
														</a>
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button className="dd-item" onClick={handleChangeWalletClick}>
														<Image src={DDChangeWalletImg} unoptimized={true} alt="" height={24} width={24} />
														<span>Change wallet</span>
													</button>
												)}
											</Menu.Item>
											{isWeb2 && (
												<>
													<Menu.Item>
														{({ active }) => (
															<button className="dd-item receive-option" onClick={handleReceiveClick}>
																<Image src={DDReceiveImg} unoptimized={true} alt="" height={9} width={24} />
																<span>Receive</span>
															</button>
														)}
													</Menu.Item>
													<Menu.Item>
														{({ active }) => (
															<button className="dd-item send-option" onClick={handleSendClick}>
																<Image src={DDReceiveImg} unoptimized={true} alt="" height={9} width={24} />
																<span>Send</span>
															</button>
														)}
													</Menu.Item>
												</>
											)}

											{/* <Menu.Item>
												{({ active }) => (
													<button className="dd-item">
														<Image src={DDDisconnectImg} unoptimized={true} alt="" height={24} width={24} />
														<span>Disconnect</span>
													</button>
												)}
											</Menu.Item> */}
										</Menu.Items>
									</Transition>
								</Menu>
							</>
						) : (
							<>
								<button className="ca-primary-btn" onClick={handleClick} disabled={!isMetaMaskInstalled}>
									Connect your wallet
								</button>
							</>
						)}
						<Modal show={showModal} onClose={hideModal}>
							<Web3ProviderOptions onClose={hideModal} showWeb2Option={true} />
						</Modal>
						<Modal className="receive-token-modal" show={show} onClose={hideReceiveTokenModal}>
							<ReceiveTokenModal onClose={hideReceiveTokenModal} />
						</Modal>
						<Modal className="send-token-modal" show={showSendTokenModal} onClose={hideSendTokenModal}>
							<SendTokenModal
								onClose={hideSendTokenModal}
								handleSendModalForWeb2={handleSendModalForWeb2onError}
							/>
						</Modal>
					</div>
				</header>
        </>
    )

}


export default OffsetHeader