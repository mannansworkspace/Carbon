import React, { FC } from 'react';
import { useAppDispatch } from 'app/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginWithWallet from '../loginWithWallet';

interface Props {
	handleSubmit: Function;
}

const Login: FC<Props> = (props) => {
	const dispatch = useAppDispatch();
	const { handleSubmit } = props;

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid Email').required('Email is required'),
			password: Yup.string().required('Password is required'),
		}),
		onSubmit: (loginForm) => {
			dispatch(handleSubmit(loginForm));
		},
	});

	return (
		<div className="content">
			<div id="comments">
				<h2
					style={{
						margin: '0 0 20px 0',
						fontSize: '1.4rem',
						lineHeight: 'normal',
						fontWeight: 'normal',
						textTransform: 'capitalize',
					}}
				>
					LOGIN
				</h2>

				<div className="group">
					<div className="one_third first">
						<label className="name">
							Email <span>*</span>
						</label>
						<input id="name" required onChange={formik.handleChange} type="email" value={formik.values.email} name="email" />
						{formik.errors.email && formik.touched.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
					</div>
				</div>
				<div className="group">
					<div className="one_third first">
						<label className="name">
							Password<span>*</span>
						</label>
						<input id="name" required onChange={formik.handleChange} type="password" value={formik.values.password} name="password" />
						{formik.errors.password && formik.touched.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
					</div>
				</div>
				<div className="group">
					<div className="one_third first">
						<input
							type="submit"
							name="submit"
							value="Login"
							onClick={(e) => {
								e.preventDefault();
								formik.handleSubmit();
							}}
						/>
					</div>
				</div>
				<div className="group">
					<h2
						style={{
							margin: '10px 0 20px 0',
							fontSize: '1.4rem',
							lineHeight: 'normal',
							fontWeight: 'normal',
							textTransform: 'capitalize',
						}}
					>
						OR
					</h2>
					<div className="group">
						<div className="one_third first">
							<LoginWithWallet />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;
