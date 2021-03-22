import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/auth/authActions'
import Login from '../../components/Client/Login'

const LoginContainer = ({
    isAuthenticated,
    login,
    history,
}) => {
    return <>
        <Login isAuthenticated={isAuthenticated} login={login} history={history} />
    </>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
	login: bindActionCreators(authActions.login, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)