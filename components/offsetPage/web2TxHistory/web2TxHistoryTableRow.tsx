import { FC } from 'react';
import Image from 'next/image';
import { formatDateForHistoryTable } from 'utils/formatDate';
import CopyImg from 'assets/images/copy.svg';
import FixedNumber from '@models/FixedNumber';
import { useAppSelector } from 'app/hooks';
import { selectTokenInfoById } from '@reducers/appSlice';
import { copyDataToClipboard } from 'utils/copyToClipboard';
import Web2TxHistory from '@models/Web2TxHistory';

const Web2TxHistoryTableRow: FC<{ historyItem: Web2TxHistory; showTokenColumn?: boolean }> = ({ historyItem, showTokenColumn }) => {
	const tokenInfo = useAppSelector(selectTokenInfoById(historyItem.tokenConfigId));

	return (
		<div className="table-row">
			{showTokenColumn && (
				<div className="token-col table-cell">
					<span className="token-icon">
						<Image src={tokenInfo.logoURI} unoptimized={true} alt="token icon" layout="fill" />
					</span>
					<span className="token-name">{tokenInfo.symbol}</span>
				</div>
			)}
			<div className="date-col table-cell">
				<span className="cell-date">{formatDateForHistoryTable(historyItem.updatedAt)?.date}</span>
				<span className="cell-time">{formatDateForHistoryTable(historyItem.updatedAt)?.time}</span>
			</div>
			<div className="tx-hash-col table-cell">
				<span className="tx-hash">{FixedNumber.formatTxHash(historyItem.txHash)}</span>
				<span role="button " className="copy-btn" onClick={() => copyDataToClipboard(historyItem.txHash)}>
					<span className="copy-icon">
						<Image src={CopyImg} unoptimized={true} alt="copy button" layout="fill" objectFit="contain" />
					</span>
				</span>
			</div>
			<div className="operation-col table-cell">{historyItem.opType?.toLowerCase()}</div>
			<div className="amount-col table-cell justify-start items-start">
				<span className="cell-amount">{FixedNumber.formatCompact(historyItem.amount, 3)}</span>
			</div>
			<div className="status-col table-cell"><span className='status-text'>{historyItem.status?.replaceAll('_', ' ').toLowerCase()}</span></div>
		</div>
	);
};

export default Web2TxHistoryTableRow;
