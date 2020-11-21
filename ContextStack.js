import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import Home from './components/Home';
import TransactionList from './components/TransactionList';
// import Header from './components/Header';
import Dashboard from './components/Dashboard';
// import testData from './testData';
import CustomDrawerContent from './components/NavDrawerComponent'

import { TransactionContext } from './components/providers/TransactionProvider';
import { AuthenticationContext } from './components/providers/AuthenticationProvider';

const Drawer = createDrawerNavigator();

const ContextStack = (props) => {
  const cashContext = useContext(TransactionContext);
  const authContext = useContext(AuthenticationContext)
    return (
      <Drawer.Navigator
        drawerPosition="left"
        drawerContent={(props) => <CustomDrawerContent {...props} user={authContext.user}/>}
        drawerContentOptions={{
          contentContainerStyle: {
            display: 'flex',
            // borderColor: 'green',
            backgroundColor: '#EAE6DA',
            height: '100%'
          },
          // itemStyle: {
          //   // backgroundColor: 'white'
          // },
          activeBackgroundColor: '#D3DEDF'
        }}
        drawerStyle={{
          minWidth: 240,
          height: '100%'
        }}
      >
        <Drawer.Screen name="Home" screenOptions={{ drawerLabel: 'Home' }}  >
          {props => <Home {...props} transactions={cashContext.transactions} />}
        </Drawer.Screen>

        <Drawer.Screen name="TransactionList" initialParams={{ mini: false, transactions: cashContext.transactions }}>
          {props => <TransactionList {...props} transactions={cashContext.transactions} />}
        </Drawer.Screen>

        <Drawer.Screen name="Dashboard" initialParams={{ mini: false, transactions: cashContext.transactions }}>
          {props => <Dashboard {...props} transactions={cashContext.transactions} />}
        </Drawer.Screen>
      </Drawer.Navigator>

    )
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