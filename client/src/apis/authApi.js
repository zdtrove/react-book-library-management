import axios from 'axios'
import { API_URL_MONGODB } from '../constants'

export const registerApi = async registerData => {
	try {
		let url = `${API_URL_MONGODB}/api/auth/register`
		const response = await axios.post(url, registerData)
		return response
	} catch (error) {
		return error
	}
}

export const loginApi = async loginData => {
	try {
		let url = `${API_URL_MONGODB}/api/auth/login`
		const response = await axios.post(url, loginData)
		return response
	} catch (error) {
		return error
	}
}