import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, StatusBar, ScrollView, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import LottieView from 'lottie-react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'

// Resources
import { background, backgroundLight, white } from '../../resources/styles/colors'

// Components
import HeaderBar from '../../components/HeaderBar'

// Types
import { Props } from './types'
import { ApplicationStore } from '../../store/types'
import { Contact } from '../../store/transfer/types'

// Methods
import { getContacts, clearContacts } from '../../store/transfer/actions'
import ContactTransferCell from '../../components/ContactTransferCell'
import SizeNormalize from '../../helpers/SizeNormalize'
import Chart from '../../components/Chart'

const loadingList = require('../../resources/animations/loading-list.json')

const History = (props: Props) => {
  const [contactsTransfers, setContactsTransfers] = useState()
  useEffect(() => {
    if (!props.contacts.length) {
      props.getContacts()
    }
    return () => {
      props.clearContacts()
    }
  }, [])

  if (props.contacts.length && !contactsTransfers) {
    const _contactsTransfers: Contact[] = []
    for (let i = props.transfers.length - 1; i >= 0; i--) {
      const t = props.transfers[i]
      const c: Contact | undefined = _.find(props.contacts, (k: Contact) => k.id === t.contactId)
      if (c) {
        _contactsTransfers.push({ ...c, amount: t.amount })
      }
    }
    setContactsTransfers(_contactsTransfers)
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={background} />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={[background, backgroundLight]} style={styles.container}>
          <HeaderBar screenTitle={'HISTÓRICO DE ENVIOS'} />
          <Chart contactsTransfers={contactsTransfers} />
          {props.retrievingContacts ? (
            <LottieView speed={1.5} autoPlay loop source={loadingList} style={styles.animation} resizeMode={'cover'} />
          ) : contactsTransfers && contactsTransfers.length ? (
            <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.scrollView}>
              {contactsTransfers.map((c: Contact) => (
                <ContactTransferCell key={`${c.id}-${c.amount?.toString()}`} contact={c} />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyText}>Não há transferências</Text>
            </View>
          )}
        </LinearGradient>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  animation: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0.5
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    color: white,
    fontSize: SizeNormalize(20),
    fontFamily: 'OpenSans-Bold'
  },
  scrollView: {
    flex: 1
  }
})

const mapStoreToProps = (store: ApplicationStore) => ({
  contacts: store.transfer.contacts,
  transfers: store.transfer.transfers,
  retrievingContacts: store.transfer.retrievingContacts
})

const mapDispatchToProps = (disaptch: Dispatch) =>
  bindActionCreators(
    {
      getContacts,
      clearContacts
    },
    disaptch
  )

export default connect(mapStoreToProps, mapDispatchToProps)(History)
