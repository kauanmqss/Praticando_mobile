import { Text, View, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AdminScreen from './admin';
import LojaScreen from './lojaScreen';
import LoadingScreen from './loadingScreen';
import { ItemProvider } from './ItemContext';
import styles from './styles';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const URL_FIREBASE = 'https://firestore.googleapis.com/v1/projects/cadastrologin-dd7bb/databases/(default)/documents/usuarios';





function CadastroScreen ({ navigation }) { {/* Função da tela de cadastro */}

  const [ usuario, setUsuario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');  {/* Variáveis de estados */}
  const [ confirmarSenha, setConfirmarSenha ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);


   const validarEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const validarSenha = (senha) => {
      const regex = /^(?=.*\d).{8,}$/;
      return regex.test(senha);
    }


  const cadastrarUsuario = async () => {
    
    setErrorMessage('')

    if ( !usuario.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) { {/* Verificando se todos os inputs estão preenchidos */}
      setErrorMessage('Por favor, preencha todos os campos corretamente!'); {/* Retorna mensagem de erro caso não estejam preenchidos */}
      return;

  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; {/* Validando o padrão do Email */}
  if (!regex.test(email)) {
    setErrorMessage('Por favor, insira um Email válido!'); {/* Retorna a mensagem de erro caso o padrão seja inválido*/}
    return;
  }

  if(!validarEmail(email)){ {/* Validando o padrão do Email */}
    setErrorMessage('Por favor, insira um Email válido!'); {/* Retorna a mensagem de erro caso o padrão seja inválido*/}
    return;
  }

  if (!validarSenha(senha)) {
    setErrorMessage('A senha deve ter pelo menos 8 caracteres e 1 número!');
    return;
  }

    if ( senha !== confirmarSenha ) { {/* Verificando se as senhas são diferentes */}
      setErrorMessage('As senhas não coindicem!'); {/* Retorna mensagem de erro caso sejam diferentes */}
      return;
  }


  setLoading(true);

  try {
    const response = await fetch (URL_FIREBASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          usuario: { stringValue: usuario },
          email: { stringValue: email },
          senha: { stringValue: senha },
        },
      }),
    });

    const data = await response.text();
    console.log('RESPOSTA FIREBASE:', data);

    if (response.ok){
      setLoading(false);
      navigation.navigate('Login');
    } else {
      setLoading(false);
      setErrorMessage('Erro ao cadastrar usuário no banco!')
    }
  } catch (error){
    setLoading(false);
    setErrorMessage('Erro de conexão com o servidor!')
  }
  /////////////
  
};

if (loading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#6200ee' />
      <Text style={styles.tituloLoading}>Cadastrando...</Text>
    </View>
  );
}

  return (
    <View style={styles.container}> {/* Container da página de Cadastro */}

      <Image
      style={styles.logo}
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS7U3ii7LT7w4blSet4qFVGloanl2ssUYlw&s'
      }}
      />

      <Text style={styles.titulo}>Cadastrar</Text> {/* Titulo da página */}


      {/* Input do usuário tela de cadastro */}
      <TextInput 
        placeholder='Usuário'
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode='outlined'
        outlineColor='transparent'
        activeOutlineColor='#d6337f'
        value={usuario}
        onChangeText={setUsuario}
      />

      {/* Input do Email da tela de cadastro */}
      <TextInput
        placeholder='Email'
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode='outlined'
        outlineColor='transparent'
        activeOutlineColor='#d6337f'
        value={email}
        onChangeText={setEmail}
      />

      {/* Input da senha da tela de cadastro */}
      <TextInput
        placeholder='Senha'
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode='outlined'
        outlineColor='transparent'
        activeOutlineColor='#d6337f'
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Input confirmar senha da tela de cadastro */}
      <TextInput
        placeholder='Confirmar senha'
        style={styles.inputs}
        theme={{
          fonts: {
            regular: {
             fontFamily: 'Montserrat-Regular',
      },
    },
  }}
        mode='outlined'
        outlineColor='transparent'
        activeOutlineColor='#d6337f'
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* Retorna uma mensagem de erro caso os campos não estejam preenchidos corretamente */}
      {errorMessage ? (
        <Text style={styles.erroText}>{errorMessage}</Text>
      ): null}

    <View style={styles.botoesContainer}>
      <Button style={styles.botoes} 
      labelStyle={{ fontFamily: 'Montserrat-Regular'}}
      mode='contained' onPress={cadastrarUsuario}> {/* Botão que ao cadastra o usuário e retorna para a tela de Login */}
      Criar conta {/*Titulo do botão*/}
      </Button>
      <Button style={styles.botoes} mode='contained'
      labelStyle={{ fontFamily: 'Montserrat-Regular'}}
      onPress={() => navigation.navigate('Login')}>Voltar p/ Login </Button>
    </View>
    </View>
  );
}


function LoginScreen({ navigation }) { {/* Função da tela de Login */}


  const [ usuario, setUsuario] = useState('');
  const [ senha, setSenha] = useState('');  {/* Variáveis de estados */}
  const [ errorMessage, setErrorMessage] = useState('');
  const [ loading, setLoading ] = useState(false);


  const loginAdmin = async() => {

    setErrorMessage('');

    if (!usuario.trim() || !senha.trim()) {  {/* Verificando se o usuário e senha estão preenchidos */}
      setErrorMessage('Por favor, preencha todos os campos corretamente!'); {/* Retorna mensagem de erro caso o usuário e senha não estiverem preenchidos */}
      return;
    }



      if ( usuario === 'admin' && senha === 'admin123') { // Verificando o login do Admin *//
      navigation.navigate('Admin'); //* Manda para a página do Admin caso logado como Admin 
      return;
    } 

    setLoading(true);
    
    try {
      const response = await fetch(URL_FIREBASE);
      const text = await response.text();
      console.log('RESPOSTA FIREBASE', text);

      const data = JSON.parse(text);


      if (!data.documents) {
        console.log('Nenhum documento retornado do firebase');
        setLoading(false);
        setErrorMessage('Nenhum dado encontrado no banco!');
        return;
      }

       const usuarios = data.documents.map((doc) => {
         const fields = doc.fields || {};
         return {
            usuario: doc.fields.usuario?.stringValue|| '',
            senha: doc.fields.senha?.stringValue || '',
            email: doc.fields.senha?.stringValue || '',
         };
      });


      const usuarioValido = usuarios.find(
        (u) => u.usuario === usuario && u.senha === senha
      );

      setLoading(false);

      if(usuarioValido) {
        navigation.navigate('Loja');
      } else {
        setErrorMessage('Usuário ou senha incorretos!')
      }

    } catch (error) {
      setLoading(false);
      setErrorMessage('Erro ao conectar com o servidor!')
    }
  };

  if (loading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#6200ee' />
      <Text style={styles.tituloLoading}>Entrando...</Text>
    </View>
  );
}

   
  
  return (
    <View style={styles.container}> {/* Container da página de Login */}
      <Image
      style={styles.logo}
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnS7U3ii7LT7w4blSet4qFVGloanl2ssUYlw&s'
      }}
      />
      

      <Text style={styles.titulo}>Login</Text> {/* Titulo da página */}

      {/* Input do usuário da tela de Login */}
     <TextInput
      placeholder='Usuário'
      style={styles.inputs}
      contentStyle={{ backgroundColor: '#FFE6F0' }}
      outlineColor='transparent'
      theme={{
        roundness: 25,
        colors: {
          primary: '#f48fb1',        // <-- remove o roxo ao focar!
          outline: '#f48fb1',        // <-- cor da borda quando não está focado
        },
        fonts: {
          regular: {
            fontFamily: 'Montserrat-Regular',
          },
        },
      }}
      mode='outlined'
      value={usuario}
      onChangeText={setUsuario}
      />


      {/* Input da senha da tela de Login */}
      <TextInput
        placeholder='Senha'
        style={styles.inputs}
        contentStyle={{ backgroundColor: '#FFE6F0' }}
        outlineColor='transparent'
        theme={{
        roundness: 25,
        colors: {
          primary: '#f48fb1',        // <-- remove o roxo ao focar!
          outline: '#f48fb1',        // <-- cor da borda quando não está focado
        },
        fonts: {
          regular: {
            fontFamily: 'Montserrat-Regular',
          },
        },
      }}
        mode='outlined'
        activeOutlineColor='#d6337f'
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Mostrará o erro na tela caso o usuário esteja incorreto */}
      {errorMessage ? (
        <Text style={styles.erroText}>{errorMessage}</Text>
         ): null}

      <Button style={styles.botoes}
      labelStyle={{ fontFamily: 'Montserrat-Regular' }}
      //Colocar cor do botão aqui
      color="#d6337f"
      mode='contained' onPress={loginAdmin}> {/* Botão que chama a tela do Admin */}
      Logar {/*Titulo do botão*/}
      </Button>

      <Text style={styles.frase}>Não possui uma conta ? Cadastre-se!</Text> {/* Mensagem ('Não possui uma conta ?') */}
      <Button
        style={styles.botoes}
        labelStyle={{ fontFamily: 'Montserrat-Bold' }}
        color="#d6337f"
        mode="contained"
        onPress={() => navigation.navigate('Cadastro')}
      >
        Cadastre-se {/*Titulo do botão*/}
      </Button>
      

    </View>
  );
}
  

const Stack = createNativeStackNavigator();

export default function App() { // Função que carrega as fontes baixadas para serem utilizadas.
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'PoppinsLight': require('./assets/fonts/Poppins-Light.ttf'),
    
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    
  });



  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ItemProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
          <Stack.Screen name='Loading' component={LoadingScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Cadastro' component={CadastroScreen} />
          <Stack.Screen name='Admin' component={AdminScreen} />
          <Stack.Screen name='Loja' component={LojaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
}


{
  /* Fim do APP */
}


