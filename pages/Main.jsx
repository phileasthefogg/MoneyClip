import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
// import MainStackScreen from './MainStack';
import ContextStack from '../ContextStack.js';
import TransactionForm from '../components/TransactionForm.jsx'

import { NavigationContainer } from '@react-navigation/native';

import { TransactionProvider } from '../components/providers/TransactionProvider';
import {AuthenticationContext} from '../components/providers/AuthenticationProvider'
const RootStack = createStackNavigator();


const Main = ({navigation, user}) => {
  // const AuthContext = useContext(AuthenticationContext);
  const authorizedUser = user;
  return (
    <TransactionProvider user={authorizedUser}>
      <View style={{flex: 1, width: '100%'}}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal" >
          <RootStack.Screen name="MoneyClip" options={{ headerStyle: { height: 0 }, title: '' }}>
            {props => <ContextStack {...props} user={authorizedUser}/>}
          </RootStack.Screen>
          <RootStack.Screen name="Form" options={{ title: 'Create New Transaction' }}>
            {props => <TransactionForm {...props} user={authorizedUser}/>}
          </RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
      </View>
     </TransactionProvider>
  );
}

export default Main;