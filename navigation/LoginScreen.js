import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Platform, Image, Pressable} from 'react-native';
import Button from '../components/Button';
import PrettyTextInput from '../components/PrettyTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { UserContext } from '../context/UserContext';
import { firestore } from '../firebase/firebase';

const COLOR_PRIMARY = '#1A472A';
const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Please provide your password')
})

const LoginScreen = ({navigation}) => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { user, promptAsync, signIn } = useContext(UserContext);

    useEffect(() => {

        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => {
                setKeyboardOpen(true);
            }
        )

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
                setKeyboardOpen(false);
            }
        )

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [])

    const handleLogin = async (values, { setSubmitting, resetForm }) => {
        Keyboard.dismiss();
        try {
            setSubmitting(true);
            await signIn(values.email, values.password, navigation, firestore, rememberMe);
            resetForm();
        } catch (error) {
            console.log('Blad logowania:', error);
        } finally {
            setSubmitting(false);
        }
    }

    return(
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
        >
             {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting, resetForm }) => (
                
                    <View style={{justifyContent: 'center', marginTop: 80, marginHorizontal: 30}}>
                        <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', marginVertical: 10}}>
                            <Text style={{fontSize: 26, fontWeight: '600', marginBottom: 15}}>Welcome back!</Text>
                            <Text testID="LoginScreenText" style={{fontSize: 14}}>Nice to see you again, we missed you.</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ marginTop: keyboardOpen ? 0 : 0 }}>
                                <View style={{ marginVertical: 10 }}>
                                    <TextInput activeOutlineColor={COLOR_PRIMARY} style={{ height: 45, marginBottom: 5 }} label="Email" onBlur={handleBlur('email')} onChangeText={handleChange('email')} value={values.email} mode="outlined" error={ errors.email && touched.email ? true: false } />
                                    {errors.email && touched.email && <Text style={{fontSize: 12, color: 'red'}}>{errors.email}</Text>}
                                    <TextInput activeOutlineColor={COLOR_PRIMARY} style={{ height: 45 }} label="Password" onBlur={handleBlur('password')} onChangeText={handleChange('password')} value={values.password} secureTextEntry={true} mode="outlined" error={ errors.password && touched.password ? true: false } />
                                    {errors.password && touched.password && <Text style={{fontSize: 12, color: 'red'}}>{errors.password}</Text>}
                                </View>
                                
                                
                                <Button title="Log in" onPress={isValid ? handleSubmit : null } textColor={'#fff'} backgroundColor={'#1A472A'} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                    <View style={{
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: 'grey',
                                            marginHorizontal: 10
                                        }}
                                    />
                                    <Text style={{ fontSize: 14 }}>or Sign In using</Text>
                                    <View style={{
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: 'grey',
                                            marginHorizontal: 10,
                                        }}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <TouchableOpacity 
                                        onPress={() => {}}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            height: 52,
                                            borderWidth: 1,
                                            borderColor: 'grey',
                                            marginRight: 4,
                                            borderRadius: 10
                                        }}>
                                        <Image 
                                            source={require('../assets/facebook.png')}
                                            style={{
                                                height: 36,
                                                width: 36,
                                                marginRight: 8
                                            }}/>
                                        <Text>Facebook</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={() => promptAsync()}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            height: 52,
                                            borderWidth: 1,
                                            borderColor: 'grey',
                                            marginRight: 4,
                                            borderRadius: 10
                                        }}>
                                            <Image 
                                                source={require('../assets/google.png')}
                                                style={{
                                                    height: 36,
                                                    width: 36,
                                                    marginRight: 8
                                                }}/>
                                            <Text>Google</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginVertical: 22
                                }}>
                                    <Text style={{ fontSize: 16, color: '#000'}}>Don't have an account?</Text>
                                    <Pressable
                                        onPress={() => navigation.navigate('SignUp')}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: COLOR_PRIMARY,
                                                fontWeight: '600',
                                                marginLeft: 6,
                                            }}>Sign Up</Text>
                                        </Pressable>
                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {isSubmitting && <ActivityIndicator size={50} color={COLOR_PRIMARY}/>}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
             )}
        </Formik>
    )
}

const styles = StyleSheet.create({

})

export default LoginScreen;