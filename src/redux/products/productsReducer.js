import * as types from './productsTypes'

const initialState = {
	list: [],
	error: null
}

const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LOAD_PRODUCTS:
			return {
				...state
			}
		case types.LOAD_PRODUCTS_SUCCESS:
			return {
				...state,
				list: payload,
				error: null
			}
		case types.LOAD_PRODUCTS_FAILED:
			return {
				...state,
				list: [],
				error: payload
			}
		default:
			return state
	}
}

export default productsReducer