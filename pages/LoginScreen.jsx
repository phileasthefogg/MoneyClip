import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthenticationContext } from '../components/providers/AuthenticationProvider';
import {
  useFonts,
  Pacifico_400Regular,
  AbrilFatface_400Regular
} from '@expo-google-fonts/dev'
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  flex: 1;
  alignItems: center;
  justifyContent: center;
  display: flex;
  flexDirection: column;
  backgroundColor: lightblue;
`;

const Header = styled.View`
  height: 30%;
  width: 80%;
  display: flex;
  justifyContent: center;
`;

const Title = styled.Text`
  textAlign: center;
  fontSize: 80px;
  color: white;
`;

const Content = styled.View`
  height: 70%;
  width: 100%;
  backgroundColor: white;
  alignItems: center;
  justifyContent: center;
  display: flex;
  flexDirection: column;
  borderWidth: 1px;
  borderTopRightRadius: 30px;
  borderTopLeftRadius: 30px;
`;
const Form = styled.View`
  display: flex;
  flexDirection: column;
  height: 100%;
  width: 80%;
`;
const InputContainer = styled.View`
  marginTop: 10%;
  marginBottom: 10%;
  height: 50%;
  display: flex;
  flexDirection: column;
  justifyContent: space-evenly;
`;
const Field = styled.View`
  display: flex;
  flexDirection: column;
  height: 70px;
`;
const Label = styled.Text`
  fontWeight: bold;
  fontSize: 15px;
`;
const Input = styled.TextInput`
  borderWidth: .5px;
  width: 100%;
  minHeight: 8%;
  padding: 10px;
  marginTop: 4px;
`;
const ButtonContainer = styled.View`
  display: flex;
  height: 20%;
  width: 100%;
  flexDirection: column;
  justifyContent: space-around;
  alignItems: center;
`;
const ButtonView = styled.View`
  display: flex;
  alignItems: center;
  justifyContent: center;
  width: 80%;
  height: 40%;
  color: black;
  borderWidth: 1px;
`;


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    AbrilFatface_400Regular
  });
  const AuthContext = useContext(AuthenticationContext);
  if (fontsLoaded) {
    return (
      <Container>
        <Header>
          <Title style={{ fontFamily: 'AbrilFatface_400Regular', fontSize: 70 }}>Welcome</Title>
        </Header>
        <Content>
          <Form>
            <InputContainer>
              <Field>
                <Label>E-mail:</Label>
                <Input
                  label="Email"
                  name="Email"
                  onChangeText={(text) => {
                    setEmail(text)
                  }}
                  placeholder="Email"
                />
              </Field>
              <Field>
                <Label>Password: </Label>
                <Input
                  label="Password"
                  name="Password"
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    setPassword(text)
                  }}
                  placeholder="Password"
                />
              </Field>
            </InputContainer>
            <ButtonContainer>
              <ButtonView style={{ backgroundColor: 'lightblue', color: 'white', borderColor: 'lightblue' }}>
                <TouchableOpacity onPress={() => {
                  AuthContext.signIn(email, password)
                    .then((user) => { })
                    .catch((err) => { console.log('couldnt  sign-in: '); navigation.navigate('Signup') })
                }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>
              </ButtonView>

              <ButtonView style={{ borderColor: 'lightblue' }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Signup')
                }}>
                  <Text style={{ fontSize: 20, color: 'lightblue', fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableOpacity>
              </ButtonView>
            </ButtonContainer>
          </Form>
        </Content>
      </Container>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    )
  }
};

export default LoginScreen;
