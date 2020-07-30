import * as types from './authTypes'

const initialState = {
    isAuthenticated: false
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.LOGIN: {
            return {
                ...state
            }
        }
        case types.LOGIN_SUCCESS: {
            return {
                ...state
            }
        }
        case types.REGISTER: {
            return {
                ...state
            }
        }
        case types.REGISTER_SUCCESS: {
            return {
                ...state
            }
        }
        case types.LOGOUT: {
            return {
                ...state
            }
        }
        case types.LOGOUT_SUCCESS: {
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer