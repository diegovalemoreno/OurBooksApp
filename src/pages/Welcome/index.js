import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import api from '../../services/api';
import styles from './styles';

export default class Welcome extends Component {
  
  checkUserExists = async(email, password) => {
    user = await api.post(`/sessions/`,{
      email: email,
      password: password,
    });
    return user
  }
  
  saveUser = async (email, password, token) => {
    await AsyncStorage.setItem('@Ourbooks:email', email);
    await AsyncStorage.setItem('@Ourbooks:password', password);
    await AsyncStorage.setItem('@Ourbooks:token', token);
  }
  
  state = {
    email: '',
    password: '',
    token: '',
  }

  signIn = async () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    try {
      const response = await this.checkUserExists(email, password);
      console.tron.log(response.data.token);
      await this.saveUser(email, password, response.data.token);
      
      navigation.navigate('Books');
    } catch (err) {
      console.tron.log('Usuario inexistente');
    }
  }

  render() {
    const { email, password } = this.state;
    return ( 
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />>
        <Text style={styles.title}>
          Bem vindo
        </Text>
        <Text style={styles.text}>
          Para continuar precisamos que voce informe seu usuario.
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuario"
            underlineColorAndroid="transparent"
            value={ email }
            onChangeText={text => this.setState({ email: text })}
          />

          <TextInput
            style={styles.input2}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite sua senha"
            underlineColorAndroid="transparent"
            value={ password }
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            <Text style={styles.buttonText}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
