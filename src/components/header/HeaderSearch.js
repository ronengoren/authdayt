import React from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";

import { LayoutAnimation, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { entityTypes, searchTypes, screenNames } from "src/vars/enums";
import { search, clearSearch } from "src/redux/search/actions";
import {
  searchAddress,
  clearSearchAddress
} from "src/redux/searchAddress/actions";
import {
  View,
  Text,
  IconButton,
  PostButton
} from "src/components/basicComponents";

import { debounce, get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import HeaderSearchInput from "./HeaderSearchInput";
import { daytColors, commonStyles, uiConstants } from "src/vars";
import { AwesomeIcon } from "src/assets/icons";

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    marginHorizontal: 15,
    marginBottom: 25,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: daytColors.white
  },
  searchBoxIcon: {
    marginRight: 10
  },
  searchBoxText: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    fontWeight: "900"
  }
});

class HeaderSearch extends React.Component {
  state = {
    queryField: this.props.searchQuery || null
  };

  render() {
    const { queryField } = this.state;
    const { searchMode } = this.props;

    return (
      // <PostButton
      //   text={I18n.t("home.post_button_text")}
      //   onPress={this.handleOnPress}
      //   testID="postButton"
      // />,
      <TouchableOpacity
        onPress={this.navigateToSearch}
        activeOpacity={0.5}
        style={[
          styles.searchBox,
          commonStyles.shadow
          // isRtlDesign && styles.searchBoxRTL
        ]}
      >
        {/* <AwesomeIcon
          name="search"
          size={20}
          color={daytColors.b60}
          style={styles.searchBoxIcon}
          weight="solid"
        /> */}
        <Text
          size={36}
          lineHeight={39}
          color={daytColors.b60}
          numberOfLines={1}
          style={styles.searchBoxText}
        >
          {I18n.t("home.search_placeholder")}
        </Text>
      </TouchableOpacity>
    );
  }

  static getDerivedStateFromProps(props, state) {
    const { searchQuery } = props;
    // If the user clicked on the search term from the search screen
    if (
      state.searchQueryProp !== props.searchQuery &&
      searchQuery &&
      searchQuery.length
    ) {
      return { queryField: searchQuery, searchQueryProp: searchQuery };
    }
    return null;
  }
  navigateToSearch = () => {
    // alert("headersearch");
    navigationService.navigate(screenNames.Search, {
      withPeopleSearch: false
    });
  };
  handleSearchFocus = () => {
    const { searchMode } = this.props;
    if (!searchMode) {
      navigationService.navigate(screenNames.Search, {
        withPeopleSearch: false
      });
    }
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.searchMode && this.props.searchMode) {
      this.SearchInput.focus();
    }
  }
  navigateToPostCreationPage = () => {
    // alert("headersearch");
    const params = { mode: editModes.CREATE, onCreated: this.scrollToFeedTop };
    navigationService.navigate(screenNames.PostEditor, params);
  };
  scrollToFeedTop = () => {
    this.feedRef &&
      this.feedRef.getWrappedInstance().scrollToIndex({ index: 0 });
  };

  handleOnPress = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.handleSearchFocus();
  };

  onChangeSearchQuery = text => {
    const { searchMode, searchAddressMode, searchQuery } = this.props;
    this.setState({ queryField: text });
    this.handleSearchRequestDebounced(text);

    if (!searchAddressMode && searchMode && text && text.length) {
      const trimmedText = text.trim();
      if (trimmedText !== searchQuery) {
        this.trackSearch(text);
      }
    }
  };

  trackSearch = debounce(text => {
    const { params = {} } = navigationService.getCurrentRouteName({
      withParams: true
    });
    const { peopleSearchOnly } = params;
    analytics.actionEvents
      .searchRequest({
        keyword: text,
        searchType: peopleSearchOnly ? searchTypes.PEOPLE : searchTypes.GENERAL
      })
      .dispatch();
  }, 2000);

  handleSearchRequestDebounced = debounce(text => {
    const {
      searchMode,
      searchAddressMode,
      searchAddressData,
      searchQuery,
      communityId,
      search,
      searchAddress,
      clearSearch,
      clearSearchAddress,
      destinationTagName
    } = this.props;

    if (searchAddressMode) {
      if (text && text.length) {
        const trimmedText = text.trim();
        const {
          isNeighborhoods,
          country,
          types,
          prefix,
          coordinates
        } = searchAddressData;

        if (trimmedText !== searchAddressData.query) {
          searchAddress({
            query: trimmedText,
            isNeighborhoods,
            country,
            types,
            prefix,
            coordinates,
            destinationTagName
          });
        }
      } else {
        clearSearchAddress();
      }
    } else if (searchMode) {
      if (text && text.length) {
        const trimmedText = text.trim();
        if (trimmedText !== searchQuery) {
          const { params = {} } = navigationService.getCurrentRouteName({
            withParams: true
          });
          const { withPeopleSearch, peopleSearchOnly } = params;

          if (!peopleSearchOnly) {
            search({
              query: trimmedText,
              page: 0,
              communityId,
              destinationTagName,
              searchType: searchTypes.GENERAL,
              entityTypeFilter: entityTypes.USER
            });
          }
          if (withPeopleSearch || peopleSearchOnly) {
            search({
              query: trimmedText,
              page: 0,
              communityId,
              destinationTagName,
              searchType: searchTypes.PEOPLE,
              singleEntityType: entityTypes.USER
            });
          }
        }
      } else {
        const { params = {} } = navigationService.getCurrentRouteName({
          withParams: true
        });
        const { withPeopleSearch, peopleSearchOnly } = params;
        const searchTypesArray = [];
        if (!peopleSearchOnly) {
          searchTypesArray.push(searchTypes.GENERAL);
        }
        if (withPeopleSearch || peopleSearchOnly) {
          searchTypesArray.push(searchTypes.PEOPLE);
        }
        clearSearch({ searchTypes: searchTypesArray });
      }
    }
  }, 400);

  handleQueryCancelPress = () => {
    const { searchAddress, clearSearchAddress, clearSearch } = this.props;
    this.setState({ queryField: null });
    if (searchAddress) {
      clearSearchAddress();
    } else {
      const searchTypesArray = [searchTypes.GENERAL];
      const { params = {} } = navigationService.getCurrentRouteName({
        withParams: true
      });
      if (params.withPeopleSearch) {
        searchTypesArray.push(searchTypes.PEOPLE);
      }
      clearSearch({ searchTypes: searchTypesArray });
    }
  };
}

HeaderSearch.propTypes = {
  handleSearchFocus: PropTypes.func,
  searchMode: PropTypes.bool,
  searchAddressMode: PropTypes.bool,
  search: PropTypes.func,
  searchAddress: PropTypes.func,
  clearSearch: PropTypes.func,
  clearSearchAddress: PropTypes.func,
  communityId: PropTypes.string,
  searchQuery: PropTypes.string,
  searchAddressData: PropTypes.shape({
    types: PropTypes.string,
    prefix: PropTypes.string,
    country: PropTypes.string,
    coordinates: PropTypes.array,
    query: PropTypes.string,
    results: PropTypes.array
  }),
  destinationTagName: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
  destinationTagName: get(state, "auth.user.community.destinationTagName"),
  communityId: get(state, "auth.user.community.id"),
  searchAddressData: state.searchAddress,
  searchQuery:
    ownProps.searchMode &&
    !ownProps.searchAddressMode &&
    state.search.searchStack.length
      ? state.search.searchStack[state.search.searchStack.length - 1].query
      : ""
});

const mapDispatchToProps = {
  search,
  searchAddress,
  clearSearch,
  clearSearchAddress
};

// HeaderSearch = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(HeaderSearch);
export default HeaderSearch;
