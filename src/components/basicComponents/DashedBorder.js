import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "src/components/basicComponents";
import images from "src/assets/images";
import { stylesScheme } from "src/schemas/common";

const styles = StyleSheet.create({
  dottedBorder: {
    width: "100%",
    height: 1
  }
});

class DashedBorder extends React.Component {
  render() {
    const { style } = this.props;
    return (
      <Image
        source={images.common.dotted_border}
        style={[styles.dottedBorder, style]}
        resizeMode="cover"
      />
    );
  }
}

DashedBorder.propTypes = {
  style: stylesScheme
};

export default DashedBorder;
