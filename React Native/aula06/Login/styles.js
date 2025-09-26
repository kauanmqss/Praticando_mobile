import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: width * 0.40, // 5% da largura da tela
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: width * 0.08, // 8% da largura
    color: 'black',
    marginBottom: height * 0.03,
  },

  password: {
    fontSize: width * 0.07,
    color: 'black',
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
  },

  nome: {
    textAlign: 'center',
  },

  senha: {
    textAlign: 'center',
    marginBottom: height * 0.06,
  },

  button:{
    color:'red',
  }
});

export default styles;
