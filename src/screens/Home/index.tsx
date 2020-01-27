import React, { useState, useEffect } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import {
  Text,
  View,
  Image,
  Animated,
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Resources
import { connect } from 'react-redux'
import { accent, white, background, backgroundLight } from '../../resources/styles/colors'

// Types
import { ApplicationStore } from '../../store/types'
import { Props } from './types'
import { Routes } from '../../Router/types'

// Methods
import SizeNormalize from '../../helpers/SizeNormalize'
import { fakeGetPictureBase64 } from './helpers'
import { authenticate } from '../../store/auth/actions'

const loadingAnimation = require('../../resources/animations/loading.json')

const Home = (props: Props) => {
  const [profilePicture, setProfilePicture] = useState()
  const animationProgress = new Animated.Value(0)

  // Animations

  const navigateTo = (route: Routes) => {
    props.navigation.navigate(route)
  }

  const getProfilePicture = () => {
    if (!props.credentials) return
    setProfilePicture(fakeGetPictureBase64(props.credentials.token))
  }

  const animate = () => {
    Animated.timing(animationProgress, {
      duration: 500,
      toValue: 1
    }).start()
  }

  useEffect(() => {
    if (props.credentials) {
      getProfilePicture()
      animate()
    } else {
      props.authenticate()
    }
  })
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={background} />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={[background, backgroundLight]} style={styles.container}>
          <View style={styles.profileContainer}>
            <LinearGradient
              colors={[accent, backgroundLight]}
              style={[styles.pictureContainer, { opacity: props.credentials ? 1 : 0 }]}
            >
              <Image style={styles.picture} source={profilePicture} />
            </LinearGradient>
            <LottieView
              loop
              autoPlay
              source={loadingAnimation}
              style={[styles.loadingView, { opacity: props.credentials ? 0 : 1 }]}
            />
            <Text style={styles.name}>{props?.credentials?.name || 'Acessando...'}</Text>
            <Text style={styles.email}>
              {props?.credentials?.email || 'Levará apenas alguns segundos'}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.button, { right: props.credentials ? 0 : -2000 }]}
            onPress={() => {
              navigateTo(Routes.Contacts)
            }}
          >
            <Text style={styles.buttonText}>Enviar dinheiro</Text>
            <Icon name='send' style={styles.buttonIcon} size={SizeNormalize(22)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { left: props.credentials ? 0 : -2000 }]}
            onPress={() => {
              navigateTo(Routes.History)
            }}
          >
            <Text style={styles.buttonText}>Histórico de envios</Text>
            <Icon name='history' style={styles.buttonIcon} size={SizeNormalize(22)} />
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: accent,
    margin: SizeNormalize(5),
    padding: SizeNormalize(10)
  },
  buttonIcon: {
    color: white,
    alignSelf: 'flex-end',
    position: 'absolute',
    right: SizeNormalize(20),
    alignItems: 'center'
  },
  buttonText: {
    fontSize: SizeNormalize(20),
    color: white,
    alignSelf: 'center',
    fontFamily: 'OpenSans-Regular'
  },
  picture: {
    resizeMode: 'center',
    width: '100%',
    borderRadius: 1000
  },
  pictureContainer: {
    overflow: 'hidden',
    padding: SizeNormalize(5),
    width: SizeNormalize(200),
    height: SizeNormalize(200),
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: accent
  },
  reloadButton: {
    padding: SizeNormalize(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: white,
    fontFamily: 'OpenSans-Bold',
    fontSize: SizeNormalize(25)
  },
  email: {
    color: white,
    fontFamily: 'OpenSans-Italic',
    fontSize: SizeNormalize(15)
  },
  loadingText: {
    fontFamily: 'OpenSans-Regular',
    color: white,
    fontSize: SizeNormalize(25)
  },
  loadingView: {
    width: SizeNormalize(250),
    height: SizeNormalize(250),
    position: 'absolute'
  }
})

const mapStoreToProps = (store: ApplicationStore) => ({
  credentials: store.auth.credentials
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      authenticate
    },
    dispatch
  )

export default connect(mapStoreToProps, mapDispatchToProps)(Home)
