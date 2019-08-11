import { StyleSheet } from "react-native";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "white",
  background2: "white"
};

export default StyleSheet.create({
  safeArea: {
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: colors.background1
  },
  container: {
    // padding: 15,
    flex: 1,
    backgroundColor: colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#5eadbb",
    marginBottom: 10
  },
  // exampleContainer: {
  //   paddingVertical: 30
  // },
  exampleContainerDark: {
    backgroundColor: "white"
  },
  exampleContainerLight: {
    backgroundColor: "white"
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  titleDark: {
    color: colors.background2
  },
  subtitle: {
    // marginTop: 5,
    // paddingHorizontal: 30,
    // backgroundColor: "transparent",
    // color: "rgba(255, 255, 255, 0.75)",
    // fontSize: 13,
    // fontStyle: "italic",
    // textAlign: "center"
  },
  slider: {
    marginTop: 0,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});
