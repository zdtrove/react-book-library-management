import * as types from './bookTypes'
import * as msg from '../../utils/messages'
import { toast } from 'react-toastify'

const initialState = {
	books: [],
	listCart: [],
	totalPrice: 0,
	error: null,
	totalBooks: 0,
	currentPage: 1,
	startLoadMore: 3,
}

const getTotalPrice = listCart => {
	let totalPrice = 0;
	listCart.forEach(item => {
		totalPrice += item.totalPrice
	})
	
	return totalPrice
}

const bookReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_BOOKS_SUCCESS: {
			const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || {}
			const arrId = []
			for (let i = 0; i < booksInCart.length; i++) {
				arrId.push(booksInCart[i]._id)
			}
			const books = payload.data.map(item => arrId.includes(item._id) ? {...item, inCart: true} : item)
			
			return {
				...state,
				books,
				listCart: booksInCart.length > 0 ? booksInCart : [],
				totalBooks: parseInt(payload.totalBooks),
				currentPage: parseInt(payload.currentPage),
				totalPrice: booksInCart.length > 0 ? getTotalPrice(booksInCart) : 0,
				error: null
			}
		}
		case types.GET_BOOKS_FAILED: {
			return {
				...state,
				books: [],
				error: payload
			}
		}
		case types.LOAD_MORE_BOOK_SUCCESS: {

			return {
				...state,
				books: [...state.books, ...payload.books],
				startLoadMore: state.startLoadMore + 3
			}
		}
		case types.ADD_BOOK_SUCCESS: {
			toast.success(msg.MSG_ADD_BOOK_SUCCESS(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			
			return {
				...state,
				books: [payload, ...state.books]
			}
		}
		case types.EDIT_BOOK_SUCCESS: {
			toast.success(msg.MSG_EDIT_BOOK_SUCCESS(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			
			return {
				...state,
				books: [...state.books].map(item => item._id === payload._id ? payload : item)
			}
		}
		case types.DELETE_BOOK_SUCCESS: {
			toast.success(msg.MSG_DELETE_BOOK_SUCCESS(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			
			return {
				...state,
				books: [...state.books].filter(item => item._id !== payload._id)
			}
		}
		case types.ADD_TO_CART: {
			const itemAdd = {...payload, inCart: true, count: 1, totalPrice: ((payload.count+1) * payload.price)}
			const listCart = [...state.listCart, itemAdd]
			toast.success(msg.MSG_ADD_TO_CART(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || []
			booksInCart.push(itemAdd)
			localStorage.setItem('booksInCart', JSON.stringify(booksInCart))
			
			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart),
				books: [...state.books].map(item => item._id === payload._id ? itemAdd : item)
			}
		}
		case types.REMOVE_ITEM: {
			const listCart = [...state.listCart].filter(item => item._id !== payload)
			const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || {}
			const newBooksInCart = booksInCart.filter(item => item._id !== payload)
			localStorage.setItem('booksInCart', JSON.stringify(newBooksInCart))

			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart),
				books: [...state.books].map(item => item._id === payload ? {...item, inCart: false, count: 0, totalPrice: 0} : item)
			}
		}
		case types.CLEAR_CART: {
			localStorage.removeItem('booksInCart')
			
			return {
				...state,
				listCart: [],
				totalPrice: 0,
				books: [...state.books].map(item => ({...item, inCart: false}))
			}
		}
		case types.INCREASE_CART: {
			const { _id, count, price, inStore } = payload
			if (count === inStore) {
				toast.warn(msg.MSG_MAX_BOOK_IN_STORE(inStore))
				
				return {
					...state
				}
			}
			const listCart = [...state.listCart].map(item => item._id === _id ? {...item, count: count+1, totalPrice: (count+1) * price} : item)
			const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || {}
			const newBooksInCart = booksInCart.map(item => item._id === _id ? {...item, count: count+1, totalPrice: (count+1) * price} : item)
			localStorage.setItem('booksInCart', JSON.stringify(newBooksInCart))

			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		case types.DECREASE_CART: {
			const { _id, count, price } = payload
			if (count === 1) {
				const listCart = [...state.listCart].filter(item => item._id !== _id)
				const booksInCart = JSON.parse(localStorage.getItem('booksInCart')) || {}
				const newBooksInCart = booksInCart.filter(item => item._id !== _id)
				localStorage.setItem('booksInCart', JSON.stringify(newBooksInCart))
				
				return {
					...state,
					listCart,
					books: [...state.books].map(item => item._id === _id ? {...item, inCart: false, count: 0, totalPrice: 0} : item),
					totalPrice: getTotalPrice(listCart)
				}
			}
			const listCart = [...state.listCart].map(item => item._id === _id ? {...item, count: count-1, totalPrice: (count-1) * price} : item)
			
			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		default: {
			return state
		}
	}
}

export default bookReducer