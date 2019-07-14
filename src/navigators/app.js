import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import * as screens from "../screens";
import I18n from "../infra/localization";
import { screenGroupNames, screenNames } from "../vars/enums";
import { daytColors } from "../vars";
import { get } from "../infra/utils";
