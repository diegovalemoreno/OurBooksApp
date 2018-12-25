import React, { Component } from 'react';
import { AsyncStorage,YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import createNavigator from './routes';
import './config/ReactotronConfig';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Class RCTCxxModule']);
export default class App extends Component {

  state = {
    userChecked: false,
    userLogged: false,
  }
  
  async componentDidMount() {
    SplashScreen.hide();
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
 