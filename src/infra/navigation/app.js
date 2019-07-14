import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
// import * as screens from "../../screens";
// import I18n from "/infra/localization";
// import { screenGroupNames, screenNames } from "/vars/enums";
// import { Header, CustomTabBar } from "/components";
// import { homeisColors } from "/vars";
// import { get } from "/infra/utils";
// import Home from "./home";
// import Groups from "./groups";
// import MyCity from "./myCity";
// import People from "./people";
// import Communications from "./communications";
// import CreateEvent from "./createEvent";
// import CreatePage from "./createPage";

// const screenInterpolator = sceneProps => {
//   const transitions = {};
//   const { position, layout, scene } = sceneProps;
//   const thisSceneIndex = scene.index;
//   const height = layout.initHeight;
//   const width = layout.initWidth;

//   const params = scene.route.params || {};

//   const translateX = position.interpolate({
//     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//     outputRange: [width, 0, 0]
//   });

//   const translateY = position.interpolate({
//     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
//     outputRange: [height, 0, 0]
//   });

//   const opacity = position.interpolate({
//     inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
//     outputRange: [0, 1, 1]
//   });

//   const slideInFromBottom = { transform: [{ translateY }] };
//   if (!params.transition) {
//     return slideInFromBottom;
//   }

//   if (params.transition.slideRight) {
//     transitions.transform = [{ translateX }];
//   }

//   if (params.transition.fade) {
//     transitions.opacity = opacity;
//   }

//   return transitions;
// };

// const TabSection = createBottomTabNavigator(
//   {
//     [screenGroupNames.HOME_TAB]: {
//       screen: Home
//     },
//     [screenGroupNames.PEOPLE_TAB]: {
//       screen: People
//     },
//     [screenGroupNames.MY_CITY]: {
//       screen: MyCity,
//       navigationOptions: {
//         tabBarTestID: "cityTabBtn"
//       }
//     },
//     [screenGroupNames.GROUPS_TAB]: {
//       screen: Groups,
//       navigationOptions: {
//         tabBarTestID: "groupsTabBtn"
//       }
//     },
//     [screenGroupNames.COMMUNICATIONS]: {
//       screen: Communications
//     }
//   },
//   {
//     initialRouteName: screenGroupNames.HOME_TAB,
//     tabBarComponent: CustomTabBar,
//     lazy: true,
//     animationEnabled: false,
//     swipeEnabled: false
//   }
// );

// const MiddleSection = createStackNavigator(
//   {
//     [screenGroupNames.TABS]: {
//       screen: TabSection,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.WebView]: {
//       screen: screens.WebView,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.PostEditor]: {
//       screen: screens.PostEditor,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false
//       }
//     },
//     [screenNames.DatesPicker]: {
//       screen: screens.DatesPicker,
//       navigationOptions: ({ navigation }) => {
//         const title = get(navigation, "state.params.title");
//         const color = get(navigation, "state.params.color");

//         return {
//           header: <Header hasBackButton title={title} backgroundColor={color} />
//         };
//       }
//     },
//     [screenNames.AddPageDetails]: {
//       screen: screens.AddPageDetails,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.AddDescription]: {
//       screen: screens.AddDescription,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenGroupNames.CREATE_EVENT_MODAL]: {
//       screen: CreateEvent,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false
//       }
//     },
//     [screenGroupNames.CREATE_PAGE_MODAL]: {
//       screen: CreatePage,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false
//       }
//     },
//     [screenNames.AddListItem]: {
//       screen: screens.AddListItem,
//       navigationOptions: ({ navigation }) => {
//         const item = get(navigation, "state.params.item", null);
//         const title = item
//           ? I18n.t("list.add_item.edit_header")
//           : I18n.t("list.add_item.add_header");
//         return {
//           header: (
//             <Header
//               title={title}
//               hasBackButton
//               backgroundColor={homeisColors.paleGreyTwo}
//               titleColor={homeisColors.b30}
//               buttonColor={homeisColors.b30}
//             />
//           )
//         };
//       }
//     },
//     [screenNames.CategoryPicker]: {
//       screen: screens.CategoryPicker,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.SearchAddress]: {
//       screen: screens.SearchAddress,
//       navigationOptions: {
//         header: <Header searchMode searchAddressMode />
//       }
//     },
//     [screenNames.HookedEntitiesList]: {
//       screen: screens.HookedEntitiesList,
//       navigationOptions: () => {
//         const title = I18n.t("publisher_picker.title");
//         return {
//           header: (
//             <Header
//               hasBackButton
//               title={title}
//               backgroundColor={homeisColors.paleGreyTwo}
//               buttonColor={homeisColors.b30}
//               titleColor={homeisColors.b30}
//             />
//           )
//         };
//       }
//     },
//     [screenNames.ContextPicker]: {
//       screen: screens.ContextPicker,
//       navigationOptions: () => {
//         const title = I18n.t("context_picker.title");
//         return {
//           header: (
//             <Header
//               hasBackButton
//               title={title}
//               backgroundColor={homeisColors.paleGreyTwo}
//               buttonColor={homeisColors.b30}
//               titleColor={homeisColors.b30}
//             />
//           )
//         };
//       }
//     },
//     [screenNames.Medias]: {
//       screen: screens.Medias,
//       navigationOptions: {
//         header: <Header hasBackButton isHideSearch />
//       }
//     },
//     [screenNames.PostVideoModal]: {
//       screen: screens.PostVideoModal,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.MediaModal]: {
//       screen: screens.MediaModal,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.MediaGalleryModal]: {
//       screen: screens.MediaGalleryModal,
//       navigationOptions: {
//         header: null
//       }
//     },
//     [screenNames.ImageUpload]: {
//       screen: screens.ImageUpload,
//       navigationOptions: {
//         header: null,
//         gesturesEnabled: false
//       }
//     }
//   },
//   {
//     initialRouteName: screenGroupNames.TABS,
//     cardStyle: {
//       backgroundColor: homeisColors.white
//     },
//     mode: "modal",
//     transitionConfig: () => ({
//       screenInterpolator
//     })
//   }
// );

// export default MiddleSection;
