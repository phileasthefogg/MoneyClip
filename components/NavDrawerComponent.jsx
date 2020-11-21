import React, { useContext } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native'
import { DrawerItemList } from '@react-navigation/drawer';

import styled from 'styled-components/native';

import { AuthenticationContext } from '../components/providers/AuthenticationProvider.jsx'


const Header = styled.View`
  height: 55px;
  marginTop: 25px;
  display: flex;
  alignItems: center;
  justifyContent: center;
  backgroundColor: white;
`;
const ListSection = styled.View`
  margin: 10px;
  paddingTop: 10px;
  backgroundColor: white;
  height: 80%;
  borderRadius: 10px;
  display: flex;
`;
const Footer = styled.View`
  position: absolute;
  display: flex;
  flexDirection: column;
  alignItems: center;
  justifyContent: space-around;
  bottom: 0;
  width: 100%;
`;
const Logout = styled.View`
  borderWidth: 3px;
  borderColor: #BB525B;
  backgroundColor: white;
  height: 50px;
  width: 200px;
  margin: 10px
  display: flex;
  alignItems: center;
  justifyContent: center;
`;
const LogoutLabel = styled.Text`
  color: #BB525B;
  fontSize: 18px;
`;

const CustomDrawerContent = (props) => {
  const AuthContext = useContext(AuthenticationContext);
  return (
    <ScrollView {...props}>
      <Header >
        <Text>Welcome back, {AuthContext.user.email}</Text>
      </Header>
      <ListSection>
        <DrawerItemList {...props} />
      </ListSection>
      <Footer>
        <Logout>
          <TouchableOpacity onPress={() => {
            AuthContext.signOut()
              .then(() => {
                console.log('successfully signed out')
              })
              .catch(() => {
                console.log('couldnt sign you out')
              })
          }}>
            <LogoutLabel>Logout</LogoutLabel>
          </TouchableOpacity>
        </Logout>
      </Footer>
    </ScrollView>
  );
}

export default CustomDrawerContent;
