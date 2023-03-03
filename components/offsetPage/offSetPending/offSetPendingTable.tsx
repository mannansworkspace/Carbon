import { generateRawETH } from '@reducers/admin/authSlice';
import { getBlockInfo, GetOffsetHistoryAsync, selectTxDataToMonitor } from '@reducers/web3Slice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FC, useEffect, useRef } from 'react';
import OffSetPendingTableRow from './offSetPendingTableRow';

const OffSetPendingTable: FC<{ showTokenColumn?: boolean }> = ({ showTokenColumn }) => {

    const pendingTxData = useAppSelector(selectTxDataToMonitor)
    const dispatch = useAppDispatch()
    const intervalId = useRef<NodeJS.Timer>(null!)

    useEffect(() => {

    	if (!!pendingTxData.length) {
    		dispatch(getBlockInfo())
    		intervalId.current = setInterval(() => {
    			dispatch(generateRawETH())
    			dispatch(GetOffsetHistoryAsync())
    			dispatch(getBlockInfo())
    		}, 3 * 1000)	
    	}

    	return () => {
    		intervalId && clearInterval(intervalId.current)
    	}
    }, [pendingTxData])


    return (
        <div className="section-table history-table">
            {
                !!pendingTxData.length ?
                    <>
                        <div className="table-row header-row">
                            {showTokenColumn && <div className="token-col header-cell">Token</div>}
                            <div className="date-col header-cell">Status</div>
                            <div className="tx-hash-col header-cell">TxHash</div>
                            <div className="amount-col header-cell text-right">
                                Amount
                            </div>
                        </div>
                        <div className="table-body">
                            {pendingTxData.map((monitorItem) => (
                                <OffSetPendingTableRow key={monitorItem.transactionHash} monitorItem={monitorItem} showTokenColumn={showTokenColumn} />
                            ))}
                        </div>
                    </>
                    : (
                        <div className="section-table offset-history-table no-data">
                            <div className="table-row">
                                <div className="table-cell">
                                    <span>No records found</span>
                                </div>
                            </div>
                        </div>
                    )}
                            
        </div>
    );
};

export default OffSetPendingTable;
