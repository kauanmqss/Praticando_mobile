import { View, Text, Button } from 'react-native';
export default function App() {
  return (
    <View>
      <Text>Hello World!</Text>
      <Text>Olá, React Native!</Text>
      <Button title="Clique Aqui" onPress={() => alert('Botão clicado!')} />
    </View>
  );
}
