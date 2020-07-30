import * as types from './productsTypes'

export const loadProducts = (searchParam = null, currentPage = 1) => {
	return {
		type: types.LOAD_PRODUCTS,
		payload: {
			searchParam,
			currentPage
		}
	}
}

export const loadProductsSuccess = data => ({
	type: types.LOAD_PRODUCTS_SUCCESS,
	payload: data
})

export const loadProductsFailed = error => ({
	type: types.LOAD_PRODUCTS_FAILED,
	payload: error
})

export const filterProducts = searchParam => ({
	type: types.FILTER_PRODUCTS,
	payload: searchParam
})

export const addProduct = product => ({
	type: types.ADD_PRODUCT,
	payload: product
})

export const addProductSuccess = product => ({
	type: types.ADD_PRODUCT_SUCCESS,
	payload: product
})

export const editProduct = product => ({
	type: types.EDIT_PRODUCT,
	payload: product
})

export const editProductSuccess = product => ({
	type: types.EDIT_PRODUCT_SUCCESS,
	payload: product
})

export const deleteProduct = product => ({
	type: types.DELETE_PRODUCT,
	payload: product
})

export const deleteProductSuccess = product => ({
	type: types.DELETE_PRODUCT_SUCCESS,
	payload: product
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