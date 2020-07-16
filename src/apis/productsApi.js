import axios from 'axios'
import * as constants from '../constants'

export const loadProductsApi = async keyword => {
	try {
		let url = `${constants.API_URL}/products`
		if (keyword !== null) {
			url = `${constants.API_URL}/products?q=${keyword}`
		}
		const response = await axios.get(url)
		return response
	} catch (error) {
		return error
	}
}

export const addProductApi = async product => {
	try {
		let url = `${constants.API_URL}/products`
		const response = await axios.post(url, product)
		return response
	} catch (error) {
		return error
	}
}

export const deleteProductApi = async id => {
	try {
		let url = `${constants.API_URL}/products/${id}`
		const response = await axios.delete(url)
		return response
	} catch (error) {
		return error
	}
}