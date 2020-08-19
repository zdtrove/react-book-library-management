import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as authTypes from '../redux/auth/authTypes'
import jwtDecode from 'jwt-decode'
import store from '../redux/store'

const PrivateRoute = ({component: Component, ...rest}) => {
	const token = localStorage.getItem('blmToken')
	if (token) {
		let isValidToken = true;
		if (jwtDecode(token).exp < (Date.now() / 1000)) {
			isValidToken = false
			store.dispatch({ type: authTypes.TOKEN_EXPIRED });
		}
		return (
        	<Route 
	        	{...rest} 
	            render={props => isValidToken ? <Component {...props} /> : <Redirect to='login' /> }
	        />
	    )
	} else {
		return (
        	<Route 
	        	{...rest} 
	            render={props => <Redirect to='login' /> }
	        />
	    )
	}
}

export default PrivateRoute