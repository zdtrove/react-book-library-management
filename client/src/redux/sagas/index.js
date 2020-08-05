import { all, fork } from 'redux-saga/effects'
import * as bookSaga from './bookSaga'
import * as authSaga from './authSaga'

function* rootSaga() {
	yield all([
		...Object.values(bookSaga),
		...Object.values(authSaga)
	].map(fork))
}

export default rootSaga