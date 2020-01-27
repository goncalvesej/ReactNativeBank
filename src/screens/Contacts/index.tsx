import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView, StyleSheet, View, StatusBar, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import LottieView from 'lottie-react-native'

// Components
import HeaderBar from '../../components/HeaderBar'
import ContactCell from '../../components/ContactCell'

// Resources
import { background, backgroundLight } from '../../resources/styles/colors'

// Types
import { ApplicationStore } from '../../store/types'
import { Contact } from '../../store/transfer/types'
import { Props } from './types'

// Methods
import { getContacts, clearContacts } from '../../store/transfer/actions'

const loadingList = require('../../resources/animations/loading-list.json')

const Contacts = (props: Props) => {
  useEffect(() => {
    if (!props.retrievingContacts && !props.contacts.length) {
      props.getContacts()
    }
    return () => {
      props.clearContacts()
    }
  }, [])

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={background} />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={[background, backgroundLight]} style={styles.container}>
          <HeaderBar screenTitle={'ENVIAR DINHEIRO'} />
          {props.retrievingContacts ? (
            <LottieView speed={1.5} autoPlay loop source={loadingList} style={styles.animation} resizeMode={'cover'} />
          ) : (
            <ScrollView>
              {props.contacts.map((c: Contact) => (
                <ContactCell key={c.id} contact={c} />
              ))}
            </ScrollView>
          )}
          <View style={styles.container}></View>
        </LinearGradient>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  animation: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0.5
  }
})

const mapStoreToProops = (store: ApplicationStore) => ({
  contacts: store.transfer.contacts,
  retrievingContacts: store.transfer.retrievingContacts,
  transfers: store.transfer.transfers
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getContacts,
      clearContacts
    },
    dispatch
  )

export default connect(mapStoreToProops, mapDispatchToProps)(Contacts)
