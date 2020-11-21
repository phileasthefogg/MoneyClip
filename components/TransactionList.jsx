import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native';
import Header from './Header';
import ListItem from './TransactionListItem';

const {width, height} = Dimensions.get('window');

const TransactionList = (props) => {
  let transactions = props.transactions;

  const clickHandler = (transaction) => {
    console.log('clicked', transaction.id)
  }

  let listStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    padding: 1,
    borderWidth: 3,
    height: height * .87
  }
  if (props.mini) {
    listStyle.maxHeight = height * .49;
    listStyle.borderWidth = 0
  }

  return (
    <View>
      {(!props.mini) ? <Header navigation={props.navigation}/> : null}
      <View style={listStyle}>
        <FlatList
          data={transactions}
          renderItem={(element) => <ListItem clickHandler={clickHandler} item={element.item} />}
          keyExtractor={(element) => element.id}
          style={styles.list}
        />
      </View>
    </View>
  );
}

export default TransactionList;

const styles = StyleSheet.create({
  list: {
    borderRadius: 5,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#EAE6DA',
    backgroundColor: '#EAE6DA',
  },
})