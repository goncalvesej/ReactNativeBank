import React from 'react'
import { Props } from './types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

// Resources
import { accent, backgroundLight } from '../../resources/styles/colors'

// Methods
import SizeNormalize from '../../helpers/SizeNormalize'

const TransferCell = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.repeatTransfer(props.transfer.amount)
      }}
    >
      <Text style={styles.currencySymbol}>R$</Text>
      <Text style={styles.amountText}>{props.transfer.amount}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: SizeNormalize(1),
    borderColor: accent,
    margin: SizeNormalize(5),
    padding: SizeNormalize(5)
  },
  amountText: {
    fontSize: SizeNormalize(20),
    fontFamily: 'OpenSans-SemiBold',
    color: accent,
    margin: SizeNormalize(5)
  },
  currencySymbol: {
    fontSize: SizeNormalize(15),
    fontFamily: 'OpenSans-Bold',
    color: backgroundLight,
    margin: SizeNormalize(5)
  }
})

export default TransferCell
