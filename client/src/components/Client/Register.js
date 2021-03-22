import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../../components/Errors/TextError'
import { Link } from 'react-router-dom'

const Register = ({ register, history, isAuthenticated }) => {
	useEffect(() => {
		if (isAuthenticated || localStorage.blmToken) history.push('/')
	}, [history, isAuthenticated])

	const initialValues = {
		username: '',
		email: '',
		location: '',
		phone: '',
		password: '',
		passwordConfirm: '',
		categories: '',
	}

	const validationSchema = Yup.object({
		username: Yup.string()
			.required('Username is required')
			.min(6, 'Please provide 6 character long username')
			.max(32, 'Please provide a username shoter than 32 characters'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		password: Yup.string()
			.required('Password is required')
			.min(6, 'Please provide 6 character long password')
			.max(32, 'Please provide a password shoter than 32 characters'),
		passwordConfirm: Yup.string()
			.required('Password confirm is required')
			.oneOf([Yup.ref('password'), null], 'Passwords confirmation does not match the password')
	})

	const onSubmit = data => {
		register(data)
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
					<label>Phone</label>
					<Field className="ipt" type="text" name="phone" placeholder="Phone" />
					<ErrorMessage name="phone" component={TextError} />
				</div>
				<div className="form-control">
					<label>Location</label>
					<Field className="ipt" type="text" name="location" placeholder="Location" />
					<ErrorMessage name="location" component={TextError} />
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

Register.propTypes = {
	register: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default Register