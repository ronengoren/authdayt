import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "./index.style";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.1;
const slideWidth = wp(95);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    // backgroundColor: "#fef08c",

    // width: itemWidth,
    // height: slideHeight,
    // paddingHorizontal: itemHorizontalMargin,
    // paddingBottom: 0, // needed for shadow,
    borderColor: "#fef08c",
    borderWidth: 1
  },
  shadow: {
    // position: "absolute",
    // top: 0,
    // left: itemHorizontalMargin,
    // right: itemHorizontalMargin,
    // bottom: 18,
    // shadowColor: colors.black,
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: "white",
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    // backgroundColor: colors.black
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    // resizeMode: "cover",
    // borderRadius: IS_IOS ? entryBorderRadius : 0,
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    // height: entryBorderRadius
    // // backgroundColor: "white"
  },
  radiusMaskEven: {
    // backgroundColor: colors.black
  },
  textContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    // paddingTop: 10 - entryBorderRadius,
    // paddingBottom: 20,
    // paddingHorizontal: 16,
    // backgroundColor: "black",
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    // backgroundColor: colors.black
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "900",
    // borderWidth: 1,
    textShadowColor: "#5eadbb",
    textShadowRadius: 2
    // letterSpacing: 1.5,
  },
  dayt: {
    textShadowColor: "#5eadbb",
    color: "#fef08c"
    // borderWidth: 1,
    // borderColor: "#5eadbb"
  },
  titleEven: {
    color: "white",
    fontWeight: "900",

    fontSize: 50,
    textShadowColor: "#5eadbb"
    // textShadowRadius: 5
  },
  subtitle: {
    // marginTop: 6,
    color: "#5eadbb",
    fontSize: 12,
    fontStyle: "italic"
  },
  subtitleEven: {
    color: "#5eadbb"
  }
});
