import { all, takeLatest } from 'redux-saga/effects'
import { AuthConstants } from './types'
import { workerAuthenticate } from './sagas'

function* watcherAuthenticate() {
  yield takeLatest(AuthConstants.ACTION_AUTHENTICATE, workerAuthenticate)
}

export default function* authWatchers() {
  yield all([watcherAuthenticate()])
}
