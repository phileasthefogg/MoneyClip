import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { AuthenticationContext } from '../components/providers/AuthenticationProvider';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const AuthContext = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <Text style={styles.label}>E-mail (will be used as username):</Text>
            <TextInput
              style={styles.inputField}
              label="Email"
              name="Email"
              onChangeText={(text) => {
                setEmail(text)
              }}
              placeholder="Email"
            />
            <Text style={styles.label}>Password (at least 6 characters): </Text>
            <TextInput
              style={styles.inputField}
              label="Password"
              name="Password"
              onChangeText={(text) => {
                setPassword(text)
              }}
              secureTextEntry={true}
              placeholder="Password"
            />
            <Text style={styles.label}>Re-Enter Password: </Text>
            <TextInput
              style={styles.inputField}
              label="Password"
              name="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text)
              }}
              placeholder="Password"
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={[styles.button, {backgroundColor: 'lightgreen', color:'white', borderColor: 'lightgreen'}]}>
              <TouchableOpacity onPress={() => {
                AuthContext.signUp(email, password)
                  .then((user) => { navigation.navigate('HomeScreen') })
                  .catch((err) => { console.log('couldnt create user: ', err); navigation.navigate('Signup') })
              }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Create User</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.button, {borderColor: 'lightgreen'}]}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Login')
              }}>
                <Text style={{fontSize: 20, color: 'lightgreen', fontWeight: 'bold'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightgreen',
  },
  header: {
    // position: 'absolute',
    // top: 100,
    height: '30%',
    width: '80%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 80,
    color: 'white'
  },
  content: {
    height: '70%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '80%',
  },
  inputs: {
    marginTop: '10%',
    marginBottom: '10%',
    display: 'flex',
    flexDirection: 'column',
    // borderWidth: 1,
    // padding: 5,
    height: '50%',
    justifyContent: 'space-evenly',
  },
  inputField: {
    borderWidth: .5,
    width: '100%',
    minHeight: '8%',
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonContainer: {
    display: 'flex',
    height: '20%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '40%',
    color: 'black',
    borderWidth: 1
  }
})