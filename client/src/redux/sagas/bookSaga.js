import * as bookTypes from '../books/bookTypes'
import { 
	getBooksApi, 
	addBookApi, 
	editBookApi, 
	deleteBookApi,
	loadMoreBookApi,
} from '../../apis/booksApi'
import { call, takeEvery, takeLatest, put, delay, all } from 'redux-saga/effects'
import { 
	getBooksSuccess, 
	getBooksFailed, 
	getBooks, 
	addBookSuccess, 
	deleteBookSuccess, 
	editBookSuccess,
	loadMoreBookSuccess,
} from '../books/bookActions'
import { showLoading, hideLoading, showLoadingButton, hideLoadingButton, hideModal, changeModalContent } from '../ui/uiActions'

function* getBooksSaga({ payload }) {
	const { currentPage } = payload
	yield put(showLoading())
	const resp = yield call(getBooksApi, payload)
	const { data, status } = resp
	if (status === 200) {
		yield put(getBooksSuccess(
			{
				data: data.books, 
				totalBooks: data.total,
				currentPage
			}
		))
	} else {
		yield put(getBooksFailed(data))
	}
	yield put(hideLoading())
}

function* loadMoreBookSaga({ payload }) {
	const { start } = payload
	const resp = yield call(loadMoreBookApi, start)
	const { data, status } = resp
	console.log(data)
	if (status === 200) {
		yield put(loadMoreBookSuccess(data.books))
	}
}

function* filterBooksSaga({ payload }) {
	yield delay(500)
	yield put(getBooks(payload))
}

function* addBookSaga({ payload }) {
	yield put(showLoadingButton())
	const resp = yield call(addBookApi, payload)
	const { data, status } = resp
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
		takeEvery(bookTypes.GET_BOOKS, getBooksSaga),
		takeLatest(bookTypes.FILTER_BOOKS, filterBooksSaga),
		takeEvery(bookTypes.ADD_BOOK, addBookSaga),
		takeEvery(bookTypes.EDIT_BOOK, editBookSaga),
		takeEvery(bookTypes.DELETE_BOOK, deleteBookSaga),
		takeEvery(bookTypes.LOAD_MORE_BOOK, loadMoreBookSaga),
	])
}

export default bookSaga