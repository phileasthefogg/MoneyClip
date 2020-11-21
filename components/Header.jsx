import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.toolbar} />
      <View style={styles.header}>
        <View style={{ maxWidth: '12%'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.navButton}>
              <Text style={{ fontSize: 20 }}>&#9776;</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: width,
    top: 0,
  },
  toolbar: {
    height: 25,
    width: width
  },
  header: {
    backgroundColor: 'white',
    // borderColor: '#679436',
    // borderWidth: 1,
    borderRadius: 10,
    height: 55,
    marginLeft: 10,
    marginRight: 10,
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    height: '100%',
    maxWidth: 40,
  }
})