import { Contact } from '../../store/transfer/types'

type StoreProps = {
  contacts: Contact[]
  retrievingContacts: boolean
}
type DispatchProps = {
  getContacts: () => void
  clearContacts: () => void
}

export type Props = StoreProps & DispatchProps
