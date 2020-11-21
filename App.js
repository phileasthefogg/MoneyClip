import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
// import MainStackScreen from './MainStack';
import ContextStack from './ContextStack';
import TransactionForm from './components/TransactionForm'

import { NavigationContainer } from '@react-navigation/native';

import { TransactionProvider } from './components/providers/TransactionProvider';
import {AuthenticationContext, AuthenticationProvider} from './components/providers/AuthenticationProvider'

const RootStack = createStackNavigator();
import LoginFlow from './Login'
import Login from './pages/LoginScreen';
import Signup from './components/SignUp';
import Main from './pages/Main';

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const AuthContext = useContext(AuthenticationContext);
  // useEffect(() => {
  //   if (AuthContext.user) {
  //     setIsAuthenticated(true);
  //   }
  // }, [])
  // if (isAuthenticated) {
  //   return (
  //     <AuthenticationContext>
  //       <Main />
  //     </AuthenticationContext>
  //   )
  // } else {
  return (
    <AuthenticationProvider>
      <LoginFlow/>
       {/* <NavigationContainer>
         <RootStack.Navigator >
           <RootStack.Screen
             name="Login"
             component={Login}
           />
           <RootStack.Screen name="Signup" component={Signup} />
         </RootStack.Navigator>
       </NavigationContainer> */}
    </AuthenticationProvider>
  );
  }
// }

export default App;