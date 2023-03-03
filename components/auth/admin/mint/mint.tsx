
import React, { FC, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import MintTable from "./table";
import { clearMintState, addVerraMint, getVerraMintState, selectFormatedMintState, selectMintId, getMintLists, selectShowResetButton } from "@reducers/admin/mintSlice";
import { generateRawETH, selectIfPrivilege } from '@reducers/admin/authSlice'
import { MintInterface, Token } from "@models/.";
import Modal from "components/common/Modal";
import Content from "components/common/Modal/tablecontent";
import ComboBox from "components/common/comboBox";
import { selectTokenList } from "@reducers/admin/tokenSlice";

const Mint: FC = () => {
    const dispatch = useAppDispatch()

    const tokenList = useAppSelector(selectTokenList)
    const mintStatus = useAppSelector(selectFormatedMintState)
    const mintId = useAppSelector(selectMintId)
    const showResetButton = useAppSelector(selectShowResetButton)
    const [statusStyle, handleStatusStyle] = useState({ color: '#474747' })
    const intervalId = useRef<NodeJS.Timer>(null!)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
    const [singleMint, setSingleMint] = useState<MintInterface>(null!)
    const [selectionError, setSelectionError] = useState('')
    const showManualMint = useAppSelector(selectIfPrivilege(["VERRA_MINT", "MANUAL_MINT"]))

    const [token, setToken] = useState<Token>(null!)

    useEffect(() => {
        getMintList()
    }, [token])


    const getMintList = () =>{
        token && dispatch(getMintLists(token.id))
    }

    useEffect(() => {
        if (mintStatus?.includes('Error')) {
            handleStatusStyle({ color: 'red' })
        }

        else if (mintStatus?.includes('Performed')) {
            handleStatusStyle({ color: 'green' })
        }
    }, [mintStatus])

    useEffect(() => {

        if (mintId) {
            dispatch(generateRawETH())
            dispatch(getVerraMintState(mintId))


            intervalId.current = setInterval(() => {
                dispatch(generateRawETH())
                dispatch(getVerraMintState(mintId))
            }, 1000)
        }

        return () => {
            intervalId && clearInterval(intervalId.current)
        }
    }, [mintId])


    const formik = useFormik({
        initialValues: {
            batchId: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            batchId: Yup.string().required("Id is required"),
        }),
        onSubmit: (mintForm) => {
            if (!token) {
                setSelectionError('TokenConfig is required')
                return
            }
            const { batchId } = mintForm
            const tokenConfigId = token.id
            dispatch(addVerraMint(batchId, tokenConfigId))
        },
    });

    const reloadMint = () => {
        handleStatusStyle({ color: '#474747' })
        dispatch(clearMintState())
        formik.resetForm()
        setSelectionError('')
        dispatch(getMintLists(token.id))

    }

    const onDetailsClicked = (mint: MintInterface) => {
        setSingleMint(mint)
        setShowModal(!showModal)
    }
    const handleOptionChange = (option: Token) => {
        selectionError && setSelectionError('')
        setToken(option)

    }
    return (
        <div className="content">
            <div id="comments">
                {showManualMint &&<div className="one_third first">
                    <label className="name">Batch Id</label>
                    <input
                        id="name"
                        required
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.batchId}
                        name='batchId'
                        disabled={!!mintStatus}
                    />
                    {formik.errors.batchId && formik.touched.batchId ? (
                        <div className="error-text">
                            {formik.errors.batchId}
                        </div>
                    ) : null}
                </div>}
                <div className="one_third first">
                    <label className="name">Token Config</label>
                    <div className="country-list" >
                        <ComboBox
                            selected={token?.tokenName || ''}
                            setSelected={handleOptionChange}
                            options={tokenList}
                            placeholder="Token Name"
                            optionKey={'tokenName'}
                        />
                        {selectionError && (
                            <div className="error-text">
                                {selectionError}
                            </div>
                        )}
                    </div>
                </div>

                {showManualMint &&<div className="one_third first">
                    <div className=" w-40 inline">
                        {
                            showResetButton ?
                                <input
                                    type="submit"
                                    value="Reset"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        reloadMint()
                                    }}
                                />
                                :
                                <input
                                    type="submit"
                                    name="submit"
                                    value="Mint"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowConfirmModal(true)
                                        // formik.validateForm().then(err => { 
                                        //     if(Object.keys(err || {}).length === 0) {
                                        //     } else {
                                        //     }
                                        // })
                                    }}
                                    disabled={!!mintStatus}
                                />
                        }
                    </div>

                    {
                        mintStatus &&
                        <span
                            className="ml-2"
                            style={statusStyle}
                        >
                            {mintStatus}
                        </span>
                    }
                </div>}
            </div>
            <MintTable
                onClick={onDetailsClicked}
                onRefresh={getMintList}
            />
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
            >
                <Content
                    title="Mint"
                    onClose={setShowModal}
                    event={singleMint}
                />
            </Modal>
            <Modal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
            >
                <Modal.Header title={'Confirm'} showCloseBtn={true} onClose={() => setShowConfirmModal(false)} />
                <Modal.Body>
                    <span>This action is will mint new tokens which should be supplied by carbon credits on our public account, the action is irreversible. Audit results depend on minted tokens and carbon credits supply.</span>
                </Modal.Body>
                 <Modal.Footer >
                    <button
                    style={{ cursor: 'pointer'}}
                    className="ca-primary-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowConfirmModal(false)
                        formik.handleSubmit()
                    }}><span>Submit</span></button>
                </Modal.Footer>
            </Modal>            
        </div >

    )

}
export default Mint