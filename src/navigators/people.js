import React from "react";
import { createStackNavigator } from "react-navigation";
import * as screens from "src/screens";
import I18n from "src/infra/localization";
import { screenNames } from "src/vars/enums";
import { Header } from "src/components";
import { daytColors } from "src/vars";
// import commonTabRoutes from "./commonTabRoutes";

const People = createStackNavigator({
  [screenNames.PeopleTab]: {
    screen: screens.PeopleTab,
    navigationOptions: {
      header: null
    }
  }
  //     [screenNames.InviteFriends]: {
  //       screen: screens.InviteFriends,
  //       navigationOptions: () => {
  //         const title = I18n.t("people.invite_friends.screen_header");
  //         return {
  //           header: <Header hasBackButton title={title} />
  //         };
  //       }
  //     },
  //     [screenNames.ReferralProgramStatus]: {
  //       screen: screens.ReferralProgramStatus,
  //       navigationOptions: () => {
  //         const title = I18n.t("referral_program_status.screen_header");
  //         return {
  //           header: <Header hasBackButton title={title} />
  //         };
  //       }
  //     },
  //     [screenNames.Settings]: {
  //       screen: screens.Settings,
  //       navigationOptions: () => {
  //         const title = I18n.t("profile.settings.screen_header");
  //         return {
  //           header: <Header hasBackButton title={title} />
  //         };
  //       }
  //     },
  //     [screenNames.ReferralRedeemed]: {
  //       screen: screens.ReferralRedeemed,
  //       navigationOptions: {
  //         header: null
  //       }
  //     },
  //     ...commonTabRoutes
  //   },
  //   {
  //     initialRouteName: screenNames.PeopleTab,
  //     headerMode: "screen",
  //     cardStyle: {
  //       backgroundColor: daytColors.white
  //     }
});

export default People;
