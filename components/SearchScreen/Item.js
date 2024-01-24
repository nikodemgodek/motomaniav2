import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = (props) => {
    return(
        <View style={[{ width: '50%', padding: 3}]}>
            {!props.image &&
                <View style={{ backgroundColor: '#999', height: 150, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 5, borderTopEndRadius: 5}}>
                    <Ionicons name="camera" size={30} color="#fff"/>
                    <Text style={{ color: '#fff', fontSize: '600', fontSize: 10 }}>No photo available</Text>
                </View>
            }
            <Image source={{ uri: props.image }} style={{ width: '100%', height: '60%', resizeMode: 'cover' }} />
            <View style={{ backgroundColor: '#fff', padding: 10, borderBottomEndRadius: 5, borderBottomLeftRadius: 5}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text>{props.title}</Text>
                    <Ionicons name="heart-outline" size={23} color="#222" />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5}}>{props.price} zł</Text>

                <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10}}>
                    <Text style={{ fontSize: 12 }}>{props.location}</Text>
                    <Text style={{ fontSize: 12 }}>{props.createdAt}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Ionicons name="timer-outline" size={15} color="#222" />
                    <Text style={{ fontSize: 12, marginLeft: 5 }}>{props.productionYear} - {props.mileage} km</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.05,
        elevation: 4
    }
})

export default Item;