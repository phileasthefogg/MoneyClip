import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Header from './Header';
import ListItem from './TransactionListItem';

import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const TransactionList = (props) => {
  let transactions = props.transactions;

  const clickHandler = (transaction) => {
    console.log('clicked', transaction.id)
  }

  let listStyle = {
    position: 'relative',
    top: 10,
    padding: 1,
    borderWidth: 3,
    maxHeight: height * .87
  }
  if (props.mini) {
    listStyle.maxHeight = height * .49;
    listStyle.borderWidth = 0
  }

  return (
    <View>
      {(!props.mini) ? <Header navigation={props.navigation} /> : null}
      <View style={listStyle}>
        <FlatList
          data={transactions}
          renderItem={(element) => (
            <ListItem clickHandler={clickHandler} item={element.item} />
          )}
          keyExtractor={(element) => element.id}
          style={styles.list}
          onScrollBeginDrag={(e) => {
            if (props.toggleOpacity) {
              props.toggleOpacity(.2);
            }
          }}
          onScrollEndDrag={() => {
            if (props.toggleOpacity) {
              props.toggleOpacity(1);
            }
          }}
        />
      </View>
    </View>
  );
}

export default TransactionList;

const styles = StyleSheet.create({
  list: {
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#555459',
  },
})