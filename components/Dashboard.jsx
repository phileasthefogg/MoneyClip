import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, ActivityIndicator } from 'react-native';
import Header from './Header';

const width = Dimensions.get('window').width;

const Dashboard = (props, { navigation, route }) => {
  // console.log((props.mini) ? 'Minified Dashboard!' : 'Normal Dashboard');
  const transactions = props.route.params.transactions;
  // console.log(transactions);
  // console.log('Dash', transactions.length)
  return ( transactions ?
    <View>
      {(!props.mini) ? <Header navigation={props.navigation}/> : null}
      <View style={styles.container}>
        <View style={styles.dashboardBackground}>
          <Text>{transactions.length}</Text>
        </View>
      </View>
    </View>
     :
    <ActivityIndicator></ActivityIndicator>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignSelf: 'center',
    marginTop: 10
  },
  dashboardBackground: {
    backgroundColor: '#ebf2fa',
    borderRadius: 15,
    borderColor: '#679436',
    borderWidth: 3,
    padding: 10,
    height: 300,
    width: width - (width * .1)
  }

})