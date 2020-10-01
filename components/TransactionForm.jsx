import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Switch, ToastAndroid } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from './ToastAndroid'
import firestore from '../firebase/firestore';
const transactions = firestore.collection;
const database = firestore.app.database();
import Tags from 'react-native-tags'

const generateHash = () => {
  let constant = 20;
  let newID = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'.split('');
  for (var x = 1; x <= constant; x++) {
    newID += characters[Math.floor(Math.random() * 62)]
  }
  return newID;
}

const createRecord = async (newEntry) => {
  // console.log(newEntry);
  let newID = generateHash();
  database.ref('transactions/').push(newEntry);
  // await transactions.add(newEntry);
}

const Form = ({navigation}) => {
  const [form, updateForm] = useState({});
  const [datePicker, toggleDatePicker] = useState(false);
  const [amt, updateAmt] = useState(0);
  const [cash, toggleCash] = useState(false);

  const [visibleToast, setvisibleToast] = useState(false);

  useEffect(() => setvisibleToast(false), [visibleToast]);

  const updateType = (string) => {
    let types = string.split(', ');
    let newForm = form;
    newForm.Type = types;
    updateForm(newForm);
  }

  const updateField = (field, value) => {
    let current = form;
    if (field === 'Amount') {
      value = Number(value);
    }
    if (field === 'Type' && value[value.length - 1] === ' ') {
      updateType(value);
    } else {
      current[field] = value;
      updateForm(current);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
          <TouchableOpacity onPress={() => { toggleDatePicker(true) }} style={{ height: 20, width: '100%', alignItems: 'flex-end' }}>
            <Text style={{ lineHeight: 20, color: 'grey', fontSize: 15 }} label="Date" name="date" onChangeText={(text) => { updateField('date', text) }}>{(form.Date) ? new Date(form.Date).toDateString() : 'Date'}</Text>
          </TouchableOpacity>
          {(datePicker) ?
            <DateTimePicker
              testID="dateTimePicker"
              value={Date.now()}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(e) => {
                updateField('Date', e.nativeEvent.timestamp);
                toggleDatePicker(false);
              }}
            />
            : null
          }

        <View style={styles.horizontalRule}>
        </View>
          <TextInput
            style={styles.inputField}
            label="Amount"
            name="Amount"
            onChangeText={(text) => {
              updateField('Amount', text)
            }}
            placeholder="$0.00"
            keyboardType={'number-pad'}
            value={(amt) ? ('$' + amt.toFixed(2).toString()) : null}
            onEndEditing={() => {
              updateAmt(form.Amount);
            }}
          />


        <View style={styles.horizontalRule}>
        </View>
          <TextInput style={styles.inputField} label="Description" name="Description" value={form.Description} placeholder="Description" onChangeText={(text) => { updateField('Description', text) }} />


        <View style={styles.horizontalRule}>
        </View>

          <Text style={{ fontSize: 12, color: 'grey' , alignSelf: 'flex-start'}}>Tags:</Text>
          <Tags
            textInputProps={{
              placeholder: "Type"
            }}
            onChangeTags={tags => { console.log(tags); let curr = form; curr.Type = tags; updateForm(curr) }}
            onTagPress={(index, tagLabel, event, deleted) =>
              console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
            }
            containerStyle={{ opacity: 1 }}
            inputStyle={{ backgroundColor: '#DCDCDC', borderWidth: .5, opacity: 1 }}
            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
              <TouchableOpacity style={styles.tagContainer} key={`${tag}-${index}`} onPress={onPress}>
                <Text style={{ color: 'white', lineHeight: 12, fontSize: 12 }}>{tag}</Text>
              </TouchableOpacity>
            )}
          />

        <View style={styles.horizontalRule}>
        </View>
          <TextInput style={styles.inputField} label="Comment" name="Comment" value={form.Comment} placeholder="Comment" onChangeText={(text) => { updateField('Comment', text) }} />

          <Switch style={{alignSelf:'flex-end'}} onValueChange={(v) => { console.log(v); toggleCash(v); updateField('Cash', v) }} value={cash}></Switch>
      </View>

      <Toast visible={visibleToast} message="Saved Transaction" />

      <Button
        title="Submit"
        onPress={() => {
          createRecord(form)
            .then((result) => {
              // console.log('successfully added record');
              setvisibleToast(true);
              navigation.navigate('MoneyClip', {reset: 'true'});
            })
            .catch((err) => {
              console.error('ERROR OCCURED', err)
            })
        }} />

    </View>
  )
}

export default Form;

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    padding: 5
  },
  inputField: {
    lineHeight: 20,
    fontSize: 20,
    width: '100%',
  },
  tagContainer: {
    borderRadius: 5,
    backgroundColor: '#A5BE00',
    padding: 5,
    margin: 2.5,
  },
  horizontalRule: {
    marginBottom:10,
    marginTop: 10,
    width: '70%',
    borderColor: 'lightgrey',
    height: 5,
    borderBottomWidth: 1,
    paddingBottom: 5,
  }
})