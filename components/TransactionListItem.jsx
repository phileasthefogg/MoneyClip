import React from 'react';
import {Pressable, Dimensions, View, Text, StyleSheet, TouchableHighlight, ActivityIndicator} from 'react-native';
import {useFonts,
  Raleway_400Regular
} from '@expo-google-fonts/dev'

const width = Dimensions.get('window').width;
const TransactionListItem = (props) => {
  const itemAmt = props.item.Amount.toFixed(2);
  const itemDate = new Date(props.item.Date);
  const dateString = itemDate.getMonth()+1 + '/' + itemDate.getDate() + '/' + itemDate.getFullYear();
  const typeString = props.item.Type.join(', ');
  let [fontsLoaded] = useFonts({
    Raleway_400Regular
  });
  const font = {fontFamily: 'Raleway_400Regular', padding: 0, margin: 0}
  if (fontsLoaded) {
  return (
      <Pressable onPress={() => {props.clickHandler(props.item)}}>
    <View style={styles.container} >
      <View style={styles.detail}>
        <View style={styles.header}>
          <Text style={[styles.headerField, font]}>
            {props.item.Description}
          </Text>
        </View>
        <View>
          <Text style={[styles.dateField, font]}>{dateString}</Text>
        </View>
        <View>
          <Text style={[styles.typeField, font]}>{typeString}</Text>
        </View>
      </View>
      <View style={styles.amountBox}>
        <Text style={[styles.amountField, font]}>{'$'+itemAmt}</Text>
      </View>
    </View>
      </Pressable>
  )
  } else {
    return (
      <View style={{flex:1}}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    )
  }
}

export default TransactionListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    paddingTop: 3,
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
    marginBottom: 2,
    marginTop: 2.5,
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