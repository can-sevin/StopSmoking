import React, { useEffect, useState } from "react"
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  StatusBar
} from "react-native"
import I18n from "../lang/_i18n"
import * as Animatable from "react-native-animatable"
import { storage } from "../../App"
import LinearGradient from "react-native-linear-gradient"
import RNMonthly from "react-native-monthly"
import ViewShot, { captureRef } from 'react-native-view-shot'
import Share from 'react-native-share'
import { AppOpenAdProvider, BannerAd, BannerAdSize, TestIds } from "@react-native-admob/admob"
import moment from "moment"

const MainScreen = () => {
  const windowWidth = Dimensions.get('window').width
  const nowMonth = new Date().getMonth()
  const nowYear = new Date().getFullYear()
  const nowDay = new Date().getDate()
  const nowTime = new Date().getTime()
  const [perOfDay, setPerOfDay] = useState<number>(0)
  const [perOfBox, setPerOfBox] = useState<number>(0)
  const [perOfBoxPrice, setPerOfBoxPrice] = useState<number>(0)
  const [year, setYear] = useState<number>(0)
  const [month, setMonth] = useState<number>(0)
  const [day, setDay] = useState<number>(0)
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<number>(0)
  const [splashDismissed, setSplashDismissed] = useState<boolean>(false)
  const [showInstagramStory, setShowInstagramStory] = useState<boolean>(false)
  const _MS_PER_DAY:number = 24 * 60 * 60 * 1000

  const setInfos = () => {
    storage
      .load({ key: 'infos' })
      .then(it => {
        setDate(it.date)
        setTime(it.time)
        setPerOfDay(it.perOfDay)
        setPerOfBox(it.perOfBox)
        setPerOfBoxPrice(it.perOfBoxPrice)
        setYear(it.year)
        setMonth(it.month)
        setDay(it.day)
        console.log('check:', it.perOfDay, it.perOfBox, it.perOfBoxPrice)
        console.log('check2:', it)
      })
  }
  const shotRef = React.createRef<ViewShot>()

  useEffect(() =>{
    setInfos()
    setSplashDismissed(true)
    if(Platform.OS === 'ios'){
      Linking.canOpenURL('instagram://').then((val) => setShowInstagramStory(val))
    } else {
      Share.isPackageInstalled('com.instagram.android').then(({ isInstalled }) => setShowInstagramStory(isInstalled))
    }
  },[])

  const calculateOfCostPerDay = () => {
    return (perOfBoxPrice * perOfDay) / perOfBox
  }

  const calculateOfBranches = () => {
    return calculateDays() * perOfDay
  }

  const calculateDays = () => {
    console.log('calculateDays', Math.floor((nowTime - time) / _MS_PER_DAY) + 3)
    return Math.floor((nowTime - time) / _MS_PER_DAY) + 1
  }

  const takeASnapshot = async () => {
    try{
      const uri = await captureRef(shotRef,{
        format: 'png',
        quality: 1
      })
      if(showInstagramStory){
        await Share.shareSingle({
          stickerImage: uri,
          social: Share.Social.INSTAGRAM_STORIES,
          backgroundTopColor: '#393E46',
          backgroundBottomColor: '#222831'
        })
      } else {
        await Share.open({ url: uri })
      }
    }
    catch (e) {

    }
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={ styles.top_container }>
        <AppOpenAdProvider
          unitId={ TestIds.APP_OPEN }
          options={ { showOnColdStart: true, loadOnDismissed: splashDismissed } }
        >
          <>
            { splashDismissed ? (
              <LinearGradient colors={ ['#393E46','#222831'] } style={ styles.container }>
                <ViewShot ref={ shotRef }>
                  <Image style={ styles.logo } source={ require('../../assets/imgs/logo_new.png') }/>
                  <RNMonthly
                    itemContainerStyle={ { borderColor: '#f5f5f5' } }
                    numberOfDays={ 30 }
                    activeBackgroundColor="#2c2c2c"
                    inactiveBackgroundColor="#e1e1e1"
                    activeDays={ [day] }
                    today={ calculateDays() }
                    todayTextStyle={ { color: '#020202', fontFamily:'Nunito-Bold',fontSize: 24, textAlign: 'center' } }
                    style={ { width: windowWidth * 0.9 } }
                  />
                  <Animatable.Text style={ styles.anim_text_middle }
                    animation='bounceInLeft'
                  >
                    { I18n.t('first_onBoarding') }
                  </Animatable.Text>
                  <View style={ styles.text_double }>
                    <Text style={ styles.anim_text_middle }>
                      { I18n.t('branch') }
                    </Text>
                    <Text style={ [styles.anim_text_middle, styles.anim_text_middle_semi] }>
                      { calculateOfBranches() }
                    </Text>
                  </View>
                  <View style={ styles.text_double }>
                    <Text style={ styles.anim_text_middle }>
                      { I18n.t('cost') }
                    </Text>
                    <Text style={ [styles.anim_text_middle, styles.anim_text_middle_semi] }>
                      { /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */ }
                      { calculateDays() * calculateOfCostPerDay() + ' ' + I18n.t('currency') }
                    </Text>
                  </View>
                  <View style={ styles.text_double }>
                    <Text style={ styles.anim_text_middle }>
                      { I18n.t('day') }
                    </Text>
                    <Text style={ [styles.anim_text_middle, styles.anim_text_middle_semi] }>
                      { /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */ }
                      { calculateDays() + '.' + I18n.t('day_day') + ' ' }
                    </Text>
                  </View>
                </ViewShot>
                <BannerAd style={ styles.banner } size={ BannerAdSize.BANNER } unitId={ TestIds.BANNER } />
                <TouchableOpacity onPress={ takeASnapshot }>
                  <Text style={ styles.anim_text_middle_big_semi }>
                    { showInstagramStory ? 'Instagram Story ' + I18n.t('share') :I18n.t('share') }
                  </Text>
                </TouchableOpacity>
              </LinearGradient> ) : (setSplashDismissed(true)) }
          </>
        </AppOpenAdProvider>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  top_container: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'flex-start',
    paddingTop: 64
  },
  anim_text_middle:{
    fontSize: 18,
    color: '#f5f5f5',
    marginLeft: 20,
    marginVertical: 8,
    textAlign: 'center',
    marginHorizontal: 8,
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center',
  },
  anim_text_middle_semi:{
    fontFamily: 'Nunito-SemiBold'
  },
  anim_text_middle_big_semi:{
    fontSize: 32,
    fontFamily: 'Nunito-SemiBold',
    marginVertical: 8,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  text_double:{
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingEnd: 16
  },
  banner:{
    alignSelf: 'center',
    margin: 24
  },
  logo: {
    alignSelf: 'center',
    alignContent: 'center',
    width: 96,
    height: 96,
    marginBottom: 8
  },
})

export default MainScreen
