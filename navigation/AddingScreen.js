import { SafeAreaView, View, Text, StyleSheet, Alert, Modal, TextInput, ScrollView, Pressable, Image, FlatList, Platform, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import { useContext, useState, useEffect, useRef } from 'react'
import { getDoc, doc, collection, setDoc, where, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { UserContext } from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Constants } from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { number } from 'yup';
import Input from '../components/AddingScreen/Input';

import { Formik } from 'formik';
import * as yup from 'yup';


const COLOR_PRIMARY = '#1A472A';
const HEADER_TITLE = 'Add an advertisement';
const phoneRegExp = /^[1-9][0-9]{8}$/;

const AddingScreen = ({navigation}) => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [headerVisible, setHeaderVisible] = useState(false);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false },
    );

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 70],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const validationSchema = yup.object().shape({
        title: yup.string().min(10, 'Title should have more than 10 letters').required('Title is required'),
        brand: yup.string().required('Brand is required'),
        model: yup.string().required('Model is required'),
        price: yup.number().positive().integer().required('Price field is required'),
        desc: yup.string().matches(/[^\s]{10,}/, 'Minimum 20 characters needed').required('Description is required'),
        phone: yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone is required'),
        mileage: yup.number().positive().integer().required('Vehicle mileage field is required'),
        productionYear: yup.number().positive().integer().required('Vehicle production year field is required'),
        location: yup.string().required('Your location is required'),
    })

    const { user } = useContext(UserContext);

    console.log(user);

    const [modalVisible, setModalVisible] = useState(true);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState(null);

    useEffect( () => {
        console.log(images);
    }, [images])
    
    const tmpData = [
        { id: '1', text: '123' }
    ]

    const inputs = {
        brand: '',
        model: '',
        price: '',
        year: '',
        fuel: '',
    }

    const [values, setValues] = useState(inputs);
    
    const displayAlert = (title, msg) => {

        Alert.alert(
            title,
            msg,
            [
              { text: 'OK', onPress: () => console.log('OK naciśnięte!') }
              // Tutaj możesz dodać dodatkowe przyciski, jeśli potrzebujesz
            ],
            { cancelable: false }
        );

    }

    function generateRandomId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
    }

    const handleAdd = async (values) => {
        try {

            if(images === null) {
                alert('Upload at least one picture');
                return;
            }

            const userCollectionRef = collection(firestore, 'advertisements');
            const advertisementID = generateRandomId();
            const userDoc = doc(userCollectionRef, advertisementID);
            const currentTimestamp = Date.now();

            const objectToAdd = {
                title: values.title,
                images: images,
                brand: values.brand,
                model: values.model,
                price: values.price,
                desc: values.desc,
                phone: values.phone,
                mileage: values.mileage,
                location: values.location,
                productionYear: values.productionYear,
                timestamp: currentTimestamp,
                userId: user.uid,
            }

            console.log(objectToAdd);

            await setDoc(userDoc, objectToAdd, { merge: true });
            displayAlert('Success', 'Ogłoszenie zostało dodane.');

            const q = query(userCollectionRef, where('userID', '==', user.uid));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach( (doc) => {
                console.log(doc.id, '=>', doc.data());
            })

            navigation.navigate('Search');

        } catch (error) {
            console.log(error);
        }
    }


    useEffect( () => {

        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted') {
                alert('Aby wybrać zdjęcie musisz mieć dostęp do galerii');
            }
        })();

    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          //allowsEditing: true,
          allowsMultipleSelection: true,
          selectionLimit: 8,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImages(result.assets);
        }
    };

    return(
        <Formik
            initialValues={{ title: '', brand: '', model: '', price: null, desc: '', phone: null, mileage: null, productionYear: null, location: null }}
            onSubmit={handleAdd}
            validationSchema={validationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting, resetForm }) => (
                <View style={{ flex: 1, paddingTop: 40, backgroundColor: '#fff'}}>
                    <View style={{ flex: 1 }}>
                        <Animated.View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: 60,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 2,
                            opacity: headerOpacity,
                            }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '600'
                            }}>Add an advertisement</Text>
                        </Animated.View>
                        <ScrollView onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', marginHorizontal: 20}}>
                            <Text style={[
                                {
                                    marginTop: 10,
                                    fontSize: 26,
                                    fontWeight: 'bold',
                                },
                        ]}>Add an advertisement</Text>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#444'
                            }}>Details</Text>
                            <View style={{
                                position: 'relative',
                                backgroundColor: '#fff0f3',
                                height: 200,
                                marginVertical: 20,
                            }}>
                                {images && images.length > 0 &&
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginHorizontal: 20,
                                        marginVertical: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 18, fontWeight: '600'
                                        }}>Zdjęcia</Text>
                                        <Pressable onPress={pickImage}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                                borderBottomWidth: 2,
                                                borderBottomColor: '#444',
                                            }}>Edytuj</Text>
                                        </Pressable>
                                        
                                    </View>
                                    <View>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={{
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                            paddingHorizontal: 10,
                                            marginTop: 15,
                                        }}>
                                        {images && images.length > 0 && images.map((item, key) => (
                                                <View key={key} style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: "#ccc",
                                                    borderRadius: 10,
                                                    width: 70,
                                                    height: 70,
                                                    marginHorizontal: 5
                                                }}>
                                                    <Image source={{uri: item.uri}} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10}} />
                                                </View>
                                            ))}
                                        </ScrollView>
                                        <Text style={{marginLeft: 20, marginTop: 15, color: '#444'}}>Pierwsze zdjęcie będzie zdjęciem głównym.</Text>
                                    </View>
                                </View> }
                                {images == null &&
                                    <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column'}} onPress={pickImage}>
                                        <Ionicons name={"camera"} size={50} color="#444" style={{opacity: .2}}/>
                                        <Text style={{
                                            marginTop: 0,
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#444',
                                            opacity: .4,
                                        }}>
                                            Add photos
                                        </Text>
                                    </Pressable>
                                }
                                
                            </View>
                            <Input onBlur={handleBlur('title')} onChangeText={handleChange('title')} value={values.title} label="Advertisement title*" placeholder="i.e. Sell BMW e46 328Ci Topas-blau well condition" error={ errors.title && touched.title ? true: false } errormsg={touched.title && errors.title}/>
                            <Input onBlur={handleBlur('brand')} onChangeText={handleChange('brand')} value={values.brand} label="Make*" placeholder="" error={ errors.brand && touched.brand ? true: false } errormsg={touched.brand && errors.brand}/>
                            <Input onBlur={handleBlur('model')} onChangeText={handleChange('model')} value={values.model} label="Model*" placeholder="" error={ errors.model && touched.model ? true: false } errormsg={touched.model && errors.model}/>
                            <Input onBlur={handleBlur('price')} onChangeText={handleChange('price')} value={values.price} label="Price*" placeholder="" error={ errors.price && touched.price ? true: false } errormsg={touched.price && errors.price}/>
                            <Input onBlur={handleBlur('productionYear')} onChangeText={handleChange('productionYear')} value={values.productionYear} label="Production year*" placeholder="" error={ errors.productionYear && touched.productionYear ? true: false } errormsg={touched.productionYear && errors.productionYear}/>
                            <Input onBlur={handleBlur('mileage')} onChangeText={handleChange('mileage')} value={values.mileage} label="Mileage (km/h)*" placeholder="" error={ errors.mileage && touched.mileage ? true: false } errormsg={touched.mileage && errors.mileage}/>
                            <Input multiline textAlignVertical={'top'} onBlur={handleBlur('desc')} onChangeText={handleChange('desc')} value={values.desc} label="Description*" placeholder="" error={ errors.desc && touched.desc ? true: false } errormsg={touched.desc && errors.desc}/>
                            <Input onBlur={handleBlur('phone')} onChangeText={handleChange('phone')} value={values.phone} label="Phone number*" placeholder="" error={ errors.phone && touched.phone ? true: false } errormsg={touched.phone && errors.phone}/>
                            <Input onBlur={handleBlur('location')} onChangeText={handleChange('location')} value={values.location} label="Location*" placeholder="" error={ errors.location && touched.location ? true: false } errormsg={touched.location && errors.location}/>
                            
                            <View style={{
                                marginTop: 20, marginBottom: 20,
                                flexDirection: 'column',
                            }}>
                                <Button 
                                    style={{ 
                                        backgroundColor: 'transparent',
                                        borderWidth: 1,
                                        marginVertical: 5,
                                        paddingVertical: 5,
                                    }} 
                                    mode="outlined" 
                                    onPress={() => { console.log('pressed')}}
                                    color={COLOR_PRIMARY}
                                >
                                    Clear fields and retry
                                </Button>
                                <Button 
                                    style={{ 
                                        backgroundColor: isValid ? COLOR_PRIMARY : 'grey',
                                        paddingVertical: 5,
                                    }} 
                                    mode="contained" 
                                    onPress={isValid && handleSubmit}
                                >
                                    Finish
                                </Button>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </Formik>
        
    )
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 10,
        backgroundColor: '#fff'
    }
})

export default AddingScreen;