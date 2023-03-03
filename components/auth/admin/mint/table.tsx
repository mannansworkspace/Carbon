import MintInterface from "@models/Mint"
import { selectMintList, getMintLists } from "@reducers/admin/mintSlice"
import { useAppSelector, useAppDispatch } from "app/hooks"
import DropDown from "components/common/dropdown"
import { FC, useEffect } from "react"
import DataTable from 'react-data-table-component'
import RefreshHeader from 'components/admin/common/refreshHeader'
import { setMintList } from '@reducers/admin/mintSlice';

interface Props {
    onClick: Function,
    onRefresh?: Function,
    handleEditClick?: Function
}

const MintTable: FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const mintList = useAppSelector(selectMintList)
    useEffect(() => {
        return () => {dispatch(setMintList([]))}
    },[])

    const {
        onClick,
        onRefresh,
        handleEditClick
    } = props

    const menuItems = (row : MintInterface) =>{
        if(handleEditClick){
            return [
                { title: 'Details', onClick, event: row },
                { title: 'Edit', onClick : ()=>handleEditClick(row), event: row },
            ]
        }
        return [{ title: 'Details', onClick, event: row }]

    }

    const columns = [
        {
            name: 'Batch ID',
            maxWidth: '360px',
            wrap: true,
            cell: (row: MintInterface) => {
                return (
                    <div style={{ color: 'blue' }}>                    
                        <DropDown
                            title={row.serialNum}
                            menuItems={menuItems(row)}
                        />
                    </div>
                )
            }
        },
        {
            name: 'Project ID',
            maxWidth: '130px',
            selector: (row: MintInterface) => row.projectId
        },
        {
            name: 'Amount',
            maxWidth: '130px',
            selector: (row: MintInterface) => row.amount
        },
        {
            name: 'Status',
            maxWidth: '130px',
            selector: (row: MintInterface) => row.status
        },
        {
            name: <RefreshHeader text='TxHash' cb={onRefresh} />,
            maxWidth: '360px',
            wrap: true,
            selector: (row: MintInterface) => row.txHash
        }

    ]

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                border: '1px solid black',
                backgroundColor: '#373737',
                color: 'white',
                borderRight: '1px solid white',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                border: '2px'

            },
        },
    };


    return (
        <div className="customTable">
        <DataTable
            noDataComponent="There are no records to display. Please specify Token Config"
            columns={columns}
            data={mintList}
            customStyles={customStyles}
        />
        </div>
    )
}
export default MintTable 