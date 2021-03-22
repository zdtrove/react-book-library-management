import * as types from './authTypes'
import axios from 'axios'

const initialState = {
    isAuthenticated: !!localStorage.blmToken || false,
    user: null,
    userAdmin: null,
    users: [],
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.LOGIN:
        case types.LOGIN_ADMIN:
        case types.REGISTER: {
            return {
                ...state
            }
        }
        case types.LOGIN_SUCCESS:
        case types.LOGIN_ADMIN_SUCCESS:
        case types.REGISTER_SUCCESS: {
            localStorage.setItem('blmToken', payload.token)
            localStorage.setItem('blmUserId', payload.user._id)
            axios.defaults.headers.common['Authorization'] = payload.token
            return {
                ...state,
                user: payload.user,
                isAuthenticated: true
            }
        }
        case types.SET_AUTHENTICATED: {
            localStorage.setItem('blmToken', payload.token)
            axios.defaults.headers.common['Authorization'] = payload.token
            return {
                ...state,
                isAuthenticated: true
            }
        }
        case types.GET_USER_SUCCESS: {
            return {
                ...state,
                userAdmin: payload.user
            }
        }
        case types.GET_USERS_SUCCESS: {
            return {
                ...state,
                users: payload.users
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