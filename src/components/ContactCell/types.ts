import { Contact } from '../../store/transfer/types'
import { NavigationScreenProp } from 'react-navigation'

type StoreProps = {
  navigation: NavigationScreenProp<any, any>
  contact: Contact
}

type DispatchProps = {
  clearTransferStatus: () => void
}

export type Props = StoreProps & DispatchProps
