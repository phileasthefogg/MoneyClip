import React, { useContext } from 'react';
import { Pressable, View, Text, ScrollView, Button, StyleSheet } from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import { AuthenticationContext } from '../components/providers/AuthenticationProvider.jsx'

const CustomDrawerContent = (props) => {
  const AuthContext = useContext(AuthenticationContext);
  return (
    <ScrollView {...props}>
      <View style={styles.header} >
        <Text>Welcome back, {AuthContext.user.email}</Text>
      </View>
      <View style={{ margin: 10, paddingTop: 10, backgroundColor: 'white', height: '80%', borderRadius: 10 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={styles.footer}>
        <Button
          onPress={() => {
            console.log('button');
            props.navigation.navigate('Form')
          }}
          title="Create Transaction"
        />
        <Button
          onPress={() => {
            AuthContext.signOut()
              .then(() => {
                console.log('successfully signed out')
              })
              .catch(() => {
                console.log('couldnt sign you out')
              })
          }}
          title="Logout"
        />
      </View>
    </ScrollView>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    // flex: 1,
    paddingTop: 30,
    // borderWidth: 3,
  },
  header: {
    height: 55,
    marginTop: 25,
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    // borderWidth: .25,
    backgroundColor:'white'
  },
  row: {
    minHeight: 50,
    display: 'flex',
    justifyContent: 'center',
    // borderWidth: 1,
    marginBottom: 5,
    padding: 10
  },
  footer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    bottom: 0,
    width: '100%'
  }
})