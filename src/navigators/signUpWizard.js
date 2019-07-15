import React from "react";
import { Animated, Easing } from "react-native";
import I18n from "../infra/localization";
import * as screens from "../screens";
import { daytColors } from "../vars";
import { screenNames } from "../vars/enums";
import { Header } from "../components";
import { createStackNavigator } from "react-navigation";

const preventRouteTransition = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const SignUpWizard = createStackNavigator({
  [screenNames.SetUserGender]: {
    screen: screens.SetUserGender,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  },
  [screenNames.SetUserEmail]: {
    screen: screens.SetUserEmail,
    navigationOptions: () => ({
      header: null,
      gesturesEnabled: false
    })
  }
  //     [screenNames.SetUserCommunity]: {
  //       screen: screens.SetUserCommunity,
  //       navigationOptions: () => ({
  //         header: null,
  //         gesturesEnabled: false
  //       })
  //     },
  //     [screenNames.SetUserDetails]: {
  //       screen: screens.SetUserDetails,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.NoCommunity]: {
  //       screen: screens.NoCommunity,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.ImageUpload]: {
  //       screen: screens.ImageUpload,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.SearchCountry]: {
  //       screen: screens.SearchCountry,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.EditProfileDate]: {
  //       screen: screens.EditProfileDate,
  //       navigationOptions: () => {
  //         const title = I18n.t('onboarding.set_arrival_date.title');
  //         return {
  //           header: <Header hasBackButton title={title} />
  //         };
  //       }
  //     },
  //     [screenNames.SearchAddress]: {
  //       screen: screens.SearchAddress,
  //       navigationOptions: {
  //         header: <Header searchMode searchAddressMode />
  //       }
  //     },
  //     [screenNames.OnBoardingAddFriends]: {
  //       screen: screens.OnBoardingAddFriends,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.OnBoardingDiscover]: {
  //       screen: screens.OnBoardingDiscover,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.AllowNotifications]: {
  //       screen: screens.AllowNotifications,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     [screenNames.WebView]: {
  //       screen: screens.WebView,
  //       navigationOptions: {
  //         header: null
  //       }
  //     }
  //   },
  //   {
  //     initialRouteName: screenNames.SetUserGender,
  //     cardStyle: {
  //       backgroundColor: homeisColors.white
  //     },
  //     headerMode: 'screen',
  //     transitionConfig: preventRouteTransition
});

// export default SignUpWizard;
