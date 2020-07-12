import * as types from './cartTypes'

const initialState = {
	listCart: []
}

const cartReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.ADD_TO_CART:
			return {
				...state,
				listCart: [...state.listCart, payload]
			}
		case types.REMOVE_ITEM:
			return {
				...state
			}
		case types.CLEAR_CART:
			return {
				...state
			}
		case types.INCREASE_CART:
			return {
				...state
			}
		case types.DECREASE_CART:
			return {
				...state
			}
		default:
			return state
	}
}

export default cartReducer