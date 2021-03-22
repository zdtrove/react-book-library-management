import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AdminUsers from '../../components/Admin/AdminUsers'
import * as authActions from '../../redux/auth/authActions'

const AdminUserContainer = ({
    authActionCreators,
    users
}) => {
    return <>
        <AdminUsers 
            authActionCreators={authActionCreators}
            users={users}
        />
    </>
}

const mapStateToProps = state => ({
    users: state.auth.users
})

const mapDispatchToProps = dispatch => ({
    authActionCreators: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserContainer)