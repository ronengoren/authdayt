import React, { Component } from "react";

import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import PropTypes from "prop-types";
import {
  AppState,
  DeviceEventEmitter,
  Linking,
  Platform,
  StatusBar
} from "react-native";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { refreshUserData } from "./redux/auth/actions";
import {
  screenNamesAliases,
  screenNamesWithTabNavigation,
  environmentTypes
} from "./vars/enums";
import { get } from "./infra/utils";
import { navigationService, screenTrackingService } from "./infra/navigation";
// import { AppTopNavigation } from "./navigators";

import Welcome from "./screens/welcome/Welcome";
import SetUserGender from "./screens/signup/SetUserGender";
// import Signup from "./screens/signup/Signup";
import Signup from "./screens/signup/Signup";

const IntroStack = createStackNavigator({
  welcome: Welcome
});
const MainStack = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        welcome: Welcome,
        setUserGender: SetUserGender,
        signup: Signup
      },
      {
        initialRouteName: "signup"
        // authBoolean ? "main" : "login"
      }
    )
  );
};

export default class App extends Component {
  render() {
    const Switch = MainStack();
    return <Switch />;
  }
}
