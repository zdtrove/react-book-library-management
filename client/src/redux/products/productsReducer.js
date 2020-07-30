import * as types from './productsTypes'
import * as msg from '../../utils/messages'
import { toast } from 'react-toastify'

const initialState = {
	listProducts: [],
	listCart: [],
	totalPrice: 0,
	error: null,
	totalProducts: 0,
	currentPage: 1
}

const getTotalPrice = listCart => {
	let totalPrice = 0;
	listCart.forEach(item => {
		totalPrice += item.totalPrice
	})
	
	return totalPrice
}

const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LOAD_PRODUCTS: {
			return {
				...state,
				listProducts: []
			}
		}
		case types.LOAD_PRODUCTS_SUCCESS: {
			const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {}
			const arrId = []
			for (let i = 0; i < productsInCart.length; i++) {
				arrId.push(productsInCart[i].id)
			}
			const listProducts = payload.data.map(item => arrId.includes(item.id) ? {...item, inCart: true} : item)
			
			return {
				...state,
				listProducts,
				listCart: productsInCart.length > 0 ? productsInCart : [],
				totalProducts: parseInt(payload.totalProducts),
				currentPage: parseInt(payload.currentPage),
				totalPrice: productsInCart.length > 0 ? getTotalPrice(productsInCart) : 0,
				error: null
			}
		}
		case types.LOAD_PRODUCTS_FAILED: {
			return {
				...state,
				listProducts: [],
				error: payload
			}
		}
		case types.ADD_PRODUCT_SUCCESS: {
			toast.success(msg.MSG_ADD_PRODUCT_SUCCESS(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			
			return {
				...state,
				listProducts: [payload, ...state.listProducts]
			}
		}
		case types.EDIT_PRODUCT_SUCCESS: {
			toast.success(msg.MSG_EDIT_PRODUCT_SUCCESS(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			
			return {
				...state,
				listProducts: [...state.listProducts].map(item => item.id === payload.id ? payload : item)
			}
		}
		case types.DELETE_PRODUCT_SUCCESS: {
			toast.success(msg.MSG_DELETE_PRODUCT_SUCCESS(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			
			return {
				...state,
				listProducts: [...state.listProducts].filter(item => item.id !== payload.id)
			}
		}
		case types.ADD_TO_CART: {
			const itemAdd = {...payload, inCart: true, count: 1, totalPrice: ((payload.count+1) * payload.price)}
			const listCart = [...state.listCart, itemAdd]
			toast.success(msg.MSG_ADD_TO_CART(payload.title), {
				position: toast.POSITION.TOP_LEFT
			})
			const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || []
			productsInCart.push(itemAdd)
			localStorage.setItem('productsInCart', JSON.stringify(productsInCart))
			
			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart),
				listProducts: [...state.listProducts].map(item => item.id === payload.id ? itemAdd : item)
			}
		}
		case types.REMOVE_ITEM: {
			const listCart = [...state.listCart].filter(item => item.id !== payload)
			const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {}
			const newProductsInCart = productsInCart.filter(item => item.id !== payload)
			localStorage.setItem('productsInCart', JSON.stringify(newProductsInCart))

			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart),
				listProducts: [...state.listProducts].map(item => item.id === payload ? {...item, inCart: false, count: 0, totalPrice: 0} : item)
			}
		}
		case types.CLEAR_CART: {
			localStorage.removeItem('productsInCart')
			
			return {
				...state,
				listCart: [],
				totalPrice: 0,
				listProducts: [...state.listProducts].map(item => ({...item, inCart: false}))
			}
		}
		case types.INCREASE_CART: {
			const { id, count, price, inStore } = payload
			if (count === inStore) {
				toast.warn(msg.MSG_MAX_PRODUCT_IN_STORE(inStore))
				
				return {
					...state
				}
			}
			const listCart = [...state.listCart].map(item => item.id === id ? {...item, count: count+1, totalPrice: (count+1) * price} : item)
			const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {}
			const newProductsInCart = productsInCart.map(item => item.id === id ? {...item, count: count+1, totalPrice: (count+1) * price} : item)
			localStorage.setItem('productsInCart', JSON.stringify(newProductsInCart))

			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		case types.DECREASE_CART: {
			const { id, count, price } = payload
			if (count === 1) {
				const listCart = [...state.listCart].filter(item => item.id !== id)
				const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || {}
				const newProductsInCart = productsInCart.filter(item => item.id !== id)
				localStorage.setItem('productsInCart', JSON.stringify(newProductsInCart))
				
				return {
					...state,
					listCart,
					listProducts: [...state.listProducts].map(item => item.id === id ? {...item, inCart: false, count: 0, totalPrice: 0} : item),
					totalPrice: getTotalPrice(listCart)
				}
			}
			const listCart = [...state.listCart].map(item => item.id === id ? {...item, count: count-1, totalPrice: (count-1) * price} : item)
			
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

export default productsReducer