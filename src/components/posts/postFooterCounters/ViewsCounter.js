import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View, Text } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors, commonStyles } from "src/vars";

const HITSLOP = { left: 5, top: 15, right: 5, bottom: 15 };

const styles = StyleSheet.create({
  bottomText: {
    paddingRight: 5,
    paddingLeft: 17,
    backgroundColor: daytColors.transparent
  }
});

const ViewsCounter = ({ views }) => (
  <View style={commonStyles.flexDirectionRow}>
    <Text
      size={13}
      lineHeight={15}
      style={styles.bottomText}
      color={daytColors.b60}
      hitSlop={HITSLOP}
    >
      {views}
    </Text>
    <AwesomeIcon name="eye" color={daytColors.b60} size={13} weight="solid" />
  </View>
);

ViewsCounter.propTypes = {
  views: PropTypes.number
};

export default ViewsCounter;
