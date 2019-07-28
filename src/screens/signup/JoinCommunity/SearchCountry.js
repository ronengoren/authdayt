import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity
} from "react-native";
import I18n from "src/infra/localization";
import {
  EmptySearch,
  Screen,
  ScrollItemErrorBoundary,
  HeaderSearchInput,
  SearchAddressResultRow
} from "src/components";
import { Text, Image } from "src/components/basicComponents";
import images from "src/assets/images";
import { uiConstants, daytColors, commonStyles } from "src/vars";
import { navigationService } from "src/infra/navigation";
import countries from "./countries";

const SUGGESTED_COUNTRIES = [
  { name: "France", "alpha-2": "FR", "country-code": "250" },
  { name: "India", "alpha-2": "IN", "country-code": "356" },
  { name: "Israel", "alpha-2": "IL", "country-code": "376" },
  { name: "Belgium", "alpha-2": "BE", "country-code": "056" }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.white
  },
  header: {
    alignItems: "center",
    backgroundColor: daytColors.white,
    height: uiConstants.NAVBAR_HEIGHT,
    width: "100%",
    paddingTop: uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  },
  cancelButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left"
  },
  suggestedCountriesTitle: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 13
  },
  suggestedCountriesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 18,
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  },
  suggestedCountry: {
    width: 70,
    alignItems: "center"
  },
  flagWrapper: {
    marginBottom: 10
  },
  flag: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
class SearchCountry extends Component {
  state = {
    query: ""
  };
  render() {
    const { query } = this.state;
    const filteredCountries =
      query && query.length
        ? countries.filter(country =>
            country.name.toLowerCase().includes(query.toLowerCase())
          )
        : countries;

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <View style={[styles.header, commonStyles.tinyShadow]}>
          <HeaderSearchInput
            value={query}
            onChange={text => this.setState({ query: text })}
            onCancel={() => this.setState({ query: "" })}
            searchMode
            testID="searchCountryInput"
          />
          <Text
            size={16}
            lineHeight={30}
            color={daytColors.azure}
            onPress={this.handleCancelPress}
            style={styles.cancelButton}
          >
            {I18n.t("header.cancel_button")}
          </Text>
        </View>
        {this.renderSuggestedCountries()}
        <FlatList
          contentContainerStyle={
            !filteredCountries.length && commonStyles.flex1
          }
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          data={filteredCountries}
          renderItem={this.renderSearchResultItem}
          keyExtractor={i => i["alpha-2"]}
          ListEmptyComponent={
            <EmptySearch
              text={I18n.t("onboarding.search_country.no_country", {
                searchTerm: query
              })}
            />
          }
          getItemLayout={(data, index) => ({
            length: SearchAddressResultRow.ITEM_HEIGHT,
            offset: SearchAddressResultRow.ITEM_HEIGHT * index,
            index
          })}
        />
      </View>
    );
  }
  renderSuggestedCountries = () => [
    <Text
      bold
      size={16}
      lineHeight={19}
      color={daytColors.b30}
      style={styles.suggestedCountriesTitle}
      key="title"
    >
      {I18n.t("onboarding.search_country.suggested_title")}
    </Text>,
    <View style={styles.suggestedCountriesWrapper} key="countries">
      {SUGGESTED_COUNTRIES.map(this.renderSuggestedCountry)}
    </View>
  ];
  renderSuggestedCountry = country => {
    const countryName = country.name.toLowerCase();
    return (
      <TouchableOpacity
        style={styles.suggestedCountry}
        key={countryName}
        onPress={() => this.handleCountryChosen(country)}
      >
        <View style={[styles.flagWrapper, styles.flag, commonStyles.shadow]}>
          <Image
            source={images.onboarding[`${countryName}_flag`]}
            style={styles.flag}
          />
        </View>
        <Text
          size={16}
          lineHeight={19}
          color={daytColors.b30}
          style={commonStyles.textAlignCenter}
        >
          {I18n.t(
            `onboarding.search_country.suggested_countries.${countryName}`
          )}
        </Text>
      </TouchableOpacity>
    );
  };
  renderSearchResultItem = ({ item, index }) => (
    <ScrollItemErrorBoundary boundaryName="SearchCountryItem">
      <SearchAddressResultRow
        searchResult={{ description: item.name }}
        searchQuery={this.state.query || ""}
        onPress={() => this.handleCountryChosen(item)}
        testID={`searchCountryItem-${index}`}
      />
    </ScrollItemErrorBoundary>
  );
}

export default SearchCountry;
