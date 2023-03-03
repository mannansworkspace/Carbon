
import { FC, useState } from 'react';
import { TokenizationRequestInterface } from '@models/tokenizationRequest';
import Image from 'next/image';
import CopyImg from 'assets/images/copy.svg';
import { copyDataToClipboard } from 'utils/copyToClipboard';
import { NotificationManager } from 'react-notifications';
import FixedNumber from '@models/FixedNumber';
import { format } from 'utils/formatStatus';
import Modal from 'components/common/Modal';
import TokenDetailModal from './Modal';


const TokenizationRequestsTableRow: FC<{ requestItem: TokenizationRequestInterface }> = ({ requestItem }) => {

	const [showModal ,setShowModal] = useState<boolean>(false)

	const handleCopyClick = (text: string) => {
		copyDataToClipboard(text)
			.then(() => {
				NotificationManager.success('Copied!')
			})
	};

	return (
		<div className="table-row tokenization">

			<Modal 
				className="send-token-modal" 
				show={showModal} 
				onClose={()=>setShowModal(false)}>
				<TokenDetailModal 
					onClose={()=>setShowModal(false)}
					token={requestItem}
					handleCopyClick = {handleCopyClick}
				/>
			</Modal>
			<div className="client-col table-cell">
				<div >
					<p>{requestItem.clientName}</p>
					<p>{requestItem.email}</p>
				</div>
			</div>
			<div className="subAccount-col table-cell">
				{requestItem.subAccountId}
			</div>
			<div className="batchId-col table-cell">
				{requestItem.batchId}
			</div>
			<div className="ethAddress-col table-cell">
				<span >{FixedNumber.formatTxHash(requestItem.ethAddress)}</span>
				<span role="button " className="copy-btn" onClick={() => handleCopyClick(requestItem.ethAddress)}>
					<span className="copy-icon">
						<Image src={CopyImg} unoptimized={true} alt="copy button" layout="fill" objectFit="contain" />
					</span>
				</span>
			</div>
			<div className="status-col table-cell">
				<div className='tokenDetailModal'>
					{format(requestItem.status)}
					<button className="ca-secondary-btn" onClick={()=>{setShowModal(!showModal)}}>
						Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default TokenizationRequestsTableRow;
