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

export default class App extends Component {
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
      </ScreenErrorBoundary>
    ];
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
}
