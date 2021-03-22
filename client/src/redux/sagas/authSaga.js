import * as authTypes from '../../redux/auth/authTypes'
import { all, takeEvery, call, put } from 'redux-saga/effects'
import { 
    registerApi, 
    loginApi,
    loginAdminApi,
    getUsersApi, 
    getUserApi 
} from '../../apis/authApi'
import { 
    registerSuccess, 
    loginSuccess,
    loginAdminSuccess,
    getUserSuccess, 
    getUsersSuccess 
} from '../../redux/auth/authActions'

function* registerSaga({ payload }) {
    const resp = yield call(registerApi, payload)
    const { status, data } = resp
    if (status === 200) {
        yield put(registerSuccess(data))
    }
}

function* loginSaga({ payload }) {
    const resp = yield call(loginApi, payload)
    const { status, data } = resp
    if (status === 200) {
        yield put(loginSuccess(data))
    }
}

function* loginAdminSaga({ payload }) {
    const resp = yield call(loginAdminApi, payload)
    const { status, data } = resp
    if (status === 200) {
        yield put(loginAdminSuccess(data))
    }
}

function* getUsersSaga() {
    const resp = yield call(getUsersApi)
    const { status, data } = resp
    if (status === 200) {
        yield put(getUsersSuccess(data))
    }
}

function* getUserSaga() {
    const userId = localStorage.blmUserId
    const resp = yield call(getUserApi, userId)
    const { status, data } = resp
    if (status === 200) {
        yield put(getUserSuccess(data))
    }
}

function* authSaga() {
    yield all([
        takeEvery(authTypes.REGISTER, registerSaga),
        takeEvery(authTypes.LOGIN, loginSaga),
        takeEvery(authTypes.GET_USERS, getUsersSaga),
        takeEvery(authTypes.GET_USER, getUserSaga),
        takeEvery(authTypes.LOGIN_ADMIN, loginAdminSaga),
    ])
}

export default authSaga