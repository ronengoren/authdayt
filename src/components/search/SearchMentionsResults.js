import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Separator } from "src/components/basicComponents";
import {
  SearchMentionsResultsList,
  SearchResultRowHeight
} from "src/components";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  searchResults: {
    flex: 0,
    backgroundColor: daytColors.white
  },
  separator: {
    borderTopWidth: 0,
    height: 0
  },
  searchResultsWrapper: {
    flex: 0
  }
});

class SearchMentionsResults extends Component {
  render() {
    const maxHeight = SearchResultRowHeight * 3;
    return (
      <View style={[styles.searchResultsWrapper, { maxHeight }]}>
        <Separator
          color={daytColors.disabledGrey}
          style={styles.separator}
          key="seperator"
        />
        <View style={styles.searchResults} key="searchResults">
          <SearchMentionsResultsList
            emptyComponentStyle={{ height: maxHeight }}
          />
        </View>
      </View>
    );
  }
}

export default SearchMentionsResults;
