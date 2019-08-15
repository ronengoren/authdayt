import React from "react";
import { createStackNavigator } from "react-navigation";
import { Header } from "src/components";
import * as screens from "src/screens";
import I18n from "src/infra/localization";
import { daytColors } from "src/vars";
import { screenNames, screenGroupNames } from "src/vars/enums";
import commonTabRoutes from "./commonTabRoutes";

const MyCity = createStackNavigator(
  {
    [screenGroupNames.MY_CITY]: {
      screen: screens.Profile,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.ChangeEmail]: {
      screen: screens.ChangeEmail,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.EditProfileGender]: {
      screen: screens.EditProfileGender,
      navigationOptions: () => {
        const title = I18n.t("profile.edit.generic_header");
        return {
          header: <Header hasBackButton title={title} />
        };
      }
    },
    [screenNames.EditProfileRelationship]: {
      screen: screens.EditProfileRelationship,
      navigationOptions: () => {
        const title = I18n.t("profile.edit_profile_relationship.header");
        return {
          header: <Header hasBackButton title={title} />
        };
      }
    },
    [screenNames.EditProfile]: {
      screen: screens.EditProfile,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.EditProfileRelationship]: {
      screen: screens.EditProfileRelationship,
      navigationOptions: () => {
        const title = I18n.t("profile.edit_profile_relationship.header");
        return {
          header: <Header hasBackButton title={title} />
        };
      }
    },
    [screenNames.EditProfileGender]: {
      screen: screens.EditProfileGender,
      navigationOptions: () => {
        const title = I18n.t("profile.edit.generic_header");
        return {
          header: <Header hasBackButton title={title} />
        };
      }
    },
    [screenNames.Settings]: {
      screen: screens.Settings,
      navigationOptions: () => {
        const title = I18n.t("profile.settings.screen_header");
        return {
          header: <Header hasBackButton title={title} />
        };
      }
    },
    [screenNames.ChangeEmail]: {
      screen: screens.ChangeEmail,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.ConnectedUsersList]: {
      screen: screens.ConnectedUsersList,
      navigationOptions: () => {
        const title = I18n.t("profile.connected_users_list.header");
        return {
          header: <Header hasBackButton title={title} />
        };
      }
    },
    ...commonTabRoutes
  },
  {
    initialRouteName: screenGroupNames.MY_CITY,
    headerMode: "screen",
    cardStyle: {
      backgroundColor: daytColors.white
    }
  }
);

export default MyCity;
