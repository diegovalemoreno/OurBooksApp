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

export default class ConfirmPassword extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    token: '',
    loading: false,
     error: false,
  }

  resetPasswordData = async (token, password, confirmPassword) => {
    user = await api.put('/passwords/', {
      token,
      password,
      password_confirmation: confirmPassword,
    });
    return user;
  }

  resetPassword = async () => {
    const { token, password, confirmPassword } = this.state;
    const { navigation } = this.props;
    this.setState({ loading: true });
    try {
      const response = await this.resetPasswordData(token, password, confirmPassword);
      console.tron.log(response);
      Alert.alert('Sua nova senha foi alterado com sucesso!\nEfetue login novamente.');
      navigation.navigate('Welcome');
    } catch (err) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

   goBack = () =>  {
     this.props.navigation.navigate('Welcome');
   }

  render() {
    const { token, password, confirmPassword, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        >
        <Text style={styles.title}>
          Redefinição de senha
        </Text>
        <Text style={styles.text}>
          Para recupera a senha digite o token recebido em seu email no campo abaixo:
        </Text>
        { error && <Text style={styles.error}>Algo deu errado por favor tente novamente mais tarde.</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite o token recebido:"
            underlineColorAndroid="transparent"
            value={token}
            editable
            onChangeText={text => this.setState({ token: text })}
          />
          <TextInput
            style={styles.inputPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite uma nova senha:"
            underlineColorAndroid="transparent"
            value={password}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
          <TextInput
            style={styles.inputConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirme a nova senha:"
            underlineColorAndroid="transparent"
            value={confirmPassword}
            secureTextEntry
            onChangeText={text => this.setState({ confirmPassword: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.resetPassword}>
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
