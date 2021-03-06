import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, ActivityIndicator } from 'react-native';
import Header from './Header';
import BarChart from './BarChart';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Dashboard = (props) => {
  const transactions = props.transactions || props.route.params.transactions;

  const transactionsByMonth = new Array(12).fill(0);
  for (var i = 0; i <= transactions.length - 1; i++) {
    let month = new Date(transactions[i].Date).getMonth()

    if (transactionsByMonth[month]) {
      transactionsByMonth[month] = transactionsByMonth[month] + transactions[i].Amount;
    } else {
      transactionsByMonth[month] = transactions[i].Amount;
    }
  }

  return ( transactions ?
    <View>
      {(!props.mini) ? <Header navigation={props.navigation}/> : null}
      <View style={styles.container}>
        <View style={styles.dashboardBackground}>
          <BarChart data={transactionsByMonth} w={width} h={(height) * .25}/>
        </View>
      </View>
    </View>
     :
    <ActivityIndicator></ActivityIndicator>
  );
}
//height - 435 = dashboard container size
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignSelf: 'center',
    marginTop: 10,
  },
  dashboardBackground: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: '#00249C',
    // borderWidth: .25,
    padding: 25,
    minHeight: (height * .37),
    width: width-20,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row'
  }

})