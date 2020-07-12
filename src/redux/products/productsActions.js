import * as types from './productsTypes'

export const loadProducts = () => ({
	type: types.LOAD_PRODUCTS
})

export const loadProductsSuccess = data => ({
	type: types.LOAD_PRODUCTS_SUCCESS,
	payload: data
})

export const loadProductsFailed = error => ({
	type: types.LOAD_PRODUCTS_FAILED,
	payload: error
})

export const changeProducts = productId => ({
	type: types.CHANGE_PRODUCTS,
	payload: productId
})