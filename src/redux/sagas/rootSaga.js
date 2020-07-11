import * as productsTypes from './../products/productsTypes'
import { loadProducts } from '../../apis/products'
import { call, takeEvery, put } from 'redux-saga/effects'
import { loadProductsSuccess, loadProductsFailed } from '../../redux/products/productsActions'
import { showLoadingProducts, hideLoadingProducts } from '../../redux/ui/uiActions'

function* loadProductsSaga() {
	yield put(showLoadingProducts())
	const resp = yield call(loadProducts)
	const { data, status } = resp
	if (status === 200) {
		yield put(loadProductsSuccess(data))
	} else {
		yield put(loadProductsFailed(data))
	}
	yield put(hideLoadingProducts())
}

function* rootSaga() {
	yield takeEvery(productsTypes.LOAD_PRODUCTS, loadProductsSaga)
}

export default rootSaga