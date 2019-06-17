import React, { Component } from "react";
import MainFeed from "./screens/MainFeed";
import Camera from "./screens/Camera";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Messages from "./screens/Messages";
import Authentication from "./screens/Authentication";
import { ActivityIndicator } from "react-native";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import config from "./config";
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
const MainStack = authBoolean => {
  return createAppContainer(
    createSwitchNavigator(
      {
        login: IntroStack,
        main: Tabs
      },
      {
        initialRouteName: authBoolean ? "main" : "login"
      }
    )
  );
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      authChecked: false,
      authed: false
    };
  }
  componentDidMount() {
    AsyncStorage.getItem(config.userIdKey)
      .then(key => {
        if (key) {
          this.setState({
            authChecked: true,
            authed: true
          });
        } else {
          this.setState({ authChecked: true });
        }
      })
      .catch(err => {
        this.setState({ authChecked: true });
      });
  }
  render() {
    const Switch = MainStack(this.state.authed);
    return this.state.authChecked ? (
      <Switch />
    ) : (
      <ActivityIndicator size="large" />
    );
  }
}
