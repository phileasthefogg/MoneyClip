import * as firebase from 'firebase';
import firebaseConfig from './config'

let db;
// Initialize Firebase if needed, otherwise assign to existing connection
if (!firebase.apps.length) {
  db = firebase.initializeApp(firebaseConfig).firestore()
  console.log('app new')
} else {
  console.log('app old')
  db = firebase.app().firestore();
}

module.exports.collection = db.collection('transactions');
module.exports.app = firebase.app();

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