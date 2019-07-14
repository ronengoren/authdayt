import React, { Component } from "react";

import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import Welcome from "./screens/Welcome";

const IntroStack = createStackNavigator({
  welcome: Welcome
});
const MainStack = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        welcome: Welcome
      },
      {
        initialRouteName: "welcome"
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
