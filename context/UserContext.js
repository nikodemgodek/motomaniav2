import React, { createContext, useContext, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithCustomToken } from 'firebase/auth';
import firebase from '../firebase/firebase';
import { getDoc, doc, collection, setDoc } from 'firebase/firestore';
// Inicjalizacja autentykacji Firebase
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(firebase);
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        navigation.navigate('MainTabs');
    } catch (error) {
        console.log('Blad:', error);
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
        
      
        navigation.navigate('MainTabs');
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
    <UserContext.Provider value={{ user, userDetails, signIn, signUp, signOutUser }}>
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