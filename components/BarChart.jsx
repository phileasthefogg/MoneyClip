import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Underlay from './BarChartUnderlay';

import 'intl';
import 'intl/locale-data/jsonp/en';

const formatter = Intl.DateTimeFormat("en", {month: "short"})

//calculates which months to include given our data
const getRecentMonths = (array) => {
  let currentMonth = new Date().getMonth();
  let result = array.filter((el, i) => {
    return currentMonth - i <= 6 && currentMonth - i >= 0
  })
  return result;
}

const lerp = (v0, v1, t) => {
  return v0 + t * (v1 - v0);
}

const BarChart = (props) => {
  let transactionsByMonth = getRecentMonths(props.data);
  let maxY = Math.max(...transactionsByMonth);
  let currentMonth = new Date().getMonth();
  let barWidth = (props.w * .75) / 7;
  let height = props.h;
  return (
    <View style={styles.container}>
      <View style={styles.background} >
      <Underlay minY={0} maxY={maxY} step={barWidth} height={props.h} transactionsByMonth={transactionsByMonth}/>
      <View style={styles.chart}>
        {transactionsByMonth.map((month, i) => {
          let monthStr = formatter.format(new Date().setMonth(currentMonth + i - 6));
          if (month) {
            let contentStyle = {
              bottom: 2,
              backgroundColor: '#88B04B',
              left: i * barWidth,
              height: lerp(0, props.h, month / maxY)
            }
            return (
              <View style={ styles.barContainer } key={monthStr}>
                <View style={[styles.bar, contentStyle]}  />
              </View>
            )
          } else {
            return (
              <View style={ styles.barContainer } key={monthStr}>
                <View style={styles.bar} />
              </View>
            )
          }
        })}
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    margin: '10%',
  },
  chart: {
    height: '100%',
    width: '100%',
    left: '6.5%',
    bottom: '8.5%',
  },
  bar: {
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    width: 20,
    // height: 10,
    marginLeft: 11,
    marginRight: 10,
  },
  barContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    backgroundColor: 'pink'
  }
})

export default BarChart;