import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import styles from './styles';

export default function App() {
  return (
    <LinearGradient 
    colors = {['#02A5E6', '#007CDB', '#0055BD']} style={styles.mainContainer}>
      <Text style = {styles.text}> Aprendendo gradiente em React Native </Text>
    </LinearGradient>


  );
}

