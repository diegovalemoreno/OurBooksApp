import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../services/api';
import styles from './styles';

export default class ForgotPassword extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };
  state = {
    email: '',
    redirect_url: 'https://our-home-library.herokuapp.com/',
    token: '',
    loading: false,
     error: false,
  }

  checkUserExists = async (email, redirect_url) => {
    user = await api.post('/passwords/', {
      email,
      redirect_url,
    });
    return user;
  }

  forgotPassword = async () => {
    const { email, redirect_url } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });
    try {
      const response = await this.checkUserExists(email, redirect_url);
      console.tron.log(response);
      navigation.navigate('ResetPassword');
    } catch (err) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

   goBack = () =>  {
     this.props.navigation.navigate('Welcome');
   }

  render() {
    const { email, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        >
        <Text style={styles.title}>
          Esquceu a senha
        </Text>
        <Text style={styles.text}>
          Para recupera a senha digite seu email no campo abaixo:
        </Text>
        { error && <Text style={styles.error}>Usuario inexiste</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu email:"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.forgotPassword}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />)
              : (<Text style={styles.buttonText}>Prosseguir</Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGoBack} onPress={this.goBack}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
