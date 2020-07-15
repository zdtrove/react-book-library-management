import * as productsTypes from './../products/productsTypes'
import { loadProductsApi } from '../../apis/productsApi'
import { call, takeEvery, takeLatest, put, delay } from 'redux-saga/effects'
import { loadProductsSuccess, loadProductsFailed, loadProducts } from '../../redux/products/productsActions'
import { showLoadingProducts, hideLoadingProducts } from '../../redux/ui/uiActions'

function* loadProductsSaga({ payload }) {
	yield put(showLoadingProducts())
	const resp = yield call(loadProductsApi, payload)
	const { data, status } = resp
	if (status === 200) {
		yield put(loadProductsSuccess(data))
	} else {
		yield put(loadProductsFailed(data))
	}
	yield put(hideLoadingProducts())
}

function* filterProductsSaga({ payload }) {
	yield delay(500)
	yield put(loadProducts(payload))
}

function* rootSaga() {
	yield takeEvery(productsTypes.LOAD_PRODUCTS, loadProductsSaga)
	yield takeLatest(productsTypes.FILTER_PRODUCTS, filterProductsSaga)
}

export default rootSaga