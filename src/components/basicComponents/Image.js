import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image as RnImage, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";

const defaultStyles = StyleSheet.create({
  wrapper: {
    width: 50,
    height: 50
  }
});

const fastImageResizesModes = {
  contain: FastImage.resizeMode.contain,
  cover: FastImage.resizeMode.cover,
  stretch: FastImage.resizeMode.stretch,
  center: FastImage.resizeMode.center
};

class Image extends Component {
  static getSize(uri, onSuccess, onError) {
    RnImage.getSize(uri, onSuccess, onError);
  }

  render() {
    const { style, source, resizeMode, ...restProps } = this.props;
    if (
      !source ||
      (typeof source.uri === "string" && !source.uri.trim().length)
    ) {
      return null;
    }

    return (
      <FastImage
        style={[defaultStyles.wrapper, style]}
        source={source}
        resizeMode={fastImageResizesModes[resizeMode]}
        {...restProps}
      />
    );
  }
}

Image.defaultProps = {
  resizeMode: "cover"
};

Image.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  resizeMode: PropTypes.oneOf(["stretch", "cover", "contain", "center"])
};

export default Image;
