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
import { AppTopNavigation } from "./navigators";
import {
  ConnectionHeader,
  ScreenErrorBoundary,
  ActionSheetManager
} from "src/components";
import { omit } from "src/infra/utils";
import {
  user as userLocalStorage,
  medias as mediasCache,
  misc as miscLocalStorage
} from "src/infra/localStorage";

const topLevelRoutes = ["ChangePassword"];
const INACTIVE_MINUTES_RESET = 5;

class App extends Component {
  inactiveTimestamp = null;

  state = {
    appState: "active"
  };
  render() {
    return [
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
        key="statusBar"
      />,
      <ScreenErrorBoundary key="AppTopNavigation">
        <AppTopNavigation
          ref={navigatorRef => {
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ScreenErrorBoundary>,
      <ConnectionHeader key="ConnectionHeader" />
    ];
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
}

export default App;
