import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Home from './components/Home';
import TransactionList from './components/TransactionList';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import testData from './testData';

import { TransactionContext } from './components/providers/TransactionProvider';


import firestore from './firebase/firestore';
const transactions = firestore.collection;
const database = firestore.app.database();

const Drawer = createDrawerNavigator();

const ContextStack = (props) => {

  const appState = useContext(TransactionContext);
  if (appState.transactions.length) {
    console.log('contextTransactions', appState.transactions.length);
    // setCount(appState.transactions.length);
    return (

        <Drawer.Navigator drawerPosition="left">
          <Drawer.Screen name="Home" screenOptions={{ drawerLabel: 'Home' }} initialParams={{ transactions: appState.transactions }} >
            {props => <Home {...props} transactions={appState.transactions} />}
          </Drawer.Screen>

          <Drawer.Screen name="TransactionList" initialParams={{ mini: false, transactions: appState.transactions }}>
            {props => <TransactionList {...props} transactions={appState.transactions} />}
          </Drawer.Screen>

          <Drawer.Screen name="Dashboard" initialParams={{ mini: false, transactions: appState.transactions }}>
            {props => <Dashboard {...props} transactions={appState.transactions} />}
          </Drawer.Screen>
        </Drawer.Navigator>

    )
  } else {
    return <View><Text>Couldnt Load your Stack</Text></View>
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

export default ContextStack;