import { createStackNavigator } from "react-navigation";
import * as screens from "../screens";
import { screenNames } from "../vars/enums";
import { homeisColors } from "../vars";
import commonTabRoutes from "./commonTabRoutes";

// const Home = createStackNavigator(
//   {
//     [screenNames.HomeTab]: {
//       screen: screens.HomeTab,
//       navigationOptions: {
//         header: null
//       }
//     },
//     ...commonTabRoutes
//   },
//   {
//     initialRouteName: screenNames.HomeTab,
//     headerMode: "screen",
//     cardStyle: {
//       backgroundColor: homeisColors.paleGreyTwo
//     }
//   }
// );

// export default Home;
