import React from "react"
import { Image, StyleSheet, TouchableOpacity, Text, View, StatusBar } from "react-native"
import I18n from '../lang/_i18n'
import Video from "react-native-video"

const OnBoarding = (props:any) => {
  const buttonClickedHandler = () => {
    props.navigation.navigate('FirstNicotineStep')
  }

  return (
    <View style={ styles.container }>
      <StatusBar translucent backgroundColor="transparent" />
      <>
        <Video
          repeat
          resizeMode={ 'cover' }
          style={ styles.video }
          muted
          source={ require('../../assets/imgs/pexels.mp4') }
        />
      </>
      <>
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
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  video:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  anim_text_top:{
    fontSize: 32,
    textAlign: 'center',
    color: '#f5f5f5',
    marginTop: 48,
    marginBottom: 24,
    fontFamily: 'Nunito-SemiBold',
    alignSelf: 'center'
  },
  anim_text_middle:{
    fontSize: 18,
    color: '#f5f5f5',
    marginVertical: 12,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    alignSelf: 'center',
  },
  anim_text_bottom:{
    fontSize: 18,
    color: '#f5f5f5',
    marginTop: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 24,
    alignSelf: 'center',
    textAlign: 'center',
  },
  roundButton2: {
    margin: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    borderColor: '#f5f5f5',
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
