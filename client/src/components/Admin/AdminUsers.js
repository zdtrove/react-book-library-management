import React, { useEffect } from 'react'

const AdminUsers = ({
    authActionCreators,
    users,
}) => {
    const { getUsers } = authActionCreators
    useEffect(() => {
        getUsers()
    }, [getUsers])

    const renderUsers = () => {
        let userList = null;
        userList = users.length > 0
            ? <>
                <table className="list-users">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /> Select all</td>
                        </tr>
                        {users.map(user => {
                            return <tr className="user" key={user._id}>
                                <td><input type="checkbox" /></td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.location}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <button>Deleted selected</button>
            </>
            : <p>No user</p>
        return userList
    }

    return <>
        {renderUsers()}
    </>
}

export default AdminUsers

