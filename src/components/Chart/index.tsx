import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

// Types
import { Props, ChartData } from './types'
import SizeNormalize from '../../helpers/SizeNormalize'
import { accent, white } from '../../resources/styles/colors'
import { Contact } from '../../store/transfer/types'
import { normalizeName } from './helpers'

const Chart = (props: Props) => {
  const [chartData, setChartData] = useState()
  const [widthAppend, setWidthAppend] = useState()

  let count = 0
  useEffect(() => {
    if (!chartData && props.contactsTransfers) {
      const baseData: ChartData = {}

      props.contactsTransfers.map((c: Contact) => {
        if (baseData[c.id]) {
          baseData[c.id].amount += (c.amount || 0) / 100
        } else {
          if (count < 5) {
            count++
            baseData[c.id] = {
              amount: (c.amount || 0) / 100,
              label: normalizeName(c.name)
            }
          }
        }
      })
      const labels: string[] = []
      const data: number[] = []
      Object.keys(baseData).map((key: any) => {
        data.push(baseData[key].amount)
        labels.push(baseData[key].label)
      })
      const chartData = {
        labels,
        datasets: [
          {
            data,
            strokeWidth: 2
          }
        ]
      }
      const widthAppend = count < 5 ? 0 : count * 10
      setWidthAppend(SizeNormalize(widthAppend))

      setChartData(chartData)
    }
  })

  return props.contactsTransfers && props.contactsTransfers.length ? (
    <View style={styles.container}>
      {chartData && (
        <ScrollView horizontal>
          <BarChart
            data={chartData}
            width={Dimensions.get('window').width + widthAppend} // from react-native
            height={Dimensions.get('window').height * 0.25}
            yAxisLabel={'R$'}
            yAxisSuffix={''}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'rgba(255, 0, 0, 0)',
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              backgroundGradientTo: 'rgba(0, 0, 0, 0)',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0) => `rgba(0, 168, 170, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 168, 170, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </ScrollView>
      )}
    </View>
  ) : (
    <View />
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: Dimensions.get('window').height * 0.3,
    borderBottomWidth: 1,
    borderColor: accent,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    color: white,
    fontFamily: 'OpenSans-Bold',
    fontSize: SizeNormalize(20)
  }
})
export default Chart
