import { Transfer } from '../../store/transfer/types'

export type Props = {
  repeatTransfer: (amount: number) => void
  transfer: Transfer
}
