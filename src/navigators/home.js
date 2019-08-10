import React from "react";

import { createStackNavigator } from "react-navigation";
import * as screens from "../screens";
import { screenNames } from "src/vars/enums";
import { daytColors } from "src/vars";
import commonTabRoutes from "./commonTabRoutes";
import { Header } from "src/components";

const Home = createStackNavigator(
  {
    [screenNames.HomeTab]: {
      screen: screens.HomeTab,
      navigationOptions: {
        header: <Header />
      }
    },
    ...commonTabRoutes
  },
  {
    initialRouteName: screenNames.HomeTab,
    headerMode: "screen",
    cardStyle: {
      backgroundColor: daytColors.paleGreyTwo
    }
  }
);

export default Home;
