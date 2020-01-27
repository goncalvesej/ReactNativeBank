import { Contact } from '../../store/transfer/types'

export type Props = {
  contactsTransfers: Contact[]
}

export type ChartData = {
  [key: number]: {
    amount: number
    label: string
  }
}
