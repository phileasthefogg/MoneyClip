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
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <View style={styles.inputs}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={styles.inputField}
              label="Email"
              name="Email"
              onChangeText={(text) => {
                setEmail(text)
              }}
              placeholder="Email"
            />
            <Text style={styles.label}>Password: </Text>
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
            <View style={[styles.button, {backgroundColor: 'lightblue', color:'white', borderColor: 'lightblue'}]}>
              <TouchableOpacity onPress={() => {
                AuthContext.signIn(email, password)
                  .then((user) => {  })
                  .catch((err) => { console.log('couldnt sign-in: '); navigation.navigate('Signup') })
              }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.button, {borderColor: 'lightblue'}]}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Signup')
              }}>
                <Text style={{fontSize: 20, color: 'lightblue', fontWeight: 'bold'}}>Sign Up</Text>
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
    backgroundColor: 'lightblue',
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
    justifyContent: 'center',
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
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  inputField: {
    borderWidth: .5,
    width: '100%',
    minHeight: '8%',
    padding: 10
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