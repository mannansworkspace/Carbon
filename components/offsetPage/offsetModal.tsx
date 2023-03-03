import Modal from 'components/common/Modal';
import { ChangeEvent, ChangeEventHandler, FC, Fragment, useEffect, useMemo, useState } from 'react';
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
} from '@reducers/web3Slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import FixedNumber from '@models/FixedNumber';
import { getNumberValue } from 'utils/whitespace.number';
import { TransactionStatusEnum } from '@constants/constants';
import { selectSystemInfo } from '@reducers/appSlice';
import { openBuyWhaleFin } from 'app/utils';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { TokenInfo } from '@models/SystemInfo';
import { LoadCaptchaAction, selectCaptchaError, seletcCaptchaImg, setCaptchaError } from '@reducers/authSlice';

interface Props{
	handleOffsetModalForWeb2? : Function
}
const OffsetModal: FC<Props> = (props) => {

	const {
		handleOffsetModalForWeb2
	} = props

	const transactionStatus = useAppSelector(selectBurnTransactionStatus);
	const { 'carbon.tokens': carbonTokens } = useAppSelector(selectSystemInfo);
	const offsetTokenInfo = useAppSelector(selectActiveOffsetTokenInfo);
	const availableToBurn = useAppSelector(selectBalanceOfActiveOffsetToken);
	const [burnAmount, setBurnAmount] = useState(new FixedNumber(''));
	const [showModal, setShowModal] = useState<boolean>(false);
	const systemInfo = useAppSelector(selectSystemInfo);
	const captchaImg = useAppSelector(seletcCaptchaImg);
	const isCaptchaError = useAppSelector(selectCaptchaError);
	const isWeb2 = useAppSelector(selectIsWeb2);
	const [captchaText, setCaptchaText] = useState('');
	const dispatch = useAppDispatch();
	const [isBurnError, setBurnError] = useState<boolean>(false);

	useEffect(() => {
		showModal && dispatch(LoadCaptchaAction());
		showModal && dispatch(setCaptchaError(false));
	}, [isWeb2, showModal]);

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
		setShowModal(false);
		setTimeout(() => {
			setBurnAmount(new FixedNumber(''));
			dispatch(setActiveOffsetToken(carbonTokens[0].symbol));
			dispatch(setCaptchaError(false));
			setCaptchaText('');
		}, 300);
	};
	const handleClick = () => {
		setShowModal(true);
	};
	const handleBurnBtnClick = async () => {
		dispatch(BurnTokenAsync(offsetTokenInfo.symbol, burnAmount, captchaText));
	};

	const handleUpDownArrowKey = (amount: number) => {
		var amountBi = BigInt(burnAmount.originalValue) + BigInt(Math.trunc(amount));
		setBurnAmount(new FixedNumber(amountBi > 0 ? amountBi.toString() : '0', offsetTokenInfo.decimals));
	};

	const handleBurnAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= availableToBurn.scaleDownIntValue.toString().length + 1) {
			const re = /^[0-9\b]+$/;
			if (e.target.value === '' || re.test(e.target.value)) {
				setBurnAmount(new FixedNumber(getNumberValue(e.target.value), offsetTokenInfo.decimals));
			} else {
				setBurnAmount(new FixedNumber(burnAmount.originalValue, offsetTokenInfo.decimals));
			}
		}
	};

	const handleTokenSelection = (token: TokenInfo) => {
		dispatch(setActiveOffsetToken(token.symbol));
	};

	const handleReloadCaptchaClick = () => {
		dispatch(LoadCaptchaAction());
	};

	const isError = useMemo(() => {
		return burnAmount.originalValue && burnAmount.scaleUpValue > availableToBurn.originalBigIntValue;
	}, [burnAmount, availableToBurn]);

	return (
		<>
			<button className="ca-primary-btn" onClick={() => setShowModal(true)}>
				Offset now
			</button>
			<Modal show={showModal} onClose={hideModal} className="offset-modal select-none">
				<Modal.Header title="Offset" onClose={hideModal} showCloseBtn={true} />
				<Modal.Body>
					<div className="offset-form ca-form">
						<div className="passage">By offsetting, you are removing your GAIA tokens from circulation and permanently retiring real carbon credits in the off-chain registry.</div>
						<div>
							{carbonTokens && carbonTokens.length > 0 && (
								<div className="ca-form-field">
									<label htmlFor="offsetAmountInput" className="field-label">
										Token
									</label>
									<Menu as="div" className="relative inline-block text-left dd-token-selection token-selection-wrapper field-ctrl">
										<Menu.Button as="div" className="dd-btn">
											<div className="selected-token">
												<div className="token-icon">
													<Image src={offsetTokenInfo.logoURI} unoptimized={true} height={40} width={40} alt="" />
												</div>
												<span className="token-name">{offsetTokenInfo.symbol}</span>
											</div>
											{carbonTokens.length > 1 && <Image src={DropDownImg} unoptimized={true} height={24} width={24} alt="" className="arrow-img" />}
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
												{carbonTokens.length > 1 &&
													carbonTokens.map((token) => (
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
								</div>
							)}
							<div className="ca-form-field flex">
								<label htmlFor="offsetAmountInput" className="field-label">
									&nbsp;
								</label>
								<div className="small-label">Available</div>
								<span className="ml-2 balance-value">{FixedNumber.formatCompact(availableToBurn.scaleDownIntValue)}</span>
							</div>
						</div>

						<div>
							<div className="ca-form-field">
								<label htmlFor="offsetAmountInput" className="field-label">
									Offset Amount
								</label>
								<div className="token-input-wrapper field-ctrl">
									<input
										autoComplete="off"
										id="offsetAmountInput"
										type="text"
										className={`token-input w-48 px-3 ${isError ? 'offset-modal-error' : ''}`}
										value={burnAmount.originalValue}
										onChange={handleBurnAmountChange}
									/>
									<div className="token-unit ml-2">TCO2e</div>
								</div>
							</div>
							<div className="ca-form-field flex">
								<label htmlFor="offsetAmountInput" className="field-label">
									&nbsp;
								</label>
								<div className="small-label">Remaining</div>
								<span className="ml-2 balance-value">
									{FixedNumber.formatCompact(
										new FixedNumber(availableToBurn.originalBigIntValue < burnAmount.scaleUpValue ? BigInt(0) : availableToBurn.originalBigIntValue - burnAmount.scaleUpValue, 18)
											.scaleDownIntValue
									)}
								</span>
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
							<div id="offsetModalSubmitButton" className={`flex justify-between itmes-center relative w-full offset-modal-always ${isError ? 'offset-modal-error' : ''}`}>
								<p className="absolute left-3 pt-5 hidden">Insufficient balance</p>
								<div className="absolute right-3">
									{isError ? (
										<>
											{isWeb2 ? (
												<button 
													className="ca-primary-btn" 
													onClick = {()=>{
														setShowModal(false)
														handleOffsetModalForWeb2 && handleOffsetModalForWeb2()
													}}
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
											disabled={!burnAmount.scaleUpValue || burnAmount.scaleUpValue > availableToBurn.originalBigIntValue || (isWeb2 && !captchaText)}
											onClick={handleBurnBtnClick}
										>
											<span>Offset now</span>
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
			</Modal>
		</>
	);
};

export default OffsetModal;
