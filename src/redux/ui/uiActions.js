import * as types from './uiTypes'

export const showLoading = () => ({
	type: types.SHOW_LOADING
})

export const hideLoading = () => ({
	type: types.HIDE_LOADING
})

export const showLoadingButton = () => ({
	type: types.SHOW_LOADING_BUTTON
})

export const hideLoadingButton = () => ({
	type: types.HIDE_LOADING_BUTTON
})

export const showCart = () => ({
	type: types.SHOW_CART
})

export const hideCart = () => ({
	type: types.HIDE_CART
})

export const showModal = () => ({
	type: types.SHOW_MODAL
})

export const hideModal = () => ({
	type: types.HIDE_MODAL
})

export const changeModalContent = modalContent => ({
	type: types.CHANGE_MODAL_CONTENT,
	payload: modalContent
})