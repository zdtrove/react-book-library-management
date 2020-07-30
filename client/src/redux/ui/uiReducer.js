import * as types from './uiTypes'

const initialState = {
	isLoading: false,
	isShowCart: false,
	isShowModal: false,
	modalContent: null
}

const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.SHOW_LOADING:
			return {
				...state,
				isLoading: true
			}
		case types.HIDE_LOADING:
			return {
				...state,
				isLoading: false
			}
		case types.SHOW_LOADING_BUTTON:
			return {
				...state,
				modalContent: {...state.modalContent, props: { ...state.modalContent.props, isLoadingButton: true}}
			}
		case types.HIDE_LOADING_BUTTON:
			return {
				...state
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
		case types.SHOW_MODAL:
			return {
				...state,
				isShowModal: true
			}
		case types.HIDE_MODAL:
			return {
				...state,
				isShowModal: false
			}
		case types.CHANGE_MODAL_CONTENT:
			return {
				...state,
				modalContent: payload
			}
		default:
			return state
	}
}

export default uiReducer