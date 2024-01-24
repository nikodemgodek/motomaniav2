import { TextInput, StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrettyTextInput = ({placeholder, icon, onBlur, onChangeText, value, error, secureTextEntry }) => {
    return(
        <View>
            <View style={styles.container}>
                <Ionicons style={{marginRight: 10}} name={icon} size={20} color="#000" />
                <TextInput placeholder={placeholder} onBlur={onBlur} onChangeText={onChangeText} value={value} secureTextEntry={secureTextEntry}/>
            </View>
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default PrettyTextInput;