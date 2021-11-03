import React from 'react'
import OnBoarding from "./src/pages/OnBoarding"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FirstStep from "./src/pages/questions/FirstStep"
import SecondStep from "./src/pages/questions/SecondStep"
import ThirdStep from "./src/pages/questions/ThirdStep"
import MainScreen from "./src/pages/questions/MainScreen"

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={ {
          headerShown: false
        } }
      >
        <Stack.Screen name="Onboarding" component={ OnBoarding } />
        <Stack.Screen name="MainScreen" component={ MainScreen } />
        <Stack.Screen name="FirstStep" component={ FirstStep } />
        <Stack.Screen name="SecondStep" component={ SecondStep } />
        <Stack.Screen name="ThirdStep" component={ ThirdStep } />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
