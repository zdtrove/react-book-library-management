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