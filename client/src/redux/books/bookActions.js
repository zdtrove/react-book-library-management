import * as types from './bookTypes'

export const getBooks = (searchParam = null, currentPage = 1, categories = null) => {
	return {
		type: types.GET_BOOKS,
		payload: {
			searchParam,
			currentPage,
			categories,
		}
	}
}

export const getBooksSuccess = data => ({
	type: types.GET_BOOKS_SUCCESS,
	payload: data
})

export const getBooksFailed = error => ({
	type: types.GET_BOOKS_FAILED,
	payload: error
})

export const filterBooks = searchParam => ({
	type: types.FILTER_BOOKS,
	payload: searchParam
})

export const addBook = book => ({
	type: types.ADD_BOOK,
	payload: book
})

export const addBookSuccess = book => ({
	type: types.ADD_BOOK_SUCCESS,
	payload: book
})

export const editBook = book => ({
	type: types.EDIT_BOOK,
	payload: book
})

export const editBookSuccess = book => ({
	type: types.EDIT_BOOK_SUCCESS,
	payload: book
})

export const deleteBook = book => ({
	type: types.DELETE_BOOK,
	payload: book
})

export const deleteBookSuccess = book => ({
	type: types.DELETE_BOOK_SUCCESS,
	payload: book
})

export const addToCart = item => ({
	type: types.ADD_TO_CART,
	payload: item
})

export const removeItem = bookId => ({
	type: types.REMOVE_ITEM,
	payload: bookId
})

export const clearCart = () => ({
	type: types.CLEAR_CART
})

export const increaseCart = bookId => ({
	type: types.INCREASE_CART,
	payload: bookId
})

export const decreaseCart = bookId => ({
	type: types.DECREASE_CART,
	payload: bookId
})

export const loadMoreBook = start => ({
	type: types.LOAD_MORE_BOOK,
	payload: { start }
})

export const loadMoreBookSuccess = books => ({
	type: types.LOAD_MORE_BOOK_SUCCESS,
	payload: { books }
})