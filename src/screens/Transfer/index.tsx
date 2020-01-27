import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Animated,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import LottieView from 'lottie-react-native'

// Components
import HeaderBar from '../../components/HeaderBar'
import ContactCell from '../../components/ContactCell'

// Resources
import {
  background,
  backgroundLight,
  accent,
  white,
  gray,
  errorRed,
  successGreen
} from '../../resources/styles/colors'

// Types
import { ApplicationStore } from '../../store/types'
import { Contact, Transfer as TransferType } from '../../store/transfer/types'
import { Props } from './types'

// Methods
import { registerTransfer, clearTransferStatus } from '../../store/transfer/actions'
import SizeNormalize from '../../helpers/SizeNormalize'
import FormatCurrency from '../../helpers/FormatCurrency'
import ContactTransferCell from '../../components/ContactTransferCell'

const success = require('../../resources/animations/success.json')

const Transfer = (props: Props) => {
  const [amount, setAmount] = useState('0,00')
  const [error, setError] = useState(false)
  const [contactTransfers, setContactTransfers] = useState()

  useEffect(() => {
    if (!props.sendingTransfer && props.transferStatus !== undefined) {
      toggleStatusAnimation(props.transferStatus)
    }
    if (!contactTransfers) {
      const contact = props.navigation.getParam('contact') as Contact
      const _contactTransfers: Contact[] = []
      props.transfers.map((t: TransferType) => {
        if (t.contactId === contact.id) {
          _contactTransfers.push({
            ...contact,
            amount: t.amount
          })
        }
      })
      setContactTransfers(_contactTransfers)
    }
  })

  const clearError = () => {
    setError(false)
    props.clearTransferStatus()
  }

  const successAnimation = new Animated.Value(0)
  const succesProgress = new Animated.Value(0)
  const errorAnimation = new Animated.Value(0)

  const toggleStatusAnimation = (status: boolean) => {
    if (status) {
      Animated.sequence([
        Animated.timing(successAnimation, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(succesProgress, {
          toValue: 1,
          duration: 1000
        })
      ]).start()
      setTimeout(() => {
        props.navigation.pop(2)
      }, 2000)
    } else {
      setError(true)
      Animated.spring(errorAnimation, {
        toValue: 1,
        damping: 30
      }).start()
      setTimeout(() => {
        errorAnimation.setValue(0)
      }, 500)
    }
  }

  const repeatTransfer = (amount: number) => {
    handleTyping(amount.toString())
  }

  const sendTransfer = (amount: string) => {
    clearError()
    props.registerTransfer({
      contactId: (props.navigation.getParam('contact') as Contact).id,
      amount: Number(amount.replace(/\D/g, ''))
    })
  }

  const amountContainerLeft = errorAnimation.interpolate({
    inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    outputRange: [0, -10, 10, -10, 10, -10, 10, -10, 10, -10, 0],
    extrapolate: 'clamp'
  })

  const amountContainerTop = errorAnimation.interpolate({
    inputRange: [0, 0.1, 0.3, 0.6, 0.8, 1],
    outputRange: [0, 10, -15, -10, 20, 0],
    extrapolate: 'clamp'
  })

  const containerLeft = successAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2000],
    extrapolate: 'clamp'
  })
  const successContainerLeft = successAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-2000, 0],
    extrapolate: 'clamp'
  })

  const handleTyping = (text: string) => {
    clearError()
    setAmount(FormatCurrency(text))
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={background} />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={[background, backgroundLight]} style={styles.container}>
          <HeaderBar screenTitle={'ENVIANDO DINHEIRO'} />
          <Animated.View style={[styles.succesAnimationContainer, { left: successContainerLeft }]}>
            <LottieView
              progress={succesProgress}
              resizeMode={'cover'}
              style={styles.successAnimationView}
              source={success}
            />
            <Text style={styles.textSuccess}>SUCESSO!</Text>
          </Animated.View>
          <Animated.View style={[styles.container, { left: containerLeft }]}>
            <ContactCell contact={props.navigation.getParam('contact') as Contact} />
            <Animated.View
              style={[
                styles.amountContainer,
                { top: amountContainerTop, left: amountContainerLeft }
              ]}
            >
              {!error && (
                <Text style={styles.transferSummary}>Quanto você gostaria de enviar?</Text>
              )}
              {error && <Text style={styles.errorText}>Ops! Parece que houve um erro!</Text>}
              {error && <Text style={styles.errorText}>Tente novamente</Text>}
              <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>R$</Text>
                <TextInput
                  style={[styles.textInput, props.sendingTransfer && { color: gray }]}
                  value={amount}
                  onChangeText={handleTyping}
                  keyboardType={'number-pad'}
                  editable={!props.sendingTransfer}
                />
              </View>
              <TouchableOpacity
                style={[styles.button, props.sendingTransfer && { backgroundColor: gray }]}
                disabled={props.sendingTransfer}
                onPress={() => {
                  sendTransfer(amount)
                }}
              >
                <Text style={styles.buttonText}>
                  {props.sendingTransfer ? 'ENVIANDO...' : 'ENVIAR'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.lastTransfersText}>Últimas transferências</Text>
            <Text style={styles.touchToRepeat}>Toque para repetir</Text>
            {contactTransfers && (
              <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
                {contactTransfers.map((c: Contact) => (
                  <ContactTransferCell
                    key={`${c.id}-${c.amount?.toString()}`}
                    contact={c}
                    onPress={repeatTransfer}
                  />
                ))}
              </ScrollView>
            )}
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center'
  },
  animation: {},
  amountContainer: {
    borderRadius: 5,
    borderWidth: SizeNormalize(1),
    borderColor: accent,
    paddingHorizontal: SizeNormalize(5),
    paddingVertical: SizeNormalize(20),
    margin: SizeNormalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  button: {
    backgroundColor: accent,
    borderRadius: 5,
    padding: SizeNormalize(10),
    margin: SizeNormalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontFamily: 'OpenSans-Bold',
    color: white,
    fontSize: SizeNormalize(30)
  },
  errorText: {
    fontFamily: 'OpenSans-Bold',
    color: errorRed,
    fontSize: SizeNormalize(20)
  },
  transferSummary: {
    fontFamily: 'OpenSans-Regular',
    color: white,
    fontSize: SizeNormalize(20)
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: white,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: SizeNormalize(300),
    margin: SizeNormalize(10)
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    color: accent,
    fontSize: SizeNormalize(50),
    padding: SizeNormalize(5),
    margin: SizeNormalize(5),
    flex: 1
  },
  currencySymbol: {
    fontFamily: 'OpenSans-Bold',
    color: backgroundLight,
    fontSize: SizeNormalize(40)
  },
  textSuccess: {
    fontFamily: 'OpenSans-Bold',
    color: successGreen,
    fontSize: SizeNormalize(40)
  },
  succesAnimationContainer: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  successAnimationView: {
    width: '100%'
  },
  scrollView: {
    flex: 1
  },
  lastTransfersText: {
    fontFamily: 'OpenSans-Bold',
    color: white,
    fontSize: SizeNormalize(20),
    alignSelf: 'center'
  },
  touchToRepeat: {
    fontFamily: 'OpenSans-Regular',
    color: white,
    fontSize: SizeNormalize(15),
    alignSelf: 'center'
  }
})

const mapStoreToProops = (store: ApplicationStore) => ({
  transfers: store.transfer.transfers,
  sendingTransfer: store.transfer.sendingTransfer,
  transferStatus: store.transfer.transferStatus
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      registerTransfer,
      clearTransferStatus
    },
    dispatch
  )

export default connect(mapStoreToProops, mapDispatchToProps)(Transfer)
