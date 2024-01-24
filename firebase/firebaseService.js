import firebase from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const auth = getAuth();

export const registerUsingEmailAndPassword = async (email, password, data) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        return setDoc(doc(db, "users", userCredential.user.uid), data)
    .then(() => {
        console.log('Dupa dodana');
    })


    })
    .catch((error) => {
        
        switch (error.code) {
        case 'auth/invalid-email':
            return { success: false, error: 'Niepoprawny adres e-mail.' };
        case 'auth/user-disabled':
            return { success: false, error: 'Konto użytkownika jest wyłączone.' };
        default:
            console.log('Błąd logowania:', error);
            return { success: false, error: error.message }; 
        }
    })
}

export const logInUsingEmailAndPassword = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Zalogowano:', user.uid);
        return { success: true, user }
    })
    .catch((error) => {
        console.error("Blad:", error);
    })
}
