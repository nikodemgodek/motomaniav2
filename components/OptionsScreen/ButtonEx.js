import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonEx = (props) => {

    const hashValue = (value, sign) => {
        if(!value) return;

        let hashedValue = '';
        const valueLength = value.length
        
        for(let i=0; i < valueLength; i++) {
            hashedValue += sign;
        }
        return hashedValue;
    }

    let hashedValue = hashValue(props.value, "*");

    return(
        <TouchableOpacity>
            <View style={[styles.shadow,{
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 3,
                paddingHorizontal: 15,
                paddingVertical: 10 ,
                marginVertical: 3
            }]}>
                <Text>{props.title}</Text>
                <Text style={{ color: '#ccc'}}>{props.secured ? hashedValue : props.value}</Text>
            </View>
        </TouchableOpacity>
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

export default ButtonEx;