import * as types from './uiTypes'

const initialState = {
	isLoadingProducts: false,
	isShowCart: false
}

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SHOW_LOADING_PRODUCTS:
			return {
				...state,
				isLoadingProducts: true
			}
		case types.HIDE_LOADING_PRODUCTS:
			return {
				...state,
				isLoadingProducts: false
			}
		case types.SHOW_CART:
			return {
				...state,
				isShowCart: true
			}

		case types.HIDE_CART:
			return {
				...state,
				isShowCart: false
			}
		default:
			return state
	}
}

export default uiReducer