import { View, Text, RefreshControl, Image, SafeAreaView, StyleSheet, Dimensions, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import Item from '../components/SearchScreen/Item';
import { COLOR_PRIMARY } from '../constants/colors';
import { firestore } from '../firebase/firebase';
import { getDoc, doc, collection, setDoc, where, getDocs, query } from 'firebase/firestore';
import { format, isToday, isYesterday } from 'date-fns';

const SearchScreen = ({navigation}) => {

    const [adList, setAdList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFirebaseData = async () => {

        const userCollectionRef = collection(firestore, 'advertisements');

        try {
            const snapshot = await getDocs(userCollectionRef);
            const docsData = [];

            snapshot.forEach( (doc) => {
                const dataWithId = {
                    id: doc.id,
                    ...doc.data(),
                }

                docsData.push(dataWithId);
            });

            setAdList(docsData);
            
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        fetchFirebaseData();
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        fetchFirebaseData();
    }

    return(
        <View style={{ flex: 1, backgroundColor: '#f3f3f3', marginTop: 40}}>
            { !adList ? (
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color={COLOR_PRIMARY} size={80}/>
                    <Text style={{ marginTop: 15, fontSize: 15, fontWeight: '600'}}>Loading ads. Please wait..</Text>
                </View>
            ) : (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20 }}>
                    {adList.map( (item, key) => {

                        const formatDate = (date) => {
                            if(isToday(date)) {
                                return `Dzisiaj, ${format(date, 'HH:mm')}`;
                            } else if(isYesterday(date)) {
                                return `Wczoraj, ${format(date, 'HH:mm')}`;
                            } else {
                                return format(date, 'dd MMMM yyyy');
                            }
                        }

                        const dateCreated = formatDate(item.timestamp);
                    
                        return(
                            <Item key={key} image={item.images[0].uri} title={item.title} price={item.price} mileage={item.mileage} location={item.location} productionYear={item.productionYear} createdAt={dateCreated} />
                        )
                        })
                    }   
                </ScrollView>
            ) }
            
        </View>
    )
}

export default SearchScreen;