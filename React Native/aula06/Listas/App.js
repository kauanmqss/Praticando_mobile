import React from 'react';
import { View, Text, FlatList, i } from 'react-native'
import styles from './styles';

const DADOS = [
  {
  id: '1',
  descricao: 'TV Led 49',
  categoria_id: 1
  },
  {
  id: '4',
  descricao: 'Camisa trilha',
  categoria_id: 2
  },
  {
  id: '4',
  descricao: 'Qualquer semelhança é mera coincidencia',
  categoria_id: 3
  },
  {
  id: '5',
  descricao: 'PC Gamer da nasa',
  categoria_id: 5
  },
  {
  id: '6',
  descricao: 'Dispositivo de pesquisa de baixo rendimento e baixo poder de processamento (PC RUIM)',
  categoria_id: 6
  },
  {
  id: '7',
  descricao: 'Rx 580 (R$100)',
  categoria_id: 6
  },
  {
  id: '8',
  descricao: 'Prato de arroz e feijão usado(R$400)',
  categoria_id: 6
  },
  {
  id: '6',
  descricao: 'Dispositivo de pesquisa de baixo rendimento e baixo poder de processamento (PC RUIM)',
  categoria_id: 6
  },
  
];

const Item = ({ descricao }) => (
  <View style={styles.item}>
  <Text style={styles.title}> {descricao} </Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item descricao={item.descricao} />
  );
  return (
    <View style={styles.container}>
      <FlatList
      data={DADOS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      />
    </View>
  );
}

export default App;


