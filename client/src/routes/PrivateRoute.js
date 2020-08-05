import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={props => (isAuthenticated || localStorage.getItem('blmToken')) ? <Component {...props} /> : <Redirect to='login' />}
        />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(PrivateRoute)