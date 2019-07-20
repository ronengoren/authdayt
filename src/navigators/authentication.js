import { createStackNavigator, createAppContainer } from "react-navigation";
import { daytColors } from "../vars";
import { screenGroupNames, screenNames } from "../vars/enums";
import * as screens from "../screens";
import SignUpWizard from "./signUpWizard";

const authentication = createStackNavigator({
  [screenNames.Welcome]: {
    screen: screens.Welcome,
    navigationOptions: {
      header: null
    }
  },
  initialRouteName: screenNames.Welcome,
  headerMode: "screen"
});

export default authentication;
