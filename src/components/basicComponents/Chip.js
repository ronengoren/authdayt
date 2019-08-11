import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { isHebrewOrArabic } from "src/infra/utils/stringUtils";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingHorizontal: 12,
  //   marginRight: 10,
  //   borderWidth: 1,
  //   borderColor: daytColors.b90,
  //   borderRadius: 5
  //   // backgroundColor: daytColors.white
  // },
  text: {
    fontSize: 14,
    lineHeight: 50,
    textAlign: "center",
    color: daytColors.b30
  }
  // hebrewText: {
  //   fontSize: 15,
  //   lineHeight: 33
  // },
  // activeText: {
  //   color: daytColors.white
  // }
});

class Chip extends React.Component {
  render() {
    const {
      children,
      onPress,
      style,
      textStyle,
      beforeTextComponent,
      afterTextComponent,
      color,
      active,
      isBold,
      testID,
      ...props
    } = this.props;
    const isSmallFont = isHebrewOrArabic(children);
    return (
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        activeOpacity={1}
        style={[
          styles.container,
          style,
          active && { backgroundColor: color, borderColor: color }
        ]}
        {...props}
      >
        {beforeTextComponent}
        <Text
          bold={isBold}
          style={[
            styles.text,
            isSmallFont && styles.hebrewText,
            textStyle,
            active && styles.activeText
          ]}
        >
          {children}
        </Text>
        {afterTextComponent}
      </TouchableOpacity>
    );
  }
}

Chip.defaultProps = {
  beforeTextComponent: null,
  afterTextComponent: null,
  color: daytColors.green,
  active: false,
  isBold: false
};

Chip.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  style: stylesScheme,
  textStyle: stylesScheme,
  beforeTextComponent: PropTypes.node,
  afterTextComponent: PropTypes.node,
  isBold: PropTypes.bool,
  testID: PropTypes.string
};

export default Chip;
