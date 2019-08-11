import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import {
  View,
  Avatar,
  TruncatedMultiLineName
} from "src/components/basicComponents";
import { navigationService } from "src/infra/navigation";
import PeopleSearchResultPlaceholders from "./PeopleSearchResultPlaceholders";

const styles = {
  container: {
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    paddingVertical: 15
  },
  textWrapper: {
    height: 40,
    marginTop: 10
  }
};

class PeopleSearchResultRow extends React.PureComponent {
  render = () => {
    const { searchResult, dummy } = this.props;

    if (dummy) {
      return (
        <PeopleSearchResultPlaceholders
          containerStyle={styles.container}
          textStyle={styles.textWrapper}
        />
      );
    }

    const { name } = searchResult;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigationService.navigateToProfile({
            entityId: searchResult.objectID
          })
        }
      >
        <View style={styles.container}>
          {this.renderEntityImage({ searchResult })}
          <TruncatedMultiLineName
            name={name}
            style={styles.textWrapper}
            size={14}
            lineHeight={16}
            centerText
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderEntityImage = ({ searchResult }) => (
    <Avatar
      entityId={searchResult.objectID}
      entityType={searchResult.entityType}
      name={searchResult.name}
      themeColor={searchResult.themeColor}
      thumbnail={searchResult.thumbnail}
      size="medium2"
    />
  );
}

PeopleSearchResultRow.propTypes = {
  searchResult: PropTypes.object,
  dummy: PropTypes.bool
};

export default PeopleSearchResultRow;
