import React, { Component } from "react";
import MainFeed from "./screens/MainFeed";
import Camera from "./screens/Camera";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";

import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

const Tabs = createBottomTabNavigator({
  feed: MainFeed,
  camera: Camera,
  profile: Profile
});

const IntroStack = createStackNavigator({
  login: Login,
  register: Register
});
const MainStack = createAppContainer(
  createSwitchNavigator(
    {
      login: IntroStack,
      main: Tabs
    },
    {
      initialRouteName: "login"
    }
  )
);

export default class App extends React.Component {
  render() {
    return <MainStack />;
  }
}
