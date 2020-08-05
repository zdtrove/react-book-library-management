import * as types from './authTypes'

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
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS: {
            localStorage.setItem('blmToken', payload.token)
            return {
                ...state,
                isAuthenticated: true
            }
        }
        case types.LOGOUT: {
            localStorage.removeItem('blmToken')
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