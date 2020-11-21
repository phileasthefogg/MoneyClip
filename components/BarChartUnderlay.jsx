import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import 'intl';
import 'intl/locale-data/jsonp/en';

const formatter = Intl.DateTimeFormat("en", { month: "short" })


const lerp = (v0, v1, t) => {
  return v0 + t * (v1 - v0);
}
const ROW_HEIGHT = 26;
const BarChartUnderlay = (props) => {
  const { minY, maxY, step, transactionsByMonth, height } = props;
  let currentMonth = new Date().getMonth();
  return (
    <View style={[StyleSheet.absoluteFill]}>
      <View style={{ flex: 1 }}>
        {[1, 0.66, 0.33, 0].map((t) => {
          return (
            <View style={{ flex: 1, justifyContent: 'space-between', top: 10 }} key={t}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: ROW_HEIGHT,
                  top: ((t === 0) ? ROW_HEIGHT / 2 : (t === 1) ? -ROW_HEIGHT / 2 : 0),
                }}
              >
                <View >
                  <Text style={{ margin: 5 }}>
                    {Math.round(lerp(0, maxY, t))}
                  </Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'grey', marginRight: 12 }} />
              </View>
            </View>
          )
        })}
      </View>
      <View style={{ left: '10%', bottom: '10%', position: 'absolute' }}>
        {
          props.transactionsByMonth.map((month, i) => {
            let currentMonth = new Date().getMonth();
            let monthStr = formatter.format(new Date().setMonth(currentMonth + i - 6));
            return (
              <View style={{ left: i * step, height: 0 }} key={monthStr}>
                <Text style={{ fontSize: 12, textAlign: 'center' }}>{monthStr}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default BarChartUnderlay;