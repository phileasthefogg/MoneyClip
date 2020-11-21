import React, {useState} from 'react';
// import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Header from './Header';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';

import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex: 1;
  backgroundColor: #555459;
  alignItems: center;
`;

const NewLabel = styled.Text`
  fontSize: 36px;
  fontWeight: bold;
  color: white;
  text-shadow: 2px 2px 1px #8A8A8D;
`;

const Home = (props) => {
  const [buttonOpacity, setButtonOpacity] = useState(1)
  const NewTransaction = styled.View`
    position: absolute;
    backgroundColor: #C8BCA4;
    borderWidth: .25px;
    borderTopRightRadius: 50px;
    borderTopLeftRadius: 15px;
    borderBottomRightRadius: 50px;
    borderBottomLeftRadius: 50px;
    display: flex;
    alignItems: center;
    justifyContent: center;
    height: 60px;
    width: 60px;
    bottom: 20px;
    right: 20px;
    opacity: ${buttonOpacity};
  `;
  return (
    <Container >
      <StatusBar style="light" />
      <Header
        navigation={props.navigation}
      />
      <Dashboard
        mini={true}
        navigation={props.navigation}
        route={props.route}
        transactions={props.transactions}
      />
      <TransactionList
        transactions={props.transactions}
        mini={true}
        route={props.route}
        toggleOpacity={setButtonOpacity}
      />
      {/* </TouchableOpacity> */}
      <NewTransaction>
        <TouchableOpacity
          style={{flex:1, justifyContent: 'center'}}
          onPress={() => {
            props.navigation.navigate('Form')
          }}
        >
          <NewLabel>+</NewLabel>
        </TouchableOpacity>
      </NewTransaction>
    </Container>
  )
}

export default Home;
