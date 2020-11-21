import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import {AuthenticationContext} from '../components/providers/AuthenticationProvider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const LoadingScreen = ({navigation}) => {

  const AuthContext = useContext(AuthenticationContext);
  useEffect(()=>{
    let timer = setTimeout(()=>{
      if (AuthContext.user) {
        navigation.navigate('HomeScreen')
      } else {
        navigation.navigate('LoginScreen')
      }
    }, 1000);
    // clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00249C" />
    </View>
  );
};

export default LoadingScreen;