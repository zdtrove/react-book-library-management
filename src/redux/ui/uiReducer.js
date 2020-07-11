import * as types from './uiTypes'

const initialState = {
	loadingProducts: false
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
		default:
			return state
	}
}

export default uiReducer