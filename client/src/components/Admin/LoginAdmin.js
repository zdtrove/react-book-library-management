import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../Errors/TextError'
import { Link } from 'react-router-dom'

const Login = ({ loginAdmin, isAuthenticated, history }) => {
	useEffect(() => {
		if (isAuthenticated || localStorage.blmToken) history.push('/admin')
	}, [history, isAuthenticated])

	const initialValues = {
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		email: Yup.string().required('Email is required'),
		password: Yup.string().required('Password is required')
	})

	const onSubmit = data => {
		loginAdmin(data)
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className="register">
				<h3>Login Admin</h3>
				
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
				<div className="wrap-button">
					<Link to="/register"><button type="button" className="btn cancel">Register</button></Link>
					<button type="submit" className="btn">Login</button>
				</div>
			</Form>
		</Formik>
	)
}

Login.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	loginAdmin: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default Login