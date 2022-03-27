import React, { useState } from "react"
import { Animated, Image, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Storage from "react-native-storage"
import AsyncStorage from "@react-native-community/async-storage"

export const storage = new Storage({
  size: 3,
  storageBackend: AsyncStorage,
  defaultExpires: null,
})

const SplashScreen = (props:any) => {
  const [opacity, setOpacity] = useState(new Animated.Value(0))

  const checkInfo = () => {
    AsyncStorage.getItem('infos')
      .then(ret => {
        if(ret === null)
          props.navigation.replace('Onboarding')
        else
          props.navigation.replace('MainScreen')
      })}

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 0.9,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }

  setTimeout(() => {
    checkInfo()
  }, 2500)

  return (
    <>
      <LinearGradient colors={ ['#393E46','#222831'] } style={ styles.container }>
        <Animated.Image onLoad={ onLoad } style={ [{
          opacity: opacity,
          transform: [
            {
              scale: opacity.interpolate({
                inputRange: [0.1, 0.9],
                outputRange: [0.85, 1],
              })
            },
          ],
        },
        styles.logo,
        ] } source={ require('../../assets/imgs/logo.png') }/>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    alignContent: 'center',
    width: 106,
    height: 111
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default SplashScreen
