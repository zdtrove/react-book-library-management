import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import uiReducer from './ui/uiReducer'
import authReducer from './auth/authReducer'

const rootReducer = combineReducers({
	products: productsReducer,
	ui: uiReducer,
	auth: authReducer
})

export default rootReducer