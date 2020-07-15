import * as types from './productsTypes'

export const loadProducts = (keyword = null) => ({
	type: types.LOAD_PRODUCTS,
	payload: keyword
})

export const loadProductsSuccess = data => ({
	type: types.LOAD_PRODUCTS_SUCCESS,
	payload: data
})

export const loadProductsFailed = error => ({
	type: types.LOAD_PRODUCTS_FAILED,
	payload: error
})

export const filterProducts = keyword => ({
	type: types.FILTER_PRODUCTS,
	payload: keyword
})

export const addToCart = item => ({
	type: types.ADD_TO_CART,
	payload: item
})

export const removeItem = productId => ({
	type: types.REMOVE_ITEM,
	payload: productId
})

export const clearCart = () => ({
	type: types.CLEAR_CART
})

export const increaseCart = productId => ({
	type: types.INCREASE_CART,
	payload: productId
})

export const decreaseCart = productId => ({
	type: types.DECREASE_CART,
	payload: productId
})