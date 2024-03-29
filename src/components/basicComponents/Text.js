import React from "react";
import PropTypes from "prop-types";
import { Text as RnText, StyleSheet } from "react-native";
import { daytFonts, daytFontWeights, daytColors } from "../../vars";
import { isRTL } from "../../infra/utils/stringUtils";
import { stylesScheme } from "../../schemas";
import { get } from "../../infra/utils";

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: daytFonts.regular,
    fontWeight: daytFontWeights.regular,
    color: daytColors.black
  },
  rtl: {
    writingDirection: "rtl",
    textAlign: "right"
  },
  ltr: {
    textAlign: "left"
  }
});

const getFontFamily = (isLight, isMedium, isBold, isBolder) => {
  if (isMedium) {
    return daytFonts.medium;
  } else if (isBold) {
    return daytFonts.bold;
  } else if (isLight) {
    return daytFonts.light;
  } else if (isBolder) {
    return daytFonts.bolder;
  }
  return daytFonts.regular;
};

const getFontWeight = (isLight, isMedium, isBold, isBolder) => {
  if (isMedium) {
    return daytFontWeights.medium;
  } else if (isBold) {
    return daytFontWeights.bold;
  } else if (isLight) {
    return daytFontWeights.light;
  } else if (isBolder) {
    return daytFontWeights.bolder;
  }
  return daytFontWeights.regular;
};

const Text = ({
  style,
  medium,
  bold,
  bolder,
  light,
  alignLocale,
  children,
  size,
  color,
  lineHeight,
  letterSpacing,
  forceLTR,
  forceRTL,
  ...props
}) => {
  const fontFamily = getFontFamily(light, medium, bold, bolder);
  const fontWeight = getFontWeight(light, medium, bold, bolder);
  const firstChild = Array.isArray(children)
    ? get(children, "[0].props.children", children[0])
    : children;
  let isRightToLeft = false;
  if (alignLocale && typeof firstChild === "string") {
    isRightToLeft = isRTL(firstChild);
  }

  return (
    <RnText
      allowFontScaling={false}
      style={[
        styles.container,
        { fontFamily },
        { fontWeight },
        isRightToLeft && styles.rtl,
        forceLTR && styles.ltr,
        size && { fontSize: size },
        lineHeight && { lineHeight },
        letterSpacing && { letterSpacing },
        color && { color },
        style
      ]}
      {...props}
    >
      {forceLTR && "\u202A"}
      {forceRTL && "\u200F"}
      {children}
    </RnText>
  );
};

Text.propTypes = {
  style: stylesScheme,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  bolder: PropTypes.bool,
  light: PropTypes.bool,
  alignLocale: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.number,
  lineHeight: PropTypes.number,
  letterSpacing: PropTypes.number,
  color: PropTypes.string,
  forceLTR: PropTypes.bool,
  forceRTL: PropTypes.bool
};

export default Text;
