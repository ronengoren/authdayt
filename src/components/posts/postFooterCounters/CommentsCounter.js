import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { stylesScheme } from "src/schemas";
import { Text } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors, commonStyles } from "src/vars";

const HITSLOP = { left: 5, top: 15, right: 5, bottom: 15 };

const styles = StyleSheet.create({
  container: {
    paddingLeft: 17
  },
  bottomText: {
    paddingRight: 5,
    backgroundColor: daytColors.transparent
  },
  iconComment: {
    marginTop: 2
  }
});

const CommentsCounter = ({ comments, onPress, style }) => (
  <TouchableOpacity
    hitSlop={HITSLOP}
    onPress={onPress}
    activeOpacity={1}
    style={[commonStyles.flexDirectionRow, styles.container, style]}
  >
    {!!comments && (
      <Text
        size={13}
        lineHeight={15}
        style={styles.bottomText}
        color={comments ? daytColors.azure : daytColors.b60}
        hitSlop={HITSLOP}
      >
        {comments}
      </Text>
    )}
    <DaytIcon
      name="z-comment-fill"
      style={[styles.iconComment]}
      color={comments ? daytColors.azure : daytColors.b60}
      size={13}
    />
  </TouchableOpacity>
);

CommentsCounter.propTypes = {
  style: stylesScheme,
  comments: PropTypes.number,
  onPress: PropTypes.func
};

export default CommentsCounter;
