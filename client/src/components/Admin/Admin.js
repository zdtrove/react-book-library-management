import React from 'react'
import AdminBookContainer from '../../containers/Admin/AdminBookContainer'
import AdminUserContainer from '../../containers/Admin/AdminUserContainer'

const Admin = ({
    uiActionCreators,
    bookActionCreators,
    authActionCreators,
}) => {
    return <>
        <AdminBookContainer
            uiActionCreators={uiActionCreators}
            bookActionCreators={bookActionCreators}
        />
        <br />
        <hr />
        <br />
        <AdminUserContainer authActionCreators={authActionCreators} />
    </>
}

export default Admin