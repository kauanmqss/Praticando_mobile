import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'


export default function App() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container1}>
        <Text>Céu</Text>
      </View>
      <View style={styles.container2}>
        <Text>Inferno</Text>
      </View>
    </View>
  );
}




