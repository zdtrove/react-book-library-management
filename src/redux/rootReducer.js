import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import uiReducer from './ui/uiReducer'

const rootReducer = combineReducers({
	products: productsReducer,
	ui: uiReducer
})

export default rootReducer