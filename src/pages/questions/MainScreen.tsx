import React, { useEffect, useRef, useState } from "react"
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from "react-native"
import I18n from "../../lang/_i18n"
import * as Animatable from "react-native-animatable"
import { storage } from "../../../App"
import LinearGradient from "react-native-linear-gradient"
import RNMonthly from "react-native-monthly"
import { captureRef } from "react-native-view-shot"
import Share from "react-native-share"
import { AppOpenAdProvider, BannerAd, BannerAdSize, TestIds } from "@react-native-admob/admob"

const MainScreen = (props: any) => {
  const windowWidth = Dimensions.get('window').width
  const nowDate = new Date().getDate()
  const nowMonth = new Date().getMonth()
  const nowYear = new Date().getFullYear()
  const colors = ['#e1e1e1','#7e7e7e','#515151','#2c2c2c']
  const [perOfDay, setPerOfDay] = useState(0)
  const [perOfBox, setPerOfBox] = useState(0)
  const [perOfBoxPrice, setPerOfBoxPrice] = useState(0)
  const [date, setDate] = useState<any>('')
  const [splashDismissed, setSplashDismissed] = useState(false)

  const setInfos = () => {
    storage
      .load({ key: 'infos' })
      .then(it => {
        setPerOfDay(it.perOfDay)
        setPerOfBox(it.perOfBox)
        setPerOfBoxPrice(it.perOfBoxPrice)
        setDate(it.date)
        console.log('Top Date', it.date)
      })
    console.log('Top Middle Date', date)
  }

  const viewRef = useRef()

  useEffect(() =>{
    setInfos()
  },[])

  const getMonthOfDayNumber = () => {
    return new Date(nowYear, nowMonth + 1,0).getDate()
  }

  const getDifferenceOfDays = () => {
    return Array.from({ length: nowDate - date }, (_, i) => i+1)
  }

  const calculateOfDays = () => {
    console.log('Time', date, nowDate)
    return nowDate - date
  }

  const calculateOfBranches = () => {
    return perOfDay * calculateOfDays()
  }

  const calculateOfCost = () => {
    return (perOfDay/perOfBox) * perOfBoxPrice * calculateOfDays()
  }

  const takeASnapshot = async () => {
    try{
      const uri = await captureRef(viewRef,{
        format: 'png',
        quality: 0.8
      })
      await Share.open({ url: uri })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AppOpenAdProvider
      unitId={ TestIds.APP_OPEN }
      options={ { showOnColdStart: true, loadOnDismissed: splashDismissed } }
    >
      <>
        { splashDismissed ? (
          <LinearGradient colors={ ['#393E46','#222831'] } style={ styles.container }>
            <RNMonthly
              numberOfDays={ 30 }
              activeBackgroundColor="#2c2c2c"
              inactiveBackgroundColor="#e1e1e1"
              activeDays={ [1] }
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
                { calculateOfCost() + ' ' + I18n.t('currency') }
              </Text>
            </View>
            <View style={ styles.text_double }>
              <Text style={ styles.anim_text_middle }>
                { I18n.t('day') }
              </Text>
              <Text style={ [styles.anim_text_middle, styles.anim_text_middle_semi] }>
                { /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */ }
                { I18n.t('day_day') + ' ' + calculateOfDays() }
              </Text>
            </View>
            <BannerAd style={ styles.banner } size={ BannerAdSize.BANNER } unitId={ TestIds.BANNER } />
            <TouchableOpacity onPress={ takeASnapshot }>
              <Text style={ styles.anim_text_middle_big_semi }>
                { I18n.t('share') }
              </Text>
            </TouchableOpacity>
          </LinearGradient> ) : (setSplashDismissed(true)) }
      </>
    </AppOpenAdProvider>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default MainScreen
