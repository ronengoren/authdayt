import React, { Component } from "react";
import MainFeed from "./screens/MainFeed";
import Camera from "./screens/Camera";
import Profile from "./screens/Profile";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Messages from "./screens/Messages";
import Conversation from "./screens/Conversation";
import DateTypes from "./screens/DateTypes";
import Message from "./components/presentation/Message";
import Authentication from "./screens/Authentication";
import { ActivityIndicator, Image } from "react-native";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import AsyncStorage from "@react-native-community/async-storage";
import config from "./config";
import UserDaytsIcons from "./components/container/UserDaytsIcons";

const MessageStack = createStackNavigator(
  {
    home: Messages,
    conversation: Conversation
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "rgb(162,55,243)"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "rgb(255,255,255)"
      },
      headerTintColor: "rgb(255,255,255)"
    }
  }
);

const Tabs = createBottomTabNavigator(
  {
    profile: Profile,
    camera: Camera,
    feed: MainFeed

    // Messages: MessageStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      const icons = {
        Messages: config.icons.message,
        profile: config.icons.profile,
        feed: config.icons.feed
      };
      return {
        tabBarIcon: <Image source={icons[routeName]} />
      };
    },
    tabBarOptions: {
      activeTintColor: config.colors.purple,
      showIcon: true,

      labelStyle: {
        color: "rgb(179,179,179)"
      }
    }
  }
);

const IntroStack = createStackNavigator({
  login: Login,
  register: Register
});
const MainStack = authBoolean => {
  return createAppContainer(
    createSwitchNavigator(
      {
        main: DateTypes,
        login: Login
      },
      {
        initialRouteName: "main"
        // authBoolean ? "main" : "login"
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
