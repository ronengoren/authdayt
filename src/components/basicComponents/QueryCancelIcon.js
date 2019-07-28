import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    right: 8
  }
});

const QueryCancelIcon = ({ style, onPress, size, iconColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.wrapper, style]}
    activeOpacity={1}
  >
    <AwesomeIcon
      name="times-circle"
      size={size}
      color={iconColor}
      weight="solid"
    />
  </TouchableOpacity>
);

QueryCancelIcon.defaultProps = {
  size: 14,
  iconColor: daytColors.b60
};

QueryCancelIcon.propTypes = {
  style: stylesScheme,
  onPress: PropTypes.func,
  size: PropTypes.number,
  iconColor: PropTypes.string
};

export default QueryCancelIcon;
