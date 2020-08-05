import { combineReducers } from 'redux'
import booksReducer from './books/booksReducer'
import uiReducer from './ui/uiReducer'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
	books: booksReducer,
	ui: uiReducer,
	auth: authReducer
})

export default rootReducer