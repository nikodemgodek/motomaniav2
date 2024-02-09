import { View, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { updateProfile, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';


const SetNicknameScreen = ({navigation}) => {
    
    const db = getFirestore();
    const { user } = useContext(UserContext);
    const auth = getAuth();

    const [userName, setUserName] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    const handleTextChange = (text) => {
        const filteredText = text.replace(/\s/g, '');
        setUserName(filteredText);
    }

    const handlePress = async () => {

        if(!isValid) {
            return;
        }
        
        if(user) {
            await updateProfile(user, {
                displayName: userName,
                photoURL: null
            }).then(() => {
                console.log("Display name updated:", user.displayName);

            }).catch((error) => {
                console.log("Error", error);
            })

            const docRef = doc(db, 'users', user.uid);
            getDoc(docRef)
                .then( (docSnapshot) => {
                    if(docSnapshot.exists()) {
                        const existingData = docSnapshot.data();
                        const updatedData = {
                            displayName: userName
                        }
                        const mergedData = { ...existingData, ...updatedData };
                        return updateDoc(docRef, mergedData);
                    } else {
                        console.log('Dokument nie istnieje');
                    }
                }).then(() => {
                    console.log('displayname updated');
                }).catch((error) => {
                    console.log('Wystapil blad', error);
                })

        } else {
            console.log("User not logged in");
        }

        navigation.navigate('MainTabs');
        
    }
    const validate = () => {

        if(!userName) {
            setErrorMessage('Username cannot be empty');
            return;
        }

        if(userName.length < 3) {
            setErrorMessage('Username should have at least 3 characters');
            return;
        }

        if(userName.length > 20) {
            setErrorMessage('Username should have less than 20 characters');
            return;
        }

        return true;

    }

    useEffect(() => {
        console.log(userName);
        const validateState = validate();

        if(validateState) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

    }, [userName])

    return(
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ padding: 20}}>
                <View style={{ flexDirection: 'column'}}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold'}}>Who you want to be displayed as?</Text>
                    <Text style={{ marginVertical: 5, fontSize: 14, marginBottom: 30}}>Once your advertisement will be open by other users this name will be displayed as you.</Text>
                    <TextInput value={userName} onChangeText={handleTextChange} placeholder="e.g. Filip626" error={!isValid ? true : false} activeUnderlineColor='green' style={{ backgroundColor: isValid ? 'rgba(54, 196, 97, 0.2)' : 'rgba(0, 0, 0, 0.1)' }}/>
                    {isValid ?
                        <Text style={{ color: 'green', marginTop: 5 }}>Username correct</Text>
                        :
                        <Text style={{ color: 'red', marginTop: 5 }}>{errorMessage && errorMessage}</Text>
                    }
                </View>

                <TouchableOpacity onPress={handlePress} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{ fontSize: 20, marginRight: 3}}>Next</Text> 
                    <Ionicons name={'arrow-forward-outline'} size={25} color="#000" />     
                </TouchableOpacity>
            </View>

            
            
        </SafeAreaView>
    )
}

export default SetNicknameScreen;