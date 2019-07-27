import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import Root from "./src/Root";
import I18n from "./src/infra/localization";
import "react-native-gesture-handler"; // https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-443815828

I18n.init();

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Root);
