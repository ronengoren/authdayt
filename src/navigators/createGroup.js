import * as screens from "src/screens";
import { daytColors } from "/vars";
import { screenNames } from "/vars/enums";
import DismissibleStackNavigator from "./DismissibleStackNavigator";

const CreateGroup = DismissibleStackNavigator(
  {
    [screenNames.CreateGroup]: {
      screen: screens.CreateGroup,
      navigationOptions: {
        header: null
      }
    },
    [screenNames.InviteMembers]: {
      screen: screens.InviteMembers,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: screenNames.CreateGroup,
    cardStyle: {
      backgroundColor: daytColors.white
    },
    mode: "card"
  }
);

export default CreateGroup;
