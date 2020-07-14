import * as types from './productsTypes'
import * as msg from '../../constants'
import { toast } from 'react-toastify'

const initialState = {
	listProducts: [],
	listCart: [],
	totalPrice: 0,
	error: null
}

const getTotalPrice = listCart => {
	let totalPrice = 0;
	listCart.forEach(item => {
		totalPrice += item.totalPrice
	})
	return totalPrice
}

const findItem = (list, id) => {
	return list.find(item => item.id === id)
}

const findIndex = (list, id) => {
	return list.indexOf(findItem(list, id))
}

const productsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.LOAD_PRODUCTS: {
			return {
				...state
			}
		}
		case types.LOAD_PRODUCTS_SUCCESS: {
			return {
				...state,
				listProducts: payload,
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
		case types.ADD_TO_CART: {
			const listCart = [...state.listCart, payload]
			const product = listCart[findIndex(listCart, payload.id)]
			product.inCart = !product.inCart
			product.count = 1
			product.totalPrice = product.count * product.price
			toast.success(msg.MSG_ADD_TO_CART(product.title))

			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart),
				listProducts: [...state.listProducts]
			}
		}
		case types.REMOVE_ITEM: {
			const listCart = [...state.listCart]
			const product = listCart[findIndex(listCart, payload)]
			product.inCart = !product.inCart
			product.count = 0

			return {
				...state,
				listCart: listCart.filter(item => item.id !== payload),
				totalPrice: getTotalPrice(listCart),
				listProducts: [...state.listProducts]
			}
		}
		case types.CLEAR_CART: {
			const listProducts = [...state.listProducts].map(item => item.inCart === true ? {...item, inCart: false} : item)

			return {
				...state,
				listCart: [],
				totalPrice: 0,
				listProducts: listProducts
			}
		}
		case types.INCREASE_CART: {
			const listCart = [...state.listCart]
			const product = listCart[findIndex(listCart, payload)]
			if (product.count === product.inStore) {
				toast.warn(msg.MSG_MAX_PRODUCT_IN_STORE(product.inStore))
				return {
					...state,
					listCart
				}
			}
			product.count++
			product.totalPrice = product.count * product.price
			return {
				...state,
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		case types.DECREASE_CART: {
			const listCart = [...state.listCart]
			const product = listCart[findIndex(listCart, payload)]
			if (product.count === 1) {
				product.inCart = !product.inCart
				product.totalPrice = product.count * product.price
				const listCartFinal = listCart.filter(item => item.id !== payload)
				
				return {
					...state,
					listCart: listCartFinal,
					totalPrice: getTotalPrice(listCartFinal),
					listProducts: [...state.listProducts]
				}
			}
			product.count--
			product.totalPrice = product.count * product.price
			
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