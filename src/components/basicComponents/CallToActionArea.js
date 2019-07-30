import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "dashed",
    borderColor: daytColors.placeholderGrey,
    backgroundColor: daytColors.fillGrey
  },
  flexRow: {
    flexDirection: "row"
  },
  iconMargin: {
    marginRight: 10
  },
  text: {
    color: daytColors.placeholderGrey
  }
});

const CallToActionArea = ({
  isSecondary,
  text,
  style,
  textStyle = null,
  mediumWeight,
  iconName,
  iconColor = daytColors.placeholderGrey,
  onPress,
  iconSize = 30
}) => (
  <TouchableOpacity
    style={[styles.container, !isSecondary && styles.flexRow, style]}
    onPress={onPress}
    activeOpacity={1}
  >
    {!!iconName && (
      <DaytIcon
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={!isSecondary && styles.iconMargin}
      />
    )}
    <Text style={[styles.text, textStyle]} medium={mediumWeight} alignLocale>
      {text}
    </Text>
  </TouchableOpacity>
);

CallToActionArea.propTypes = {
  text: PropTypes.string,
  style: stylesScheme,
  textStyle: stylesScheme,
  mediumWeight: PropTypes.bool,
  iconName: PropTypes.string,
  onPress: PropTypes.func,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  isSecondary: PropTypes.bool
};

export default CallToActionArea;
