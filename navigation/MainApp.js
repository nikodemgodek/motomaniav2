import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignupScreen from "./SignupScreen";
import LoginScreen from "./LoginScreen";
import GetStarted from "./GetStarted";
import WelcomeScreen from "./WelcomeScreen";
import SearchScreen from "./SearchScreen";
import OptionsScreen from "./OptionsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddingScreen from "./AddingScreen";
import { Platform } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({navigation}) => {
    return (
      <Tab.Navigator 
        initialRouteName="Account"
        screenOptions={ ({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let rn = route.name;

                if(rn === 'Search') {
                    iconName = focused ? 'home' : 'home-outline'
                } else if(rn === 'Account') {
                    iconName = focused ? 'settings' : 'settings-outline'
                }else if(rn === 'Add') {
                    iconName = focused ? 'add-circle' : 'add-circle-outline'
                }

                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: { paddingBottom: 10 },
            tabBarStyle: { padding: 10, height: Platform.OS === 'ios' ? 100 : 70, backgroundColor: '#fff'},
        })}>
        <Tab.Screen name="Search" component={SearchScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Add" component={AddingScreen} options={{
            headerShown: false,
            tabBarStyle: { }
        }}/>
        <Tab.Screen name="Account" component={OptionsScreen} options={{headerShown: false}}/>
        {/* Dodaj inne ekrany do Tab.Navigator */}
      </Tab.Navigator>
    );
  };

const MainApp = () => {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="GetStarted">
                <Stack.Screen name="GetStarted" component={GetStarted} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="SignUp" component={SignupScreen} options={{
                    headerShown: false,
                    headerLeft: undefined,
                    headerTitle: 'Register',
                    cardStyle: { backgroundColor: '#fff' },
                }}/>
                <Stack.Screen name="LogIn" component={LoginScreen} options={{
                    headerShown: false,
                }}/>
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApp;