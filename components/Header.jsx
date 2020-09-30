import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}/>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.navButton}>
            <Text style={{fontSize: 20}}>&#9776;</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    // position: 'absolute',
    top: 0,
  },
  toolbar: {
    // top: 0,
    height: 25,
    backgroundColor: 'pink',
    // backgroundColor: '#427AA1',
    width: width
  },
  header: {
    backgroundColor: '#ebf2fa',
    borderColor: 'orange',
    borderWidth: 1,
    height: 55
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    height: '100%',
    maxWidth: 40,
    // borderWidth: 1
  }
})