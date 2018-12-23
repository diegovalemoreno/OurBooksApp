import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Welcome from './pages/Welcome';
import Books from './pages/Books';
import Authors from './pages/Authors';
import colors from './Styles/colors';

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      User: createBottomTabNavigator({
        Books,
        Authors,
      },
      {
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          activeTintColor: colors.white,
          inactiveTintColor: colors.whiteTransparent,
          style: {
            backgroundColor: colors.secundary,
          },
        }
      }),
    },
    {
      initialRouteName: userLogged ? 'User' : 'Welcome',
    },
  ),
);

export default Routes;