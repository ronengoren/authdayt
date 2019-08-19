import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { DaytIcon, AwesomeIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";

const styles = StyleSheet.create({
  defaultContainer: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallContainer: {
    height: 20,
    width: 20
  },
  // eslint-disable-next-line react-native/no-unused-styles
  largeContainer: {
    height: 40,
    width: 40
  },
  // eslint-disable-next-line react-native/no-unused-styles
  xlargeContainer: {
    height: 70,
    width: 70
  },
  disabledIcon: {
    color: daytColors.disabledGrey
  }
});

const IconButton = ({
  name,
  size = "default",
  iconColor = "buttonGrey",
  disabled,
  onPress,
  onLongPress,
  style,
  iconStyle,
  iconSize,
  isAwesomeIcon,
  weight,
  hitSlop,
  ...restProps
}) => {
  const containerStyle = [
    styles.defaultContainer,
    styles[`${size}Container`],
    disabled && styles.disabled,
    style
  ];

  const daytIcon = [disabled && styles.disabledIcon, iconStyle];

  const buttonIconSize = size === "large" ? 26 : 19;
  const calculatedIconColor = disabled ? daytColors.b70 : daytColors[iconColor];

  return (
    <TouchableOpacity
      accessible
      accessibilityComponentType="button"
      accessibilityTraits="button"
      // style={containerStyle}
      onPress={disabled ? null : onPress}
      onLongPress={disabled ? null : onLongPress}
      activeOpacity={disabled ? 1 : 0.6}
      hitSlop={hitSlop}
      {...restProps}
    >
      {isAwesomeIcon ? (
        <AwesomeIcon
          name={name}
          weight={weight}
          color={calculatedIconColor}
          style={daytIcon}
          size={iconSize || buttonIconSize}
        />
      ) : (
        <DaytIcon
          name={name}
          color={calculatedIconColor}
          style={daytIcon}
          size={iconSize || buttonIconSize}
        />
      )}
    </TouchableOpacity>
  );
};

IconButton.defaultProps = {
  hitSlop: uiConstants.BTN_HITSLOP
};

IconButton.propTypes = {
  hitSlop: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),
  name: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  iconStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  iconSize: PropTypes.number,
  isAwesomeIcon: PropTypes.bool,
  weight: PropTypes.string
};

export default IconButton;
