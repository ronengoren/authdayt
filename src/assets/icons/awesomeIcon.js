import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import Icons from "src/assets/fonts/fontAwesome/config.json";
import { daytColors } from "src/vars";
import { stylesScheme } from "src/schemas/common";

const styles = StyleSheet.create({
  icon: {
    fontStyle: "normal",
    fontSize: 14,
    color: daytColors.black,
    backgroundColor: daytColors.transparent
  }
});

const fontSettings = {
  light: {
    fontFamily: "FontAwesome5ProLight",
    fontWeight: "300"
  },
  solid: {
    fontFamily: "FontAwesome5ProSolid",
    fontWeight: Platform.select({ ios: "900", android: "normal" })
  },
  brands: {
    fontFamily: "FontAwesome5BrandsRegular",
    fontWeight: "400"
  }
};

class AwesomeIcon extends React.PureComponent {
  render() {
    const { style, color, children, name, size, weight, ...props } = this.props;

    let glyph = "?";
    const iconDef = name ? Icons[name] : "";
    if (typeof iconDef === "number") {
      glyph = String.fromCharCode(iconDef);
    }

    const settings = weight ? fontSettings[weight] : fontSettings.normal;

    return (
      <Text
        {...props}
        style={[styles.icon, { ...settings, color, fontSize: size }, style]}
        ref={this.handleRef}
        allowFontScaling={false}
      >
        {glyph}
        {children}
      </Text>
    );
  }

  root = null;

  handleRef = ref => {
    this.root = ref;
  };

  setNativeProps = nativeProps => {
    if (this.root) {
      this.root.setNativeProps(nativeProps);
    }
  };
}

AwesomeIcon.defaultProps = {
  weight: "light"
};

AwesomeIcon.propTypes = {
  name: PropTypes.string.isRequired,
  weight: PropTypes.oneOf(["light", "solid", "brands"]),
  size: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.node,
  style: stylesScheme
};

export default AwesomeIcon;
