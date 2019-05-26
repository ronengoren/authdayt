import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Authentication from '../auth/Authentication';

const AppNavigator = createStackNavigator({
    Authentication: { screen: Authentication },
    Home: { screen: Home },
    Friends: { screen: Friends},
  });
  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;