import * as types from './cartTypes'

export const addToCart = item => ({
	type: types.ADD_TO_CART,
	payload: item
})

export const removeItem = () => ({
	type: types.REMOVE_ITEM
})

export const clearCart = () => ({
	type: types.CLEAR_CART
})

export const increaseCart = () => ({
	type: types.INCREASE_CART
})

export const decreaseCart = () => ({
	type: types.DECREASE_CART
})