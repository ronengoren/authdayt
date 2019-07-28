import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Image, Spinner, Text } from "src/components/basicComponents";
import images from "src/assets/images";
import { daytColors, uiConstants, commonStyles } from "src/vars";
import { DaytIcon, AwesomeIcon } from "src/assets/icons";
import { stylesScheme } from "src/schemas/common";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 70,
    backgroundColor: daytColors.white,
    borderWidth: 1,
    borderColor: daytColors.b90
  },
  // eslint-disable-next-line react-native/no-unused-styles
  small35Wrapper: {
    height: 35,
    borderRadius: 10
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallWrapper: {
    height: 36
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigWrapper: {
    height: 45,
    borderRadius: 45
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big45Wrapper: {
    height: 45,
    borderRadius: 45
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big50Wrapper: {
    height: 50
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big55Wrapper: {
    height: 55,
    borderRadius: 15
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big60Wrapper: {
    height: 60
  },
  // eslint-disable-next-line react-native/no-unused-styles
  big90Wrapper: {
    height: 90,
    borderRadius: 10
  },
  fullWidth: {
    flex: 1
  },
  defaultText: {
    fontSize: 15,
    lineHeight: 18,
    color: daytColors.b30,
    textAlign: "center"
  },
  defaultIcon: {
    marginRight: 5,
    color: daytColors.b30
  },
  secondary: {
    backgroundColor: daytColors.paleGreyTwo
  },
  secondaryText: {
    color: daytColors.b60
  },
  secondaryIcon: {
    color: daytColors.b60
  },
  activeText: {
    color: daytColors.azure
  },
  activeIcon: {
    color: daytColors.azure
  },
  // eslint-disable-next-line react-native/no-unused-styles
  thanksEmoji: {
    width: 20,
    height: 18,
    marginRight: 5
  },
  // eslint-disable-next-line react-native/no-unused-styles
  clapEmoji: {
    width: 20,
    height: 22,
    marginRight: 5
  }
});

class NewTextButton extends React.Component {
  static sizes = {
    SMALL35: "small35",
    SMALL: "small",
    MEDIUM: "medium",
    BIG: "big",
    BIG45: "big45",
    BIG50: "big50",
    BIG55: "big55",
    BIG60: "big60",
    BIG90: "big90"
  };

  render() {
    const {
      size,
      width,
      active,
      disabled,
      busy,
      secondary,
      customColor,
      style,
      textStyle,
      iconName,
      onPress,
      iconSize = 20,
      iconLineHeight,
      iconWeight,
      children,
      hitSlop,
      iconStyle,
      emoji,
      withShadow,
      numberOfLines,
      iconWrapperStyle,
      ...props
    } = this.props;
    const containerStyles = [
      withShadow && commonStyles.shadow,
      styles.wrapper,
      width ? { width } : styles.fullWidth,
      styles[`${size}Wrapper`],
      (secondary || disabled) && styles.secondary,
      customColor && { backgroundColor: customColor, borderColor: customColor },
      style && style
    ];
    const textStyles = [
      styles.defaultText,
      (secondary || disabled) && styles.secondaryText,
      active && styles.activeText,
      textStyle
    ];
    const iconStyles = [
      styles.defaultIcon,
      (secondary || disabled) && styles.secondaryIcon,
      active && styles.activeIcon,
      { lineHeight: iconLineHeight || iconSize },
      iconStyle
    ];
    const spinnerColor = daytColors.white;
    const IconComponent = iconWeight ? AwesomeIcon : DaytIcon;
    return (
      <TouchableOpacity
        style={containerStyles}
        accessible
        accessibilityComponentType="button"
        accessibilityTraits="button"
        activeOpacity={1}
        hitSlop={hitSlop}
        onPress={busy || disabled ? null : onPress}
        {...props}
      >
        {!busy && [
          !!iconName && (
            <View style={iconWrapperStyle}>
              <IconComponent
                name={iconName}
                size={iconSize}
                weight={iconWeight}
                style={iconStyles}
                key="icon"
              />
            </View>
          ),
          !!emoji && (
            <View style={iconWrapperStyle}>
              <Image
                source={images.emoji[emoji]}
                style={styles[`${emoji}Emoji`]}
                key="emoji"
              />
            </View>
          ),
          !!children && (
            <Text numberOfLines={numberOfLines} style={textStyles} key="text">
              {children}
            </Text>
          )
        ]}
        {busy && (
          <Spinner
            style={styles.spinner}
            center
            size="small"
            color={spinnerColor}
          />
        )}
      </TouchableOpacity>
    );
  }
}

NewTextButton.defaultProps = {
  size: NewTextButton.sizes.MEDIUM,
  hitSlop: uiConstants.BTN_HITSLOP,
  iconSize: 16,
  numberOfLines: 1
};

NewTextButton.propTypes = {
  size: PropTypes.oneOf(Object.values(NewTextButton.sizes)),
  width: PropTypes.number,
  active: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  onPress: PropTypes.func,
  customColor: PropTypes.string,
  style: stylesScheme,
  textStyle: stylesScheme,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconLineHeight: PropTypes.number,
  iconWrapperStyle: stylesScheme,
  iconStyle: stylesScheme,
  iconWeight: PropTypes.oneOf(["light", "solid"]),
  children: PropTypes.node,
  hitSlop: PropTypes.object,
  emoji: PropTypes.oneOf(["thanks", "clap"]),
  withShadow: PropTypes.bool,
  numberOfLines: PropTypes.number
};

export default NewTextButton;
