import { combineReducers, applyMiddleware, Store, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import auth from './auth/reducers'
import transfer from './transfer/reducers'

import authWatchers from './auth/watchers'
import transferWatchers from './transfer/watchers'
import { ApplicationStore } from './types'

const reducers = combineReducers({
  auth,
  transfer
})

const sagaMiddleware = createSagaMiddleware()
const store: Store<ApplicationStore> = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(authWatchers)
sagaMiddleware.run(transferWatchers)

export default store
