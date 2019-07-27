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

// const TabSection = createBottomTabNavigator({
//   [screenGroupNames.HOME_TAB]: {
//     screen: Home
//   }
// });

// const MiddleSection = createStackNavigator({
//   [screenNames.WebView]: {
//     screen: screens.WebView,
//     navigationOptions: {
//       header: null
//     }
//   }
// });
// export default MiddleSection;
