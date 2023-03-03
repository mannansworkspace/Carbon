import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import retryImage from '../../../assets/images/retry.png';
import {
    LoadCaptchaAction,
    selectCaptchaError,
    seletcCaptchaImg,
    seletcContactUsForm,
    setContactUsForm,
    submitContactUsFormAction,
} from '@reducers/authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

interface CaptchaFormProps {
    onCancel: () => void;
}

const CaptchaForm: FC<CaptchaFormProps> = ({ onCancel }) => {
    const dispatch = useAppDispatch();
    const captchaImg = useAppSelector(seletcCaptchaImg);
    const contactUsForm = useAppSelector(seletcContactUsForm);
    const showCaptchaError = useAppSelector(selectCaptchaError);

    useEffect(() => {
        loadCaptchaImage();
    }, []);

    const loadCaptchaImage = () => {
        dispatch(LoadCaptchaAction());
    };

    const formik = useFormik({
        initialValues: {
            captcha: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            captcha: Yup.string().required('Value is required'),
        }),
        onSubmit: (captchaForm, { resetForm }) => {
            const { captcha } = captchaForm;
            dispatch(
                submitContactUsFormAction({
                    captcha,
                    ...contactUsForm,
                })
            );
            resetForm();
        },
    });

    return (
        <>
            <div className='sm:px-12'>
                <div className='captcha-container  bg-transparent'>
                    <div className='pt-24'>
                        <div className=''>
                            <div className='captcha-form'>
                                <div className='captcha-img'>
                                    <div className='captcha'>
                                        {captchaImg && (
                                            <Image
                                                src={captchaImg}
                                                height={100}
                                                width={500}
                                                unoptimized={true}
                                                alt='captcha'
                                            />
                                        )}
                                    </div>
                                    <div className='retry'>
                                        <img
                                            style={{ cursor: 'pointer' }}
                                            onClick={loadCaptchaImage}
                                            src={retryImage.src}
                                            alt='retry'
                                        />
                                    </div>
                                </div>

                                <input
                                    type='text'
                                    name='captcha'
                                    placeholder='Please enter the above captcha'
                                    value={formik.values.captcha}
                                    onChange={formik.handleChange}
                                />

                                {showCaptchaError && (
                                    <div className='error-text'>
                                        Wrong captcha, please try again
                                    </div>
                                )}

                                {formik.errors.captcha &&
                                    formik.touched.captcha && (
                                        <div className='error-text'>
                                            {formik.errors.captcha}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end relative pt-20 sm:px-12'>
                <button
                    className='ca-secondary-icon-btn cancel-btn'
                    type='reset'
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    className='ca-primary-btn'
                    type='submit'
                    onClick={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                >
                    Send
                </button>
            </div>
        </>
    );
};
export default CaptchaForm;
