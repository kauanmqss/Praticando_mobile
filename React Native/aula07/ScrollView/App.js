import { StyleSheet, Text, View, ScrollView } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
    <ScrollView style = {styles.containerScrollView}>
      <Text style = {styles.texto}>
        Este componente tambem é um container, sendo exemplo da View,
         utilizado para armazenar conteúdo, permitindo interação na tela por meio de      rolamento. Logo, ScrollView, para funcionar corretamente precisa ter uma altura limitada, já que sua serventia é justamente conter elementos filhos com altura limitada.
      </Text>
    </ScrollView>


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
  containerScrollView:{
    backgroundColor:'#d9d9d9',
    marginHorizontal:25,
    },
  texto:{
    fontSize: 26,
  },
});
