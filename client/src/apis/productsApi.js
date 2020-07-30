import axios from 'axios'
import { API_URL, PER_PAGE } from '../constants'

export const loadProductsApi = async ({ searchParam, currentPage }) => {
	try {
		let url = `${API_URL}/products?_page=${currentPage}&_limit=${PER_PAGE}&_sort=id&_order=desc`
		if (searchParam !== null) {
			const { title, price } = searchParam
			if (title !== null && price !== null) {
				url += `&title_like=${title}&price_lte=${price}`
			} else if (title !== null) {
				url += `&title_like=${title}`
			} else if (price !== null) {
				url += `&price_lte=${price}`
			}
		}
		const response = await axios.get(url)
		return response
	} catch (error) {
		return error
	}
}

export const addProductApi = async product => {
	try {
		let url = `${API_URL}/products`
		const response = await axios.post(url, product)
		return response
	} catch (error) {
		return error
	}
}

export const editProductApi = async product => {
	const { id } = product
	try {
		let url = `${API_URL}/products/${id}`
		const response = await axios.put(url, product)
		return response
	} catch (error) {
		return error
	}
}

export const deleteProductApi = async id => {
	try {
		let url = `${API_URL}/products/${id}`
		const response = await axios.delete(url)
		return response
	} catch (error) {
		return error
	}
}