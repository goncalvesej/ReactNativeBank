export type AuthStore = {
  credentials?: Credentials
}

export type Credentials = {
  token: string
  name: string
  email: string
}

export enum AuthConstants {
  ACTION_AUTHENTICATE = 'ACTION_AUTHENTICATE',
  REDUCER_FETCH_AUTH_DATA = 'REDUCER_FETCH_AUTH_DATA'
}
