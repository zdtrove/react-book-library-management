import * as types from './cartTypes'
import * as msg from '../../constants'
import { toast } from 'react-toastify'

const initialState = {
	listCart: [],
	totalPrice: 0
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

const cartReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.ADD_TO_CART: {
			const listCart = [...state.listCart, payload]
			const product = listCart[findIndex(listCart, payload.id)]
			product.inCart = !product.inCart
			product.count = 1
			product.totalPrice = product.count * product.price
			toast.success(msg.MSG_ADD_TO_CART(product.title))

			return {
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		case types.REMOVE_ITEM: {
			const listCart = [...state.listCart]
			const product = listCart[findIndex(listCart, payload)]
			product.inCart = !product.inCart
			product.count = 0

			return {
				listCart: listCart.filter(item => item.id !== payload),
				totalPrice: getTotalPrice(listCart)
			}
		}
		case types.CLEAR_CART: {
			[...state.listCart].map(item => item.inCart = false)

			return {
				listCart: [],
				totalPrice: 0
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
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		case types.DECREASE_CART: {
			const listCart = [...state.listCart]
			const product = listCart[findIndex(listCart, payload)]
			if (product.count === 1) {
				product.inCart = false
				product.totalPrice = product.count * product.price
				const listCartFinal = listCart.filter(item => item.id !== payload)
				
				return {
					listCart: listCartFinal,
					totalPrice: getTotalPrice(listCartFinal)
				}
			}
			product.count--
			product.totalPrice = product.count * product.price
			
			return {
				listCart,
				totalPrice: getTotalPrice(listCart)
			}
		}
		default: {
			return state
		}
	}
}

export default cartReducer