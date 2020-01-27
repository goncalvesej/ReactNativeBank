import { all, takeLatest } from 'redux-saga/effects'
import { TransferConstants } from './types'
import { workerGetContacts, workerRegisterTransfer } from './sagas'

function* watcherGetContacts() {
  yield takeLatest(TransferConstants.ACTION_GET_CONTACTS, workerGetContacts)
}

function* watcherRegisterTransfer() {
  yield takeLatest(TransferConstants.ACTION_REGISTER_TRANSFER, workerRegisterTransfer)
}

export default function* transferWatchers() {
  yield all([watcherRegisterTransfer(), watcherGetContacts()])
}
