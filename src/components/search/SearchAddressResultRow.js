import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { BoldedText } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { removeAddressSuffix } from "src/infra/utils/addressUtils";
import { stylesScheme } from "src/schemas";

const styles = {
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    paddingRight: 60,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.disabledGrey
  },
  icon: {
    marginRight: 15
  }
};

const SearchAddressResultRow = ({
  searchQuery,
  searchResult,
  onPress,
  testID,
  style
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => onPress(searchResult)}
    testID={testID}
    style={[styles.container, style]}
  >
    <DaytIcon
      name="location"
      size={20}
      color={daytColors.emptyGrey}
      style={styles.icon}
    />
    <BoldedText
      text={removeAddressSuffix(searchResult.description)}
      BoldedText={searchQuery}
    />
  </TouchableOpacity>
);

SearchAddressResultRow.ITEM_HEIGHT = 61;

SearchAddressResultRow.propTypes = {
  searchResult: PropTypes.object,
  searchQuery: PropTypes.string,
  onPress: PropTypes.func,
  testID: PropTypes.string,
  style: stylesScheme
};

export default SearchAddressResultRow;
