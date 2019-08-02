import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView } from "react-native";
import { Image } from "src/components/basicComponents";

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  }
});

const ZoomableImage = ({
  maximumZoomScale,
  minimumZoomScale,
  style,
  source,
  ...props
}) => (
  <ScrollView
    contentContainerStyle={styles.contentContainer}
    centerContent
    maximumZoomScale={maximumZoomScale}
    minimumZoomScale={minimumZoomScale}
  >
    <Image style={style} source={source} {...props} />
  </ScrollView>
);

ZoomableImage.propTypes = {
  maximumZoomScale: PropTypes.number,
  minimumZoomScale: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  source: PropTypes.object
};

export default ZoomableImage;
