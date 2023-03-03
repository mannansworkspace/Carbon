import { FC, useMemo } from 'react';
import Image from 'next/image';
import { formatDateForHistoryTable } from 'utils/formatDate';
import CopyImg from 'assets/images/copy.svg';
import FixedNumber from '@models/FixedNumber';
import { NotificationManager } from 'react-notifications';
import { useAppSelector } from 'app/hooks';
import { selectTokenInfoById } from '@reducers/appSlice';
import TxData from '@models/TxData';
import { selectBlockInfo } from '@reducers/web3Slice';
import { copyDataToClipboard } from 'utils/copyToClipboard';


const OffSetPendingTableRow: FC<{ monitorItem: TxData; showTokenColumn?: boolean }> = ({ monitorItem, showTokenColumn }) => {
    const blockInfo = useAppSelector(selectBlockInfo)
    const tokenInfo = useAppSelector(selectTokenInfoById(monitorItem.tokenId as number));
    
    const handleCopyClick = (text: string) => {
		copyDataToClipboard(text)
		.then(() => {
			NotificationManager.success('Copied!')
		})
	};

    const generateStatus = useMemo(() => {
        if(!blockInfo)
            return 

        const {
            blocksToConfirm, currentBlock
        } = blockInfo

        const x = 100 - (Math.round(
            100 * (monitorItem.blockNumber - currentBlock) / blocksToConfirm
        ))

        return x < 100 ? Math.max(x, 0) : 99
    }, [monitorItem, blockInfo])

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
                <span className="cell-date">{`${generateStatus}% completed`}</span>
            </div>
            <div className="tx-hash-col table-cell">
                <span className="tx-hash">{FixedNumber.formatTxHash(monitorItem.transactionHash)}</span>
                <span role="button " className="copy-btn" onClick={() => handleCopyClick(monitorItem.transactionHash)}>
                    <span className="copy-icon">
                        <Image src={CopyImg} unoptimized={true} alt="copy button" layout="fill" objectFit="contain" />
                    </span>
                </span>
            </div>
            <div className="amount-col table-cell justify-end items-start">
                <span className="cell-amount">{FixedNumber.formatCompact(monitorItem.amount)}</span>
            </div>
        </div>
    );
};

export default OffSetPendingTableRow;
