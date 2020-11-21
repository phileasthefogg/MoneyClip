import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './components/Home';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';
import CustomDrawerContent from './components/NavDrawerComponent'

import { TransactionContext } from './components/providers/TransactionProvider';
import { AuthenticationContext } from './components/providers/AuthenticationProvider';

const Drawer = createDrawerNavigator();

const ContextStack = (props) => {
  const cashContext = useContext(TransactionContext);
  const authContext = useContext(AuthenticationContext)
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerContent={(props) => <CustomDrawerContent {...props} user={authContext.user} />}
      drawerContentOptions={{
        contentContainerStyle: {
          display: 'flex',
          backgroundColor: '#8A8A8D',
          height: '100%'
        },
        activeBackgroundColor: '#D3DEDF'
      }}
      drawerStyle={{
        minWidth: 240,
        height: '100%'
      }}
    >
      <Drawer.Screen name="Home" screenOptions={{ drawerLabel: 'Home' }}  >
        {props => <Home {...props} transactions={cashContext.transactions} />}
      </Drawer.Screen>

      <Drawer.Screen name="TransactionList" initialParams={{ mini: false, transactions: cashContext.transactions }}>
        {props => <TransactionList {...props} transactions={cashContext.transactions} />}
      </Drawer.Screen>

      <Drawer.Screen name="Dashboard" initialParams={{ mini: false, transactions: cashContext.transactions }}>
        {props => <Dashboard {...props} transactions={cashContext.transactions} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}


export default ContextStack;