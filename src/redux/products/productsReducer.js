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
		case types.CHANGE_PRODUCTS:
			const tempList = [...state.list]
			const index = tempList.indexOf(state.list.find(item => item.id === payload))
			const product = tempList[index]
			product.inCart = true
			return {
				...state,
				list: tempList
			}
		default:
			return state
	}
}

export default productsReducer