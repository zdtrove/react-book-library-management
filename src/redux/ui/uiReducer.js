import * as types from './uiTypes'

const initialState = {
	loadingProducts: false,
	showCart: false
}

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SHOW_LOADING_PRODUCTS:
			return {
				...state,
				loadingProducts: true
			}
		case types.HIDE_LOADING_PRODUCTS:
			return {
				...state,
				loadingProducts: false
			}
		case types.SHOW_CART:
			return {
				...state,
				showCart: true
			}

		case types.HIDE_CART:
			return {
				...state,
				showCart: false
			}
		default:
			return state
	}
}

export default uiReducer