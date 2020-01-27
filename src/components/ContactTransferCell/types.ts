import { Contact } from '../../store/transfer/types'

type StoreProps = {
  contact: Contact
}

type DispatchProps = {
  onPress?: (amount: number) => void
}

export type Props = StoreProps & DispatchProps
