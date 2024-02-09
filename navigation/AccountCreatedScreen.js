import { View, Text } from "react-native"
import { ActivityIndicator, Divider } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const HEADER = "Verify your email address";
const SMALL_TEXT = "In order to use your Motomania account, you need to confirm your email address";

const AccountCreatedScreen = ({navigation}) => {

    const { user } = useContext(UserContext);

    const redirectToSetNickNameScreen = () => {
        navigation.navigate('SetNicknameScreen');
    }
    
    const checkEmailVerification = async () => {
        await user.reload();
        if(user.emailVerified) {
          console.log('Email verified! Success!');
        } else {
          console.log('Email not verified');
        }
        return user.emailVerified;
      };

    useEffect(() => {
      const interval = setInterval(async () => {
        const isEmailVerified = await checkEmailVerification();
        console.log(isEmailVerified);
        if(isEmailVerified) {
          redirectToSetNickNameScreen();
        } else {
          console.log('Account need activation');
        }
      }, 5000); // 300000 ms = 5 minut
  
      return () => clearInterval(interval); // Czyszczenie interwału przy odmontowywaniu komponentu
    }, []);

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingHorizontal: 30}}>
            <Ionicons name="mail-unread-outline" size={100} color="#000" />
            <Text style={{ fontSize: 28, fontWeight: '600', marginTop: 20 }}>{HEADER}</Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                <View style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: 'grey',
                        marginHorizontal: 10,
                    }}
                />
            </View>

            <Text style={{ fontSize: 16, textAlign: 'center'}}>{SMALL_TEXT}</Text>
            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 70, marginTop: 20 }}>You have 24 hours to verify your email address. Otherwise, your account will be deleted.</Text>
            <ActivityIndicator color="#222" size={50}/>

        </View>
    )
}

export default AccountCreatedScreen;