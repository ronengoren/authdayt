import React, { Component } from "react";
import PropTypes from "prop-types";
import { FlatList, View, Text } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { clearSearchAddress } from '/redux/searchAddress/actions';
import {
  EmptySearch,
  Screen,
  ScrollItemErrorBoundary,
  SearchAddressResultRow
} from "src/components";

import { Spinner } from "src/components/basicComponents";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { commonStyles, daytColors } from "src/vars";

class SearchAddress extends Component {
  state = {
    isAddressChosen: false
  };
  render() {
    // const {
    //   searchAddress: { results, isSearching },
    //   navigation
    // } = this.props;
    // const renderHeaderComponent = get(
    //   navigation,
    //   "state.params.renderHeaderComponent",
    //   null
    // );

    return (
      <View style={commonStyles.flex1}>
        <Text>searchAddress</Text>
        <FlatList
          ListEmptyComponent={
            // isSearching && (!results || !results.length) ? (
            // <Spinner color={daytColors.secondaryBlack} />
            // ) : (
            <EmptySearch text={this.getEmptyScreenText()} />
            // )
          }
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          renderItem={this.renderSearchResultItem}
          getItemLayout={(data, index) => ({
            length: SearchAddressResultRow.ITEM_HEIGHT,
            offset: SearchAddressResultRow.ITEM_HEIGHT * index,
            index
          })}
        />
      </View>
    );
  }
  getEmptyScreenText = () => {
    // const { query, isNeighborhoods } = this.props.searchAddress;
    return;
    I18n.t("search_address.search_neighborhood_placeholder");
    I18n.t("search_address.search_address_placeholder");
    I18n.t("search_address.not_found", { query });
    // if (query) {
    //   return I18n.t("search_address.not_found", { query });
    // } else {
    //   return isNeighborhoods
    //     ? I18n.t("search_address.search_neighborhood_placeholder")
    //     : I18n.t("search_address.search_address_placeholder");
    // }
  };
  renderSearchResultItem = ({ item, index }) => (
    <ScrollItemErrorBoundary boundaryName="SearchAddressItem">
      <SearchAddressResultRow
        searchResult={item}
        searchQuery={this.props.searchAddress.query}
        onPress={this.handleSearchResultPress}
        testID={`searchAddressResult-${index}`}
      />
    </ScrollItemErrorBoundary>
  );
}
export default SearchAddress;
