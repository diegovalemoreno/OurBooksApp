import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Welcome from './pages/Welcome';
import Books from './pages/Books';

const Routes = createAppContainer(createSwitchNavigator({
    Welcome,
    Books,
}))

export default Routes;