import { createStackNavigator } from "react-navigation";
import { daytColors } from "src/vars";
import { screenNames } from "src/vars/enums";
import * as screens from "src/screens";

const Post = createStackNavigator(
  {
    [screenNames.PostPage]: {
      screen: screens.PostPage,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: screenNames.PostPage,
    cardStyle: {
      backgroundColor: daytColors.white
    }
  }
);

export default Post;
