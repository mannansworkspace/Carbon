import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { setContactUsForm } from '@reducers/authSlice';
import ComboBox from 'components/common/comboBox';
import Countries from './countries.json';

interface ContactFormProps {
    onCancel: () => void;
}

const Contactform: FC<ContactFormProps> = ({ onCancel }) => {
    const dispatch = useAppDispatch();
    const [selected, setSelected] = useState<string>(null!);
    const [countryError, setCountryError] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            company: '',
            info: '',
            message: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required').min(2).max(250),
            email: Yup.string()
                .email('Invalid format')
                .required('Email is required'),
            company: Yup.string().min(0).max(250),
            info: Yup.string().min(0).max(250),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: (contactUsForm) => {
            if (!selected) {
                setCountryError('Country is required');
                return;
            }
            dispatch(
                setContactUsForm({
                    ...contactUsForm,
                    country: selected,
                })
            );
        },
    });

    const handleCountryChange = (option: { name: string; code: string }) => {
        countryError && setCountryError('');
        setSelected(option.name);
    };

    return (
        <>
            <div className='sm:px-12 sm:py-20 py-11'>
                <div className='form-group'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Your name'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <div className='error-text'>{formik.errors.name}</div>
                    ) : null}
                </div>

                {/* ************************************************************ */}

                <div className='form-group'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Your email address'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className='error-text'>{formik.errors.email}</div>
                    ) : null}
                </div>

                {/* ************************************************************ */}

                <div className='form-group'>
                    <div className='country-list'>
                        <ComboBox
                            selected={selected}
                            setSelected={handleCountryChange}
                            options={Countries}
                            placeholder='Country'
                        />
                    </div>
                    {countryError && (
                        <div className='error-text'>{countryError}</div>
                    )}
                </div>
                {/* ************************************************************ */}
                <div className='form-group'>
                    <input
                        type='text'
                        name='company'
                        placeholder='Company'
                        onChange={formik.handleChange}
                        value={formik.values.company}
                    />
                    {formik.errors.company && formik.touched.company ? (
                        <div className='error-text'>
                            {formik.errors.company}
                        </div>
                    ) : null}
                </div>
                {/* ************************************************************ */}
                <div className=''>
                    <textarea
                        placeholder='Your message'
                        name='message'
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    ></textarea>
                    {formik.errors.message && formik.touched.message ? (
                        <div className='error-text'>
                            {formik.errors.message}
                        </div>
                    ) : null}
                </div>
                {/* ************************************************************ */}
            </div>
            <div className='flex justify-end items-center pt-0.5 sm:px-12'>
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
export default Contactform;
