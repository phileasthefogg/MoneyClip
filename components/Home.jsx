import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Dimensions } from 'react-native';
import Header from './Header';
import Dashboard from './Dashboard';
import TransactionList from './TransactionList';

import {useFocusEffect, useIsFocused} from '@react-navigation/native'

import firestore from '../firebase/firestore';
const transactions = firestore.collection;

const width = Dimensions.get('window').width;

const Home = ({ navigation, route }) => {
  // console.log('HOME RENDER')
  const [list, updateList] = useState([]);
  const [updating, toggleUpdating] = useState(true);

  const updateTransactions = () => {
    console.log('update Transactions', updating)
    firestore.app.database().ref('transactions/').once('value', (snapshot)=> {
      let keys = Object.keys(snapshot.val());
      let values = Object.values(snapshot.val());
      let records = [];
      for (var x = 0; x <= keys.length - 1; x++) {
        let record = values[x];
        record.id = keys[x];
        records.push(record);
      }
      updateList(records)
      if (updating) {
        toggleUpdating(false);
      }
    })
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      {/*passing entire navigation object to subcomponent Dashboard */}
      <Dashboard mini={true} navigation={navigation} route={route}/>
      <View>
        <Text>Navigate in Class{list.length}</Text>
        {/* Calling own navigation component, inherited from Screen instantiation on App.js
          Note that because this is a class component, we pull the navigation object off of props.
        */}
        <Button
          onPress={() => {
            console.log('button');
            navigation.navigate('Form')
          }}
          title="Create Transaction"
        />
      </View>

      <TransactionList transactions={list} mini={true} route={route}/>
    </View>
  )

}

// class Home extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       transactions: this.props.route.params.transactions,
//       updating: this.props.route.params.update
//     }

//   }

//   componentDidMount() {
//     console.log('MOUNT = Home props includes transactions: ', this.props.route.params.transactions.length > 0);
//     console.log('MOUNT = Home Props updating props: ', this.props.route.params.update);
//   }

//   updateTransactions() {
//     transactions.get()
//       .then((items) => {
//         let results = items.docs.map((doc => doc.data()));
//         this.setState({transactions: results}, () => {console.log('Home transactions updated')});
//       })
//       .catch((err) => {
//         console.log('gotErr', err)
//       })
//   }

//   render() {
//     console.log('RENDERING HOME', this.props)
//     let allTransactions;
//     if (this.props.route.params.update) {
//       updateTransactions();
//     }
//     allTransactions = this.state.transactions
//     return (
//       <View style={styles.container}>
//         <Header navigation={this.props.navigation}/>
//         {/*passing entire navigation object to subcomponent Dashboard */}
//         <Dashboard mini={true} navigation={this.props.navigation} route={this.props.route}/>
//         <View>
//           <Text>Navigate in Class</Text>
//           {/* Calling own navigation component, inherited from Screen instantiation on App.js
//             Note that because this is a class component, we pull the navigation object off of props.
//           */}
//           <Button
//             onPress={() => {
//               console.log('button');
//               this.props.navigation.navigate('Form')
//             }}
//             title="Create Transaction"
//           />
//         </View>

//         <TransactionList mini={true} route={this.props.route}/>
//       </View>
//     )
//   }
// }

export default Home;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor: '#427AA1',
    backgroundColor: '#ebf2fa',
    alignItems: 'center',
  }
})