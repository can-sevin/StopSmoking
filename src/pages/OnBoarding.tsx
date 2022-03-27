import React, { useRef } from "react"
import { Dimensions, Image, StyleSheet, TouchableOpacity, Animated, Text, Easing } from "react-native"
import I18n from '../lang/_i18n'
import LinearGradient from "react-native-linear-gradient"

const dimensions = Dimensions.get('window')

const OnBoarding = (props:any) => {
  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!')
    props.navigation.navigate('FirstStep')
  }

  const bottomAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(bottomAnim, {
      delay: 2500, easing: Easing.bounce, isInteraction: undefined,
      useNativeDriver: true,
      toValue: 0.4,
      duration: 2500
    }).start()
  }

  return (
    <LinearGradient colors={ ['#393E46','#222831'] } style={ styles.container }>
      <Animated.Image style={ styles.logo } source={ require('../../assets/imgs/cigar.png') }/>
      <Animated.View animation='bounceInDown' style={ styles.inside_container }>
        <Text style={ styles.anim_text_top }>
          { I18n.t('first_onBoarding') }
        </Text>
        <Text style={ styles.anim_text_middle }>
          { I18n.t('second_onBoarding') }
        </Text>
        <Text style={ styles.anim_text_middle }>
          { I18n.t('third_onBoarding') }
        </Text>
        <Text style={ styles.anim_text_bottom }>
          { I18n.t('forth_onBoarding') }
        </Text>
        <TouchableOpacity
          onPress={ buttonClickedHandler }
          style={ styles.roundButton2 }>
          <Image style={ styles.button_img } source={ require('../../assets/imgs/next.png') }/>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logo:{
    height: 96,
    width: 96,
    alignSelf: "center",
    marginBottom: dimensions.height * 0.036
  },
  inside_container:{
    backgroundColor: '#FFFFFF',
    borderRadius: 16
  },
  anim_text_top:{
    fontSize: dimensions.height * 0.036,
    color: '#323232',
    marginLeft: 18,
    marginTop: 48,
    marginBottom: 24,
    fontFamily: 'Nunito-SemiBold',
    alignSelf: 'flex-start',
  },
  anim_text_middle:{
    fontSize: dimensions.height * 0.024,
    color: '#323232',
    marginLeft: 20,
    marginVertical: 12,
    fontFamily: 'Nunito-Bold',
    alignSelf: 'flex-start',
  },
  anim_text_bottom:{
    fontSize: dimensions.height * 0.024,
    color: '#323232',
    marginLeft: 20,
    marginTop: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  roundButton2: {
    margin: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderColor: '#323232',
    borderWidth: 0.2,
    borderRadius: 100,
    backgroundColor: '#f5f5f5',
  },
  button_img:{
    height: 28,
    width: 28
  }
})

export default OnBoarding
