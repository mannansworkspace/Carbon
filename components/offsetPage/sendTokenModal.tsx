import Modal from 'components/common/Modal';
import { ChangeEvent, FC, FocusEvent, Fragment, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import UpArrowImg from 'assets/images/up_arrow_white.svg';
import DropDownImg from 'assets/images/dropdown_white.svg';
import LoaderImg from '@images/loader.png';
import retryImg from '@images/retry.png';
import {
	selectBalanceOfActiveOffsetToken,
	BurnTokenAsync,
	selectActiveOffsetTokenInfo,
	selectBurnTransactionStatus,
	setBurnTransactionStatus,
	setActiveOffsetToken,
	selectIsWeb2,
	TransferTokenAsync,
} from '@reducers/web3Slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import FixedNumber from '@models/FixedNumber';
import { getNumberValue } from 'utils/whitespace.number';
import { TransactionStatusEnum } from '@constants/constants';
import { selectSystemInfo } from '@reducers/appSlice';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { TokenInfo } from '@models/SystemInfo';
import { LoadCaptchaAction, selectCaptchaError, seletcCaptchaImg, setCaptchaError } from '@reducers/authSlice';
import { isValidAddress } from 'ethereumjs-util';

interface Props{
	onClose: () => void,
	handleSendModalForWeb2? : Function
}
const SendTokenModal: FC<Props> = (props) => {

	const {
		onClose,
		handleSendModalForWeb2
	} = props

	const transactionStatus = useAppSelector(selectBurnTransactionStatus);
	const { 'carbon.tokens': carbonTokens, 'min.send.amount': minSendAmount } = useAppSelector(selectSystemInfo);
	const offsetTokenInfo = useAppSelector(selectActiveOffsetTokenInfo);
	const availableToBurn = useAppSelector(selectBalanceOfActiveOffsetToken);
	const [sendToAddress, setSendToAddress] = useState('');
	const [isAddressError, setIsAddressError] = useState(false);
	const [transferAmount, setTransferAmount] = useState(new FixedNumber(''));
	const systemInfo = useAppSelector(selectSystemInfo);
	const captchaImg = useAppSelector(seletcCaptchaImg);
	const isCaptchaError = useAppSelector(selectCaptchaError);
	const isWeb2 = useAppSelector(selectIsWeb2);
	const [captchaText, setCaptchaText] = useState('');
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(LoadCaptchaAction());
		dispatch(setCaptchaError(false));
		return () => {
			setTimeout(() => {
				dispatch(setActiveOffsetToken(carbonTokens[0].symbol));
				dispatch(setCaptchaError(false));
			}, 300);
		};
	}, [isWeb2]);

	useEffect(() => {
		dispatch(setActiveOffsetToken(carbonTokens[0].symbol));
	}, [carbonTokens]);

	useEffect(() => {
		if (transactionStatus === TransactionStatusEnum.PROCESSING) {
			dispatch(setCaptchaError(false));
		}
		if (transactionStatus === TransactionStatusEnum.COMPLETED) {
			dispatch(setBurnTransactionStatus(TransactionStatusEnum.NONE));
			hideModal();
		}
		if (transactionStatus === TransactionStatusEnum.ERROR) {
			isCaptchaError ? setCaptchaText('') : hideModal();
			dispatch(setBurnTransactionStatus(TransactionStatusEnum.NONE));
		}
	}, [transactionStatus]);

	const hideModal = () => {
		if (onClose) {
			onClose();
		}
	};
	const handleSendBtnClick = async () => {
		dispatch(TransferTokenAsync(sendToAddress, offsetTokenInfo.symbol, transferAmount, captchaText));
	};

	const handleUpDownArrowKey = (amount: number) => {
		var amountBi = BigInt(transferAmount.originalValue) + BigInt(Math.trunc(amount));
		setTransferAmount(new FixedNumber(amountBi > 0 ? amountBi.toString() : '0', offsetTokenInfo.decimals));
	};

	const handleSendAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log({value :e.target.value })
		var val = e.target.value;

		const re = /^[0-9]*(\.[0-9]{0,3}){0,1}$/;
		if (val === '' || re.test(val)) {
			var len = val.length;
			var pointIdx = val.indexOf('.');
			if (pointIdx >= 0) {
				len = pointIdx;
			}

			console.log("**",getNumberValue(val))

			if (len <= availableToBurn.scaleDownIntValue.toString().length + 1) {
				setTransferAmount(new FixedNumber(getNumberValue(val), offsetTokenInfo.decimals));
				return;
			}
		}
		setTransferAmount(new FixedNumber(transferAmount.originalValue, offsetTokenInfo.decimals));
	};

	const handleTokenSelection = (token: TokenInfo) => {
		dispatch(setActiveOffsetToken(token.symbol));
	};

	const handleReloadCaptchaClick = () => {
		dispatch(LoadCaptchaAction());
	};

	const handleSendToAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSendToAddress(e.target.value);
	};

	const handleSendToAddressBlur = (e: FocusEvent<HTMLInputElement>) => {
		setIsAddressError(!!e.target.value && !!e.target.value.length && !isValidAddress(e.target.value));
	};
	const isError = useMemo(() => {
		return transferAmount.originalValue && transferAmount.scaleUpValue > availableToBurn.originalBigIntValue;
	}, [transferAmount, availableToBurn]);

	const isMinAmountError = useMemo(() => {
		return transferAmount.originalValue && transferAmount.scaleUpValue < new FixedNumber(minSendAmount, offsetTokenInfo.decimals).scaleUpValue;
	}, [transferAmount, availableToBurn]);

	return (
		<div className="send-token-wrapper select-none">
			<Modal.Header title="Send" showCloseBtn={true} onClose={onClose}></Modal.Header>
			<Modal.Body>
				<div className="send-token-form ca-form">
					<div className="passage">
						{`You are withdrawing ${offsetTokenInfo.symbol}. Please ensure that the receiving platform supports this token or you might potentially risk losing your asset.`}
					</div>
					<div className="ca-form-field address-input-field">
						<label htmlFor="addressInput" className="field-label">
							Send to address
						</label>
						<div className="field-ctrl address-input-wrapper">
							<input
								id="addressInput"
								type="text"
								className="ca-input address-input flex-1"
								value={sendToAddress}
								onChange={handleSendToAddressChange}
								onBlur={handleSendToAddressBlur}
							/>
							{isAddressError && <div className="field-error-msg">Invalid address</div>}
						</div>
					</div>
					{carbonTokens && carbonTokens.length > 1 && (
						<div className="ca-form-field">
							<label htmlFor="offsetAmountInput" className="field-label">
								Token
							</label>
							<div className="send-modal">
								<Menu as="div" className="relative inline-block text-left dd-token-selection token-selection-wrapper field-ctrl">
									<Menu.Button as="div" className="dd-btn">
										<div className="selected-token">
											<div className="token-icon">
												<Image src={offsetTokenInfo.logoURI} unoptimized={true} height={40} width={40} alt="" />
											</div>
											<span className="token-name">{offsetTokenInfo.symbol}</span>
										</div>
										<Image src={DropDownImg} unoptimized={true} height={24} width={24} alt="" className="arrow-img" />
									</Menu.Button>
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
											{carbonTokens.map((token) => (
												<Menu.Item key={token.symbol}>
													{({ active }) => (
														<button className="dd-item" onClick={() => handleTokenSelection(token)}>
															<Image src={token.logoURI} unoptimized={true} alt="" height={24} width={24} />
															<span>{token.symbol}</span>
														</button>
													)}
												</Menu.Item>
											))}
										</Menu.Items>
									</Transition>
								</Menu>
								<div className="ca-form-field flex">
									{/* <label htmlFor="offsetAmountInput" className="field-label">
										&nbsp;
									</label> */}
									<div className="small-label mt-1">Available</div>
									<span className="ml-2 balance-value">{FixedNumber.formatCompact(availableToBurn.scaleDownValue)}</span>
								</div>
							</div>
						</div>
					)}
					<div className="ca-form-field">
						<label htmlFor="amountInput" className="field-label">
							Send amount
						</label>
						<div>
							<div className="token-input-wrapper field-ctrl">
								<input
									id="amountInput"
									type="text"
									className={`px-3 w-full token-input ${isError ? 'offset-modal-error' : ''}`}
									value={transferAmount.originalValue}
									onChange={handleSendAmountChange}
								/>
								<div className="up-down-buttons">
									<button className="ca-btn btn-up" onClick={() => handleUpDownArrowKey(1)}>
										<Image src={UpArrowImg} unoptimized={true} alt="btn-up-image" />
									</button>
									<button className="ca-btn btn-up" onClick={() => handleUpDownArrowKey(-1)}>
										<Image src={UpArrowImg} unoptimized={true} alt="btn-up-image" className="arrow-down-img" />
									</button>
								</div>
								<div className="token-unit">TCO2e</div>
							</div>
							<div className="ca-form-field flex">
								{/* <label htmlFor="offsetAmountInput" className="field-label">
									&nbsp;
								</label> */}
								<div className="small-label mt-1">Remaining</div>
								<span className="ml-2 balance-value">
									{FixedNumber.formatCompact(
										new FixedNumber(
											availableToBurn.originalBigIntValue < transferAmount.scaleUpValue ? BigInt(0) : availableToBurn.originalBigIntValue - transferAmount.scaleUpValue,
											18
										).scaleDownValue
									)}
								</span>
							</div>
						</div>
					</div>

					{isWeb2 && (
						<div className="ca-form-field captcha-field">
							<label htmlFor="captchaInput" className="field-label">
								Captcha
							</label>
							<div className="captcha-input-wrapper field-ctrl">
								<div className="captcha-container">
									<div className="captcha-img-container">{captchaImg && <img src={captchaImg} />}</div>
									<button className="reload-btn" onClick={handleReloadCaptchaClick}>
										<Image src={retryImg} height={18} width={18} unoptimized={true} alt="reload" />
									</button>
								</div>
								<input
									id="captchaInput"
									type="text"
									className="ca-input captcha-input"
									placeholder="Enter captcha"
									value={captchaText}
									onChange={(e) => setCaptchaText(e.target.value)}
								/>
								{isCaptchaError && <div className="field-error-msg">Wrong captcha, please try again</div>}
							</div>
						</div>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className="flex modal-actions">
					{(transactionStatus === TransactionStatusEnum.NONE || transactionStatus === TransactionStatusEnum.ERROR) && (
						<div
							id="offsetModalSubmitButton"
							className={`flex justify-between send-modal-footer itmes-center relative w-full offset-modal-always ${isError || isMinAmountError ? 'offset-modal-error' : ''}`}
						>
							{isError && <p className="absolute left-3 pt-5 hidden">Insufficient balance</p>}
							{!isError && isMinAmountError && <p className="absolute left-3 pt-5 hidden">Amount too low, minimum amount is {minSendAmount}</p>}
							<div className="absolute right-3">
								{isError ? (
									<>
										{isWeb2 ? (
											<button 
												className="ca-primary-btn" 
												onClick = {()=>handleSendModalForWeb2 && handleSendModalForWeb2()} 
											>
												Receive
											</button>
										) : (
											<Link href="/buy">
												<a>
													<button className="ca-primary-btn">Buy GAIA</button>
												</a>
											</Link>
										)}
									</>
								) : (
									<button
										className="ca-primary-btn"
										disabled={
											!isValidAddress(sendToAddress) ||
											!transferAmount.scaleUpValue ||
											transferAmount.scaleUpValue > availableToBurn.originalBigIntValue ||
											(isWeb2 && !captchaText)
										}
										onClick={handleSendBtnClick}
									>
										<span>Send now</span>
									</button>
								)}
							</div>
						</div>
					)}
					{(transactionStatus === TransactionStatusEnum.PROCESSING || transactionStatus === TransactionStatusEnum.PENDING) && (
						<button className="ca-primary-icon-btn">
							<Image src={LoaderImg} alt="" unoptimized={true} height={26} width={26} className="btn-icon loader" />
							<span>Processing...</span>
						</button>
					)}
					{transactionStatus === TransactionStatusEnum.COMPLETED && (
						<button className="ca-primary-btn">
							<span>Complete</span>
						</button>
					)}
				</div>
			</Modal.Footer>
		</div>
	);
};

export default SendTokenModal;
