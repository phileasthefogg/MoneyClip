import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Switch, ToastAndroid } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from './ToastAndroid'
import { firebaseConnection } from '../firebase/firebase';

const database = firebaseConnection.database();
import Tags from 'react-native-tags'

import styled from 'styled-components/native'

const FormContent = styled.View`
  display: flex;
  alignItems: center;
  margin: 10px;
  padding: 5px;
`;
const InputField = styled.TextInput`
  lineHeight: 20px;
  fontSize: 20px;
  width: 100%;
`;
const TagContainer = styled.TouchableOpacity`
  borderRadius: 5px;
  backgroundColor: #A5BE00;
  padding: 5px;
  margin: 2.5px;
`;
const HR = styled.View`
  marginBottom:10px;
  marginTop: 10px;
  width: 70%;
  borderColor: lightgrey;
  height: 5px;
  borderBottomWidth: 1px;
  paddingBottom: 5px;
`;

const Form = (props) => {
  const [form, updateForm] = useState({});
  const [datePicker, toggleDatePicker] = useState(false);
  const [amt, updateAmt] = useState(0);
  const [cash, toggleCash] = useState(false);

  const [visibleToast, setVisibleToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('Saved Transaction')
  useEffect(() => setVisibleToast(false), [visibleToast]);

  const displayToast = (message) => {
    setToastMsg(message);
    setVisibleToast(true);
  }

  const getMissingFields = (record) => {
    let hasDate = record.Date !== undefined;
    let hasAmount = record.Amount !== undefined;
    let hasDescription = record.Description !== undefined;
    let hasTypes = record.Type !== undefined;
    if (hasDate && hasAmount && hasDescription && hasTypes) {
      return [];
    } else {
      let availableFields = Object.keys(record);
      let missingFields = ['Date', 'Amount', 'Description', 'Type'];
      for (let i = 0; i <= availableFields.length - 1; i++) {
        let idxToRemove = missingFields.indexOf(availableFields[i]);
        missingFields.splice(idxToRemove, 1);
      }
      return missingFields;
    }
  }
  const createRecord = async (newEntry) => {
    const missingFields = getMissingFields(newEntry);
    if (missingFields.length === 0) {
      database.ref(`/users/${props.user.uid}/transactions/`).push(newEntry);
      return new Promise((resolve, reject) => resolve('success'))
    } else {
      return new Promise((resolve, reject) => reject(missingFields))
    }
  }
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

  const renderTags = ({ tag, index, onPress, deleteTagOnPress, readonly }) => (
    <TagContainer key={`${tag}-${index}`} onPress={onPress} >
      <Text style={{ color: 'white', lineHeight: 12, fontSize: 12 }}>
        {tag}
      </Text>
    </TagContainer>
  )
  return (
    <View style={{display: 'flex'}}>
      <StatusBar style="dark" />
      <FormContent>
        <TouchableOpacity
          onPress={() => { toggleDatePicker(true) }}
          style={{ height: 20, width: '100%', alignItems: 'flex-end' }}>
          <Text
            style={{ lineHeight: 20, color: 'grey', fontSize: 15 }}
            label="Date"
            name="date"
            onChangeText={(text) => { updateField('date', text) }}
          >
            {(form.Date) ? new Date(form.Date).toDateString() : 'Date'}
          </Text>
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

        <HR />
        <InputField
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


        <HR />
        <InputField
          label="Description"
          name="Description"
          value={form.Description}
          placeholder="Description"
          onChangeText={(text) => {
            updateField('Description', text)
          }}
        />

        <HR />
        <Text style={{ fontSize: 12, color: 'grey', alignSelf: 'flex-start' }}>Tags:</Text>
        <Tags
          textInputProps={{
            placeholder: "Type"
          }}
          onChangeTags={tags => {
            let curr = form;
            curr.Type = tags;
            updateForm(curr)
          }}
          onTagPress={(index, tagLabel, event, deleted) =>
            console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
          }
          containerStyle={{ opacity: 1 }}
          inputStyle={{
            backgroundColor: '#DCDCDC',
            borderWidth: .5,
            opacity: 1
          }}
          renderTag={renderTags}
        />

        <HR />
        <InputField
          label="Comment"
          name="Comment"
          value={form.Comment}
          placeholder="Comment"
          onChangeText={(text) => { updateField('Comment', text) }}
        />
        <Switch
          style={{ alignSelf: 'flex-end' }}
          onValueChange={(value) => {
            toggleCash(value);
            updateField('Cash', value)
          }}
          value={cash} />
      </FormContent>

      <Toast visible={visibleToast} message={toastMsg} />

      <Button
        title="Submit"
        onPress={() => {
          createRecord(form)
            .then((result) => {
              // console.log('successfully added record');
              displayToast('Successfully Created Record');
              props.navigation.navigate('MoneyClip', { reset: 'true' });
            })
            .catch((err) => {
              displayToast(`Missing some fields: ${err.join(', ')}`)
            })
        }} />
    </View>
  )
}

export default Form;
