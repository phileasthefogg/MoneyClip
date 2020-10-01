import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'


import 'intl';
import 'intl/locale-data/jsonp/en';

const formatter = Intl.DateTimeFormat("en", {month: "short"})

/*
exampleProp
{
  10: 12312
  11: 123131
  12: 123131
  1: 12313
}

*/

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
  // console.log(props.data.length)
  let transactionsByMonth = getRecentMonths(props.data)
  let maxY = Math.max(...transactionsByMonth);
  let currentMonth = new Date().getMonth();
  // console.log(monthStr);
  let barWidth = (props.w * .75) / 7;
  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {transactionsByMonth.map((month, i) => {
          let monthStr = formatter.format(new Date().setMonth(currentMonth + i - 6));
          if (month) {
            let contentStyle = {
              backgroundColor: 'green',
              left: i * barWidth,
              height: lerp(0, props.h, month / maxY)
            }
            return (
              <View style={ styles.barContainer }>
                <View style={[styles.bar, contentStyle, { display: 'flex' }]} key={month} />
                <Text style={{ left: i * barWidth + 10, top: '50%', fontSize: 12 }}>{monthStr}</Text>
              </View>
            )
          } else {
            return (
              <View style={ styles.barContainer }>
                <View style={[styles.bar, { display: 'flex', height: 0 }]} key={month} />
                <Text style={{ left: i * barWidth + 10, top: '50%', fontSize: 12 }}>{monthStr}</Text>
              </View>
            )
          }
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    padding: '5%'
  },
  chart: {
    height: '100%',
    width: '100%',
    // left: '5%'
    // backgroundColor: 'yellow',
    // display: 'flex',
    // flexDirection: 'row'
  },
  bar: {
    backgroundColor: 'rebeccapurple',
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    width: 20,
    height: 10,
    margin: 10,
    borderWidth: 1
  },
  barContainer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
  }
})

export default BarChart;