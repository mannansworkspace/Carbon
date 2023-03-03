import React, { FC } from "react";
import { useAppDispatch } from "app/hooks";
import { SignupAction  } from "@reducers/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
const SignupForm: FC = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
   
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            countryCode: '',
            firstName: '',
            lastName: '',
            phone: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid Email").required("Email is Required"),
            password: Yup.string().required("Password is required").min(8),
            firstName: Yup.string().max(50).required(),
            lastName: Yup.string().max(50).required(),
            phone: Yup.string().min(8).max(20).required("Phone Number is Required"),
            countryCode: Yup.string().min(2, 'Country Code is Short').max(3, 'Country Code is Too Long').required("Country Code is Required")

        }),
        onSubmit: (registerForm) => {
            router.isReady && dispatch(SignupAction(registerForm,router))
        },
    });

    return (

        <div className="content">
            <div id="comments">
                <h2 style={{
                    'margin': '0 0 20px 0',
                    'fontSize': '1.4rem',
                    'lineHeight': 'normal',
                    'fontWeight': 'normal',
                    'textTransform': 'capitalize',
                }} >Register</h2>

                <div className="one_third first">
                    <label className="name">First Name <span>*</span></label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.firstName}
                        name='firstName'
                        required
                    />
                    {formik.errors.firstName && formik.touched.firstName ? (
                        <div className="error-text">
                            {formik.errors.firstName}
                        </div>
                    ) : null}
                </div>


                <div className="one_third first">
                    <label className="name">Last Name <span>*</span></label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.lastName}
                        name='lastName'
                        required
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                        <div className="error-text">
                            {formik.errors.lastName}
                        </div>
                    ) : null}
                </div>

                <div className="one_third first">
                    <label className="name">Email <span>*</span></label>
                    <input
                        onChange={formik.handleChange}
                        type="email"
                        value={formik.values.email}
                        name='email'
                        required
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className="error-text">
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>

                <div className="one_third first">
                    <label className="name">Password <span>*</span></label>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        value={formik.values.password}
                        name='password'
                        required
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <div className="error-text">
                            {formik.errors.password}
                        </div>
                    ) : null}
                </div>

                <div className="one_third first">
                    <label className="name">Country Code <span>*</span></label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.countryCode}
                        name='countryCode'
                        required
                    />
                    {formik.errors.countryCode && formik.touched.countryCode ? (
                        <div className="error-text">
                            {formik.errors.countryCode}
                        </div>
                    ) : null}
                </div>

                <div className="one_third first">
                    <label className="name">Phone <span>*</span></label>
                    <input
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.phone}
                        name='phone'
                        required
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                        <div className="error-text">
                            {formik.errors.phone}
                        </div>
                    ) : null}
                </div>

                <div className="one_third first">
                    <input type="submit" name="submit" value="Register"
                        onClick={(e) => { e.preventDefault(); formik.handleSubmit() }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SignupForm 