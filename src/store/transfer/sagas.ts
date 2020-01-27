import { put, delay, select, Effect } from 'redux-saga/effects'
import { fakeGetContactsRequest } from '../../api/contacts'
import { TransferConstants, Contact } from './types'

export function* workerGetContacts() {
  yield put({
    type: TransferConstants.REDUCER_FETCH_TRANSFER_DATA,
    payload: {
      retrievingContacts: true
    }
  })
  yield delay(2000)
  const contacts = fakeGetContactsRequest()
  yield put({
    type: TransferConstants.REDUCER_FETCH_TRANSFER_DATA,
    payload: {
      contacts,
      retrievingContacts: false
    }
  })
}

export function* workerRegisterTransfer(action: Effect) {
  yield put({
    type: TransferConstants.REDUCER_FETCH_TRANSFER_DATA,
    payload: { sendingTransfer: true, transferStatus: undefined }
  })
  yield delay(2000)
  const transferStore = yield select(s => s.transfer)
  const { transfers, contacts } = transferStore
  const { transfer } = action.payload

  // Randonly refuses tranfer
  const randomNumber = Math.floor(Math.random() * 10)
  const transferStatus = randomNumber < 7

  const newTransfers = [...transfers]
  const _contacts: Contact[] = [...contacts]
  if (transferStatus) {
    newTransfers.push(transfer)
  }
  yield put({
    type: TransferConstants.REDUCER_FETCH_TRANSFER_DATA,
    payload: { transferStatus, sendingTransfer: false, transfers: newTransfers, contacts: [..._contacts] }
  })
}
