import app from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMbX6C5u1he1s82csJ5iEKCUz_eOq42Vk",
  authDomain: "fir-auth-98e7b.firebaseapp.com",
  projectId: "fir-auth-98e7b",
  storageBucket: "fir-auth-98e7b.appspot.com",
  messagingSenderId: "77833150809",
  appId: "1:77833150809:web:8f111ca49a58e64ebe6c48"
};

const firebase = initializeApp(firebaseConfig);
const firestore = initializeFirestore(firebase, {
  cacheSizeBytes: 10000000
});

const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { firestore, firebase };

// ios: 514148160856-gv0avgoih8idn84cdc5svifpr1ius0u9.apps.googleusercontent.com
// android: 514148160856-jr0dnbi85km7jsa0e392v9li4en416h9.apps.googleusercontent.com