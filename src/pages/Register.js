import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './../components/Errors/TextError'

const Register = () => {
	return (
		<Formik>
			<Form className="register">
				<h3>Register</h3>
				<div className="form-control">
					<label>Username</label>
					<Field className="input-text" type="text" name="username" placeholder="Username" />
					<ErrorMessage name="username" component={TextError} />
				</div>
				<div className="form-control">
					<label>Email</label>
					<Field className="input-text" type="text" name="email" placeholder="Email" />
					<ErrorMessage name="email" component={TextError} />
				</div>
				<div className="form-control">
					<label>Password</label>
					<Field className="input-text" type="text" name="password" placeholder="Password" />
					<ErrorMessage name="password" component={TextError} />
				</div>
				<div className="form-control">
					<label>Password Confirm</label>
					<Field className="input-text" type="text" name="passwordConfirm" placeholder="Password Confirm" />
					<ErrorMessage name="passwordConfirm" component={TextError} />
				</div>
				<div className="wrap-button">
					<button type="button" className="button-products cancel">Login</button>
					<button type="submit" className="button-products">Register</button>
				</div>
			</Form>
		</Formik>
	)
}

export default Register