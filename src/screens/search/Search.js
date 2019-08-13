import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Platform,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import {
  search as querySearch,
  initSearchInStack,
  removeSearchFromStack,
  addSearchTerm,
  getSearchTerms
} from "src/redux/search/actions";
import {
  Screen,
  EmptySearch,
  SearchResultsList,
  OptionsSelector,
  SearchResultRow,
  ScrollItemErrorBoundary
} from "src/components";
import {
  EntitySearchResultRow,
  PeopleSearchResultRow
} from "src/components/search";
import {
  Spinner,
  KeyboardAvoidingView,
  View,
  Text
} from "src/components/basicComponents";
import { commonStyles, daytColors, daytFontWeights } from "src/vars";
import {
  entityTypes,
  searchTypes,
  screenNames,
  screenNamesByEntityType,
  mediaTypes,
  groupType as groupTypes,
  originTypes
} from "src/vars/enums";
// import { analytics } from "/infra/reporting";
import { get } from "src/infra/utils";
import { addSpaceOnCapitalsAndCapitalize } from "src/infra/utils/stringUtils";
import { navigationService } from "src/infra/navigation";
import { UserEntityComponent } from "src/components/entity";
import SearchTermRow from "./SearchTermRow";

const styles = StyleSheet.create({
  popular: {
    height: 100 + "%",
    width: 100 + "%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  header: {
    // margin: 15,
    // marginBottom: 12
  },
  options: {
    // marginTop: 59 + "%",

    width: 100 + "%",
    height: 100 + "%"

    // marginLeft: 15,
    // marginRight: 7,
    // backgroundColor: daytColors.transparent
  },
  optionStyle: {
    // borderRadius: 18,
    // marginRight: 8,
    margin: 18,
    // backgroundColor: daytColors.azure,
    borderWidth: 0,
    marginBottom: 50
  },
  optionTextStyle: {
    fontSize: 53,
    fontWeight: "900",
    color: "#5eadbb",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
  },
  recent: {
    flex: 1
  },
  recentHeader: {
    marginBottom: 5
  },
  resultsHeader: {
    marginBottom: 0
  },
  peopleSearchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  }
});

class Search extends Component {
  render = () => {
    const { search, peopleSearch, isPeopleSearchOnly } = this.props;
    const hasResults = get(
      isPeopleSearchOnly ? peopleSearch : search,
      "results"
    );
    return (
      <KeyboardAvoidingView
        style={commonStyles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        {/* {this.renderSearchSuggestions()} */}
      </KeyboardAvoidingView>
    );
  };

  //   componentDidMount() {
  //     const { initSearchInStack, getSearchTerms } = this.props;
  //     initSearchInStack({ searchTypes: this.getSearchTypes() });
  //     getSearchTerms(this.props.userId);
  //   }

  //   componentWillUnmount() {
  //     const { removeSearchFromStack } = this.props;
  //     removeSearchFromStack({ searchTypes: this.getSearchTypes() });
  //   }

  getSearchTypes = () => {
    const { isWithPeopleSearch, isPeopleSearchOnly } = this.props;
    const searchTypesArray = [];
    if (!isPeopleSearchOnly) {
      searchTypesArray.push(searchTypes.GENERAL);
    }
    if (isWithPeopleSearch || isPeopleSearchOnly) {
      searchTypesArray.push(searchTypes.PEOPLE);
    }
    return searchTypesArray;
  };

  handleOptionSelected = index => {
    this.handleSearchTermPress(
      addSpaceOnCapitalsAndCapitalize(popularTags[index])
    );
  };

  handleSearchTermPress = searchTerm => {
    const {
      querySearch,
      communityId,
      destinationTagName,
      isWithPeopleSearch,
      isPeopleSearchOnly
    } = this.props;
    if (!isPeopleSearchOnly) {
      querySearch({
        query: searchTerm,
        page: 0,
        communityId,
        destinationTagName,
        searchType: searchTypes.GENERAL,
        entityTypeFilter: entityTypes.USER
      });
    }
    if (isWithPeopleSearch || isPeopleSearchOnly) {
      querySearch({
        query: searchTerm,
        page: 0,
        communityId,
        destinationTagName,
        searchType: searchTypes.PEOPLE,
        singleEntityType: entityTypes.USER
      });
    }
  };

  handleSearchResultPress = searchResult => {
    const { search, userId, addSearchTerm, searchTerms } = this.props;
    const { query, resultsHits } = search;
    const {
      entityType,
      objectID,
      thumbnail,
      name,
      themeColor,
      groupType,
      subTags,
      _highlightResult,
      _geoloc
    } = searchResult;

    addSearchTerm(userId, searchTerms, name);

    // analytics.actionEvents
    //   .search({
    //     keyword: query,
    //     numberOfResults: resultsHits,
    //     chosenEntityType: entityType,
    //     chosenEntityName: name,
    //     chosenEntityId: objectID
    //   })
    //   .dispatch();

    Keyboard.dismiss();

    if (entityType === entityTypes.NEIGHBORHOOD) {
      const params = {
        neighborhood: {
          id: objectID,
          name,
          location: [_geoloc.lng, _geoloc.lat],
          media: {
            type: mediaTypes.IMAGE,
            thumbnail
          }
        }
      };
      navigationService.navigate(screenNames.MyNeighborhoodView, params);
    } else if (groupType === groupTypes.TOPIC) {
      let matchedSubTag;
      if (_highlightResult && _highlightResult.subTags) {
        const matchedSubTagIndex = _highlightResult.subTags.findIndex(
          subTag => subTag.matchedWords.length
        );
        if (matchedSubTagIndex > -1) {
          matchedSubTag = subTags[matchedSubTagIndex];
        }
      }
      navigationService.navigate(screenNames.GroupView, {
        entityId: objectID,
        groupType: groupTypes.TOPIC,
        originType: originTypes.HOME_TAB,
        subTag: matchedSubTag
      });
    } else {
      navigationService.navigate(screenNamesByEntityType[entityType], {
        entityId: objectID,
        data: {
          thumbnail,
          name,
          themeColor
        },
        groupType
      });
    }
  };

  renderSearchResults = () => {
    const {
      isWithPeopleSearch,
      isPeopleSearchOnly,
      peopleSearch,
      querySearch,
      communityId,
      destinationTagName,
      search
    } = this.props;
    if (isPeopleSearchOnly) {
      return this.renderPeopleResults();
    }

    const { results, query, resultsNumberPages, isSearching } = search;
    const topicResults = results.filter(result => result.groupType === "1");
    const nonTopicResults = topicResults.length
      ? results.filter(result => result.groupType !== "1")
      : results;

    return (
      <SearchResultsList
        results={nonTopicResults}
        resultsNumberPages={resultsNumberPages}
        query={query}
        querySearch={(query, page) => {
          querySearch({
            query,
            page,
            communityId,
            destinationTagName,
            searchType: searchTypes.GENERAL,
            entityTypeFilter: entityTypes.USER
          });
        }}
        onSearchResultPress={this.handleSearchResultPress}
        isSearching={isSearching}
        shouldShowEmptyState={!results.length}
        listHeaderComponent={this.renderSearchResultsHeader({
          topicResults,
          nonTopicResults,
          isWithPeopleSearch,
          peopleSearch
        })}
        shouldShowRowSeparator={false}
        emptyComponentStyle={commonStyles.flex1}
        isFlexWhenEmpty={!results.length}
        customResultComponent={this.renderSearchResultRow()}
      />
    );
  };

  renderPeopleResults = () => {
    const {
      querySearch,
      communityId,
      destinationTagName,
      peopleSearch,
      isPeopleSearchOnly
    } = this.props;
    const { results, query, resultsNumberPages, isSearching } = peopleSearch;

    return (
      <View
        style={[
          !isPeopleSearchOnly && styles.peopleSearchContainer,
          isPeopleSearchOnly && commonStyles.flex1
        ]}
      >
        <SearchResultsList
          isHorizontal={!isPeopleSearchOnly}
          results={results}
          resultsNumberPages={resultsNumberPages}
          query={query}
          querySearch={(query, page) => {
            querySearch({
              query,
              page,
              communityId,
              destinationTagName,
              searchType: searchTypes.PEOPLE,
              singleEntityType: entityTypes.USER
            });
          }}
          onSearchResultPress={this.handleSearchResultPress}
          isSearching={isSearching}
          shouldShowEmptyState={isPeopleSearchOnly && !results.length}
          emptyComponentStyle={commonStyles.flex1}
          isFlexWhenEmpty={isPeopleSearchOnly && !results.length}
          customResultComponent={this.renderPeopleResultComponent()}
        />
      </View>
    );
  };

  renderSearchResultsHeader = ({
    topicResults,
    nonTopicResults,
    isWithPeopleSearch,
    peopleSearch
  }) => {
    const hasTopicResults = !!topicResults.length;
    const hasPeopleResults =
      isWithPeopleSearch &&
      peopleSearch &&
      peopleSearch.results &&
      !!peopleSearch.results.length;
    const isSearchingPeople =
      isWithPeopleSearch && peopleSearch && peopleSearch.isSearching;
    const hasResults = !!nonTopicResults.length;
    return (
      <View>
        {hasPeopleResults && this.renderPeopleResults()}
        {!hasPeopleResults &&
          isSearchingPeople &&
          this.renderPeoplePlaceholders()}
        {hasTopicResults && this.renderTopicResults(topicResults)}
        {hasResults &&
          this.renderSectionHeader({
            translatePath: "results_searches",
            style: styles.resultsHeader
          })}
      </View>
    );
  };

  renderPeopleResultComponent = () => ({ searchResult }) => {
    const { isPeopleSearchOnly } = this.props;
    const {
      objectID,
      name,
      thumbnail,
      themeColor,
      communityId,
      location
    } = searchResult;

    return (
      <ScrollItemErrorBoundary boundaryName="PeopleSearchItem">
        {isPeopleSearchOnly ? (
          <UserEntityComponent
            data={{
              id: objectID,
              name,
              media: {
                thumbnail
              },
              themeColor,
              communityId,
              journey: { currentlyLiveIn: location }
            }}
            showAction={false}
          />
        ) : (
          <PeopleSearchResultRow searchResult={searchResult} />
        )}
      </ScrollItemErrorBoundary>
    );
  };

  renderPeoplePlaceholders = () => (
    <ScrollItemErrorBoundary boundaryName="PeopleSearchItem">
      <PeopleSearchResultRow dummy />
    </ScrollItemErrorBoundary>
  );

  renderSearchResultRow = () => ({
    searchResult,
    searchQuery,
    onPress,
    shouldShowSeparator
  }) => (
    <ScrollItemErrorBoundary boundaryName="SearchItem">
      <EntitySearchResultRow
        searchResult={searchResult}
        searchQuery={searchQuery}
        onPress={onPress}
        shouldShowSeparator={shouldShowSeparator}
      />
    </ScrollItemErrorBoundary>
  );

  renderTopicResults(topicResults) {
    const { query } = this.props.search;
    return (
      <View>
        {this.renderSectionHeader({
          translatePath: "results_topics",
          style: styles.resultsHeader
        })}
        {topicResults.map((topicResult, idx) => (
          <SearchResultRow
            key={`topicResult-${idx}`} // eslint-disable-line react/no-array-index-key
            searchResult={topicResult}
            searchQuery={query}
            onPress={this.handleSearchResultPress}
            shouldShowSeparator={false}
          />
        ))}
      </View>
    );
  }

  renderSearchSuggestions = () => {
    const { popularTags, searchTerms, isPeopleSearchOnly } = this.props;
    return (
      <ScrollView
        style={commonStyles.flex1}
        contentContainerStyle={
          (!searchTerms || (searchTerms && !searchTerms.length)) &&
          commonStyles.flex1
        }
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      >
        {!isPeopleSearchOnly && (
          <React.Fragment>
            {/* !!popularTags && !!popularTags.length &&  */}
            {this.renderPopularTags()}
            {/* {this.renderSearchTerms()} */}
          </React.Fragment>
        )}
      </ScrollView>
    );
  };

  renderSectionHeader = ({ translatePath, style }) => (
    <Text
      size={14}
      lineHeight={16}
      color={daytColors.b59}
      style={[styles.header, style]}
    >
      {I18n.t(`search.${translatePath}`)}
    </Text>
  );

  renderPopularTags = () => {
    // console.log(popularTags);
    const popularTags = [
      "Now",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const translatedPopularTags = popularTags.map(tag =>
      I18n.t(`shared.tags.${tag}`, {
        defaultValue: addSpaceOnCapitalsAndCapitalize(tag)
      })
    );

    return (
      <View style={styles.popular}>
        {/* {this.renderSectionHeader({ translatePath: "suggestions_popular" })} */}
        <OptionsSelector
          optionsList={translatedPopularTags}
          optionStyle={styles.optionStyle}
          style={styles.options}
          textStyle={styles.optionTextStyle}
          selectOption={this.handleOptionSelected}
          infiniteScroll={false}
        />
      </View>
    );
  };

  renderSearchTerms = () => {
    const { searchTerms, popularTags } = this.props;
    let content = (
      <Spinner center color={daytColors.secondaryBlack} size="large" />
    );

    if (searchTerms) {
      if (searchTerms.length) {
        content = searchTerms.map(searchTerm => (
          <SearchTermRow
            key={searchTerm}
            searchTerm={searchTerm}
            onPress={this.handleSearchTermPress}
          />
        ));
      } else if (popularTags && popularTags.length) {
        return null;
      } else {
        content = <EmptySearch text={I18n.t("search.empty_state")} />;
      }
    }

    return (
      <View style={styles.recent}>
        {/* {this.renderSectionHeader({
          translatePath: "suggestions_recent",
          style: styles.recentHeader
        })} */}
        {content}
      </View>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  isWithPeopleSearch: get(
    ownProps.navigation,
    "state.params.withPeopleSearch",
    false
  ),
  isPeopleSearchOnly: get(
    ownProps.navigation,
    "state.params.peopleSearchOnly",
    false
  ),
  search: get(state, `search.searchStack.${searchTypes.GENERAL}`),
  peopleSearch: get(state, `search.searchStack.${searchTypes.PEOPLE}`),
  searchTerms: state.search.searchTerms,
  communityId: get(state, "auth.user.community.id", ""),
  popularTags: get(state, "auth.user.community.popularTags", ""),
  destinationTagName: get(state, "auth.user.community.destinationTagName"),
  userId: state.auth.user.id
});

const mapDispatchToProps = {
  querySearch,
  initSearchInStack,
  removeSearchFromStack,
  getSearchTerms,
  addSearchTerm
};

Search.propTypes = {
  isWithPeopleSearch: PropTypes.bool,
  isPeopleSearchOnly: PropTypes.bool,
  peopleSearch: PropTypes.shape({
    page: PropTypes.number,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
    resultsNumberPages: PropTypes.number,
    isSearching: PropTypes.bool
  }),
  search: PropTypes.shape({
    page: PropTypes.number,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
    resultsNumberPages: PropTypes.number,
    isSearching: PropTypes.bool
  }),
  querySearch: PropTypes.func,
  communityId: PropTypes.string,
  destinationTagName: PropTypes.string,
  initSearchInStack: PropTypes.func,
  removeSearchFromStack: PropTypes.func,
  getSearchTerms: PropTypes.func,
  addSearchTerm: PropTypes.func,
  searchTerms: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  popularTags: PropTypes.arrayOf(PropTypes.string)
};

// Search = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Search);
// Search = Screen()(Search);

export default Search;
