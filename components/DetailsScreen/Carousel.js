import Swiper from 'react-native-swiper';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { useState } from 'react';

const Carousel = (props) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleIndexChanged = (index) => {
        setCurrentIndex(index);
    }

    return(
        <Swiper
            scrollEnabled={true}
            paginationStyle={{ marginBottom: 30}}
            loop={false} 
            showsPagination={true} 
            onIndexChanged={handleIndexChanged} 
            dotStyle={{ backgroundColor: '#ccc', width: 8, height: 8 }}
            activeDotStyle={{ backgroundColor: '#000', width: 8, height: 8 }}
          
        >
            {props.items.map( (item, key) => (
                <View key={key} style={styles.item}>
                    <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </View>
            ))}

        </Swiper>
    )
}


const styles = StyleSheet.create({
    item : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Carousel;