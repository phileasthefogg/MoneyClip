import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native';
import Header from './Header';


const width = Dimensions.get('window').width;

const renderItem = (list) => {
  return (
    <View style={styles.row}>
      <Text style={{ color: '#064789' }}>
        {list.item.Description}
      </Text>
    </View>
  );
}


const TransactionList = (props, { navigation, route }) => {
  // console.log((props.mini) ? 'Minified Transactions!' : 'Normal Transactions');
  //the following is kinda stupid -- in order to get the same transaction info from the same location (despite possibly different source locations) while rendering this component, I am passing a prop called 'route' from the Home cmp which just passes along the route obj
  let transactions = props.route.params.transactions;
  // console.log('List', transactions.length)
  return (
    <View>
      {(!props.mini) ? <Header navigation={props.navigation}/> : null}
      <View style={[styles.container, { borderWidth: (props.mini) ? 0 : 3 }]}>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      </View>
    </View>
  );
}

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: (width * .05),
    top: 10,
    width: width - (width * .1),
    maxHeight: 400,
  },
  list: {

    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#A5BE00',

    padding: 10,
    backgroundColor: '#EBF2FA'
  },
  row: {
    width: width - (width * .15),
    margin: .25,
    borderRadius: 50,
    borderBottomWidth: 1
  }
})