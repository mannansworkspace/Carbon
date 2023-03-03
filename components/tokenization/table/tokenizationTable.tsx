import { FC } from 'react';
import TokenizationRequestsTableRow from './tokenizationTableRow';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getTokenizationRequestsAction, selectTokenizationRequestsLists } from '@reducers/admin/tokenSlice';
import Refresh from 'components/common/refreshIcon';

const TokenizationTable: FC = () => {

	const requests = useAppSelector(selectTokenizationRequestsLists)
	const dispatch = useAppDispatch()
	return (
		<>
			<div className="section-header">
				<div className='flex flex-row'>
					Request List
					<Refresh onRefresh={() => dispatch(getTokenizationRequestsAction())} />
				</div>
			</div>
			{requests.length ? (
				<div className='overflow-auto'>
					<div className="section-table history-table">
						<div className="table-row header-row tokenization">
							<div className="client-col header-cell">Client</div>
							<div className="subAccount-col header-cell">Sub Account Id</div>
							<div className="batchId-col header-cell">Batch Id</div>
							<div className="ethAddress-col header-cell">Eth Address</div>
							<div className="status-col header-cell">Status</div>

						</div>
						<div className="table-body">
							{requests.map((requestItem, index) => (
								<TokenizationRequestsTableRow
									requestItem={requestItem}
									key={index}
								/>
							))}
						</div>
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

export default TokenizationTable;
