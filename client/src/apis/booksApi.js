import axios from 'axios'
import { API_URL_MONGODB, PER_PAGE } from '../constants'

const blmToken = localStorage.getItem('blmToken') || null
const headers = { 
	headers: { Authorization: blmToken } 
}

export const loadBooksApi = async ({ searchParam = null, currentPage }) => {
	try {
		console.log(headers)
		let start = currentPage === 1 ? 0 : (currentPage * PER_PAGE) - PER_PAGE;
		let url = `${API_URL_MONGODB}/api/books/books?start=${start}`
		if (searchParam) {
			if (searchParam.title) url += `&title=${searchParam.title}`
			if (searchParam.price) url +=`&price=${searchParam.price}`
		}
		return await axios.get(url, headers)
	} catch (error) {
		return error
	}
}

export const addBookApi = async book => {
	try {
		let url = `${API_URL_MONGODB}/api/books/book`
		return await axios.post(url, book, headers)
	} catch (error) {
		return error
	}
}

export const editBookApi = async book => {
	try {
		let url = `${API_URL_MONGODB}/api/books/book/${book._id}`
		return await axios.put(url, book, headers)
	} catch (error) {
		return error
	}
}

export const deleteBookApi = async id => {
	try {
		let url = `${API_URL_MONGODB}/api/books/book/${id}`
		return await axios.delete(url, headers)
	} catch (error) {
		return error
	}
}