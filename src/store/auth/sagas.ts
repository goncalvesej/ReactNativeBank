import { put, call, delay } from 'redux-saga/effects'
import { AuthConstants, Credentials } from './types'
import { fakeAuthenticate } from '../../api/auth'

export function* workerAuthenticate() {
  yield delay(4000)

  const credentials: Credentials = yield call(fakeAuthenticate)

  yield put({
    type: AuthConstants.REDUCER_FETCH_AUTH_DATA,
    payload: {
      credentials
    }
  })
}
