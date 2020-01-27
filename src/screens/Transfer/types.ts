import { Contact, Transfer } from '../../store/transfer/types'
import { NavigationScreenProp } from 'react-navigation'

type StoreProps = {
  contacts: Contact[]
  transfers: Transfer[]
  navigation: any
  sendingTransfer: boolean
  transferStatus?: boolean
}
type DispatchProps = {
  registerTransfer: (transfer: Transfer) => void
  clearTransferStatus: () => void
}

export type Props = StoreProps & DispatchProps
