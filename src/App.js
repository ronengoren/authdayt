import React, { Component } from "react";
import MainFeed from "./screens/MainFeed";
import Camera from "./screens/Camera";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Messages from "./screens/Messages";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

const Tabs = createBottomTabNavigator({
  Messages: Messages,
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
      initialRouteName: "main"
    }
  )
);

export default class App extends React.Component {
  render() {
    return <MainStack />;
  }
}
