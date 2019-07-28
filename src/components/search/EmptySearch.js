import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 50
  },
  text: {
    paddingTop: 20,
    color: daytColors.placeholderGrey,
    textAlign: "center"
  }
};

const EmptySearch = ({ text }) => (
  <View style={styles.container}>
    <DaytIcon name="search-big" size={50} color={daytColors.emptyGrey} />
    <Text medium size={22} lineHeight={30} style={styles.text}>
      {text}
    </Text>
  </View>
);

EmptySearch.propTypes = {
  text: PropTypes.string
};

export default EmptySearch;
