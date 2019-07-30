import * as screens from "src/screens";
import { daytColors } from "src/vars";
import { screenNames } from "src/vars/enums";
import { createStackNavigator } from "react-navigation";
// import commonTabRoutes from './commonTabRoutes';

const Communications = createStackNavigator({
  [screenNames.CommunicationCenter]: {
    screen: screens.CommunicationCenter,
    navigationOptions: () => ({
      header: null
    })
  }
  //     [screenNames.ChatUserSelector]: {
  //       screen: screens.ChatUserSelector,
  //       navigationOptions: () => ({
  //         header: null
  //       })
  //     },
  //     ...commonTabRoutes
  //   },
  //   {
  //     initialRouteName: screenNames.CommunicationCenter,
  //     headerMode: 'screen',
  //     cardStyle: {
  //       backgroundColor: daytColors.white
  //     }
});

export default Communications;
