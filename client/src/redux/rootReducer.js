import { combineReducers } from 'redux'
import bookReducer from './books/bookReducer'
import uiReducer from './ui/uiReducer'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
	books: bookReducer,
	ui: uiReducer,
	auth: authReducer
})

export default rootReducer