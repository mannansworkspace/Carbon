import { LoadCaptchaAction, SelectUser, seletcCaptchaImg } from "@reducers/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Modal from "components/common/Modal"
import { useFormik } from "formik"
import { FC, useEffect } from "react"
import * as Yup from 'yup';
import retryImg from '@images/retry.png';
import Image from 'next/image';
import { tokenizationFormAction } from "@reducers/admin/tokenSlice";
import { TokenizationFormInterface } from "@models/tokenizationForm";
import { clearAllError, selectErrors } from "@reducers/errorSlice";
import { selectETHAddress } from "@reducers/web3Slice";

interface Props {
    onClose: Function
}

const TokenizationRequestForm: FC<Props> = (props) => {

    const captchaImg = useAppSelector(seletcCaptchaImg);
    const user = useAppSelector(SelectUser)
    const errors = useAppSelector(selectErrors)
    const ethAddress = useAppSelector(selectETHAddress)
    const initialform = {
        email: user?.email || '',
        clientName: user?.firstName + user?.lastName || user?.firstName || user?.lastName || '',
        subAccountId: '',
        batchId: '',
        captcha: '',
        ethAddress: ethAddress || ''
    }
    const {
        onClose
    } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        loadCaptchaImage()
    }, [])

    const loadCaptchaImage = () => {
        dispatch(LoadCaptchaAction())
    }

    const formik = useFormik({
        initialValues: initialform,
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            clientName: Yup.string().required(),
            subAccountId: Yup.string().required(),
            batchId: Yup.string().required(),
            captcha: Yup.string().required(),
            ethAddress: Yup.string().required()
        }),
        onSubmit: async (tokenForm: TokenizationFormInterface) => {
            const success = await dispatch(tokenizationFormAction(tokenForm))
            loadCaptchaImage()
            success
                && onClose()
                && formik.resetForm()
        }
    });

    const isCaptchaError = errors.some(error  =>  error.errorMessage?.includes('BAD_CAPTCHA'))

    return (

        <div className="send-token-wrapper select-none">
            <Modal.Header title="Tokenization Request" showCloseBtn={true} onClose={() => {
                onClose()
            }}></Modal.Header>
            <Modal.Body>
                <div className="send-token-form ca-form">
                    {
                       !isCaptchaError && !!errors.length &&
                        <div className="passage error-text">
                            {
                                errors[errors.length - 1].errorMessage
                            }
                        </div>
                    }
                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Eth Address
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                name="ethAddress"
                                type="text"
                                className="ca-input address-input flex-1"
                                onChange={formik.handleChange}
                                value={formik.values.ethAddress}
                            />
                            {formik.errors.ethAddress && formik.touched.ethAddress ? <div className='error-text'>{formik.errors.ethAddress}</div> : null}
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Email
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                name="email"
                                type="text"
                                className="ca-input address-input flex-1"
                                value={formik.values.email}
                                disabled={user && !!user.email ? true : false}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && formik.touched.email ? <div className='error-text'>{formik.errors.email}</div> : null}
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Client Name
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                name="clientName"
                                type="text"
                                className="ca-input address-input flex-1"
                                value={formik.values.clientName}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.clientName && formik.touched.clientName ? <div className='error-text'>{formik.errors.clientName}</div> : null}
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Sub Account Id
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                name="subAccountId"
                                type="text"
                                className="ca-input address-input flex-1"
                                value={formik.values.subAccountId}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.subAccountId && formik.touched.subAccountId ? <div className='error-text'>{formik.errors.subAccountId}</div> : null}
                        </div>
                    </div>

                    <div className="ca-form-field address-input-field">
                        <label htmlFor="addressInput" className="field-label">
                            Batch ID
                        </label>
                        <div className="field-ctrl address-input-wrapper">
                            <input
                                name="batchId"
                                type="text"
                                className="ca-input address-input flex-1"
                                value={formik.values.batchId}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.batchId && formik.touched.batchId ? <div className='error-text'>{formik.errors.batchId}</div> : null}
                        </div>
                    </div>
                    <div className="ca-form-field captcha-field">
                        <label htmlFor="captchaInput" className="field-label">
                            Captcha
                        </label>
                        <div className="captcha-input-wrapper field-ctrl">
                            <div className="captcha-container">
                                <div className="captcha-img-container">{captchaImg && <img src={captchaImg} />}</div>
                                <button className="reload-btn" onClick={loadCaptchaImage}>
                                    <Image src={retryImg} height={18} width={18} unoptimized={true} alt="reload" />
                                </button>
                            </div>
                            <input
                                name="captcha"
                                type="text"
                                className="ca-input captcha-input"
                                placeholder="Enter captcha"
                                value={formik.values.captcha}
                                onChange={(e) => { dispatch(clearAllError()); formik.handleChange(e) }}
                            />
                            {formik.errors.captcha && formik.touched.captcha ? <div className='error-text'>{formik.errors.captcha}</div> : null}
                            { isCaptchaError &&
                                <div className='error-text'>
                                    Wrong captcha, please try again
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="ca-primary-btn"
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                >
                    <span>Tokenize</span>
                </button>
            </Modal.Footer>
        </div>
    )
}

export default TokenizationRequestForm