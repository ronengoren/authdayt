import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, FlatList } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import {
  initSearchAddress,
  searchAddress,
  clearSearchAddress
} from "src/redux/searchAddress/actions";
import {
  EmptySearch,
  InfiniteScroll,
  ScrollItemErrorBoundary,
  SearchAddressResultRow
} from "src/components";
import {
  View,
  TextInput,
  QueryCancelIcon,
  Spinner
} from "src/components/basicComponents";
import { commonStyles, daytColors } from "src/vars";
import { get } from "src/infra/utils";
import FilterRow from "./FilterRow";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 60,
    width: "100%",
    paddingVertical: 10,
    backgroundColor: daytColors.white,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  },
  inputContainer: {
    width: "100%",
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: daytColors.transparent,
    backgroundColor: daytColors.veryLightPink
  },
  inputContainerFocused: {
    backgroundColor: daytColors.white,
    borderColor: daytColors.azure
  },
  input: {
    fontSize: 16,
    color: daytColors.b30,
    padding: 0,
    paddingLeft: 10,
    paddingRight: 25
  },
  cancelIcon: {
    position: "absolute",
    top: 23,
    right: 10
  },
  emptySearchState: {
    height: 350
  }
});

class HoodsFilter extends Component {
  state = {
    searchTerm: "",
    isInputFocused: false
  };

  render() {
    const {
      hoodsIds,
      hoodsFromSearch,
      reducerStatePath,
      apiQuery
    } = this.props;
    const { searchTerm, isInputFocused } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <TextInput
            onChange={val => this.setState({ searchTerm: val })}
            onChangeDebounced={this.handleQueryChange}
            debounceTime={100}
            containerStyle={[
              styles.inputContainer,
              isInputFocused && styles.inputContainerFocused
            ]}
            autoCapitalize="none"
            value={searchTerm}
            placeholder={I18n.t("filters.neighborhoodsIds.search")}
            placeholderTextColor={daytColors.b60}
            inputStyle={styles.input}
            height={38}
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
          />
          {!!searchTerm && (
            <QueryCancelIcon
              onPress={this.clearSearch}
              iconColor={daytColors.b70}
              style={styles.cancelIcon}
            />
          )}
        </View>
        {searchTerm ? (
          this.renderSearchMode()
        ) : (
          <InfiniteScroll
            ListHeaderComponent={this.renderHeader()}
            reducerStatePath={reducerStatePath}
            apiQuery={apiQuery}
            ListItemComponent={FilterRow}
            listItemProps={{
              action: this.handleHoodPress,
              selectedItems: hoodsIds,
              index: 1,
              ignoredItems: hoodsFromSearch.map(i => i.id)
            }}
          />
        )}
      </View>
    );
  }

  componentDidMount() {
    this.props.initSearchAddress({ isNeighborhoods: true });
  }

  renderHeader = () => {
    const { hoodsIds, hoodsFromSearch } = this.props;
    return (
      <View>
        {hoodsFromSearch.map((hoodFromSearch, index) => (
          <FilterRow
            key={hoodFromSearch.id}
            index={index}
            action={() =>
              this.handleNeighborhoodPressOnSearch({
                id: hoodFromSearch.id,
                value: hoodFromSearch.name
              })
            }
            text={hoodFromSearch.value}
            isActive={
              hoodsIds.findIndex(hood => hood === hoodFromSearch.id) > -1
            }
          />
        ))}
      </View>
    );
  };

  renderSearchMode() {
    const {
      searchAddressData: { results }
    } = this.props;
    return (
      <View style={commonStyles.flex1}>
        <FlatList
          contentContainerStyle={!results.length && commonStyles.flex1}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          data={results}
          renderItem={this.renderSearchResultItem}
          ListEmptyComponent={this.renderEmptySearchMode()}
          getItemLayout={(data, index) => ({
            length: SearchAddressResultRow.ITEM_HEIGHT,
            offset: SearchAddressResultRow.ITEM_HEIGHT * index,
            index
          })}
        />
      </View>
    );
  }

  renderSearchResultItem = ({ item, index }) => {
    const { hoodsIds } = this.props;
    return (
      <ScrollItemErrorBoundary boundaryName="SearchAddressItem">
        <FilterRow
          key={item.id}
          index={index}
          action={() =>
            this.handleNeighborhoodPressOnSearch({
              id: item.id,
              value: item.name
            })
          }
          text={item.name}
          isActive={hoodsIds.findIndex(hood => hood === item.id) > -1}
        />
      </ScrollItemErrorBoundary>
    );
  };

  renderEmptySearchMode = () => {
    const {
      searchAddressData: { results, isSearching }
    } = this.props;
    return (
      <View style={styles.emptySearchState}>
        {isSearching && (!results || !results.length) ? (
          <Spinner color={daytColors.secondaryBlack} />
        ) : (
          <EmptySearch text={this.getEmptyScreenText()} />
        )}
      </View>
    );
  };

  handleInputFocus = () => {
    const { isInputFocused } = this.state;
    !isInputFocused && this.setState({ isInputFocused: true });
  };

  handleInputBlur = () => {
    const { isInputFocused } = this.state;
    isInputFocused && this.setState({ isInputFocused: false });
  };

  handleQueryChange = searchQuery => {
    const {
      searchAddressData: {
        isNeighborhoods,
        country,
        types,
        prefix,
        coordinates,
        query
      },
      searchAddress,
      clearSearchAddress,
      destinationTagName
    } = this.props;
    if (searchQuery) {
      const trimmedSearchQuery = searchQuery.trim();
      if (trimmedSearchQuery !== query) {
        searchAddress({
          query: trimmedSearchQuery,
          isNeighborhoods,
          country,
          types,
          prefix,
          coordinates,
          destinationTagName
        });
      } else if (!trimmedSearchQuery) {
        clearSearchAddress();
      }
    }
  };

  clearSearch = () => {
    const { clearSearchAddress } = this.props;
    clearSearchAddress();
    this.setState({ searchTerm: "" });
  };

  handleSearchResultPress = async searchResult => {
    const {
      clearSearchAddress,
      searchAddressData: { isNeighborhoods }
    } = this.props;
    this.handleInputBlur();
    clearSearchAddress();
    this.handleNeighborhoodPressOnSearch({
      value: isNeighborhoods ? searchResult.name : searchResult.description,
      id: searchResult.id
    });
  };

  getEmptyScreenText = () => {
    const {
      searchAddress: { query, isNeighborhoods }
    } = this.props;
    if (query) {
      return I18n.t("search_address.not_found", { query });
    } else {
      return isNeighborhoods
        ? I18n.t("search_address.search_neighborhood_placeholder")
        : I18n.t("search_address.search_address_placeholder");
    }
  };

  handleNeighborhoodPressOnSearch = ({ value, id }) => {
    const { hoodsFromSearch, updateHoodsFromSearch } = this.props;
    const hoodIndex = hoodsFromSearch.findIndex(hood => hood.id === id);
    if (hoodIndex === -1) {
      const newHoodsFromSearch = [{ id, value }, ...hoodsFromSearch];
      updateHoodsFromSearch({ hoodsFromSearch: newHoodsFromSearch });
    }
    this.handleHoodPress({ id, name: value });
  };

  handleHoodPress = ({ id, name }) => {
    const { onHoodsChanged, hoodsIds, hoodNames } = this.props;
    const hoodIndexInList = hoodsIds.findIndex(hoodId => hoodId === id);
    const newHoodsList =
      hoodIndexInList > -1
        ? [
            ...hoodsIds.slice(0, hoodIndexInList),
            ...hoodsIds.slice(hoodIndexInList + 1)
          ]
        : [...hoodsIds, id];
    const newHoodNames =
      hoodIndexInList > -1
        ? [
            ...hoodNames.slice(0, hoodIndexInList),
            ...hoodNames.slice(hoodIndexInList + 1)
          ]
        : [...hoodNames, name];
    onHoodsChanged({ hoodsIds: newHoodsList, hoodNames: newHoodNames });
  };
}

HoodsFilter.propTypes = {
  onHoodsChanged: PropTypes.func.isRequired,
  updateHoodsFromSearch: PropTypes.func.isRequired,
  hoodsIds: PropTypes.arrayOf(PropTypes.string),
  hoodNames: PropTypes.arrayOf(PropTypes.string),
  hoodsFromSearch: PropTypes.arrayOf(PropTypes.object),
  initSearchAddress: PropTypes.func,
  searchAddress: PropTypes.func,
  reducerStatePath: PropTypes.string,
  apiQuery: PropTypes.shape({
    domain: PropTypes.string,
    key: PropTypes.string,
    params: PropTypes.object
  }),
  clearSearchAddress: PropTypes.func,
  searchAddressData: PropTypes.shape({
    isNeighborhoods: PropTypes.bool,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
    isSearching: PropTypes.bool
  }),
  destinationTagName: PropTypes.string
};

const mapStateToProps = state => ({
  searchAddressData: state.searchAddress,
  destinationTagName: get(state, "auth.user.community.destinationTagName")
});

const mapDispatchToProps = {
  initSearchAddress,
  searchAddress,
  clearSearchAddress
};

HoodsFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoodsFilter);
export default HoodsFilter;
