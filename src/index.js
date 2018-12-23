import React, { Component } from 'react';
import { AsyncStorage,YellowBox } from 'react-native';
import './config/ReactotronConfig';

import createNavigator from './routes';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
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
    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);
    return (<Routes />);
  }
}
 