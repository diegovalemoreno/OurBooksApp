import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import './config/ReactotronConfig';

import createNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  }
  
  async componentDidMount() {
    const email = await AsyncStorage.getItem('@Ourbooks:email');

    this.setState({
      userChecked: true,
      userLogged: !!email,
    });
  }

  render() {
    const { userChecked, userLogged } = this.state;
    console.tron.log(this.state.userChecked)
    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);
    return (<Routes />);
  }
}
 