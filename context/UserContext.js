import React, { createContext, useContext, useState } from 'react';
import { sendEmailVerification, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithCustomToken, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import firebase from '../firebase/firebase';
import { getDoc, doc, collection, setDoc } from 'firebase/firestore';
// Inicjalizacja autentykacji Firebase
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth(firebase);
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '514148160856-gv0avgoih8idn84cdc5svifpr1ius0u9.apps.googleusercontent.com',
    androidClientId: '514148160856-jr0dnbi85km7jsa0e392v9li4en416h9.apps.googleusercontent.com',
  });

  useEffect( () => {
    if(response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response])

  useEffect( () => {

    const unsubscribe =  onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
    });

    return () => { unsubscribe(); }
  }, [])


  useEffect( () => {

    if(user === null) {
        signOut(auth).then(() => {
            console.log('Wylogowany');
        }).catch((error) => {
            console.log(error);
        })
    }

  }, [user])

  const signUp = async (email, password, navigation, firestore, data) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        setUser(response.user);
        console.log('Konto zostalo zarejestrowane');
        const userCollectionRef = collection(firestore, 'users');
        const userDoc = doc(userCollectionRef, response.user.uid);
        await setDoc(userDoc, data, { merge: true });

        const userSnapshot = await getDoc(userDoc);
        if(userSnapshot.exists()) {
            setUserDetails(userSnapshot.data());
            console.log(userSnapshot.data());
        }

        console.log(response.user);
        await sendEmailVerification(response.user);
        navigation.navigate('MainTabs');
        return true;
        
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alert('This email is in use. Please try again using another email');
        } else if (error.code === 'auth/invalid-email') {
          console.log('Ten adres email jest nieprawidłowy!');
        } else if (error.code === 'auth/weak-password') {
          console.log('Hasło jest za słabe!');
        } else {
          console.log('Wystąpił nieoczekiwany błąd: ', error.message);
        }

        return false;
    } 
  }
  
  const signInWithToken = async () => {

    try {
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken);
      const response = await signInWithCustomToken(auth, userToken);
      const user = response.user;
      setUser(user);
      const userCollectionRef = collection(firestore, 'users');
      const userDoc = doc(userCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDoc);
      if(userSnapshot.exists()) {
          setUserDetails(userSnapshot.data());
      }
      console.log('Zalogowano za pomoca tokena');
    } catch (error) {
      console.log('Wystapil blad przy logowaniu tokenem' , error);
    }
  }

  const signIn = async (email, password, navigation, firestore, rememberMe) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        setUser(user);

        const userCollectionRef = collection(firestore, 'users');
        const userDoc = doc(userCollectionRef, user.uid);
        const userSnapshot = await getDoc(userDoc);
        if(userSnapshot.exists()) {
            setUserDetails(userSnapshot.data());
        }
        console.log(rememberMe);
        if(rememberMe) {
          user.getIdToken()
          .then(async (idToken) => {
            await AsyncStorage.setItem('userToken', idToken);
            const testToken = await AsyncStorage.getItem('userToken');
          })
          .catch((error) => {
            console.log('Could not get user token', error);
          })

        }
        
        if(user.emailVerified) {
          navigation.navigate('MainTabs');
        } else {
          navigation.navigate('AccountCreatedScreen');
        }
    } catch (error) {
        console.error(error);
    }
  };

  const signOutUser = async (navigation) => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDetails(null);
      navigation.navigate('LogIn');
      console.log('Wylogowano');
    } catch (error) {
      console.log('Błąd wylogowywania:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, userDetails, signIn, signUp, signOutUser, promptAsync }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};