import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions } from 'react-native';
import Header from './Header';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';

import { useFocusEffect, useIsFocused } from '@react-navigation/native'

import firestore from '../firebase/firestore';
const transactions = firestore.collection;

const width = Dimensions.get('window').width;

const Home = (props) => {

  // const updateTransactions = () => {
  //   console.log('update Transactions', updating)
  //   firestore.app.database().ref('transactions/').once('value', (snapshot)=> {
  //     let keys = Object.keys(snapshot.val());
  //     let values = Object.values(snapshot.val());
  //     let records = [];
  //     for (var x = 0; x <= keys.length - 1; x++) {
  //       let record = values[x];
  //       record.id = keys[x];
  //       records.push(record);
  //     }
  //     updateList(records)
  //     if (updating) {
  //       toggleUpdating(false);
  //     }
  //   })
  // }
  // console.log(props);
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} />
      {/*passing entire navigation object to subcomponent Dashboard */}
      <Dashboard mini={true} navigation={props.navigation} route={props.route} transactions={props.transactions} />
      <View>
        {/* Calling own navigation component, inherited from Screen instantiation on App.js
          Note that because this is a class component, we pull the navigation object off of props.
        */}
        <Button
          onPress={() => {
            console.log('button');
            props.navigation.navigate('Form')
          }}
          title="Create Transaction"
        />
      </View>

      <TransactionList transactions={props.transactions} mini={true} route={props.route} />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor: '#427AA1',
    backgroundColor: '#ebf2fa',
    alignItems: 'center',
  }
})