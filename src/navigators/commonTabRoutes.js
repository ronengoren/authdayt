// import React from "react";
// import * as screens from "../screens";
// import I18n from "../infra/localization";
// import { Header } from "../components";
// import { possesify } from "../infra/utils/stringUtils";
// import { daytColors } from "../vars";
// import { screenGroupNames, screenNames, locationTypes } from "/vars/enums";
// import Post from "./post";
// import sharedListsRoutes from "./lists";
// import sharedEventsRoutes from "./events";

// const commonTabRoutes = {
//   [screenGroupNames.POST]: {
//     screen: Post,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.CommentEditor]: {
//     screen: screens.CommentEditor,
//     navigationOptions: {
//       header: null,
//       gesturesEnabled: false
//     }
//   },
//   [screenNames.Chat]: {
//     screen: screens.Chat,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.Search]: {
//     screen: screens.Search,
//     navigationOptions: {
//       header: <Header searchMode />
//     }
//   },
//   [screenNames.EntitiesList]: {
//     screen: screens.EntitiesList,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.PostListsView]: {
//     screen: screens.PostListsView,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.EntitiesInLocation]: {
//     screen: screens.EntitiesInLocation,
//     navigationOptions: ({ navigation }) => {
//       const { type, name } = navigation.state.params;
//       const title = I18n.t(type === locationTypes.ORIGIN ? 'profile.entities_in_location.from_header' : 'profile.entities_in_location.around_header', { name });
//       return {
//         header: <Header hasBackButton title={title} />
//       };
//     }
//   },
//   [screenNames.OthersFriendsList]: {
//     screen: screens.OthersFriendsList,
//     navigationOptions: ({ navigation }) => {
//       const name = possesify(navigation.state.params.name);
//       const title = I18n.t('profile.others_friends_list.header', { name });
//       return {
//         header: <Header hasBackButton title={title} />
//       };
//     }
//   },
//   [screenNames.PageView]: {
//     screen: screens.PageView,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.SaversAndFollowers]: {
//     screen: screens.SaversAndFollowers,
//     navigationOptions: ({ navigation }) => {
//       const title = navigation.state.params.pageName || I18n.t('savers_and_followers.title');
//       return {
//         header: <Header hasBackButton title={title} backgroundColor={daytColors.blueberry} titleColor={daytColors.white} buttonColor="white" />
//       };
//     }
//   },
//   [screenNames.InviteFollowers]: {
//     screen: screens.PageInviteFollowers,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.PageEdit]: {
//     screen: screens.PageEdit,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.OpeningHoursSelector]: {
//     screen: screens.OpeningHoursSelector,
//     navigationOptions: () => {
//       const title = I18n.t('page.opening_hours_selector.header');
//       return {
//         header: <Header title={title} hasBackButton />
//       };
//     }
//   },
//   [screenNames.CityResults]: {
//     screen: screens.CityResults,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.GroupView]: {
//     screen: screens.GroupView,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.GroupRules]: {
//     screen: screens.GroupRules,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.GroupEdit]: {
//     screen: screens.GroupEdit,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.ViewOnlyMembersList]: {
//     screen: screens.ViewOnlyMembersList,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.ManageGroupMembers]: {
//     screen: screens.ManageGroupMembers,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.Profile]: {
//     screen: screens.Profile,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.ProfileGroupsList]: {
//     screen: screens.ProfileGroupsList,
//     navigationOptions: ({ navigation }) => {
//       const { user, isOwnProfile } = navigation.state.params;
//       const name = possesify(user.name);
//       const title = isOwnProfile ? I18n.t('profile.profile_groups_list.own_header') : I18n.t('profile.profile_groups_list.header', { name });
//       return {
//         header: <Header hasBackButton title={title} rightComponent={screens.ProfileGroupsList.renderCreateButton()} />
//       };
//     }
//   },
//   [screenNames.ProfilePagesList]: {
//     screen: screens.ProfilePagesList,
//     navigationOptions: ({ navigation }) => {
//       const { user, isOwnProfile } = navigation.state.params;
//       const name = possesify(user.name);
//       const title = isOwnProfile ? I18n.t('profile.profile_pages_list.own_header') : I18n.t('profile.profile_pages_list.header', { name });
//       return {
//         header: <Header hasBackButton title={title} rightComponent={screens.ProfilePagesList.renderCreateButton()} />
//       };
//     }
//   },
//   [screenNames.MyThemeView]: {
//     screen: screens.MyThemeView,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.MyNeighborhoodView]: {
//     screen: screens.MyNeighborhoodView,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.OthersThemeView]: {
//     screen: screens.OthersThemeView,
//     navigationOptions: {
//       header: null
//     }
//   },
//   [screenNames.Pages]: {
//     screen: screens.Pages,
//     navigationOptions: {
//       header: <Header hasBackButton />
//     }
//   },
//   [screenNames.EditProfileDate]: {
//     screen: screens.EditProfileDate,
//     navigationOptions: () => {
//       const title = I18n.t('profile.edit.generic_header');
//       return {
//         header: <Header hasBackButton title={title} />
//       };
//     }
//   },
//   [screenNames.IntroductionPostEditorScreen]: {
//     screen: screens.IntroductionPostEditorScreen,
//     navigationOptions: () => {
//       const title = I18n.t('posts.introduction.screen_header');
//       return {
//         header: <Header hasBackButton title={title} />
//       };
//     }
//   },
//   [screenNames.MapScreen]: {
//     screen: screens.MapScreen,
//     navigationOptions: ({ navigation }) => {
//       const { title } = navigation.state.params;
//       return {
//         header: <Header hasBackButton title={title} isHideSearch />
//       };
//     }
//   },
//   ...sharedListsRoutes,
//   ...sharedEventsRoutes
// };

// export default commonTabRoutes;
