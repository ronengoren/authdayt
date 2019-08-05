import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import * as screens from "../screens";
import I18n from "../infra/localization";
import { screenGroupNames, screenNames } from "../vars/enums";
import { Header, CustomTabBar } from "../components";

import { daytColors } from "../vars";
import { get } from "../infra/utils";
import Home from "./home";
// import People from "./people";
// import MyCity from "./myCity";
import Groups from "./groups";
import Communications from "./communications";

const screenInterpolator = sceneProps => {
  const transitions = {};
  const { position, layout, scene } = sceneProps;
  const thisSceneIndex = scene.index;
  const height = layout.initHeight;
  const width = layout.initWidth;

  const params = scene.route.params || {};

  const translateX = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [width, 0, 0]
  });

  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [height, 0, 0]
  });

  const opacity = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
    outputRange: [0, 1, 1]
  });

  const slideInFromBottom = { transform: [{ translateY }] };
  if (!params.transition) {
    return slideInFromBottom;
  }

  if (params.transition.slideRight) {
    transitions.transform = [{ translateX }];
  }

  if (params.transition.fade) {
    transitions.opacity = opacity;
  }

  return transitions;
};

const TabSection = createBottomTabNavigator(
  {
    [screenGroupNames.HOME_TAB]: {
      screen: Home
    },
    // [screenGroupNames.PEOPLE_TAB]: {
    //   screen: People
    // },
    // [screenGroupNames.MY_CITY]: {
    //   screen: MyCity,
    //   navigationOptions: {
    //     tabBarTestID: "cityTabBtn"
    //   }
    // },
    [screenGroupNames.GROUPS_TAB]: {
      screen: Groups,
      navigationOptions: {
        tabBarTestID: "groupsTabBtn"
      }
    },
    [screenGroupNames.COMMUNICATIONS]: {
      screen: Communications
    }
  },
  {
    initialRouteName: screenGroupNames.HOME_TAB,
    tabBarComponent: CustomTabBar,
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false
  }
);

const MiddleSection = createStackNavigator(
  {
    [screenGroupNames.TABS]: {
      screen: TabSection,
      navigationOptions: {
        header: null
      }
    },
    // [screenNames.PostEditor]: {
    //   screen: screens.PostEditor,
    //   navigationOptions: {
    //     header: null,
    //     gesturesEnabled: false
    //   }
    // },
    [screenNames.WebView]: {
      screen: screens.WebView,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: screenGroupNames.TABS,
    cardStyle: {
      backgroundColor: daytColors.white
    },
    mode: "modal",
    transitionConfig: () => ({
      screenInterpolator
    })
  }
);
export default MiddleSection;
