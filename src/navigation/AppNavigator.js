import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from './Home';
import Friends from './Friends';
import Authentication from '../auth/Authentication';
import Profile  from '../screens/Profile';
import CreateProfile  from '../screens/CreateProfile';
import { withAuthenticator } from 'aws-amplify';

const AppNavigator = createStackNavigator({
   Authentication: { screen: Authentication },
  Profile: { screen: Profile }
});
  const AppContainer = createAppContainer(AppNavigator);

  export default AppContainer;