export type TransferStore = {
  contacts: Contact[]
  transfers: Transfer[]
  retrievingContacts: boolean
  sendingTransfer: boolean
  transferStatus?: boolean
}

export type Contact = {
  id: number
  name: string
  phone: string
  amount?: number
}

export type Transfer = {
  contactId: number
  amount: number
}

export enum TransferConstants {
  ACTION_GET_CONTACTS = 'ACTION_GET_CONTACTS',
  ACTION_REGISTER_TRANSFER = 'ACTION_REGISTER_TRANSFER',
  REDUCER_FETCH_TRANSFER_DATA = 'REDUCER_FETCH_TRANSFER_DATA'
}
