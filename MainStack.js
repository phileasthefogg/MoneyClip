/*This file was replaced by ContextStack */
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Home from './components/Home';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import testData from './testData'

// import firestore from './firebase/firestore';
// const transactions = firestore.collection;
// const database = firestore.app.database();

const Drawer = createDrawerNavigator();

const MainStack = (props, { navigation, route }) => {

  // const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    // setCount(count + 1);
    // console.log('usingEffect', count)
    const listener = database.ref('transactions/').on('value', (snapshot) => {
      // console.log('new MS records loading',loading);
      setLoading(true);
      setList([]);
      let updatedList = [];
      snapshot.forEach((doc) => {
        let transaction = doc.val();
        transaction.id = doc.key
        updatedList.push(transaction);
      })
      setList(updatedList);
      if (loading) {
        setLoading(false);
      }
    },[])
    return (() => {
      console.log('useEffect cleanup')
    })
  }, [update]);
/*Not sure what I was doing here, nothing is broken with this missing so meh */
  useFocusEffect(() => {
    console.log('focus loading: ', loading)
    if (props.route.params && update) {
      console.log('reset called');
      setUpdate(!!update);
      setTimeout(()=>{console.log(list.length), 1000})
    }
  })

  if (!loading) {
    return (
      <Drawer.Navigator drawerPosition="left" >
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

export default MainStack;