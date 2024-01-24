import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { useEffect, useState, useReducer } from 'react';


const CustomFormSelectorFromTo = ({ title, minValue, maxValue, onUpdateMinValue, onUpdateMaxValue }) => {

    const handleUpdateMinValue = (v) => {
        onUpdateMinValue(v);
    }

    const handleUpdateMaxValue = (v) => {
        onUpdateMaxValue(v);
    }

    const compareAndSwap = () => {
        
        if(parseInt(minValue) > parseInt(maxValue)) {
            const tmp = minValue;
            onUpdateMaxValue(tmp);
            onUpdateMinValue(maxValue);
        }

    }

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 5}}>
                <View style={styles.inputContainer}>
                    <TextInput value={minValue} onChangeText={(text) => handleUpdateMinValue(text)} onBlur={compareAndSwap} style={[
                        Platform.OS === 'ios' ? styles.inputIOS : styles.inputAndroid
                    ]} placeholder="od" keyboardType='numeric' />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput value={maxValue} onChangeText={(text) => handleUpdateMaxValue(text)} onBlur={compareAndSwap} style={[
                        Platform.OS === 'ios' ? styles.inputIOS : styles.inputAndroid
                    ]} placeholder="do" keyboardType='numeric' />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container : {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },

    inputContainer : {
        width: '50%',
        marginHorizontal: 2
    },

    text : {
        fontSize: 18
    },

    inputAndroid : {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20
    },

    inputIOS : {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20
    }
});

export default CustomFormSelectorFromTo;