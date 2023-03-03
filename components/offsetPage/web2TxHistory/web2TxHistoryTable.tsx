import { FC } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectWeb2TxHistory } from '@reducers/web3Slice';
import Web2TxHistoryTableRow from './web2TxHistoryTableRow';

const Web2TxHistoryTable: FC<{ showTokenColumn?: boolean }> = ({ showTokenColumn }) => {
	const web2TxHistory = useAppSelector(selectWeb2TxHistory);

	return (
		<>
			{!!web2TxHistory.length && (
				<>
					<div className="section-header">Last days history</div>
					<div className="section-table history-table">
						<div className="table-row header-row">
							{showTokenColumn && <div className="token-col header-cell">Token</div>}
							<div className="date-col header-cell">Date</div>
							<div className="tx-hash-col header-cell">TxHash</div>
							<div className="operation-col header-cell">Operation</div>
							<div className="amount-col header-cell">Amount</div>
							<div className="status-col header-cell">Status</div>
						</div>
						<div className="table-body">
							{web2TxHistory.map((historyItem) => (
								<Web2TxHistoryTableRow key={historyItem.txHash} historyItem={historyItem} showTokenColumn={showTokenColumn} />
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Web2TxHistoryTable;
