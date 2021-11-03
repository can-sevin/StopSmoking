import React, { Component, useState } from "react"
import { Image, ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import * as Animatable from 'react-native-animatable'
import I18n from '../lang/_i18n'

const OnBoarding = (props:any) => {
  const buttonClickedHandler = () => {
    console.log('You have been clicked a button!')
    props.navigation.navigate('FirstStep')
  }

  return (
    <ImageBackground source={ require('../../assets/imgs/backback.png') } style={ styles.container }>
      <Animatable.View animation='bounceInDown' style={ styles.inside_container }>
        <Animatable.Text style={ styles.anim_text_top }
          animation='bounceInLeft'
          delay={ 500 }
        >
          { I18n.t('first_onBoarding') }
        </Animatable.Text>
        <Animatable.Text style={ styles.anim_text_middle }
          animation='bounceInLeft'
          delay={ 800 }>
          { I18n.t('second_onBoarding') }
        </Animatable.Text>
        <Animatable.Text style={ styles.anim_text_middle }
          animation='bounceInLeft'
          delay={ 1200 }>
          { I18n.t('third_onBoarding') }
        </Animatable.Text>
        <Animatable.Text style={ styles.anim_text_bottom }
          animation='bounceInLeft'
          delay={ 1600 }>
          { I18n.t('forth_onBoarding') }
        </Animatable.Text>
        <TouchableOpacity
          onPress={ buttonClickedHandler }
          style={ styles.roundButton2 }>
          <Image style={ styles.button_img } source={ require('../../assets/imgs/next.png') }/>
        </TouchableOpacity>
      </Animatable.View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'flex-end',
  },
  inside_container:{
    backgroundColor: '#FFFFFF',
    borderRadius: 16
  },
  anim_text_top:{
    fontSize: 32,
    color: '#323232',
    marginLeft: 18,
    marginTop: 48,
    marginBottom: 24,
    fontFamily: 'Nunito-SemiBold',
    alignSelf: 'flex-start',
  },
  anim_text_middle:{
    fontSize: 16,
    color: '#323232',
    marginLeft: 20,
    marginVertical: 12,
    fontFamily: 'Nunito-Bold',
    alignSelf: 'flex-start',
  },
  anim_text_bottom:{
    fontSize: 16,
    color: '#323232',
    marginLeft: 20,
    marginTop: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  roundButton2: {
    margin: 20,
    width: 56,
    height: 56,
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
    height: 36,
    width: 36
  }
})

export default OnBoarding
