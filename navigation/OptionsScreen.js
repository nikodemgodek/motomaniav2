import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    Platform,
    SectionList,
    Pressable,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonEx from '../components/OptionsScreen/ButtonEx';

const { width } = Dimensions.get('screen');
const settingsSections = [
    {
        title: "Account details",
        data: ['Username', 'Password change', 'Location', 'Phone number']
    },
]

const OptionsScreen = ({navigation}) => {

    const { user, signOutUser, userDetails } = useContext(UserContext);

    const handleLogOut = () => {
        signOutUser(navigation);
    }
    
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f1f1'}}>
            <View style={{
                alignItems: 'flex-end',
                marginRight: 20,
                marginTop: 55
            }}>
                <Pressable onPress={handleLogOut}>
                    <Ionicons name='log-out-outline' size={30} color="#000" />
                </Pressable>
                
            </View>
            <View style={[{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}, 
                            Platform.OS === 'ios' ? styles.marginIOS : styles.marginAndroid
            ]}>
                <View style={styles.avatar}>
                    <View style={{
                        overflow: 'hidden',
                        borderRadius: 100
                    }}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'cover'}} source={require('../assets/cat.jpg')} />
                    </View>
                    <TouchableOpacity style={styles.avatarCircleButton} onPress={() => {}}>
                        <View style={{backgroundColor: 'tomato', width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center',}}>
                            <Icon style={styles.avatarImg} name="camera" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                {<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <Text style={{ fontSize: 26, fontWeight: 600}}>{userDetails && userDetails.firstName} {userDetails && userDetails.lastName}</Text>
                    <Text>{user && user.email}</Text>
                </View>}
            </View>
            <View style={{ width, flex: 1, paddingHorizontal: 30 }}>
                {/*<SectionList
                    contentContainerStyle={{ marginHorizontal: 20}}
                    sections={settingsSections}
                    keyExtractor={ (item, index) => item + index}
                    renderItem={ ({item}) => (
                        <TouchableOpacity>
                            <View style={{ backgroundColor: '#fff', borderRadius: 5, marginVertical: 2, padding: 15}}>
                                <Text>{item}</Text>
                            </View>
                        </TouchableOpacity>
                        
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 10}}>{title}</Text>
                    )}
                    />*/}
                <Text style={{ fontSize: 23, fontWeight: '600', marginVertical: 15}}>Account details</Text>
                <ButtonEx title="Name" value={user && userDetails && userDetails.firstName}/>
                <ButtonEx title="Password" value={user && userDetails && userDetails.firstName} secured/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    avatar: {
        position: 'relative',
        borderRadius: 100,
        width: 150, height: 150,
        backgroundColor: '#ccc',

    },

    avatarCircleButton : {
        position: 'absolute',
        borderRadius: 100,
        width: 50, height: 50,
        backgroundColor: '#f1f1f1',
        bottom: 0, right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarImg: {
        color: '#000'
    },
    
    marginIOS: {
        marginTop: 10
    },
    
    marginAndroid: {
        marginTop: 60
    }
})
export default OptionsScreen;