import React from "react"
import OnBoarding from "./src/pages/OnBoarding"
import SplashScreen from "./src/pages/SplashScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FirstStep from "./src/pages/questions/FirstStep"
import SecondStep from "./src/pages/questions/SecondStep"
import ThirdStep from "./src/pages/questions/ThirdStep"
import MainScreen from "./src/pages/MainScreen"
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'
import FirstNicotineStep from "./src/pages/questions/nicotine/FirstNicotineStep";
import SecondNicotineStep from "./src/pages/questions/nicotine/SecondNicotineStep";
import ThirdNicotineStep from "./src/pages/questions/nicotine/ThirdNicotineStep";
import ForthNicotineStep from "./src/pages/questions/nicotine/ForthNicotineStep";
import FifthNicotineStep from "./src/pages/questions/nicotine/FifthNicotineStep";
import SixthNicotineStep from "./src/pages/questions/nicotine/SixthNicotineStep";

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
          <Stack.Screen name="FirstNicotineStep" component={ FirstNicotineStep } />
          <Stack.Screen name="SecondNicotineStep" component={ SecondNicotineStep } />
          <Stack.Screen name="ThirdNicotineStep" component={ ThirdNicotineStep } />
          <Stack.Screen name="ForthNicotineStep" component={ ForthNicotineStep } />
          <Stack.Screen name="FifthNicotineStep" component={ FifthNicotineStep } />
          <Stack.Screen name="SixthNicotineStep" component={ SixthNicotineStep } />
          <Stack.Screen name="MainScreen" component={ MainScreen } />
        </Stack.Navigator>
      </>
    </NavigationContainer>
  )
}

export default App
