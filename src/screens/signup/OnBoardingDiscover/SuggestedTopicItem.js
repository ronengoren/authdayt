import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, Checkbox, Image } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 75,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: daytColors.b90,
    borderRadius: 15,
    backgroundColor: daytColors.white,
    overflow: "hidden"
  },
  selectedContainer: {
    borderColor: daytColors.azure
  },
  checkbox: {
    marginRight: 15
  },
  topicName: {
    flex: 1,
    marginRight: 10
  },
  topicImage: {
    alignSelf: "flex-end",
    height: "100%",
    width: 82
  }
});

class SuggestedTopicItem extends React.Component {
  render() {
    const {
      topic: { name, media = {} },
      isSelected,
      testID
    } = this.props;
    const { thumbnail } = media;
    return (
      <TouchableOpacity
        onPress={this.toggleSelection}
        activeOpacity={0.5}
        style={[styles.container, isSelected && styles.selectedContainer]}
        testID={testID}
      >
        <Checkbox
          value={isSelected}
          size="small"
          selectedBackgroundColor={daytColors.azure}
          style={styles.checkbox}
        />
        <Text
          size={16}
          lineHeight={19}
          color={daytColors.b30}
          style={styles.topicName}
          numberOfLines={1}
          forceLTR
        >
          {name}
        </Text>
        {!!thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            style={styles.topicImage}
          />
        )}
      </TouchableOpacity>
    );
  }

  toggleSelection = () => {
    const {
      topic: { id },
      toggleSelection
    } = this.props;
    toggleSelection({ topicId: id });
  };
}

SuggestedTopicItem.propTypes = {
  topic: PropTypes.object,
  isSelected: PropTypes.bool,
  toggleSelection: PropTypes.func,
  testID: PropTypes.string
};

export default SuggestedTopicItem;
