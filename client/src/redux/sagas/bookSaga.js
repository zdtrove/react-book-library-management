import * as booksTypes from '../books/booksTypes'
import { loadBooksApi, addBookApi, editBookApi, deleteBookApi } from '../../apis/booksApi'
import { call, takeEvery, takeLatest, put, delay, all } from 'redux-saga/effects'
import { loadBooksSuccess, loadBooksFailed, loadBooks, addBookSuccess, deleteBookSuccess, editBookSuccess } from '../books/booksActions'
import { showLoading, hideLoading, showLoadingButton, hideLoadingButton, hideModal, changeModalContent } from '../ui/uiActions'

function* loadBooksSaga({ payload }) {
	const { currentPage } = payload
	yield put(showLoading())
	const resp = yield call(loadBooksApi, payload)
	const { data, status } = resp
	if (status === 200) {
		yield put(loadBooksSuccess(
			{
				data: data.books, 
				totalBooks: data.total,
				currentPage
			}
		))
	} else {
		yield put(loadBooksFailed(data))
	}
	yield put(hideLoading())
}

function* filterBooksSaga({ payload }) {
	yield delay(500)
	yield put(loadBooks(payload))
}

function* addBookSaga({ payload }) {
	yield put(showLoadingButton())
	const resp = yield call(addBookApi, payload)
	const { data, status } = resp
	console.log(resp)
	if (status === 200) {
		yield put(addBookSuccess(data))
		yield put(hideModal())
		yield put(changeModalContent())
	}
	yield put(hideLoadingButton())
}

function* deleteBookSaga({ payload }) {
	yield put(showLoadingButton())
	const resp = yield call(deleteBookApi, payload._id)
	const { status } = resp
	if (status === 200) {
		yield put(deleteBookSuccess(payload))
		yield put(hideModal())
		yield put(changeModalContent())
	}
	yield put(hideLoadingButton())
}

function* editBookSaga({ payload }) {
	yield put(showLoadingButton())
	const resp = yield call(editBookApi, payload)
	const { data, status } = resp
	if (status === 200) {
		yield put(editBookSuccess(data))
		yield put(hideModal())
		yield put(changeModalContent())
	}
	yield put(hideLoadingButton())
}

function* bookSaga() {
	yield all([
		takeEvery(booksTypes.LOAD_BOOKS, loadBooksSaga),
		takeLatest(booksTypes.FILTER_BOOKS, filterBooksSaga),
		takeEvery(booksTypes.ADD_BOOK, addBookSaga),
		takeEvery(booksTypes.EDIT_BOOK, editBookSaga),
		takeEvery(booksTypes.DELETE_BOOK, deleteBookSaga)
	])
}

export default bookSaga