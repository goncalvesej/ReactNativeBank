import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Props } from './types'
import SizeNormalize from '../../helpers/SizeNormalize'
import { white, transparent } from '../../resources/styles/colors'

const HeaderBar = (props: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          props.navigation.goBack()
        }}
      >
        <Icon name={'chevron-left'} color={white} size={SizeNormalize(40)} />
      </TouchableOpacity>
      <Text style={styles.screenName}>{props.screenTitle}</Text>
      <View style={{ width: SizeNormalize(35) }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: transparent,
    flexDirection: 'row',
    padding: SizeNormalize(5),
    alignItems: 'center'
  },
  backButton: {
    width: SizeNormalize(35),
    padding: SizeNormalize(3),
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenName: {
    color: white,
    fontSize: SizeNormalize(20),
    fontFamily: 'OpenSans-SemiBold',
    flex: 1,
    textAlign: 'center'
  }
})

export default withNavigation(HeaderBar)
