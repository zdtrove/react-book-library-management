import { combineReducers } from 'redux'
import productsReducer from './products/productsReducer'
import uiReducer from './ui/uiReducer'
import cartReducer from './cart/cartReducer'

const rootReducer = combineReducers({
	products: productsReducer,
	ui: uiReducer,
	cart: cartReducer
})

export default rootReducer