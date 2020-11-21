import * as firebase from 'firebase';
import firebaseConfig from './config'

let firebaseConnection;
// Initialize Firebase if needed, otherwise assign to existing connection
if (!firebase.apps.length) {
  console.log('Initialized a new firebase connection.')
  firebaseConnection = firebase.initializeApp(firebaseConfig)
} else {
  console.log('app old')
  firebaseConnection = firebase.app();
}

// module.exports.collection = db.collection('transactions');
// module.exports.app = firebase.app();
export {firebaseConnection, firebase};

/*
  FIRESTORE IMPLEMENTATION used in MainStack useEffect

    // return transactions.onSnapshot(querySnapshot => {
    //   const list = [];
    //   querySnapshot.forEach(doc => {
    //     let newDoc = doc.data();
    //     newDoc.id = doc.id;
    //     list.push(newDoc);
    //   });
    //   setList(list);
    //   if (loading) {
    //     setLoading(false);
    //   }
    // });
*/