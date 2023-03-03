
import React, { FC } from "react";
import { useAppDispatch } from "app/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VerifyCodeAction } from "@reducers/authSlice";
import { useRouter } from "next/router";

const VerificationForm: FC<{ email: string }> = (props) => {
    const { email } = props
    const router = useRouter()
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            code: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            code: Yup.string().required("Code is required"),
        }),
        onSubmit: (verificationForm) => {
            dispatch(VerifyCodeAction({ email: email, code: verificationForm.code }, router))
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
                }} >Verify Code</h2>
                <div className="one_third first">
                    <label className="name">Email verification code <span>*</span></label>
                    <input
                        id="name"
                        required
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.code}
                        name='code'
                    />
                    {formik.errors.code && formik.touched.code ? (
                        <div className="error-text">
                            {formik.errors.code}
                        </div>
                    ) : null}
                </div>
                <div className="one_third first">
                    <input type="submit" name="submit" value="Verify"
                        onClick={(e) => { e.preventDefault(); formik.handleSubmit() }}
                    />
                </div>
            </div>
        </div >

    )

}
export default VerificationForm