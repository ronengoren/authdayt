import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { InfiniteScroll, ScreenErrorBoundary } from "src/components";
import { EntitiesLoadingState } from "src/components/entity";
// import ViewCountsService from "/infra/viewCounts";
import { boundaryNames, originTypes } from "src/vars/enums";
import { View, Text } from "react-native";
import FeedItem from "./FeedItem";

class Feed extends Component {
  render() {
    return (
      <View>
        <InfiniteScroll
          ref={node => {
            this.infiniteScroll = node;
          }}
          ListItemComponent={FeedItem}
          ListLoadingComponent={
            <EntitiesLoadingState key="entitiesLoadingState" />
          }
        />
      </View>
    );
  }
}
export default Feed;
