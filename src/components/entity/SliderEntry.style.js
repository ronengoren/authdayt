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

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(100);
const itemHorizontalMargin = wp(0);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 4;

const entryBorderRadius = 0;

export default StyleSheet.create({
  slideInnerContainer: {
    width: 100 + "%",
    height: slideHeight
    // paddingHorizontal: itemHorizontalMargin
    // paddingBottom: 18 // needed for shadow
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
    // margin: 5,
    // marginRight: 19,
    // padding: 25,
    flex: 1,
    // marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: "black"
    // borderTopLeftRadius: entryBorderRadius,
    // borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: "white"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: "white"
  },
  radiusMaskEven: {
    backgroundColor: "white"
  },
  textContainer: {
    // justifyContent: "center",
    // paddingTop: 20 - entryBorderRadius,
    // paddingBottom: 20,
    // paddingHorizontal: 16,
    // backgroundColor: "white",
    // borderBottomLeftRadius: entryBorderRadius,
    // borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: "white"
  },
  title: {
    color: "black",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  titleEven: {
    color: "black"
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: "italic"
  },
  subtitleEven: {
    color: colors.gray
  }
});
