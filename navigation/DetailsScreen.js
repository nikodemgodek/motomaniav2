import { View, Text, Dimensions, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from '../components/DetailsScreen/Carousel';
import { useContext, useEffect } from 'react';
import { getDoc, getFirestore, collection, where, query, doc } from 'firebase/firestore';
import { useState } from 'react';
import { format, isToday, isYesterday } from 'date-fns';

const db = getFirestore();

const { width } = Dimensions.get('screen');
const DetailsScreen = ({ route, navigation }) => {
    
    const [sellerDetails, setSellerDetails] = useState(null);

    const userData = route.params;
    const badges = [
        `Brand: ${userData.brand}`,
        `Model: ${userData.model}`, 
        `Year: ${userData.productionYear}`,
        `Mileage: ${userData.mileage} km`,
    ];

    const getSellerInfo = () => {
        const sellerID = userData.userId;
        const sellerRef = doc(db, 'users', sellerID);

        getDoc(sellerRef)
            .then( (docSnapshot) => {
                if(docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    console.log(data);
                    setSellerDetails(data);
                } else {
                    console.log('Nieznaleziono');
                }
            }).catch( (error) => {
                console.log('Wystapil blad');
            })
    }

    useEffect( () => {
        getSellerInfo();
    }, [])

    return(
        <View style={{ flex: 1, width, position: 'relative' }}>
            <Pressable style={{ position: 'absolute', top: 60, left: 10, zIndex: 3, elevation: 3 }} onPress={() => { navigation.goBack() }}>
                <Ionicons name="chevron-back-outline" size={40} color="#ccc" />
            </Pressable>

            <Carousel items={userData.images} />

            <View style={{ flex: 2, borderTopEndRadius: 30, borderTopLeftRadius: 30, backgroundColor: '#fff', marginTop: -40 }}>
                <View style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 10 }}>
                    <Text style={{ fontSize: 14 }}>{userData.timestamp && userData.timestamp}</Text>
                    <Text style={{ fontSize: 18 }}>{userData.title && userData.title}</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 5}}>{userData.price} zł</Text>
                </View>
                <View style={{ paddingHorizontal: 15, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {badges.map(( item, key ) => (
                        <View key={key} style={{ borderWidth: 1, borderRadius: 5, paddingVertical: 5, paddingHorizontal: 8, margin: 3}}>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10}}>Description:</Text>
                    <Text>{userData.desc}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', backgroundColor: '#444', padding: 20, marginTop: 15}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', marginRight: 5}}>Private person</Text>
                        <Ionicons name="information-circle-outline" size={20} color="#fff"/>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 20}}>
                        <View style={{ width: 75, height: 75, backgroundColor: '#999', borderRadius: 100, alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                            <Ionicons name="camera" size={30} color="#ccc" />
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column'}}>
                            <Text style={{ color: '#fff', fontSize: 22}}>{sellerDetails ? sellerDetails.displayName : 'Loading..'}</Text>
                            <Text style={{ color: '#fff', fontSize: 16}}></Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DetailsScreen;