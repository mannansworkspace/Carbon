import { FC } from 'react';
import OffsetHistoryTableRow from './offsetHistoryTableRow';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectOffsetHistory } from '@reducers/web3Slice';
import Refresh from 'components/common/refreshIcon';

const OffsetHistoryTable: FC<{ showTokenColumn?: boolean }> = ({ showTokenColumn }) => {
	const offsetHistory = useAppSelector(selectOffsetHistory);
	const dispatch = useAppDispatch()
	return (
		<>
			<div className="section-header">
				<div className='flex flex-row'>
				Offset history
				</div>
			</div>
			{offsetHistory.length ? (
				<div className="section-table history-table">
					<div className="table-row header-row">
						{showTokenColumn && <div className="token-col header-cell">Token</div>}
						<div className="date-col header-cell">Date</div>
						<div className="tx-hash-col header-cell">TxHash</div>
						<div className="amount-col header-cell">
							Retired <span className="hide-on-mobile">amount</span>
						</div>
					</div>
					<div className="table-body">
						{offsetHistory.slice().sort((a, b) => b.dt - a.dt).map((historyItem) => (
							<OffsetHistoryTableRow key={historyItem.txHash} historyItem={historyItem} showTokenColumn={showTokenColumn} />
						))}
					</div>
				</div>
			) : (
				<div className="section-table offset-history-table no-data">
					<div className="table-row">
						<div className="table-cell">
							<span>No records found</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OffsetHistoryTable;
