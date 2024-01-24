import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Platform, Image, Pressable, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import PrettyTextInput from '../components/PrettyTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { registerUsingEmailAndPassword } from '../firebase/firebaseService';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { firestore } from '../firebase/firebase';

const COLOR_PRIMARY = '#1A472A';

const validationSchema = yup.object().shape({
    email: yup.string().matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        'Please insert valid e-mail address'
      ).required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    passwordrepeat: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Repeat password is required'),
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    phone: yup.string().matches(/^[0-9]{9}$/, 'Invalid phone number').required('Phone number is required'),
})

const SignupScreen = ({navigation}) => {

    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    
    const { signUp } = useContext(UserContext);

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

    const handleRegister = async (values, { setSubmitting, resetForm }) => {
        Keyboard.dismiss();
        try {
            await signUp(values.email, values.password, navigation, firestore, {
                firstName: values.firstname,
                lastName: values.lastname,
                phone: values.phone
            });
            resetForm();
            navigation.navigate('MainTabs');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
            style={{position: 'absolute'}}
        >
             {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting, resetForm }) => (
                    <View style={{justifyContent: 'center', marginTop: 50, marginHorizontal: 30}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', marginVertical: 5}}>
                                <Text style={{fontSize: 26, fontWeight: '600', marginBottom: 10}}>Create Account</Text>
                                <Text style={{fontSize: 14}}>Find your dream car and buy it now!</Text>
                            </View>
                        </View>
                        
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ marginTop: keyboardOpen ? 0 : 0 }}>
                                <PrettyTextInput placeholder="First Name" icon='person-outline' onBlur={handleBlur('firstname')} onChangeText={handleChange('firstname')} value={values.firstname}/>
                                {errors.firstname && touched.firstname && <Text style={{fontSize: 12, color: 'red'}}>{errors.firstname}</Text>}
                                <PrettyTextInput placeholder="Last Name" icon='person-outline' onBlur={handleBlur('lastname')} onChangeText={handleChange('lastname')} value={values.lastname}/>
                                {errors.lastname && touched.lastname && <Text style={{fontSize: 12, color: 'red'}}>{errors.lastname}</Text>}
                                <PrettyTextInput placeholder="Email Address" icon='mail-outline' onBlur={handleBlur('email')} onChangeText={handleChange('email')} value={values.email}/>
                                {errors.email && touched.email && <Text style={{fontSize: 12, color: 'red'}}>{errors.email}</Text>}
                                <PrettyTextInput placeholder="Password" icon='key-outline' onBlur={handleBlur('password')} onChangeText={handleChange('password')} value={values.password} secureTextEntry={true}/>
                                {errors.password && touched.password && <Text style={{fontSize: 12, color: 'red'}}>{errors.password}</Text>}
                                <PrettyTextInput placeholder="Re-enter Password" icon='key-outline' onBlur={handleBlur('passwordrepeat')} onChangeText={handleChange('passwordrepeat')} value={values.passwordrepeat} secureTextEntry={true}/>
                                {errors.passwordrepeat && touched.passwordrepeat && <Text style={{fontSize: 12, color: 'red'}}>{errors.passwordrepeat}</Text>}
                                <PrettyTextInput placeholder="Phone" icon='call-outline' onBlur={handleBlur('phone')} onChangeText={handleChange('phone')} value={values.phone}/>
                                {errors.phone && touched.phone && <Text style={{fontSize: 12, color: 'red'}}>{errors.phone}</Text>}
                                
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10,
                                    marginLeft: -10,
                                    marginBottom: 15
                                }}>
                                    <Checkbox
                                        status={termsChecked ? 'checked' : 'unchecked'}
                                        onPress={() => setTermsChecked(!termsChecked)}
                                        color={COLOR_PRIMARY}
                                    />
                                    <Text>I agree with terms and conditions.</Text>
                                </View>
                                <Button title="Sign Up" onPress={isValid ? handleSubmit : null} textColor={'#fff'} backgroundColor={'#1A472A'} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                    <View style={{
                                            flex: 1,
                                            height: 1,
                                            backgroundColor: 'grey',
                                            marginHorizontal: 10
                                        }}
                                    />
                                    <Text style={{ fontSize: 14 }}>or Sign up with</Text>
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
                                        onPress={() => console.log('Pressed!')}
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
                                        onPress={() => console.log('Pressed!')}
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
                                    <Text style={{ fontSize: 16, color: '#000'}}>Already have an account</Text>
                                    <Pressable
                                        onPress={() => navigation.navigate('LogIn')}>
                                            <Text style={{
                                                fontSize: 16,
                                                color: COLOR_PRIMARY,
                                                fontWeight: '600',
                                                marginLeft: 6,
                                            }}>Login</Text>
                                        </Pressable>
                                </View>
                                {isSubmitting && <ActivityIndicator size={50} color={COLOR_PRIMARY}/>}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
             )}
        </Formik>
    )
}

const styles = StyleSheet.create({

})

export default SignupScreen;