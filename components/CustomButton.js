import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const CustomButton = ( props ) => {

    
    return(
        <TouchableOpacity style={styles.button} onPress={props.onClick}>
            <View>
                <Text style={styles.buttonTxt}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button : {
        height: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 10
    },

    buttonTxt : {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})


export default CustomButton;