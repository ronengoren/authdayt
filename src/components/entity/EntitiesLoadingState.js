import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View, PlaceholderRectangle } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  itemContainer: {
    height: 260,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10,
    backgroundColor: daytColors.white,
    borderRadius: 15,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3
  },
  compactItemContainer: {
    height: 160
  },
  itemTopSection: {
    flexDirection: "row",
    padding: 15
  },
  itemMiddleSection: {
    paddingHorizontal: 15
  },
  compactActionPlaceholder: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  }
});

class EntitiesLoadingState extends Component {
  static COMPONENT_TYPE = {
    COMPACT: "compact",
    REGULAR: "regular"
  };

  static renderPlaceholderFeedItem(type, key) {
    const isCompact = type === EntitiesLoadingState.COMPONENT_TYPE.COMPACT;
    return (
      <View
        style={[styles.itemContainer, isCompact && styles.compactItemContainer]}
        key={key}
      >
        <View style={styles.itemTopSection}>
          <PlaceholderRectangle
            width={isCompact ? 60 : 35}
            height={isCompact ? 60 : 35}
            borderRadius={isCompact ? 10 : 30}
          />
          <View>
            <PlaceholderRectangle width={109} height={15} borderRadius={3} />
            <PlaceholderRectangle width={65} />
          </View>
        </View>
        {!isCompact && (
          <View style={styles.itemMiddleSection}>
            <PlaceholderRectangle width={270} />
            <PlaceholderRectangle width={315} />
            <PlaceholderRectangle width={135} marginBottom={35} />
          </View>
        )}
        <PlaceholderRectangle
          width={"100%"}
          height={60}
          borderRadius={0}
          style={isCompact && styles.compactActionPlaceholder}
        />
      </View>
    );
  }

  render() {
    const { type } = this.props;
    return [
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 1),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 2),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 3),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 4),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 5),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 6),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 7),
      EntitiesLoadingState.renderPlaceholderFeedItem(type, 8)
    ];
  }
}

EntitiesLoadingState.defaultProps = {
  type: EntitiesLoadingState.COMPONENT_TYPE.REGULAR
};

EntitiesLoadingState.propTypes = {
  type: PropTypes.oneOf(Object.values(EntitiesLoadingState.COMPONENT_TYPE))
};

export default EntitiesLoadingState;
