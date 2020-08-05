import * as authTypes from '../../redux/auth/authTypes'
import { all, takeEvery, call, put } from 'redux-saga/effects'
import { registerApi, loginApi } from '../../apis/authApi'
import { registerSuccess, loginSuccess } from '../../redux/auth/authActions'

function* registerSaga({ payload }) {
    const resp = yield call(registerApi, payload)
    console.log(resp);
    const { status, data } = resp
    if (status === 200) {
        yield put(registerSuccess(data))
    }
}

function* loginSaga({ payload }) {
    const resp = yield call(loginApi, payload)
    console.log(resp);
    const { status, data } = resp
    if (status === 200) {
        yield put(loginSuccess(data))
    }
}

function* authSaga() {
    yield all([
        takeEvery(authTypes.REGISTER, registerSaga),
        takeEvery(authTypes.LOGIN, loginSaga)
    ])
}

export default authSaga