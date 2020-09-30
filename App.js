import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import Home from './components/Home';
// import TransactionList from './components/TransactionList';
// import Header from './components/Header';
// import Dashboard from './components/Dashboard';

// import firestore from './firebase/firestore';
// const transactions = firestore.collection;

// const Drawer = createDrawerNavigator();

// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     return transactions.onSnapshot(querySnapshot => {
//       const list = [];
//       querySnapshot.forEach(doc => {
//         let item = doc.data();
//         list.push(item);
//       });
//       setTodos(list);
//       if (loading) {
//         setLoading(false);
//       }
//     });
//   }, []);

//   if (!loading) {
//     return (
//       <NavigationContainer>
//         <Drawer.Navigator drawerPosition="left">
//           <Drawer.Screen name="Home" screenOptions={{ drawerLabel: 'Home' }} component={Home} initialParams={{ transactions: todos }} />

//           <Drawer.Screen name="TransactionList" component={TransactionList} initialParams={{mini: false, transactions: todos }} />

//           <Drawer.Screen name="Dashboard" component={Dashboard} initialParams={{mini: false, transactions: todos }}/>
//         </Drawer.Navigator>
//       </NavigationContainer>
//     );
//   } else {
//     return null;
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './MainStack';
import TransactionForm from './components/TransactionForm'

import { NavigationContainer } from '@react-navigation/native';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="MoneyClip"
        options={{headerStyle: {height: 0}, title: ''}}
        component={MainStackScreen}
      />
      <RootStack.Screen name="Form" options={{title: 'Create New Transaction'}} component={TransactionForm} />
    </RootStack.Navigator>
    </NavigationContainer>
  );
}