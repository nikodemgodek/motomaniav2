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
import { COLOR_PRIMARY } from '../constants/colors';

const { width, height } = Dimensions.get('screen');
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
        <View style={{ 
            flex: 1, 
            width, 
            height,
            backgroundColor: '#fff' }}>
            <View style={{ position: 'relative', backgroundColor: COLOR_PRIMARY, height: "20%", borderBottomEndRadius: 40, borderBottomStartRadius: 40, justifyContent: 'center', alignItems: 'center', }}>
                <Pressable style={{ position: 'absolute', top: 55, right: 15 }} onPress={handleLogOut}>
                    <Ionicons name="log-out-outline" size={30} color="#fff" />
                </Pressable>
                <Image source={require('../assets/cat.jpg')} style={{ width: 100, height: 100, backgroundColor: '#ddd', marginTop: 140, borderRadius: 100, resizeMode: 'cover',  }} />
            </View>
            <View style={{ backgroundColor: '#fff', flex: 1, marginTop: 50, alignItems: 'center', }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 2}}>{user && userDetails.firstName} {user && userDetails.lastName}</Text>
                <Text style={{ fontSize: 18, backgroundColor: 'rgba(50, 104, 211, 0.2)', paddingHorizontal: 4, paddingVertical: 2}}>@{user && user.displayName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    avatar: {
        position: 'relative',
        borderRadius: 100,
        width: 100,  height: 100,
        backgroundColor: '#ccc',

    },

    avatarCircleButton : {
        position: 'absolute',
        borderRadius: 100,
        width: 35, height: 35,
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