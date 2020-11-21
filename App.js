import React, { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {firebase} from './firebase/firebase'


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import {AuthenticationContext} from './components/providers/AuthenticationProvider'

import Login from './pages/LoginScreen';
import Signup from './components/SignUp';
import Main from './pages/Main';


const AuthSwitchNavigator = createSwitchNavigator({
  Login: Login,
  Signup: Signup
});

const AuthLoginContainer = createAppContainer(AuthSwitchNavigator)

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          // console.log('signin', result);
          console.log('AUTHENTICATED USER: ', result.user.uid)
          setUser(result.user);
          return new Promise((resolve, reject)=>{resolve(result.user)})
        })
        .catch((err) => {
          console.log('COULDNT AUTHENTICATE USE: ', err);
          return new Promise((resolve, reject) => {reject(err)})
          setUser(null);
        })
    },
    signOut: async () => {
      firebase.auth().signOut()
      .then(() => {
      // Sign-out successful.
        console.log('LOGGED OUT')
        setIsAuthenticated(false)
        setUser(null);
      })
      .catch((error) => {
      // An error happened.
      });
    },
    signUp: async (userEmail, userPassword) => {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
          .then((result) => {
            console.log('Created user: ', result.user.uid)
            setUser(user);
            return new Promise((resolve, reject) => {resolve(result.user)})
          })
          .catch((err) => {
            console.log('Couldnt create user: ', err);
            setUser(null);
            return new Promise((resolve, reject) => {reject(err)})
          })
    },
    user: user
  }))



  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user found', user.uid)
        setUser(user);
        authContext.user = user;
        setIsAuthenticated(true);
      } else {
        console.log('no user found')
        setUser(null);
        setIsAuthenticated(false);
        authContext.user = null;
      }
      return () => {
        console.log('AuthState Unsubscribe')
      }
    })
  }, [])

  return (
    <AuthenticationContext.Provider value={authContext}>
      {(isAuthenticated) ?
        <Main user={user}/> :
        <AuthLoginContainer/>
      }
    </AuthenticationContext.Provider>
  )
}

export default App;