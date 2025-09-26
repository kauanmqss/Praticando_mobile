import { View, StyleSheet, Button } from 'react-native';
    
export default function App() {
    digaOla = () => {
      alert('Olá, seja bem-vindo!!')
    }
    
    return (
      <View style={styles.container}>
        <Button title="Diga olá!" mode="contained" onPress={this.digaOla} >
        </Button>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});