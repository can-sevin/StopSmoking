import React from "react"
import { Dimensions, ImageBackground, StyleSheet, View, Text } from "react-native"
import { BarChart } from "react-native-chart-kit"
import I18n from "../../lang/_i18n"
import * as Animatable from "react-native-animatable"

const MainScreen = (props: any) => {
  const windowWidth = Dimensions.get('window').width
  const nowDate = new Date()
  nowDate.setDate(nowDate.getDate() + 30)

  const chartConfig = {
    backgroundGradientFrom: "#f5f5f5",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#f5f5f5",
    backgroundGradientToOpacity: 0.6,
    color: (opacity = 1) => `rgba(00, 00, 00, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  }

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      props.perOfBoxPrice !== undefined ? (
        {
          data: [props.perOfBoxPrice, props.perOfBoxPrice * 5, props.perOfBoxPrice * 10, props.perOfBoxPrice * 15, props.perOfBoxPrice * 30]
        }
      ) : (
        {
          data: [1, 5]
        }
      )
    ]
  }

  return (
    <ImageBackground source={ require('../../../assets/imgs/backback.png') } style={ styles.container }>
      <View style={ styles.inside_container }>
        <BarChart
          style={ styles.bar_chart }
          data={ data }
          width={ windowWidth }
          height={ 240 }
          yAxisLabel={ I18n.t('currency') }
          showValuesOnTopOfBars={ true }
          chartConfig={ chartConfig }
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
          <Text style={ [styles.anim_text_middle, { fontFamily: 'Nunito-SemiBold' }] }>
            { '1' + I18n.t('branch_branch') }
          </Text>
        </View>
        <View style={ styles.text_double }>
          <Text style={ styles.anim_text_middle }>
            { I18n.t('cost') }
          </Text>
          <Text style={ [styles.anim_text_middle, { fontFamily: 'Nunito-SemiBold' }] }>
            { '30' + I18n.t('currency') }
          </Text>
        </View>
        <View style={ styles.text_double }>
          <Text style={ styles.anim_text_middle }>
            { I18n.t('day') }
          </Text>
          <Text style={ [styles.anim_text_middle, { fontFamily: 'Nunito-SemiBold' }] }>
            { '30' + I18n.t('day_day') }
          </Text>
        </View>
      </View>
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
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    height: 580,
    justifyContent: 'flex-start',
  },
  anim_text_middle:{
    fontSize: 18,
    color: '#323232',
    marginLeft: 20,
    marginVertical: 8,
    textAlign: 'center',
    marginHorizontal: 8,
    fontFamily: 'Nunito-Regular',
    alignSelf: 'center',
  },
  bar_chart:{
    marginVertical: 20
  },
  text_double:{
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingEnd: 16
  }
})

export default MainScreen
