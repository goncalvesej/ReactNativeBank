import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../screens/Home'
import History from '../screens/History'
import Transfer from '../screens/Transfer'
import Contacts from '../screens/Contacts'

import { Platform, UIManager } from 'react-native'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export default createAppContainer(
  createStackNavigator(
    {
      Home,
      History,
      Transfer,
      Contacts
    },
    {
      initialRouteName: 'Home',
      mode: 'card',
      headerMode: 'none'
    }
  )
)
