import { createAppContainer, createStackNavigator } from "react-navigation";
import Authentication from "../auth/Authentication";
import Profile from "../screens/Profile";

const AppNavigator = createStackNavigator({
  Authentication: { screen: Authentication },
  Profile: { screen: Profile }
});
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
