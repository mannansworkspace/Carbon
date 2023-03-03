import FixedNumber from '@models/FixedNumber';
import { selectBalanceOf, selectETHAddress, selectIsMetaMaskInstalled, addToken, selectWeb3Provider, Web3ProviderEnums } from '@reducers/web3Slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from 'react';
import BalanceImg from 'assets/images/balance.svg';
import Image from 'next/image';
import Link from 'next/link';
import { TokenInfo } from '@models/SystemInfo';
import styled from 'styled-components';
import MetaMaskImg from '@images/metamask-fox.svg';

const ColoredButton = styled.button`
	border-color: ${(props) => props.color || '#ef9139'};
	color: ${(props) => props.color || '#ef9139'};
	&:not(:disabled) {
		&:hover {
			border-color: ${(props) => props.color || '#ef9139'};
			background-color: ${(props) => props.color || '#ef9139'};
		}
		&:active {
			border-color: ${(props) => props.color || '#ef9139'};
			background-color: ${(props) => props.color || '#ef9139'};
		}
	}
`;

const TokenBalance: FC<{onReceiveClick?:Function , isConnected: boolean; tokenInfo: TokenInfo; disableBuyBtn?: boolean }> = ({onReceiveClick, isConnected, tokenInfo, disableBuyBtn }) => {
	const availableToBurn = useAppSelector(selectBalanceOf(tokenInfo.symbol));
	const isMetaMaskInstalled = useAppSelector(selectIsMetaMaskInstalled);
	const web3ProviderType = useAppSelector(selectWeb3Provider);

	async function addTokenToMetaMask() {
		const ethereum = (window as any).ethereum;
		await addToken(ethereum, tokenInfo);
	}
	return (
		<>
			<div className="list-item">
				<div className="item-data">
					<div className="item-icon">
						<Image src={tokenInfo.logoURI} unoptimized={true} alt="token icon" layout="fill" />
					</div>
					<div className="flex flex-col gap-[2px]">
						<div className="flex items-baseline gap-[6px]">
							<div className="data-number">
								<span>{FixedNumber.formatCompact(availableToBurn.scaleDownValue.toString())}</span>
							</div>
							<div className="data-unit">{tokenInfo.symbol}</div>
							{web3ProviderType === Web3ProviderEnums.METAMASK && isConnected && (
								<button className="add-token" onClick={addTokenToMetaMask}>
									<span className="add-token-text">Add to MetaMask</span>
									<Image src={MetaMaskImg} alt="" height="30" unoptimized={true} />
								</button>
							)}
						</div>
					</div>
				</div>
				<div className="item-actions">
					{
						disableBuyBtn ?
							<button 
								className="ca-primary-btn"
								onClick = {() => onReceiveClick && onReceiveClick()}
								>
								Receive
							</button>
							:

							isMetaMaskInstalled && !disableBuyBtn ? (
								<Link href={`/buy?token=${tokenInfo.symbol}`}>
									<a className="flex flex-col">
										<ColoredButton color={tokenInfo.color} className="ca-primary-btn" disabled={!isConnected || disableBuyBtn}>
											Buy <span className="token-name">{tokenInfo.symbol}</span>
										</ColoredButton>
									</a>
								</Link>
							) : (
								<button className="ca-primary-btn" disabled={!isMetaMaskInstalled || disableBuyBtn}>
									Buy {tokenInfo.symbol}
								</button>
							)}
				</div>
			</div>
		</>
	);
};

export default TokenBalance;
