import React, { useState } from "react"
import { Image, ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import * as Animatable from 'react-native-animatable'
import I18n from '../../lang/_i18n'

const SecondStep = (props: any) => {
  const [perOfBox, setPerOfBox] = useState('')

  const buttonClickedHandler = () => {
    props.navigation.navigate('ThirdStep',{ perOfDay: props.perOfDay, perOfBox: perOfBox })
  }

  return (
    <ImageBackground source={ require('../../../assets/imgs/backback.png') } style={ styles.container }>
      <Animatable.View animation='bounceInDown' style={ styles.inside_container }>
        <Text style={ styles.anim_text_middle }>
          { I18n.t('second_question') }
        </Text>
        <View>
          <TextInput placeholder='__' autoFocus={ true }
            maxLength={ 2 } keyboardType={ "number-pad" }
            style={ styles.inputText } onChangeText={ (val) => setPerOfBox(val) }/>
        </View>
        <TouchableOpacity
          disabled={ perOfBox === '' }
          onPress={ buttonClickedHandler }
          style={ styles.roundButton2 }>
          <Image style={ styles.button_img } source={ require('../../../assets/imgs/next.png') }/>
        </TouchableOpacity>
      </Animatable.View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
  inside_container:{
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 320,
    justifyContent: 'space-between',
  },
  anim_text_middle:{
    fontSize: 22,
    color: '#323232',
    marginLeft: 20,
    textAlign: 'center',
    marginHorizontal: 8,
    marginVertical: 24,
    fontFamily: 'Nunito-SemiBold',
    alignSelf: 'center',
  },
  roundButton2: {
    margin: 20,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    borderColor: '#323232',
    borderWidth: 0.2,
    borderRadius: 100,
    backgroundColor: '#f5f5f5',
  },
  button_img:{
    height: 36,
    width: 36
  },
  inputText:{
    marginVertical: 12,
    fontSize: 40,
    minWidth: 64,
    minHeight: 64,
    lineHeight: 64,
    padding: 10,
    fontFamily: 'Nunito-Bold',
    color: '#323232',
    alignSelf: 'center',
    textAlign: 'center',
  }
})

export default SecondStep
