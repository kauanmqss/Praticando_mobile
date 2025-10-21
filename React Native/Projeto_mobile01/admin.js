// ---------- IMPORTS ----------
import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import styles from './styles';
import { ItemContext } from './ItemContext';

// ---------- TELA DE CADASTRO ----------
export function AdminScreen() {
  const { itens, setItens } = useContext(ItemContext);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const cadastrarItem = () => {
    if (!nome.trim() || !preco.trim() || !imagem.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      nome,
      preco,
      imagem,
    };

    setItens([...itens, novoItem]);
    setNome('');
    setPreco('');
    setImagem('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Novo Item</Text>

      <TextInput
        placeholder="Nome do item"
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode="outlined"
        value={nome}
        onChangeText={setNome}
        outlineColor="transparent"
        activeOutlineColor="#6200ee"
      />
      <TextInput
        placeholder="Preço (R$)"
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode="outlined"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
        outlineColor="transparent"
        activeOutlineColor="#6200ee"
      />
      <TextInput
        placeholder="URL da imagem"
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode="outlined"
        value={imagem}
        onChangeText={setImagem}
        outlineColor="transparent"
        activeOutlineColor="#6200ee"
      />

      <Button mode="contained" onPress={cadastrarItem} labelStyle={{ fontFamily: 'Montserrat-Bold'}} style={styles.botoes}>
        Adicionar Item
      </Button>
    </View>
  );
}

// ---------- TELA DE RELATÓRIO ----------
export function RelatorioScreen() {
  const { itens } = useContext(ItemContext);

  const totalItens = itens.length;
  const totalPreco = itens.reduce((acc, item) => acc + parseFloat(item.preco || 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Relatório de Itens</Text>

      <Text style={{ marginTop: 10, fontSize: 18, fontFamily: 'Poppins-Bold' }}>Total de itens: {totalItens}</Text>
      <Text style={{ fontSize: 18, fontFamily: 'Poppins-Bold' }}>Soma de preços: R$ {totalPreco.toFixed(2)}</Text>

      {itens.length === 0 ? (
        <Text style={{ marginTop: 20, fontSize: 18, fontFamily: 'Poppins-Bold' }}>Nenhum item cadastrado.</Text>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: '#FFE6F0',
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
                alignItems: 'center',
                width: 250,
              }}
            >
              <Image source={{ uri: item.imagem }} style={{ width: 80, height: 80, borderRadius: 10 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.nome}</Text>
              <Text>R$ {item.preco}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// ---------- TELA DE VENDAS ----------
export function VendasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vendas</Text>
    </View>
  );
}

// ---------- STACKS COM TRANSIÇÃO DE DESLIZAR ----------
const Stack = createStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function RelatorioStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Relatório" component={RelatorioScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function VendasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Vendas" component={VendasScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// ---------- DRAWER COM STACKS ----------
const Drawer = createDrawerNavigator();

export default function LojaScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#FACFF1',
        drawerStyle: { backgroundColor: '#FFE6F0', width: 220 },
        drawerActiveTintColor: '#6200ee',
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: 'Montserrat-Regular',
        },
      }}

      drawerContent={(props) => (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
          <DrawerItemList {...props} />
          <View style={{ flex: 1 }} />
          <View style={{ padding: 16 }}>
            <Button
              mode="contained"
              buttonColor="#6200ee"
              style={styles.botaoMenu}
              labelStyle={{ fontFamily: 'Montserrat-Bold'}}
              onPress={() => props.navigation.navigate('Login')}
            >
              Sair
            </Button>
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="Tela Admin" component={AdminStack}  />
      <Drawer.Screen name="Relatórios" component={RelatorioStack} />
      <Drawer.Screen name="Vendas" component={VendasStack} />
    </Drawer.Navigator>
  );
}