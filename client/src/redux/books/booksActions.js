import * as types from './booksTypes'

export const loadBooks = (searchParam = null, currentPage = 1) => {
	return {
		type: types.LOAD_BOOKS,
		payload: {
			searchParam,
			currentPage
		}
	}
}

export const loadBooksSuccess = data => ({
	type: types.LOAD_BOOKS_SUCCESS,
	payload: data
})

export const loadBooksFailed = error => ({
	type: types.LOAD_BOOKS_FAILED,
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