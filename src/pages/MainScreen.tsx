import React, { useEffect, useRef, useState } from "react"
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  StatusBar, ScrollView, Animated
} from "react-native"
import I18n from "../lang/_i18n"
import * as Animatable from "react-native-animatable"
import { storage } from "../../App"
import LinearGradient from "react-native-linear-gradient"
import RNMonthly from "react-native-monthly"
import ViewShot, { captureRef } from 'react-native-view-shot'
import Share from 'react-native-share'
import { AppOpenAdProvider, BannerAd, BannerAdSize, TestIds } from "@react-native-admob/admob"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import PushNotification from "react-native-push-notification"

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
  const [permissions, setPermissions] = useState({})
  const [textAchievement, setTextAchievement] = useState<string[]>([])
  const [textAchievementIndex, setTextAchievementIndex] = useState<number>(0)
  const [textAchievementAnim, setTextAchievementAnim] = useState<boolean>(true)
  const [splashDismissed, setSplashDismissed] = useState<boolean>(false)
  const [showInstagramStory, setShowInstagramStory] = useState<boolean>(false)
  const _MS_PER_DAY:number = 24 * 60 * 60 * 1000
  const _MS_PER_HOUR:number = 60 * 60 * 1000
  const _MS_PER_MIN:number = 60 * 1000
  const textAchievementsRef = useRef(new Animated.Value(0)).current

  const setInfos = async () => {
    await storage
      .load({ key: 'infos' })
      .then(it => {
        setTime(it.time)
        setDate(it.date)
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

  useEffect(() => {
    setInfos().then(r =>{
      setSplashDismissed(true)
      if (Platform.OS === 'ios') {
        Linking.canOpenURL('instagram://').then((val) => setShowInstagramStory(val))
      } else {
        Share.isPackageInstalled('com.instagram.android').then(({ isInstalled }) => setShowInstagramStory(isInstalled))
      }
      fadeIn()
      prepareAchievementText()
    })
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setTextAchievementAnim(!textAchievementAnim)
      textAchievementAnim ? fadeIn() : fadeOut()
    }, 4000)
    return () => clearInterval(interval)
  })

  const calculateOfCostPerDay = () => {
    return (perOfBoxPrice * perOfDay) / perOfBox
  }

  const calculateOfBranches = () => {
    return (calculateDays() - 1) * perOfDay
  }

  const calculateDays = () : number => {
    return Math.floor((nowTime - time) / _MS_PER_DAY) + 1
  }

  const calculateMin = () : number => {
    return Math.floor(((nowTime - time) / _MS_PER_MIN)) + 1
  }

  const calculateHour = () : number => {
    return Math.floor(((nowTime - time) / _MS_PER_HOUR)) + 1
  }

  const calculateActiveDays = () => {
    return Array.from({ length: calculateDays() - 1 }, (_, index) => index + 1)
  }

  const sendNotificationAndroid = (name, message) => {
    PushNotification.createChannel(
      {
        channelId: "specialid", // (required)
        channelName: "Special message", // (required)
        channelDescription: "Notification for special message", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      })
    PushNotification.localNotification({
      channelId:'specialid',
      title: name,
      message: message,
    })
  }

  const sendNotificationIos = (name, message) => {
    PushNotificationIOS.checkPermissions(callback => {
      callback.alert === false ? PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
        critical: true
      }).then(() => {
        PushNotificationIOS.addNotificationRequest({
          id: '1',
          title: name,
          body: message
        })
      }) : null
    })
  }

  const sendNotications = (name, message) => {
    if(Platform.OS === 'ios'){
      sendNotificationIos(name,message)
    } else {
      sendNotificationAndroid(name,message)
    }
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

  const prepareAchievementText = () => {
    const hr:number = calculateHour()
    const min:number = calculateMin()
    console.log('Saat',hr,min)
    switch (true) {
    case (hr >= 336):
      setTextAchievement(['later20min', 'later8hr', 'later24hr', 'later48hr', 'later72hr', 'later2w'])
      sendNotications('Tebrikler', textAchievement[5])
      break
    case (hr >= 72):
      setTextAchievement(['later20min', 'later8hr', 'later24hr', 'later48hr', 'later72hr'])
      sendNotications('Tebrikler', textAchievement[4])
      break
    case (hr >= 48):
      setTextAchievement(['later20min', 'later8hr', 'later24hr', 'later48hr'])
      sendNotications('Tebrikler', textAchievement[3])
      break
    case (hr >= 24):
      setTextAchievement(['later20min', 'later8hr', 'later24hr'])
      sendNotications('Tebrikler', textAchievement[2])
      break
    case (hr >= 2):
      setTextAchievement(['later20min', 'later8hr'])
      sendNotications('Tebrikler', textAchievement[1])
      break
    case (min >= 20):
      setTextAchievement(['later20min'])
      sendNotications('Tebrikler', textAchievement[0])
      console.log('setTextAchievement',textAchievement)
      break
    default:
      sendNotications('welcome','welcome')
      console.log('setTextAchievement',textAchievement)
      break
    }
  }

  const fadeIn = () => {
    Animated.timing(textAchievementsRef, {
      toValue: 1, useNativeDriver: false,
      duration: 2000
    }).start()
    const num = Math.floor(Math.random() * textAchievement.length)
    setTextAchievementIndex(num)
  }

  const fadeOut = () => {
    Animated.timing(textAchievementsRef, {
      toValue: 0, useNativeDriver: false,
      duration: 2000
    }).start()
  }

  return (
    <View style={ { flex: 1 } }>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={ styles.top_container } contentContainerStyle={ { flexGrow: 1 } }>
        <AppOpenAdProvider
          unitId={'ca-app-pub-2210071155853586/5814652669'}
          options={{ showOnColdStart: true, loadOnDismissed: splashDismissed }}
        >
          <>
            { splashDismissed ? (
              <LinearGradient colors={ ['#393E46','#222831'] } style={ styles.container }>
                <ViewShot ref={ shotRef }>
                  <Image style={ styles.logo } source={ require('../../assets/imgs/logo.png') }/>
                  <RNMonthly
                    itemContainerStyle={ { borderColor: '#f5f5f5' } }
                    numberOfDays={ 30 }
                    activeBackgroundColor="#2c2c2c"
                    inactiveBackgroundColor="#e1e1e1"
                    activeDays={ calculateActiveDays() }
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
                      { (calculateDays() - 1) * calculateOfCostPerDay() + ' ' + I18n.t('currency') }
                    </Text>
                  </View>
                  <View style={ styles.text_double }>
                    <Text style={ styles.anim_text_middle }>
                      { I18n.t('day') }
                    </Text>
                    <Text style={ [styles.anim_text_middle, styles.anim_text_middle_semi] }>
                      { /* eslint-disable-next-line @typescript-eslint/restrict-plus-operands */ }
                      { (calculateDays() - 1) + ' ' + I18n.t('day_day') + ' ' }
                    </Text>
                  </View>
                  <View style={ styles.text_double_achievements }>
                    <Animated.Text style={ [styles.anim_text_achievements,{ opacity: textAchievementsRef }] }>
                      { I18n.t(textAchievement[textAchievementIndex]) }
                    </Animated.Text>
                  </View>
                </ViewShot>
                <BannerAd style={ styles.banner } size={ BannerAdSize.BANNER } unitId={'ca-app-pub-2210071155853586/4960558385'} />
                <TouchableOpacity onPress={ takeASnapshot }>
                  <Text style={ styles.anim_text_middle_big_semi }>
                    { showInstagramStory ? 'Instagram Story ' + I18n.t('share') :I18n.t('share') }
                  </Text>
                </TouchableOpacity>
              </LinearGradient> ) : (setSplashDismissed(true)) }
          </>
        </AppOpenAdProvider>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  top_container: {
    flex: 1,
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
  anim_text_achievements:{
    fontSize: 15,
    color: '#f5f5f5',
    marginLeft: 20,
    marginVertical: 8,
    textAlign: 'center',
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
  text_double_achievements:{
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingEnd: 16,
    height: 60,
    marginHorizontal: 8
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
