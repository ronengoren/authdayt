// import React from 'react';
// import { createStackNavigator } from 'react-navigation';
// import * as screens from '../screens';
// import { Header } from '../components';
// import { screenGroupNames, screenNames } from '../vars/enums';
// import { homeisColors } from '../vars';
// import CreateGroup from './createGroup';
// import commonTabRoutes from './commonTabRoutes';

// const Groups = createStackNavigator(
//   {
//     [screenNames.GroupsTab]: {
//       screen: screens.GroupsTab,
//       navigationOptions: {
//         header: <Header />
//       }
//     },
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
//       backgroundColor: homeisColors.white
//     }
//   }
// );

// export default Groups;
