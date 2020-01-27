import { TransferConstants, Transfer } from './types'

export const registerTransfer = (transfer: Transfer) => ({
  type: TransferConstants.ACTION_REGISTER_TRANSFER,
  payload: {
    transfer
  }
})

export const getContacts = () => ({
  type: TransferConstants.ACTION_GET_CONTACTS,
  payload: {}
})

export const clearTransferStatus = () => ({
  type: TransferConstants.REDUCER_FETCH_TRANSFER_DATA,
  payload: {
    transferStatus: undefined
  }
})

export const clearContacts = () => ({
  type: TransferConstants.REDUCER_FETCH_TRANSFER_DATA,
  payload: {
    contacts: []
  }
})
