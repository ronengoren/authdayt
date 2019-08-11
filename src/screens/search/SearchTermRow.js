import React from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback } from "react-native";
import { View, Text, Separator } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors } from "src/vars";

const styles = {
  outerContainer: {
    paddingHorizontal: 15
  },
  container: {
    flex: 1,
    height: 59,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 30
  },
  text: {
    paddingLeft: 15,
    color: daytColors.black
  },
  separator: {
    borderTopWidth: 0,
    height: 0
  },
  icon: {
    top: 1
  }
};

const SearchTermRow = ({ searchTerm, onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress(searchTerm)}>
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <AwesomeIcon
          name="clock"
          color={daytColors.b60}
          size={16}
          style={styles.icon}
        />
        <Text
          size={16}
          lineHeight={30}
          style={styles.text}
          bold
          numberOfLines={1}
        >
          {searchTerm}
        </Text>
      </View>
      <Separator color={daytColors.disabledGrey} style={styles.separator} />
    </View>
  </TouchableWithoutFeedback>
);

SearchTermRow.propTypes = {
  searchTerm: PropTypes.string,
  onPress: PropTypes.func
};

export default SearchTermRow;
