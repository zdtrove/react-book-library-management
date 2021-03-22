import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../redux/auth/authActions'
import * as bookActions from '../../redux/books/bookActions'
import * as uiActions from '../../redux/ui/uiActions'
import Admin from '../../components/Admin/Admin'

const AdminContainer = ({
    authActionCreators,
    bookActionCreators,
    uiActionCreators,
}) => {
    return <>
        <Admin 
            authActionCreators={authActionCreators}
            bookActionCreators={bookActionCreators}
            uiActionCreators={uiActionCreators}
        />
    </>
}

const mapDispatchToProps = dispatch => ({
    authActionCreators: bindActionCreators(authActions, dispatch),
    bookActionCreators: bindActionCreators(bookActions, dispatch),
    uiActionCreators: bindActionCreators(uiActions, dispatch),
})

export default connect(null, mapDispatchToProps)(AdminContainer)