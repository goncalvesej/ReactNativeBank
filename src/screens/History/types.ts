import { Transfer, Contact } from '../../store/transfer/types'

type StoreProps = {
  transfers: Transfer[]
  contacts: Contact[]
  retrievingContacts: boolean
}
type DispatchProps = {
  getContacts: () => void
  clearContacts: () => void
}

export type Props = StoreProps & DispatchProps
