import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Home from './components/Home';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import testData from './testData';

import firestore from './firebase/firestore';
const transactions = firestore.collection;
const database = firestore.app.database();

const Drawer = createDrawerNavigator();

const getTransactions = async () => {
  return await database.ref('transactions/').once('value', (snapshot) => {
    if (!Array.isArray(snapshot)) {
      // console.log(snapshot);
      // console.log(snapshot.val());
      // let keys = Object.keys(snapshot.val());
      // let values = Object.values(snapshot.val());
      // let records = [];
      // for (var x = 0; x <= keys.length - 1; x++) {
      //   let record = values[x];
      //   record.id = keys[x];
      //   records.push(record);
      // }
      // return records;
      return snapshot;
    }
  })
}

export default function App(props, { navigation, route }) {

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    setCount(count + 1);
    /*REALTIME DATABASE IMPLEMENTATION */
    console.log('usingEffect', count)
    // setLoading(true);
    /** */
    // database.ref('transactions/').on('value', (snapshot) => {
    //   console.log('new records loading',loading);
    //   if (snapshot.val()) {
    //     setLoading(true);
    //     let keys = Object.keys(snapshot.val());
    //     let values = Object.values(snapshot.val());
    //     let records = [];
    //     for (var x = 0; x <= keys.length - 1; x++) {
    //       let record = values[x];
    //       record.id = keys[x];
    //       records.push(record);
    //     }
    //     setList(records)
    //   }
    //   if (loading) {
    //     setLoading(false);
    //   }
    // })
    /** */

    getTransactions()
      .then((result) => {
        console.log(result.length);
        let keys = Object.keys(result.val());
        let values = Object.values(result.val());
        let records = [];
        for (var x = 0; x <= keys.length - 1; x++) {
          let record = values[x];
          record.id = keys[x];
          records.push(record);
        }
        setList(records);
      })
      .catch((err) => {
        console.log('ERROR GETTING TRANSACTIONS: ', err)
      })
      .finally(() => {
        console.log('done processing transactions', list.length)
        setLoading(false);
      })
    return (function cleanup() {
      console.log('useEffect cleanup')
    })()
  }, []);

  useFocusEffect(() => {
    console.log('focus loading: ', loading)
  }, [])

  if (!loading) {
    return (
      <Drawer.Navigator drawerPosition="left">
        <Drawer.Screen name="Home" screenOptions={{ drawerLabel: 'Home' }} initialParams={{ transactions: list }} >
          {props => <Home {...props} transactions={list} />}
        </Drawer.Screen>

        <Drawer.Screen name="TransactionList" initialParams={{ mini: false, transactions: list }}>
          {props => <TransactionList {...props} transactions={list} />}
        </Drawer.Screen>

        <Drawer.Screen name="Dashboard" initialParams={{ mini: false, transactions: list }}>
          {props => <Dashboard {...props} transactions={list} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  } else {
    return <ActivityIndicator />;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
