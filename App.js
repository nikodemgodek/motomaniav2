import { StyleSheet, Text, View } from 'react-native';
import MainApp from './navigation/MainApp';
import { UserProvider } from './context/UserContext';
import AddingScreen from './navigation/AddingScreen';
import DetailsScreen from './navigation/DetailsScreen';
import SetNicknameScreen from './navigation/SetNicknameScreen';
import OptionsScreen from './navigation/OptionsScreen';
import { SearchBar } from 'react-native-elements/dist/searchbar/SearchBar';
import SearchScreen from './navigation/SearchScreen';

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
