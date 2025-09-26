import { useState } from 'react';
import { View, Text, Button } from 'react-native';
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Contagem: {count}</Text>
      <Button title="+" onPress={() => setCount(count + 1)} />
    </View>
  );
}
