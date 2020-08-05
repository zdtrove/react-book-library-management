import * as types from './authTypes'

export const login = loginData => ({
    type: types.LOGIN,
    payload: loginData
})

export const loginSuccess = payload => ({
    type: types.LOGIN_SUCCESS,
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