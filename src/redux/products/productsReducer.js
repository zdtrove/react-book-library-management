import * as types from './productsTypes'

const initialState = {
	listProducts: [],
	error: null
}

const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LOAD_PRODUCTS: {
			return {
				...state
			}
		}
		case types.LOAD_PRODUCTS_SUCCESS: {
			return {
				...state,
				listProducts: payload,
				error: null
			}
		}
		case types.LOAD_PRODUCTS_FAILED: {
			return {
				...state,
				listProducts: [],
				error: payload
			}
		}
		default: {
			return state
		}
	}
}

export default productsReducer