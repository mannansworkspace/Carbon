import { FC, useEffect, useRef } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectTokenInfo } from '@reducers/appSlice';
import { selectETHAddress } from '@reducers/web3Slice';
import Image from 'next/image';
import CopyImg from 'assets/images/copy.svg';
import { copyDataToClipboard } from 'utils/copyToClipboard';
import { NotificationManager } from 'react-notifications';
import Modal from '../Modal';

const ReceiveTokenModal: FC<{ onClose: () => void }> = (props) => {
	const ethAddress = useAppSelector(selectETHAddress);
	const qrCodeContainerRef = useRef(null);
	const isBrowser = typeof window !== 'undefined';
	useEffect(() => {
		(qrCodeContainerRef.current! as HTMLDivElement).innerHTML = '';
		if (isBrowser) {
			import('qr-code-styling').then(({ default: QRCodeStyling }) => {
				const qrCode = new QRCodeStyling({
					width: 300,
					height: 300,
					image: '/images/GAIA-token.svg',
					dotsOptions: {
						color: '#000000',
						type: 'dots',
					},
					cornersSquareOptions: {
						type: 'extra-rounded',
					},
					cornersDotOptions: {
						type: 'dot',
					},
					imageOptions: {
						imageSize: 0.4,
						margin: 10,
					},
					qrOptions: {
						errorCorrectionLevel: 'H',
					},
					data: ethAddress,
				});
				qrCode.append(qrCodeContainerRef.current!);
			});
		}
	}, []);

	const handleCopyBtnClick = () => {
		copyDataToClipboard(ethAddress).then(() => NotificationManager.success('Copied!'));
	};

	return (
		<div className="receive-token-wrapper">
			<Modal.Header title="Receive GAIA" showCloseBtn={true} onClose={props.onClose}></Modal.Header>
			<Modal.Body>
				<div className="wallet-info">
					<div className="wallet-address-container">
						<div className="wallet-address">{ethAddress}</div>
						<button className="copy-btn" onClick={handleCopyBtnClick}>
							<Image src={CopyImg} unoptimized={true} alt="copy button" height={24} width={24} />
						</button>
					</div>
					<div className="qr-code-wrapper" ref={qrCodeContainerRef}></div>
					<div className="receive-warning">
						Warning: Depositing any other crypto asset besides GAIA to this address or doing it through any other network than Polygon may result in the total loss of your funds.
						Gaiaprotocol is not responsible for any funds loss due to the deposit of different asset, wallet or network.
					</div>
				</div>
			</Modal.Body>
		</div>
	);
};

export default ReceiveTokenModal;
