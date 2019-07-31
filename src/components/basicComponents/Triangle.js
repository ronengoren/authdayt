import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    width: 0,
    height: 0,
    backgroundColor: daytColors.transparent,
    borderStyle: "solid"
  }
});

const Triangle = ({ style, direction, width, height, color }) => {
  const getBorderStyles = () => {
    switch (direction) {
      case "up":
        return {
          borderTopWidth: 0,
          borderRightWidth: width / 2.0,
          borderBottomWidth: height,
          borderLeftWidth: width / 2.0,
          borderTopColor: daytColors.transparent,
          borderRightColor: daytColors.transparent,
          borderBottomColor: color,
          borderLeftColor: daytColors.transparent
        };
      case "right":
        return {
          borderTopWidth: height / 2.0,
          borderRightWidth: 0,
          borderBottomWidth: height / 2.0,
          borderLeftWidth: width,
          borderTopColor: daytColors.transparent,
          borderRightColor: daytColors.transparent,
          borderBottomColor: daytColors.transparent,
          borderLeftColor: color
        };
      case "down":
        return {
          borderTopWidth: height,
          borderRightWidth: width / 2.0,
          borderBottomWidth: 0,
          borderLeftWidth: width / 2.0,
          borderTopColor: color,
          borderRightColor: daytColors.transparent,
          borderBottomColor: daytColors.transparent,
          borderLeftColor: daytColors.transparent
        };
      case "left":
        return {
          borderTopWidth: height / 2.0,
          borderRightWidth: width,
          borderBottomWidth: height / 2.0,
          borderLeftWidth: 0,
          borderTopColor: daytColors.transparent,
          borderRightColor: color,
          borderBottomColor: daytColors.transparent,
          borderLeftColor: daytColors.transparent
        };
      case "up-left":
        return {
          borderTopWidth: height,
          borderRightWidth: width,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          borderTopColor: color,
          borderRightColor: daytColors.transparent,
          borderBottomColor: daytColors.transparent,
          borderLeftColor: daytColors.transparent
        };
      case "up-right":
        return {
          borderTopWidth: 0,
          borderRightWidth: width,
          borderBottomWidth: height,
          borderLeftWidth: 0,
          borderTopColor: daytColors.transparent,
          borderRightColor: color,
          borderBottomColor: daytColors.transparent,
          borderLeftColor: daytColors.transparent
        };
      case "down-left":
        return {
          borderTopWidth: height,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: width,
          borderTopColor: daytColors.transparent,
          borderRightColor: daytColors.transparent,
          borderBottomColor: daytColors.transparent,
          borderLeftColor: color
        };
      case "down-right":
        return {
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: height,
          borderLeftWidth: width,
          borderTopColor: daytColors.transparent,
          borderRightColor: daytColors.transparent,
          borderBottomColor: color,
          borderLeftColor: daytColors.transparent
        };
      default:
        return {};
    }
  };

  const borderStyles = getBorderStyles();
  return <View style={[styles.container, borderStyles, style]} />;
};

Triangle.propTypes = {
  direction: PropTypes.oneOf([
    "up",
    "right",
    "down",
    "left",
    "up-right",
    "up-left",
    "down-right",
    "down-left"
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ])
};

Triangle.defaultProps = {
  direction: "up",
  width: 0,
  height: 0,
  color: daytColors.white
};

export default Triangle;
