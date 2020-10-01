import React, { useState, useEffect } from 'react';
import firestore from '../../firebase/firestore';

const database = firestore.app.database();

const TransactionContext = React.createContext();

const TransactionProvider = (props) => {
  const [transactions, updateTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  getTransactions = async () => {
    let transactionRef = await database.ref('transactions/');
    let transactionListener = await transactionRef.on('value', (snapshot) => {
      console.log('new records loading', loading);
      // setLoading(true);
      // updateTransactions([]);
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
        console.log('getTransactions complete', transactions.length);
      })
  },[])

  return (
    <TransactionContext.Provider value={{ transactions, loading, updateTransactions, setLoading }}>
      {props.children}
    </TransactionContext.Provider>
  )
}

export {TransactionProvider, TransactionContext};