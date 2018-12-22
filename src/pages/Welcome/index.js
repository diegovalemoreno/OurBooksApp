import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';
import styles from './styles';

export default class Welcome extends Component {
  state = {
    email: '',
    password: '',
    token: '',
    loading: false,
    error: false,
  }

  checkUserExists = async (email, password) => {
    user = await api.post('/sessions/', {
      email,
      password,
    });
    return user;
  }

  saveUser = async (email, password, token) => {
    await AsyncStorage.setItem('@Ourbooks:email', email);
    await AsyncStorage.setItem('@Ourbooks:password', password);
    await AsyncStorage.setItem('@Ourbooks:token', token);
  }


  signIn = async () => {
    const {
      email,
      password
    } = this.state;
    const {
      navigation
    } = this.props;
    this.setState({
      loading: true
    });
    try {
      const response = await this.checkUserExists(email, password);
      await this.saveUser(email, password, response.data.token);

      navigation.navigate('Books');
    } catch (err) {
      this.setState({
        loading: false
      });
      this.setState({
        error: true
      });
      console.tron.log('Usuario inexistente');
    }
  }

  render() {
    const {
      email,
      password,
      loading,
      error
    } = this.state;
    return ( <
      View style = {
        styles.container
      } >
      <
      StatusBar barStyle = "light-content" / >
      >
      <
      Text style = {
        styles.title
      } >
      Bem vindo <
      /Text> <
      Text style = {
        styles.text
      } >
      Para continuar precisamos que voce informe seu usuario. <
      /Text> {
      error && < Text style = {
        styles.error
      } > Usuario inexiste < /Text>} <
      View style = {
        styles.form
      } >
      <
      TextInput style = {
        styles.input
      }
      autoCapitalize = "none"
      autoCorrect = {
        false
      }
      placeholder = "Digite seu usuario"
      underlineColorAndroid = "transparent"
      value = {
        email
      }
      onChangeText = {
        text => this.setState({
          email: text
        })
      }
      />

      <
      TextInput style = {
        styles.input2
      }
      autoCapitalize = "none"
      autoCorrect = {
        false
      }
      placeholder = "Digite sua senha"
      underlineColorAndroid = "transparent"
      value = {
        password
      }
      onChangeText = {
        text => this.setState({
          password: text
        })
      }
      /> <
      TouchableOpacity style = {
        styles.button
      }
      onPress = {
        this.signIn
      } > {
        loading ? ( <
          ActivityIndicator size = "small"
          color = "#FFF" / > ) : ( < Text style = {
              styles.buttonText
            } > Prosseguir < /Text>)
          }

          <
          /TouchableOpacity> < /
          View > <
          /View>
      );
    }
  }