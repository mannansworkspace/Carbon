import { TokenizationRequestInterface } from "@models/tokenizationRequest";
import Modal from "components/common/Modal";
import moment from "moment";
import Image from "next/image";
import { FC } from "react";
import CopyImg from 'assets/images/copy.svg';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getCertContractAction, getContractAction } from "@reducers/admin/tokenSlice";
import  {selectTokenInfoById} from "@reducers/appSlice"

interface Props {
    onClose: Function,
    token: TokenizationRequestInterface,
    handleCopyClick: Function
}

const TokenDetailModal: FC<Props> = (props) => {

    let { onClose, token, handleCopyClick } = props
    const dispatch = useAppDispatch()
    const configToken = useAppSelector(selectTokenInfoById(token.tokenConfigId) )
    const isTokenProcessed =  ["SIGNED", "TRANSFER_REQUESTED", "PERFORMED"].some((status) => status === token.status)
    
    
    return (
        <div className="tokenDetailModal tokenization send-token-wrapper select-none">
            <Modal.Header title="Details" showCloseBtn={true} onClose={() => {
                onClose()
            }}></Modal.Header>
            <Modal.Body>
                <div className="send-token-form ca-form">
                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Id
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.uuid}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Created at
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={moment(token.createdAt).format('yyyy-MM-DD')}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Updated at
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={moment(token.updatedAt).format('yyyy-MM-DD')}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Status
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.status}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Sub Account Id
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.subAccountId}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Batch ID
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.batchId}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Client Name
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.clientName}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Email
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.email}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Eth Address
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.ethAddress}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Token
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={configToken?.name || ""}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Project Id
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.projectId}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Project name
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.projectName}
                                disabled

                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Vintage Start
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.vintageStart ? moment(token.vintageStart).format('yyyy-MM-DD') : ""}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Vintage End
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.vintageEnd ? moment(token.vintageEnd).format('yyyy-MM-DD') : ""}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Credit Type
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.creditType}
                                disabled
                            />
                        </div>
                    </div>


                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Certifications
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.certifications}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Amount
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                type="text"
                                className="ca-input address-input flex-1"
                                value={token.amount}
                                disabled
                            />
                        </div>
                    </div>

                    {
                        token.txHash && !!token.txHash.length &&
                        <div className="ca-form-field address-input-field">
                            <label htmlFor="addressInput" className="field-label">
                                TxHash
                            </label>
                            <div className="field-ctrl address-input-wrapper">
                                <div className="ethAddress-col table-cell">
                                    <span role="button " className="copy-btn" onClick={() =>  handleCopyClick(token.txHash)}>
                                        <span className="copy-icon">
                                            <Image src={CopyImg} unoptimized={true} alt="copy button" layout="fill" objectFit="contain" />
                                        </span>
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="ca-input address-input flex-1 w-20 copyIconDistance"
                                    value={token.txHash}
                                    disabled
                                />
                            </div>
                        </div>


                    }
                    {
                        isTokenProcessed && 
                        <>
                            <div className="ca-form-field address-input-field">
                                <label htmlFor="addressInput" className="field-label">
                                    Contract
                                </label>
                                <div className="field-ctrl address-input-wrapper">

                                    <button className="w-40 ca-secondary-btn" onClick={() => {
                                        dispatch(getContractAction(token.uuid))
                                    }}>
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div className="ca-form-field address-input-field">
                                <label htmlFor="addressInput" className="field-label">
                                    Certificate
                                </label>
                                <div className="field-ctrl address-input-wrapper">
                                    <button className="w-40 ca-secondary-btn" onClick={() => {
                                        dispatch(getCertContractAction(token.uuid))
                                     }}>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="ca-primary-btn"
                    type="submit"
                    onClick={() => onClose()}

                >
                    <span>Close</span>
                </button>
            </Modal.Footer>
        </div>
    )
}
export default TokenDetailModal