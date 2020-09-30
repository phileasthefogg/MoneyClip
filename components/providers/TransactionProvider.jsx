import React, {useState, useEffect} from 'react';
import firestore from '../../firebase/firestore';

const database = firestore.app.database();



const TransactionContext = React.createContext({transactions: [], loading: true, setList: null, setLoading: null});

const TransactionProvider = (props) => {
  const [transactions, updateTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // const getTransactions = async () => {
  //   await database.ref('transactions/').on('value', (snapshot) => {
  //     // setLoading(true);
  //     console.log('new records loading',loading);
  //     if (snapshot.val()) {
  //       let keys = Object.keys(snapshot.val());
  //       let values = Object.values(snapshot.val());
  //       let records = [];
  //       for (var x = 0; x <= keys.length - 1; x++) {
  //         let record = values[x];
  //         record.id = keys[x];
  //         records.push(record);
  //       }
  //       updateTransactions(records)
  //     }
  //     if (loading) {
  //       setLoading(false);
  //       console.log('done Loading', !loading);
  //     }
  //   })
  // };

  useEffect(()=>{
    // getTransactions();
    console.log('useEffect in provider');
    database.ref('transactions/').on('value', (snapshot) => {
      setLoading(true);
      console.log('new records loading',loading);
      if (snapshot.val()) {
        let keys = Object.keys(snapshot.val());
        let values = Object.values(snapshot.val());
        let records = [];
        for (var x = 0; x <= keys.length - 1; x++) {
          let record = values[x];
          record.id = keys[x];
          records.push(record);
        }
        updateTransactions(records)
      }
      if (loading) {
        setLoading(false);
        console.log('done Loading', !loading);
      }
    })
  },[])

  return (
    <TransactionContext.Provider value={{transactions,loading, updateTransactions, setLoading}}>
      {props}
    </TransactionContext.Provider>
  )
}

export default TransactionProvider;