import produce from 'immer'
import { AnyAction } from 'redux'

import { AuthStore, AuthConstants } from './types'

const INITIAL_STORE: AuthStore = {
  credentials: undefined
}

export default (store = INITIAL_STORE, action: AnyAction) =>
  produce(store, draft => {
    const { payload } = action
    switch (action.type) {
      case AuthConstants.REDUCER_FETCH_AUTH_DATA:
        Object.assign(draft, payload)
        break
      default:
        break
    }
  })
