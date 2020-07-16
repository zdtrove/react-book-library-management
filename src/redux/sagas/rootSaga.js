import * as productsTypes from './../products/productsTypes'
import { loadProductsApi, addProductApi, deleteProductApi } from '../../apis/productsApi'
import { call, takeEvery, takeLatest, put, delay } from 'redux-saga/effects'
import { loadProductsSuccess, loadProductsFailed, loadProducts, addProductSuccess, deleteProductSuccess } from '../../redux/products/productsActions'
import { showLoading, hideLoading, showLoadingButton, hideLoadingButton, hideModal } from '../../redux/ui/uiActions'

function* loadProductsSaga({ payload }) {
	yield put(showLoading())
	const resp = yield call(loadProductsApi, payload)
	const { data, status } = resp
	if (status === 200) {
		yield put(loadProductsSuccess(data))
	} else {
		yield put(loadProductsFailed(data))
	}
	yield put(hideLoading())
}

function* filterProductsSaga({ payload }) {
	yield delay(500)
	yield put(loadProducts(payload))
}

function* addProductSaga({ payload }) {
	yield put(showLoadingButton())
	const resp = yield call(addProductApi, payload)
	const { data, status } = resp
	if (status === 201) {
		yield put(addProductSuccess(data))
		yield put(hideModal())
	}
	yield put(hideLoadingButton())
}

function* deleteProductSaga({ payload }) {
	yield put(showLoadingButton())
	const resp = yield call(deleteProductApi, payload.id)
	const { status } = resp
	if (status === 200) {
		yield put(deleteProductSuccess(payload))
		yield put(hideModal())
	}
	yield put(hideLoadingButton())
}

function* rootSaga() {
	yield takeEvery(productsTypes.LOAD_PRODUCTS, loadProductsSaga)
	yield takeLatest(productsTypes.FILTER_PRODUCTS, filterProductsSaga)
	yield takeEvery(productsTypes.ADD_PRODUCT, addProductSaga)
	yield takeEvery(productsTypes.DELETE_PRODUCT, deleteProductSaga)
}

export default rootSaga