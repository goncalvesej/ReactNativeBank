import { Credentials } from '../store/auth/types'
import { delay } from 'redux-saga/effects'

export const fakeAuthenticate = (): Credentials => {
  const credentials: Credentials = {
    email: 'eraldo@email.com',
    name: 'Eraldo Jr.',
    token: 'f@keT0k&n'
  }
  return credentials
}
