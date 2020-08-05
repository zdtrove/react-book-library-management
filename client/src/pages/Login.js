import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as authActions from '../redux/auth/authActions'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './../components/Errors/TextError'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'

const Login = ({ login, isAuthenticated, history }) => {
	useEffect(() => {
		if (isAuthenticated || localStorage.getItem('blmToken')) history.push('/')
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
		login(data)
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			<Form className="register">
				<h3>Login</h3>
				
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
					<Link to="register"><button type="button" className="btn cancel">Register</button></Link>
					<button type="submit" className="btn">Login</button>
				</div>
			</Form>
		</Formik>
	)
}

Login.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
	login: bindActionCreators(authActions.login, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)