import { createAppContainer, createStackNavigator } from "react-navigation";
import MainFeed from "../screens/MainFeed";

const AppNavigator = createStackNavigator({
  MainFeed: { screen: MainFeed }
});
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
