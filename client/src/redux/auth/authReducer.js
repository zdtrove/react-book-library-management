import * as types from './authTypes'
import axios from 'axios'

const initialState = {
    isAuthenticated: !!localStorage.getItem('blmToken') || false
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.LOGIN:
        case types.REGISTER: {
            return {
                ...state
            }
        }
        case types.SET_AUTHENTICATED:
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS: {
            localStorage.setItem('blmToken', payload.token)
            axios.defaults.headers.common['Authorization'] = payload.token
            return {
                ...state,
                isAuthenticated: true
            }
        }
        case types.TOKEN_EXPIRED:
        case types.LOGOUT: {
            localStorage.removeItem('blmToken')
            delete axios.defaults.headers.common['Authorization']
            return {
                ...state,
                isAuthenticated: false
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer