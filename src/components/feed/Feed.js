import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { InfiniteScroll, ScreenErrorBoundary } from "src/components";
import { EntitiesLoadingState } from "src/components/entity";
import ViewCountsService from "src/infra/viewCounts";
import { boundaryNames, originTypes } from "src/vars/enums";
import { View, Text } from "react-native";
import FeedItem from "./FeedItem";

class Feed extends Component {
  render() {
    const { showErrorPageOnFail } = this.props;

    if (showErrorPageOnFail) {
      return (
        <ScreenErrorBoundary boundaryName={boundaryNames.FEED}>
          {this.renderList()}
        </ScreenErrorBoundary>
      );
    } else {
      return this.renderList();
    }
  }
  renderList = () => {
    const {
      showErrorPageOnFail,
      apiQuery,
      reducerStatePath,
      screenContextType,
      screenContextId,
      scrollToFeedTop,
      activeHomeTab,
      hiddenPinnedPosts,
      ListHeaderComponent,
      ListEmptyComponent,
      originType,
      extraTopComponent,
      ...props
    } = this.props;

    return (
      <InfiniteScroll
        ref={node => {
          this.infiniteScroll = node;
        }}
        ListItemComponent={FeedItem}
        listItemProps={{
          screenContextType,
          screenContextId,
          scrollToFeedTop,
          activeHomeTab,
          refreshFeed: this.refreshFeed,
          originType
        }}
        apiQuery={apiQuery}
        reducerStatePath={reducerStatePath}
        keyExtractor={this.keyExtractor}
        ListLoadingComponent={
          <EntitiesLoadingState key="entitiesLoadingState" />
        }
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        extraData={hiddenPinnedPosts}
        viewabilityConfig={ViewCountsService.postViewabilityConfig}
        onViewableItemsChanged={ViewCountsService.handleFeedViewableItemsChange}
        extraTopComponent={extraTopComponent}
        {...props}
      />
    );
  };
  scrollToIndex = ({ index }) => {
    this.infiniteScroll &&
      this.infiniteScroll.getWrappedInstance().scrollToIndex({ index });
  };

  scrollToOffset = ({ offset }) => {
    this.infiniteScroll &&
      this.infiniteScroll.getWrappedInstance().scrollToOffset({ offset });
  };

  refreshFeed = () => {
    this.infiniteScroll.getWrappedInstance().fetchTop();
  };

  keyExtractor = (i, index) => {
    const { stickyHeader } = this.props;
    if (i.nonListItem) {
      return i.component.key;
    }

    const adjustedIndex = stickyHeader ? index - 1 : index;
    const key = i.id || i;
    return adjustedIndex === 0 && typeof key === "string"
      ? `possiblyPinned-${key}`
      : key;
  };
}
Feed.propTypes = {
  apiQuery: PropTypes.object,
  reducerStatePath: PropTypes.string,
  screenContextType: PropTypes.string,
  screenContextId: PropTypes.string,
  componentRef: PropTypes.func,
  scrollToFeedTop: PropTypes.func,
  activeHomeTab: PropTypes.string,
  originType: PropTypes.oneOf(Object.values(originTypes)),
  showErrorPageOnFail: PropTypes.bool,
  hiddenPinnedPosts: PropTypes.arrayOf(PropTypes.string),
  ListHeaderComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  ListEmptyComponent: PropTypes.node,
  stickyHeader: PropTypes.node,
  extraTopComponent: PropTypes.node
};
export default Feed;
