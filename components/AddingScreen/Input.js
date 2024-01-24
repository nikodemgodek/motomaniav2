import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = (props) => {
    return(
        <View>
            <Text style={{
                color: props.error ? 'red' : 'black'
            }}>{props.label}</Text>
            <TextInput multiline={props.multiline} textAlignVertical={props.textAlignVertical} onBlur={props.onBlur} onChangeText={props.onChangeText} value={props.value} 
                style={[
                    { borderColor: props.error ? 'red' : 'transparent', borderWidth: 1 },
                    props.multiline ? styles.multiline : styles.input
                ]}
                placeholder={props.placeholder} />
            <Text style={{ color: 'red', marginTop: 2, marginBottom: 5, }}>{props.errormsg}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 5, 
        backgroundColor: '#f0f0f0', 
        paddingVertical: Platform.OS === 'ios' ? 10 : 5, 
        paddingHorizontal: 10, 
        marginTop: 5,
    },

    multiline: {
        borderRadius: 5, 
        backgroundColor: '#f0f0f0', 
        paddingVertical: 5, 
        paddingHorizontal: 10, 
        marginTop: 5, 
        height: 200
    }
})
export default Input;