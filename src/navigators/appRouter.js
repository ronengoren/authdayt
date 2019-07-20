import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { daytColors } from "../vars";
import { screenGroupNames } from "../vars/enums";
// import MiddleSection from "./app";
import authentication from "./authentication";

const AppTopNavigation = createSwitchNavigator({
  [screenGroupNames.AUTHENTICATION]: {
    screen: authentication,
    navigationOptions: {
      header: null
    }
  },
  //     [screenGroupNames.SIGNED_IN]: {
  //       screen: MiddleSection,
  //       navigationOptions: {
  //         header: null
  //       }
  //     }
  //   },
  //   {
  initialRouteName: screenGroupNames.AUTHENTICATION,
  headerMode: "screen"
});

export default createAppContainer(AppTopNavigation);
