import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const AdminRoute = ({component: Component, isAuthenticated, ...rest}) => {
	return (
		<Route 
			{...rest}
			render={props => (isAuthenticated || localStorage.blmToken) ? <Component {...props} /> : <Redirect to='admin/login' />}
		/>
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

AdminRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(AdminRoute)