import React, {useState} from 'react';
import { Text, View, TextInput,Image, Button } from 'react-native';

import styles from './Style';

export default function App() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  function login(){
    if ( usuario === 'Admin' && senha === '123'){
      setLogado(true)
    } else{
      alert('usuário ou senha incorretos')
    }
  }
  if (!logado){
  return(
    <View style = {styles.container}>
      <Image
       style = {styles.logo}
       source = {{uri:'https://1000logos.net/wp-content/uploads/2021/04/Volkswagen-logo.png'}}/>

      <TextInput
      style = {styles.input} 
      placeholder = 'usuário'
      value = {usuario}
      onChangeText = {setUsuario}
      />
        
      <TextInput
      style = {styles.input}
      placeholder = 'senha'
      value = {senha}
      onChangeText = {setSenha}
      secureTextEntry // bolinha na senha
      />
      
      <Button 
      title='fazer login'
      onPress={login}
      style = {styles.button}
      />



    </View>
  );
  }

return(
  <View style = {styles.container}>
    <Text>Seja bem-vindo, {usuario}</Text>




  </View>
)
}