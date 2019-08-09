import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
// import { SearchMentionsResults, SearchResultRowHeight } from '/components';
import { View, IconButton } from "src/components/basicComponents";
import { daytColors, commonStyles } from "src/vars";
import { mediaTypes, postTypes } from "src/vars/enums";

// const mentionsContainerHeight = SearchResultRowHeight * 3;

const styles = StyleSheet.create({
  mentionsContainer: {
    flex: 0,
    backgroundColor: daytColors.white,
    // height: mentionsContainerHeight,
    justifyContent: "flex-end"
  },
  mediaButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: daytColors.white
  },
  icon: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: daytColors.b90,
    borderRadius: 15,
    backgroundColor: daytColors.white
  },
  spacedIcon: {
    marginHorizontal: 10
  }
});

class BottomSection extends Component {
  render() {
    const {
      searchMentions: { results, isSearching },
      postType
    } = this.props;
    const isShowMediaButtons = ![postTypes.GUIDE, postTypes.JOB].includes(
      postType
    );

    if (results && (results.length || isSearching)) {
      return (
        <View style={styles.mentionsContainer}>
          {/* <SearchMentionsResults /> */}
        </View>
      );
    } else {
      return isShowMediaButtons && this.renderMediaButtons();
    }
  }

  renderMediaButtons() {
    const {
      onAddMedia,
      withImages,
      withVideos,
      onAddSchedule,
      withSchedule,
      isScheduledPost
    } = this.props;
    return (
      <View style={styles.mediaButtons}>
        {withImages && (
          <IconButton
            iconSize={22}
            isAwesomeIcon
            name="camera"
            weight="solid"
            iconColor="b30"
            style={[styles.icon, commonStyles.smallShadow]}
            onPress={() => onAddMedia(mediaTypes.IMAGE)}
          />
        )}
        {withVideos && (
          <IconButton
            iconSize={22}
            isAwesomeIcon
            name="video"
            weight="solid"
            iconColor="b30"
            style={[styles.icon, styles.spacedIcon, commonStyles.smallShadow]}
            onPress={() => onAddMedia(mediaTypes.VIDEO)}
          />
        )}
        {withSchedule && (
          <IconButton
            iconSize={22}
            isAwesomeIcon
            name="clock"
            weight="solid"
            iconColor={isScheduledPost ? "azure" : "b30"}
            style={[styles.icon, commonStyles.smallShadow]}
            onPress={onAddSchedule}
          />
        )}
      </View>
    );
  }
}

BottomSection.propTypes = {
  withImages: PropTypes.bool,
  withVideos: PropTypes.bool,
  withSchedule: PropTypes.bool,
  searchMentions: PropTypes.shape({
    results: PropTypes.array,
    page: PropTypes.number,
    query: PropTypes.string,
    resultsNumberPages: PropTypes.number,
    resultsHits: PropTypes.number,
    isSearching: PropTypes.bool
  }),
  onAddMedia: PropTypes.func,
  onAddSchedule: PropTypes.func,
  isScheduledPost: PropTypes.bool,
  postType: PropTypes.string
};

const mapStateToProps = state => ({
  searchMentions: state.mentions.searchMentions
});

export default connect(mapStateToProps)(BottomSection);
