import { View, Text, RefreshControl, Pressable, Image, SafeAreaView, StyleSheet, Dimensions, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import Item from '../components/SearchScreen/Item';
import { COLOR_PRIMARY } from '../constants/colors';
import { firestore } from '../firebase/firebase';
import { getDoc, doc, collection, setDoc, where, getDocs, query } from 'firebase/firestore';
import { format, isToday, isYesterday } from 'date-fns';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', padding: 20 }}>
                {adList.map( (item, key) => {

                    const formatDate = (date) => {
                        if(isToday(date)) {
                            return `Today, ${format(date, 'HH:mm')}`;
                        } else if(isYesterday(date)) {
                            return `Yesterday, ${format(date, 'HH:mm')}`;
                        } else {
                            return format(date, 'dd MMMM yyyy');
                        }
                    }

                    const dateCreated = formatDate(item.timestamp);
                    
                    const handlePress = () => {
                        navigation.navigate('DetailsScreen', {
                            ...item, timestamp: dateCreated
                        });
                    }

                    return(
                        <Item onPress={handlePress} key={key} image={item.images[0].uri} title={item.title} price={item.price} mileage={item.mileage} location={item.location} productionYear={item.productionYear} createdAt={dateCreated} />
                    )
                        
                })}
                { adList.length <= 0 ? (
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                        <Ionicons name="sad-outline" size={70} color="#666" />
                        <Text style={{ marginTop: 15, fontSize: 30, fontWeight: '600', color: '#666'}}>No advertisements found</Text>
                        <Text style={{ marginTop: 15, fontSize: 20, fontWeight: '600', color: '#666'}}>Swipe down to refresh</Text>
                    </View>
                    ) : null 
                }
            </ScrollView>
            
        </View>
    )
}

export default SearchScreen;