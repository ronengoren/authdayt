import { createStackNavigator, createAppContainer } from "react-navigation";
import { daytColors } from "../vars";
import { screenGroupNames, screenNames } from "../vars/enums";
import * as screens from "/screens";
import SignUpWizard from "./signUpWizard";

const authentication = createStackNavigator(
  {
    [screenNames.Welcome]: {
      screen: screens.Welcome,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.SignIn]: {
      screen: screens.SignIn,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.ForgotPassword]: {
      screen: screens.ForgotPassword,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.ChangePassword]: {
      screen: screens.ChangePassword,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.SignUp]: {
      screen: screens.SignUp,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    [screenGroupNames.SIGN_UP_WIZARD]: {
      screen: SignUpWizard,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }
  },
  {
    initialRouteName: screenGroupNames.SIGN_UP_WIZARD,
    headerMode: "screen",
    cardStyle: {
      backgroundColor: daytColors.white
    }
  }
);

export default authentication;
