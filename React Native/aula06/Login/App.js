import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import styles from './styles';

export default function App() {
  usuario = "queijo";
  senha = "1213";

  const alerta = () =>{
    alert("Você logou!")
  }
  if (usuario)

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.nome} placeholder="Coloque seu nome">
      </TextInput>

      <Text style={styles.password}>Senha</Text>
      <TextInput style={styles.senha} placeholder='Insira sua senha'>
      </TextInput>

      <Button title="Logar" onPress> </Button>

    </View>
  );
}

