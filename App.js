import { StyleSheet, Text, View } from 'react-native';
import MainApp from './navigation/MainApp';
import { UserProvider } from './context/UserContext';
import AddingScreen from './navigation/AddingScreen';

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
