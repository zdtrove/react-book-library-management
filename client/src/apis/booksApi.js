import axios from 'axios'
import { API_URL_MONGODB, PER_PAGE } from '../constants'

export const getBooksApi = async ({ searchParam = null, currentPage, categories = null }) => {
	try {
		let start = currentPage === 1 ? 0 : (currentPage * PER_PAGE) - PER_PAGE;
		let url = `${API_URL_MONGODB}/api/books/books?start=${start}`
		if (searchParam) {
			if (searchParam.title) url += `&title=${searchParam.title}`
			if (searchParam.price) url +=`&price=${searchParam.price}`
		}
		if (categories) {
			url += `&categories=${categories}`
		}
		return await axios.get(url, {headers: { Authorization: localStorage.blmToken }})
	} catch (error) {
		return error
	}
}

export const loadMoreBookApi = async start => {
	try {
		let url = `${API_URL_MONGODB}/api/books/books?start=${start}`
		return await axios.get(url, {headers: { Authorization: localStorage.blmToken }})
	} catch (error) {
		return error
	}
}

export const addBookApi = async book => {
	try {
		let url = `${API_URL_MONGODB}/api/books/book`
		return await axios.post(url, book, {
			headers: { 
				Authorization: localStorage.blmToken,
				'Content-Type': 'multipart/form-data'
			}
		})
	} catch (error) {
		return error
	}
}

export const editBookApi = async book => {
	try {
		let url = `${API_URL_MONGODB}/api/books/book/${book._id}`
		return await axios.put(url, book, {headers: { Authorization: localStorage.blmToken }})
	} catch (error) {
		return error
	}
}

export const deleteBookApi = async id => {
	try {
		let url = `${API_URL_MONGODB}/api/books/book/${id}`
		return await axios.delete(url, {headers: { Authorization: localStorage.blmToken }})
	} catch (error) {
		return error
	}
}