
import React, { FC } from "react";
import { useAppDispatch } from "app/hooks";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props{
    handleSubmit : Function
}

const AdminLogin: FC<Props> = (props) => {
    const dispatch = useAppDispatch()
    const {handleSubmit} = props

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            login: Yup.string().required("Login is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (loginForm) => {
            dispatch(handleSubmit(loginForm))
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
                }} >LOGIN</h2>
                    <div className="one_third first">
                        <label className="name">Login <span>*</span></label>
                        <input  
                            required 
                            onChange={formik.handleChange} 
                            type="text" 
                            value = {formik.values.login} 
                            name = 'login'
                         />
                        {formik.errors.login && formik.touched.login ? (
                            <div className="error-text">
                            {formik.errors.login}
                            </div>
                    ) : null}
                    </div>
                    <div className="one_third first">
                        <label className="name">Password<span>*</span></label>
                        <input 
                            required
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            name='password'
                         />
                        {formik.errors.password && formik.touched.password ? (
                        <div className="error-text">
                            {formik.errors.password}
                        </div>
                    ) : null}
                    </div>
                    <div className="one_third first">
                        <input type="submit" name="submit" value="Login" 
                            onClick={(e) => { e.preventDefault(); formik.handleSubmit() }}
                        />
                    </div>
            </div>
        </div >

    )

}
export default AdminLogin