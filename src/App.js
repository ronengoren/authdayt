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
import { Snackbar } from "src/components/snackbars";

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
          onNavigationStateChange={
            screenTrackingService.handleNavigationStateChanged
          }
          ref={navigatorRef => {
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ScreenErrorBoundary>,
      <ConnectionHeader key="ConnectionHeader" />,
      <Snackbar key="Snackbar" />,
      <ActionSheetManager key="ActionSheetManager" />
    ];
  }
  componentDidMount() {
    Orientation.lockToPortrait();
    AppState.addEventListener("change", this.handleAppStateChanged);
  }
  componentDidUpdate(prevProps) {
    if (Platform.OS === "android" && this.props.user && !prevProps.user) {
      this.enablePushNotifications(); // In case an Android user installed the app and didn't pass threw register - we need to register him again to pushwoosh
    }
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChanged);
  }
  enablePushNotifications = async () => {
    const { user } = this.props;
    const res = await pushManager.getPushToken();
    if (!res && user.id) {
      pushManager.register(user);
    }
  };
  handleUrl = url => {
    const { user } = this.props;
    const route = this.getRouteFromUrl(url);
    const screenIsInTopLevelRoutes = topLevelRoutes.includes(route.screenName);
    if (user || screenIsInTopLevelRoutes) {
      if (screenIsInTopLevelRoutes) {
        navigationService.goBack();
      }
      const firstNavigationScreenName =
        screenNamesWithTabNavigation[route.screenName];
      if (firstNavigationScreenName) {
        navigationService.navigate(firstNavigationScreenName, {});
      }
      navigationService.navigate(route.screenName, route.params, {
        noPush: false
      });
    } else {
      navigationService.deferNavigation(route.screenName, route.params);
    }
  };
  handlePushReceived = () => {
    this.pushReceivedAndNotOpened = true;
  };
  handlePushOpened = e => {
    this.inactiveTimestamp = new Date(); // We dont want to navigate to the home page in this case...
    this.pushReceivedAndNotOpened = false;
    let pushEventData = omit(e, "title");

    if (e.l) {
      const route = this.getRouteFromUrl(e.l);
      const { params, screenName } = route;
      pushEventData = Object.assign(pushEventData, { screenName, ...params });
      this.handleUrl(e.l);
    } else {
      Logger.debug(
        `handlePushOpened - no URL passed to handleUrl. e - ${JSON.stringify(
          e
        )}`
      );
    }

    // analytics.lifecycleEvents.pushNotificationOpened(pushEventData).dispatch();
  };
  handleAppStateChanged = async nextAppState => {
    const { refreshUserData } = this.props;
    const user = await userLocalStorage.get();
    if (user) {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        resumeRecord();
        analytics.lifecycleEvents.appOpened().dispatch();

        if (user && user.id && !(await miscLocalStorage.isNewUser())) {
          const currentTime = new Date();
          if (
            currentTime - this.inactiveTimestamp >
            INACTIVE_MINUTES_RESET * 60000
          ) {
            // There are cases where we receive a push but user is entering the app not via the push (example - badge update)
            // When a user is opening the app via push we get pushReceived and later pushOpened.
            // The logic below comes to prevent redirecting to home when the user enters the app from push.

            if (this.pushReceivedAndNotOpened) {
              setTimeout(() => {
                if (this.pushReceivedAndNotOpened) {
                  navigationService.resetToHomePage();
                }
              }, 300);
            } else {
              navigationService.resetToHomePage();
            }
          }

          refreshUserData();
          this.checkForCodePushUpdates();
        }
      } else if (
        this.state.appState === "active" &&
        nextAppState.match(/inactive|background/)
      ) {
        pauseRecord();
        ViewCountsService.sendItems();
        this.inactiveTimestamp = new Date();
        analytics.lifecycleEvents.appClosed().dispatch();
      }
    }

    this.setState({ appState: nextAppState });
  };
  getRouteFromUrl = url => {
    const params = {};
    const screenAndQuery = url.replace(/(^\w+:|^)\/\//, "").split("?");
    let screenName = screenAndQuery[0] || "";
    const query = screenAndQuery[1] || "";
    const queries = query ? query.split("&") : [];
    queries.forEach(query => {
      const [key, entry] = query.split("=");
      params[key] = decodeURIComponent(entry);
    });

    if (params.screenName) {
      screenName = params.screenName;
    }

    return {
      screenName: screenNamesAliases[screenName] || screenName,
      params
    };
  };
}

App.propTypes = {
  refreshUserData: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user,
  inactiveTimestamp: state.auth.inactiveTimestamp
});

const mapDispatchToProps = {
  refreshUserData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
