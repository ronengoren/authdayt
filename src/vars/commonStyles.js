import { StyleSheet } from "react-native";
import { daytColors } from "./vars";

const commonStyles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flexDirectionRow: {
    flexDirection: "row"
  },
  textAlignCenter: {
    textAlign: "center"
  },
  shadow: {
    backgroundColor: homeisColors.white,
    shadowColor: homeisColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 4
  },
  smallShadow: {
    shadowColor: homeisColors.boxShadow,
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 3
  },
  tinyShadow: {
    shadowColor: homeisColors.boxShadow,
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 2
  },
  textShadow: {
    textShadowColor: homeisColors.boxShadow20,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5
  }
});

export default commonStyles;
