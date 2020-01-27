import produce from 'immer'
import { AnyAction } from 'redux'

import { TransferStore, TransferConstants } from './types'

const INITIAL_STORE: TransferStore = {
  contacts: [],
  transfers: [
    {
      contactId: 1,
      amount: 2000
    },
    {
      contactId: 2,
      amount: 20000
    },
    {
      contactId: 3,
      amount: 3000
    },
    {
      contactId: 4,
      amount: 52000
    },
    {
      contactId: 6,
      amount: 12000
    },
    {
      contactId: 7,
      amount: 22000
    }
  ],
  retrievingContacts: false,
  sendingTransfer: false,
  transferStatus: undefined
}

export default (store = INITIAL_STORE, action: AnyAction) =>
  produce(store, draft => {
    const { payload } = action
    switch (action.type) {
      case TransferConstants.REDUCER_FETCH_TRANSFER_DATA:
        Object.assign(draft, payload)
        break
      default:
        break
    }
  })
