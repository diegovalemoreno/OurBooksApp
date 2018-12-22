import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Welcome from './pages/Welcome';
import Books from './pages/Books';

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      Books,
    },
    {
      initialRouteName: userLogged ? 'Books' : 'Welcome',
    },
  ),
);

export default Routes;