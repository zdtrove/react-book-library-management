import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginAdmin from '../../components/Admin/LoginAdmin'
import * as authActions from '../../redux/auth/authActions'

const LoginAdminContainer = ({
    isAuthenticated,
    loginAdmin,
    history,
}) => {
    return <>
        <LoginAdmin isAuthenticated={isAuthenticated} loginAdmin={loginAdmin} history={history} />
    </>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
	loginAdmin: bindActionCreators(authActions.loginAdmin, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginAdminContainer)