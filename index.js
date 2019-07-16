import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import I18n from "./src/infra/localization/";
import Root from "./src/Root";

I18n.init();

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
