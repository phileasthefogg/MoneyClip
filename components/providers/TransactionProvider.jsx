import React, { useState, useEffect } from 'react';
import {firebaseConnection} from '../../firebase/firebase';

const database = firebaseConnection.database();
// const database = firestore.app.database();

const TransactionContext = React.createContext();

const TransactionProvider = (props) => {
  const [transactions, updateTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  getTransactions = async () => {
    let transactionRef = await database.ref(`users/${props.user.uid}/transactions/`);
    let transactionListener = await transactionRef.on('value', (snapshot) => {
      let updatedList = [];
      snapshot.forEach((doc) => {
        let transaction = doc.val();
        transaction.id = doc.key
        updatedList.push(transaction);
      })
      updatedList = updatedList.sort((a, b) => b.Date - a.Date)
      updateTransactions(updatedList);
      return updatedList;
    })
  }

  useEffect(() => {
    getTransactions()
      .then((result) => {
        console.log('Provider: getTransactions() complete');
      })
  },[])

  return (
    <TransactionContext.Provider value={{ transactions, loading, updateTransactions, setLoading }}>
      {props.children}
    </TransactionContext.Provider>
  )
}

export {TransactionProvider, TransactionContext};