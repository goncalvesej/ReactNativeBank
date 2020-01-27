import { AuthStore } from './auth/types'
import { TransferStore } from './transfer/types'

export type ApplicationStore = {
  auth: AuthStore
  transfer: TransferStore
}
