import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Register from '../../components/Client/Register'
import * as authActions from '../../redux/auth/authActions'

const RegisterContainer = ({
    isAuthenticated,
    history,
    register,
}) => {
    return <>
        <Register
            isAuthenticated={isAuthenticated}
            history={history}
            register={register}
        />
    </>
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
	register: bindActionCreators(authActions.register, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)