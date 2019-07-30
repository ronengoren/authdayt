import React from "react";
import { createStackNavigator } from "react-navigation";
import * as screens from "src/screens";
import { Header } from "src/components";
import { screenGroupNames, screenNames } from "src/vars/enums";
import { daytColors } from "src/vars";
// import CreateGroup from "./createGroup";
// import commonTabRoutes from './commonTabRoutes';

const Groups = createStackNavigator({
  [screenNames.GroupsTab]: {
    screen: screens.GroupsTab,
    navigationOptions: {
      header: <Header />
    }
  }
  //     [screenNames.InviteMembers]: {
  //       screen: screens.InviteMembers,
  //       navigationOptions: {
  //         header: null
  //       }
  //     },
  //     [screenGroupNames.CREATE_GROUP_MODAL]: {
  //       screen: CreateGroup,
  //       navigationOptions: {
  //         header: null,
  //         gesturesEnabled: false
  //       }
  //     },
  //     ...commonTabRoutes
  //   },
  //   {
  //     initialRouteName: screenNames.GroupsTab,
  //     headerMode: 'screen',
  //     cardStyle: {
  //       backgroundColor: daytColors.white
  //     }
});

export default Groups;
