import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Authentication from '../auth/Authentication';
import Profile  from '../screens/Profile/Profile';
import CreateProfile  from '../screens/CreateProfile';



const AppNavigator = createStackNavigator({
    Authentication: { 
      screen: Authentication
    },
    Home: { screen: CreateProfile },
    Friends: { screen: Friends},
  });
  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;