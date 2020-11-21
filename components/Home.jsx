import React, { useState, useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button, ScrollView, Dimensions } from 'react-native';
import Header from './Header';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';

import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import {AuthenticationContext} from '../components/providers/AuthenticationProvider'
// import firestore from '../firebase/firestore';
// const transactions = firestore.collection;

const width = Dimensions.get('window').width;

const Home = (props) => {
  const colors = {
    darkBlue: '#00249C',
    yellow: '#F4AF23',
    turqouise: '#A7E6D7',
    red: '#E47359',
    grey: '#39444A'
  }
  const AuthContext = useContext(AuthenticationContext)
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} color={colors.yellow}/>
      {/*passing entire navigation object to subcomponent Dashboard */}
      <Dashboard mini={true} navigation={props.navigation} route={props.route} transactions={props.transactions} />
      <TransactionList transactions={props.transactions} mini={true} route={props.route} />
      <View style={{position: 'absolute', backgroundColor: 'transparent', borderWidth: 1, borderRadius: 50, height: 70, width: 70, bottom: 20, right: 20}}>

      </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#EAE6DA',
    // backgroundColor: '#ebf2fa',
    // backgroundColor: 'white',
    alignItems: 'center',
  }
})