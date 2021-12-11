import React, { useEffect, useState } from "react"
import OnBoarding from "./src/pages/OnBoarding"
import SplashScreen from "./src/pages/SplashScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FirstStep from "./src/pages/questions/FirstStep"
import SecondStep from "./src/pages/questions/SecondStep"
import ThirdStep from "./src/pages/questions/ThirdStep"
import MainScreen from "./src/pages/questions/MainScreen"
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

const Stack = createNativeStackNavigator()
export const storage = new Storage({
  size: 3,
  storageBackend: AsyncStorage,
  defaultExpires: null,
})

const App = () => {
  return (
    <NavigationContainer>
      <>
        <Stack.Navigator
          screenOptions={ {
            headerShown: false
          } }
          initialRouteName={ 'SplashScreen' }
        >
          <Stack.Screen name="SplashScreen" component={ SplashScreen } />
          <Stack.Screen name="Onboarding" component={ OnBoarding } />
          <Stack.Screen name="FirstStep" component={ FirstStep } />
          <Stack.Screen name="SecondStep" component={ SecondStep } />
          <Stack.Screen name="ThirdStep" component={ ThirdStep } />
          <Stack.Screen name="MainScreen" component={ MainScreen } />
        </Stack.Navigator>
      </>
    </NavigationContainer>
  )
}

export default App
