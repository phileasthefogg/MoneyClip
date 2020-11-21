import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import MainStackScreen from './MainStack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationProvider } from './components/providers/AuthenticationProvider';

import LoadingScreen from './pages/LoadingScreen.jsx'
import LoginScreen from './pages/LoginScreen.jsx'
import DashboardScreen from './pages/DashboardScreen.jsx'
import HomeScreen from './pages/Main.jsx'
import SignupScreen from './components/SignUp.jsx'

const AuthSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  SignupScreen: SignupScreen,
  HomeScreen: HomeScreen
});

//AppNavigator will be our root navigator
const AppNavigator = createAppContainer(AuthSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const LoginNavigator = () => {

  console.log('Login.js renders the AuthFlow')
  return (
    <AuthenticationProvider>
      <View style={styles.container}>
        <AppNavigator/>
      </View>
    </AuthenticationProvider>
  );
}

export default LoginNavigator

