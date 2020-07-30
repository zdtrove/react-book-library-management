import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './../components/Errors/TextError'
import { Link } from 'react-router-dom'

const Register = () => {
	const initialValues = {
		username: '',
		email: '',
		password: '',
		passwordConfirm: ''
	}

	const validationSchema = Yup.object({
		username: Yup.string().required('Username is required'),
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string().required('Password is required'),
		passwordConfirm: Yup.string().required('Password confirm is required').oneOf([Yup.ref('password'), null], 'Password not matched')
	})

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className="register">
				<h3>Register</h3>
				<div className="form-control">
					<label>Username</label>
					<Field className="ipt" type="text" name="username" placeholder="Username" />
					<ErrorMessage name="username" component={TextError} />
				</div>
				<div className="form-control">
					<label>Email</label>
					<Field className="ipt" type="text" name="email" placeholder="Email" />
					<ErrorMessage name="email" component={TextError} />
				</div>
				<div className="form-control">
					<label>Password</label>
					<Field className="ipt" type="password" name="password" placeholder="Password" />
					<ErrorMessage name="password" component={TextError} />
				</div>
				<div className="form-control">
					<label>Password Confirm</label>
					<Field className="ipt" type="password" name="passwordConfirm" placeholder="Password Confirm" />
					<ErrorMessage name="passwordConfirm" component={TextError} />
				</div>
				<div className="wrap-button">
					<Link to="login"><button type="button" className="btn cancel">Login</button></Link>
					<button type="submit" className="btn">Register</button>
				</div>
			</Form>
		</Formik>
	)
}

export default Register