import { Platform } from "react-native";

const daytFonts = {
  light: "System",
  regular: "System",
  medium: "System",
  bold: "System",
  bolder: "System"
};

const daytFontWeights = {
  regular: Platform.select({ ios: "normal", android: "normal" }),
  light: Platform.select({ ios: "300", android: "300" }),
  medium: Platform.select({ ios: "600", android: "500" }),
  bold: Platform.select({ ios: "700", android: "bold" }),
  bolder: Platform.select({ ios: "800", android: "bold" })
};

export { daytFonts, daytFontWeights }; // eslint-disable-line import/prefer-default-export
