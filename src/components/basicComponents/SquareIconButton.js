import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { daytColors, uiConstants } from "src/vars";
import { DaytIcon } from "src/assets/icons";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: daytColors.green,
    backgroundColor: daytColors.green
  },
  // eslint-disable-next-line react-native/no-unused-styles
  medium: {
    height: 30,
    width: 30,
    borderRadius: 9
  },
  // eslint-disable-next-line react-native/no-unused-styles
  large: {
    height: 40,
    width: 40,
    borderRadius: 12
  },
  secondary: {
    backgroundColor: daytColors.white
  },
  outline: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.buttonGrey
  },
  dotted: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.buttonGrey,
    borderStyle: "dashed"
  },
  disabled: {
    backgroundColor: daytColors.disabledGrey,
    borderColor: daytColors.disabledGrey
  },
  secondaryDisabled: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.disabledGrey
  },
  outlineDisabled: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.disabledGrey
  },
  dottedDisabled: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.disabledGrey,
    borderStyle: "dashed"
  }
});

const iconColors = {
  default: daytColors.white,
  defaultDisabled: daytColors.white,
  secondary: daytColors.green,
  secondaryDisabled: daytColors.disabledGrey,
  outline: daytColors.buttonGrey,
  outlineDisabled: daytColors.disabledGrey,
  dotted: daytColors.buttonGrey,
  dottedDisabled: daytColors.disabledGrey
};

class SquareIconButton extends React.PureComponent {
  render() {
    const {
      size,
      disabled,
      type,
      style,
      iconName,
      iconColor,
      iconSize,
      onPress,
      ...props
    } = this.props;
    const containerStyles = [
      styles.default,
      styles[size],
      type === "secondary" && styles.secondary,
      type === "outline" && styles.outline,
      type === "dotted" && styles.dotted,
      disabled && type === "default" && styles.disabled,
      disabled && type === "secondary" && styles.secondaryDisabled,
      disabled && type === "outline" && styles.outlineDisabled,
      disabled && type === "dotted" && styles.dottedDisabled,
      style
    ];

    const calculatedIconColor =
      iconColor ||
      (!disabled ? iconColors[type] : iconColors[`${type}Disabled`]);

    const calculatedIconSize = iconSize || (size === "large" ? 20 : 15);

    return (
      <TouchableOpacity
        accessible
        accessibilityComponentType="button"
        accessibilityTraits="button"
        style={containerStyles}
        onPress={disabled ? null : onPress}
        hitSlop={uiConstants.BTN_HITSLOP}
        {...props}
      >
        <DaytIcon
          name={iconName}
          size={calculatedIconSize}
          color={calculatedIconColor}
        />
      </TouchableOpacity>
    );
  }
}

SquareIconButton.defaultProps = {
  size: "medium",
  type: "default"
};

SquareIconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  style: stylesScheme,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
  type: PropTypes.oneOf(["default", "secondary", "outline", "dotted"])
};

export default SquareIconButton;
