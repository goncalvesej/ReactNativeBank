import React from 'react'
import { Props } from './types'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// Resources
import { accent, backgroundLight, background, white } from '../../resources/styles/colors'

// Methods
import SizeNormalize from '../../helpers/SizeNormalize'
import { fakeLoadContactPicture } from '../../api/picture'
import { withNavigation } from 'react-navigation'
import FormatCurrency from '../../helpers/FormatCurrency'

const ContactTransferCell = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (props.onPress) {
          props.onPress(props.contact.amount || 0)
        }
      }}
    >
      <LinearGradient style={styles.pictureContainer} colors={[accent, backgroundLight]}>
        <Text style={styles.firstLetter}>{props.contact.name[0]}</Text>
        <Image source={fakeLoadContactPicture(props.contact.id)} style={styles.picture} />
      </LinearGradient>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{props.contact.name}</Text>
        <Text style={styles.phone}>{props.contact.phone}</Text>
        <View style={styles.amountLine}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.amountText}>{FormatCurrency(props.contact.amount?.toString() || '0')}</Text>
        </View>
      </View>
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
  pictureContainer: {
    overflow: 'hidden',
    padding: SizeNormalize(5),
    width: SizeNormalize(80),
    height: SizeNormalize(80),
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  picture: {
    resizeMode: 'contain',
    width: '100%',
    borderRadius: 1000
  },
  name: {
    fontFamily: 'OpenSans-SemiBold',
    color: accent,
    fontSize: SizeNormalize(15)
  },
  phone: {
    fontFamily: 'OpenSans-Regular',
    color: accent,
    fontSize: SizeNormalize(10)
  },
  textContainer: {
    flex: 1,
    // alignItems: 'center',
    padding: SizeNormalize(10)
  },
  firstLetter: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: SizeNormalize(30),
    fontFamily: 'OpenSans-Bold',
    color: background
  },
  amountLine: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  amountText: {
    fontSize: SizeNormalize(25),
    fontFamily: 'OpenSans-Bold',
    color: white
  },
  currencySymbol: {
    fontSize: SizeNormalize(20),
    fontFamily: 'OpenSans-Bold',
    color: accent,
    marginRight: SizeNormalize(5)
  }
})

export default withNavigation(ContactTransferCell)
