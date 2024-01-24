import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements';
const { width } = Dimensions.get('screen');

const CustomSelectCheckboxPicker = ({ updateCheckboxList, checkboxList, setModalVisible, setClicked, setSelected, onChange }) => {

    const handleToggleCheckbox = (id) => {

        const updateList = checkboxList.map( item => {

            if(item.id === id) {
                return { ...item, checked: !item.checked }
            }
            return item;
        });
        updateCheckboxList(updateList);
    }


    const toggleAll = (list, id, value) => {
        return list.map(item => {
            if(item.id === id) {
                return { ...item, checked: value };
            } else {
                return { ...item, checked: !value };
            }
        })
    }


    const closeModalWithoutAction = () => {
        handleCloseModal();
    }

    const applySettings = () => {
        handleChange();
        setSelectedItems();
        handleCloseModal();
    }

    const handleCloseModal = () => {
        setClicked(false);
        setModalVisible(false);
        
    }

    const getSelectedItems = () => {

        const updatedList = checkboxList
            .filter( item => item.checked === true )
            .map( obj => obj.title )

        return updatedList;
    }

    const setSelectedItems = () => {
        setSelected(getSelectedItems);
    }

    const handleChange = async () => {
        console.log('checkbox list has been updated!');

        console.log(getSelectedItems());
        onChange(getSelectedItems());
    }


    return(
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, flexDirection: 'column', width}}>
                <TouchableOpacity style={{ alignItems: 'flex-start', justifyContent: 'center', margin: 10 }} onPress={closeModalWithoutAction}>
                    <Icon name='chevron-left' size={40} color="#000" />
                </TouchableOpacity>
                <FlatList
                    data={checkboxList}
                    keyExtractor={ item => item.id }
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={(() => handleToggleCheckbox(item.id))}>
                            <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderRadius: 5, margin: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#ddd'}}>
                                <Text>{item.title}</Text>
                                <CheckBox
                                    checked={item.checked}
                                    onPress={() => handleToggleCheckbox(item.id)}
                                    // Use ThemeProvider to make change for all checkbox
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    checkedColor="red"
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.button} onPress={applySettings}>
                    <View>
                        <Text style={styles.buttonTxt}>Pokaż wybrane</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
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

export default CustomSelectCheckboxPicker;