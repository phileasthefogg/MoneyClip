import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  backgroundColor: lightgreen;
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
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    AbrilFatface_400Regular
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const AuthContext = useContext(AuthenticationContext);
  if (fontsLoaded) {
    return (
      <Container>
        <Header>
          <Title style={{ fontFamily: 'AbrilFatface_400Regular', fontSize: 70 }}>Sign Up</Title>
        </Header>
        <Content>
          <Form>
            <InputContainer >
              <Field>
                <Label>E-mail (will be used as username):</Label>
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
                <Label>Password (at least 6 characters): </Label>
                <Input
                  label="Password"
                  name="Password"
                  onChangeText={(text) => {
                    setPassword(text)
                  }}
                  secureTextEntry={true}
                  placeholder="Password"
                />
              </Field>
              <Field>
                <Label>Re-Enter Password: </Label>
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
              <ButtonView style={{ backgroundColor: 'lightgreen', color: 'white', borderColor: 'lightgreen' }}>
                <TouchableOpacity onPress={() => {
                  AuthContext.signUp(email, password)
                    .then((user) => { navigation.navigate('HomeScreen') })
                    .catch((err) => { console.log('couldnt create user: ', err); navigation.navigate('Signup') })
                }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Create User</Text>
                </TouchableOpacity>
              </ButtonView>

              <ButtonView style={{ borderColor: 'lightgreen' }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Login')
                }}>
                  <Text style={{ fontSize: 20, color: 'lightgreen', fontWeight: 'bold' }}>Cancel</Text>
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
