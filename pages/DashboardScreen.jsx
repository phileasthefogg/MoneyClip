import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {AuthenticationContext} from '../components/providers/AuthenticationProvider';


const DashboardScreen = ({navigation}) => {
  const AuthContext = useContext(AuthenticationContext)
  return (
    <View>
      <Text>Logged in as: {(AuthContext.user) ? AuthContext.user.uid : 'ERROR'}</Text>
      <Button
        onPress={()=>{
          AuthContext.signOut()
            .then(() => {
              navigation.navigate('LoginScreen')
              console.log('successfully signed out')
            })
            .catch(()=>{
              console.log('couldnt sign you out')
            })
        }}
        title="Logout"
      />
    </View>
  );
};

export default DashboardScreen;