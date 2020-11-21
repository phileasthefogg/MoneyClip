import React from 'react';
import {Pressable, Dimensions, View, Text, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width;
const TransactionListItem = (props) => {
  const itemAmt = props.item.Amount.toFixed(2);
  const itemDate = new Date(props.item.Date);
  const dateString = itemDate.getMonth()+1 + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();
  const typeString = props.item.Type.join(', ');
  return (
      <Pressable onPress={() => {props.clickHandler(props.item)}}>
    <View style={styles.container} >
      <View style={styles.detail}>
        <View style={styles.header}>
          <Text style={styles.headerField}>
            {props.item.Description}
          </Text>
        </View>
        <View>
          <Text style={styles.dateField}>{dateString}</Text>
        </View>
        <View>
          <Text style={styles.typeField}>{typeString}</Text>
        </View>
      </View>
      <View style={styles.amountBox}>
        <Text style={styles.amountField}>{'$'+itemAmt}</Text>
      </View>
    </View>
      </Pressable>
  )
}

export default TransactionListItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    paddingTop: 2,
    paddingBottom: 6,
    borderRadius: 5,
    // borderWidth: .25,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  detail: {
    paddingLeft: 20,
    minWidth: '80%'
  },
  amountBox: {
    minWidth: '20%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountField: {
    color: 'green',
    fontWeight: 'normal',
    fontSize: 17
  },
  header: {
    marginBottom: 2.5,
    marginTop: 2.5
  },
  headerField: {
    color: '#064789',
    fontSize: 15,
  },
  dateField: {
    fontSize: 12,
  },
  typeField: {
    fontSize: 10,
    color: 'grey'
  }
})