import * as types from './authTypes'

export const login = () => ({
    type: types.LOGIN
})

export const loginSuccess = () => ({
    type: types.LOGIN_SUCCESS
})

export const register = () => ({
    type: types.REGISTER
})

export const registerSuccess = () => ({
    type: types.REGISTER_SUCCESS
})

export const logout = () => ({
    type: types.LOGOUT
})

export const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS
})