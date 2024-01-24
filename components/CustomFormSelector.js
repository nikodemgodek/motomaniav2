import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomFormSelector = (props) => {

    const openModal = () => {
        props.setClicked(true);
        props.setModalVisible(true);
    }

    
    
    return(
        <TouchableOpacity onPress={openModal}>
            <View style={styles.container}>
                <View style={styles.containerItem}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Text style={{marginTop: 5}}>{props.chosen}</Text>
                </View>
                <View style={styles.containerItem}>
                    <Icon name="chevron-right" size={30} />
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({

    container : {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    containerItem: {
        flexDirection: 'column',
        justifyContent: 'center'
    },

    text : {
        fontSize: 18
    }
});

export default CustomFormSelector;