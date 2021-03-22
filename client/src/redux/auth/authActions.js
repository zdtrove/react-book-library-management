import * as types from './authTypes'

export const login = loginData => ({
    type: types.LOGIN,
    payload: loginData
})

export const loginSuccess = payload => ({
    type: types.LOGIN_SUCCESS,
    payload
})

export const loginAdmin = loginData => ({
    type: types.LOGIN_ADMIN,
    payload: loginData
})

export const loginAdminSuccess = payload => ({
    type: types.LOGIN_ADMIN_SUCCESS,
    payload
})

export const setAuthenticated = payload => ({
    type: types.SET_AUTHENTICATED,
    payload
})

export const register = registerData => ({
    type: types.REGISTER,
    payload: registerData
})

export const registerSuccess = payload => ({
    type: types.REGISTER_SUCCESS,
    payload
})

export const logout = () => ({
    type: types.LOGOUT
})

export const tokenExpired = () => ({
	type: types.TOKEN_EXPIRED
})

export const getUsers = () => ({
    type: types.GET_USERS
})

export const getUsersSuccess = users => ({
    type: types.GET_USERS_SUCCESS,
    payload: { users }
})

export const getUser = () => ({
    type: types.GET_USER
})

export const getUserSuccess = user => ({
    type: types.GET_USER_SUCCESS,
    payload: { user }
})