import OffsetHistory from '@models/OffsetHistory';
import { FC } from 'react';
import Image from 'next/image';
import { formatDateForHistoryTable } from 'utils/formatDate';
import CopyImg from 'assets/images/copy.svg';
import FixedNumber from '@models/FixedNumber';
import { NotificationManager } from 'react-notifications';
import { useAppSelector } from 'app/hooks';
import { selectTokenInfoById } from '@reducers/appSlice';
import { copyDataToClipboard } from 'utils/copyToClipboard';
import { selectNetworkURL } from '@reducers/web3Slice'
import Link from 'next/link';

const OffsetHistoryTableRow: FC<{ historyItem: OffsetHistory; showTokenColumn?: boolean }> = ({ historyItem, showTokenColumn }) => {
	const tokenInfo = useAppSelector(selectTokenInfoById(historyItem.tokenConfigId));
	const networkURL = useAppSelector(selectNetworkURL)

	const handleCopyClick = (text: string) => {
		copyDataToClipboard(text)
		.then(() => {
			NotificationManager.success('Copied!')
		})
	};

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
				<span className="cell-date">{formatDateForHistoryTable(historyItem.dt)?.date}</span>
				<span className="cell-time">{formatDateForHistoryTable(historyItem.dt)?.time}</span>
			</div>
			<div className="tx-hash-col table-cell">
				<Link href={`${networkURL}/tx/${historyItem.txHash}`}>
					<a target="_blank" rel="noreferrer" className="tx-hash">{FixedNumber.formatTxHash(historyItem.txHash)}</a>
				</Link>
				<span role="button " className="copy-btn" onClick={() => handleCopyClick(historyItem.txHash)}>
					<span className="copy-icon">
						<Image src={CopyImg} unoptimized={true} alt="copy button" layout="fill" objectFit="contain" />
					</span>
				</span>
			</div>
			<div className="amount-col table-cell justify-end items-start">
				<span className="cell-amount">{FixedNumber.formatCompact(historyItem.offsetAmount.toString())}</span>
			</div>
		</div>
	);
};

export default OffsetHistoryTableRow;
