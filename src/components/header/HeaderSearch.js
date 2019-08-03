import React from "react";
import PropTypes from "prop-types";
import { LayoutAnimation } from "react-native";
import { connect } from "react-redux";
import { entityTypes, searchTypes } from "src/vars/enums";
import { search, clearSearch } from "src/redux/search/actions";
import {
  searchAddress,
  clearSearchAddress
} from "src/redux/searchAddress/actions";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import HeaderSearchInput from "./HeaderSearchInput";

class HeaderSearch extends React.Component {
  state = {
    queryField: this.props.searchQuery || null
  };

  render() {
    const { queryField } = this.state;
    const { searchMode } = this.props;

    return (
      <HeaderSearchInput
        ref={node => {
          this.SearchInput = node;
        }}
        value={queryField}
        onPress={searchMode ? null : this.handleOnPress}
        onCancel={this.handleQueryCancelPress}
        searchMode={searchMode}
        onChange={text => this.setState({ queryField: text })}
        onChangeDebounced={this.handleChangeTextDebounced}
        debounceTime={400}
      />
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

  componentDidUpdate(prevProps) {
    if (!prevProps.searchMode && this.props.searchMode) {
      this.SearchInput.focus();
    }
  }

  handleOnPress = () => {
    LayoutAnimation.easeInEaseOut();
    this.props.handleSearchFocus();
  };

  handleChangeTextDebounced = text => {
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
          search({
            query: trimmedText,
            page: 0,
            communityId,
            destinationTagName,
            searchType: searchTypes.GENERAL,
            entityTypeFilter: entityTypes.USER
          });
          const { params = {} } = navigationService.getCurrentRouteName({
            withParams: true
          });
          if (params.withPeopleSearch) {
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
        const searchTypesArray = [searchTypes.GENERAL];
        const { params = {} } = navigationService.getCurrentRouteName({
          withParams: true
        });
        if (params.withPeopleSearch) {
          searchTypesArray.push(searchTypes.PEOPLE);
        }
        clearSearch({ searchTypes: searchTypesArray });
      }
    }
  };

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
