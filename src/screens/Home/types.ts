import { NavigationScreenProp } from 'react-navigation'
import { Credentials } from '../../store/auth/types'

type StoreProps = {
  navigation: NavigationScreenProp<any, any>
  credentials?: Credentials
}

type DispatchProps = {
  authenticate: () => void
}

export type Props = StoreProps & DispatchProps
