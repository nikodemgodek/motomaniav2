import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Button = ({title, onPress, textColor, backgroundColor}) => {

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[
                styles.container,
                styles.shadow,
                {backgroundColor},
            ]}>
                <Text style={[
                    styles.text,
                    {color: textColor},
                ]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 15,
        margin: 10,
    },

    text: {
        fontSize: 16,
        fontWeight: '600',
    },

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

export default Button;