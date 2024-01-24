import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStarted = ({navigation}) => {

    const goToAuthPage = () => {
        navigation.navigate('SignUp')
    }

    return(
        <LinearGradient
            style={{ flex: 1}}
            colors={['#4E9258', '#1A472A']}
        >
            <View style={{
                position: 'absolute',
                top: 500,
                width: '100%',
                padding: 20,
            }}>
                <View style={{ marginLeft: 10}}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '600',
                        color: '#fff',
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: '600',
                        color: '#fff',
                    }}>Started</Text>
                </View>
                <View style={{
                    marginVertical: 22,
                    marginLeft: 10
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff',
                    }}>Find your dream car and buy or</Text>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>sell car you already have</Text>
                </View>
                <Button title="Get Started" onPress={goToAuthPage} textColor={'#fff'} backgroundColor={'#1A472A'} />
            </View>

        </LinearGradient>
    )
}

export default GetStarted;