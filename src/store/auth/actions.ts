import { AuthConstants } from './types'

export const authenticate = () => ({
  type: AuthConstants.ACTION_AUTHENTICATE,
  payload: {}
})
