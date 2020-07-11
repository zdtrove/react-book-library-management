import axios from 'axios'

export const loadProducts = async () => {
	try {
		const response = await axios.get('http://localhost:5000/products')
		return response
	} catch (error) {
		return error
	}
}