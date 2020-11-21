import React, {useState, useEffect, useMemo} from 'react';
import {firebase} from '../../firebase/firebase'

const AuthenticationContext = React.createContext();

const AuthenticationProvider = (props) => {

  const [user, setUser] = useState(null);
  const authContext = useMemo(() => ({
    signIn: async (email, password) => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          // console.log('signin', result);
          console.log('AUTHENTICATED USER: ', result.user.uid)
          setUser(result.user);
          return new Promise((resolve, reject)=>{resolve(result.user)})
        })
        .catch((err) => {
          console.log('COULDNT AUTHENTICATE USE: ', err);
          return new Promise((resolve, reject) => {reject(err)})
          setUser(null);
        })
    },
    signOut: async () => {
      firebase.auth().signOut()
      .then(() => {
      // Sign-out successful.
      console.log('LOGGED OUT')

      setUser(null);
      })
      .catch((error) => {
      // An error happened.
      });
    },
    signUp: async (userEmail, userPassword) => {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
          .then((result) => {
            console.log('Created user: ', result.user.uid)
            setUser(user);
            return new Promise((resolve, reject) => {resolve(result.user)})
          })
          .catch((err) => {
            console.log('Couldnt create user: ', err);
            setUser(null);
            return new Promise((resolve, reject) => {reject(err)})
          })
    },
    user: user
  }))
  const authenticateUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user found', user.uid)
        setUser(user);
        authContext.user = user;
      } else {
        console.log('no user found')
        setUser(null);
        authContext.user = null;
      }
      return () => {
        console.log('AuthState Unsubscribe')
      }
    })
  }

  useEffect(() => {
    authenticateUser();
    return () => {
      console.log('unmount AuthProvider')
      authContext.signOut();
    }
  }, [])

  return (
    <AuthenticationContext.Provider value={authContext}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export {AuthenticationProvider, AuthenticationContext};