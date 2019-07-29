import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, LayoutAnimation } from "react-native";
import I18n from "src/infra/localization";
import { View, NewTextButton } from "src/components/basicComponents";
import { daytColors, commonStyles } from "src/vars";
import { filterTypes, screenNames, entityTypes } from "src/vars/enums";
import { isNil, isUndefined, cloneDeep } from "src/infra/utils";
import { stylesScheme } from "src/schemas";
import { navigationService } from "src/infra/navigation";
import Filter from "./Filter";
import FiltersRow from "./FiltersRow";

const styles = StyleSheet.create({
  filtersWrapper: {
    backgroundColor: daytColors.white,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 20
  },
  filtersBtn: {
    margin: 15
  },
  filtersBtnIcon: {
    color: daytColors.black
  },
  filtersBtnText: {
    color: daytColors.black
  }
});

const INITIAL_FILTERS_TO_SHOW = 3;

class FiltersExpandable extends React.Component {
  constructor(props) {
    super(props);
    const { initialFilters } = props;
    this.state = {
      filters: initialFilters,
      activeFilter: "",
      showAllFilters: false
    };
  }

  render() {
    const {
      hoodsParams,
      maxPrice,
      entityType,
      postType,
      postSubType,
      style,
      filterDefinitions
    } = this.props;
    const { filters, activeFilter, showAllFilters } = this.state;
    const showAllFiltersButton =
      filterDefinitions.length > INITIAL_FILTERS_TO_SHOW;
    return (
      <View style={[styles.filtersWrapper, commonStyles.shadow, style]}>
        {filterDefinitions
          .slice(
            0,
            showAllFilters
              ? filterDefinitions.length
              : INITIAL_FILTERS_TO_SHOW - 1
          )
          .map(filterName => (
            <FiltersRow
              key={`${filterName}FilterRow`}
              filterName={filterName}
              filters={filters}
              onPress={() => this.onFilterPress(filterName)}
              applyFilter={this.applyFilter}
              clearFilter={this.clearFilter}
              entityType={entityType}
              postType={postType}
            />
          ))}
        {showAllFiltersButton && (
          <NewTextButton
            size={NewTextButton.sizes.SMALL35}
            iconName="sliders-h"
            iconSize={16}
            iconWeight="light"
            customColor={daytColors.paleGreyFour}
            style={styles.filtersBtn}
            iconStyle={styles.filtersBtnIcon}
            textStyle={styles.filtersBtnText}
            onPress={this.toggleShowFilters}
            numberOfLines={null}
          >
            {I18n.t(`filters.toggleBtn.${showAllFilters ? "hide" : "show"}`)}
          </NewTextButton>
        )}
        {!!activeFilter && (
          <Filter
            filter={filters[activeFilter]}
            filterType={activeFilter}
            minAge={filters.minAge}
            maxAge={filters.maxAge}
            maxPrice={maxPrice}
            entityType={entityType}
            postType={postType}
            postSubType={postSubType}
            hoodsFromSearch={filters.hoodsFromSearch}
            applyFilter={this.applyFilter}
            clearFilter={this.clearFilter}
            closeFilter={() => this.setState({ activeFilter: "" })}
            hoodsParams={hoodsParams}
            neighborhoodsIds={filters.neighborhoodsIds}
            hoodNames={filters.hoodNames}
          />
        )}
      </View>
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.filterDefinitions.length !== this.props.filterDefinitions.length
    ) {
      LayoutAnimation.easeInEaseOut();
    }
  }

  onFilterPress = filterName => {
    if (filterName === filterTypes.PEOPLE_SEARCH) {
      navigationService.navigate(screenNames.Search, {
        peopleSearchOnly: true
      });
    } else {
      this.setState({ activeFilter: filterName });
    }
  };

  toggleShowFilters = () => {
    const { showAllFilters } = this.state;
    LayoutAnimation.easeInEaseOut();
    this.setState({ showAllFilters: !showAllFilters });
  };

  applyFilter = filter => {
    const { resetAction, applyAction } = this.props;
    const { filters } = this.state;
    resetAction();
    this.setState(
      { filters: { ...filters, ...filter }, activeFilter: "" },
      () => applyAction(cloneDeep(this.state.filters))
    );
  };

  clearFilter = ({ filterName, chipIndex }) => {
    const { resetAction, applyAction, initialFilters } = this.props;
    const { filters, activeFilter } = this.state;
    resetAction();
    const filter = activeFilter || filterName;
    const newState = { activeFilter: "", filters };
    let emptyValue;
    if (filter === filterTypes.AGE) {
      newState.filters.minAge = null;
      newState.filters.maxAge = null;
    } else if (filter === filterTypes.HOODS) {
      let { hoodsFromSearch, hoodNames, neighborhoodsIds } = filters;
      if (!isNil(chipIndex)) {
        const hoodName = (hoodNames || [])[chipIndex];
        hoodsFromSearch = (hoodsFromSearch || []).filter(
          hoodObj => hoodObj.name !== hoodName
        );
        hoodNames = (hoodNames || []).filter(
          (hoodName, index) => index !== chipIndex
        );
        neighborhoodsIds = (neighborhoodsIds || []).filter(
          (neighborhoodId, index) => index !== chipIndex
        );
      }
      newState.filters.hoodsFromSearch = (hoodsFromSearch || []).length
        ? hoodsFromSearch
        : null;
      newState.filters.hoodNames = (hoodNames || []).length ? hoodNames : null;
      newState.filters.neighborhoodsIds = (neighborhoodsIds || []).length
        ? neighborhoodsIds
        : null;
    } else if (filter === filterTypes.PEOPLE_SEARCH) {
      newState.filters.minCreatedAt = null;
      newState.filters.maxCreatedAt = null;
    } else if (filter === filterTypes.LISTING_TYPE) {
      emptyValue = initialFilters[filterTypes.LISTING_TYPE] || null;
      newState.filters.translatedTag = null;
    } else {
      emptyValue = null;
    }

    if (!isUndefined(emptyValue)) {
      if (isNil(chipIndex)) {
        newState.filters[filter] = emptyValue;
      } else {
        let filteredValues = [];
        if (Array.isArray(filters[filter])) {
          filteredValues = (filters[filter] || []).filter(
            (value, index) => index !== chipIndex
          );
        }
        newState.filters[filter] = filteredValues.length
          ? filteredValues
          : emptyValue;
      }
    }

    this.setState({ ...newState }, () =>
      applyAction(cloneDeep(this.state.filters))
    );
  };
}

FiltersExpandable.defaultProps = {
  entityType: entityTypes.POST,
  initialFilters: {}
};

FiltersExpandable.propTypes = {
  filterDefinitions: PropTypes.array,
  applyAction: PropTypes.func,
  resetAction: PropTypes.func,
  maxPrice: PropTypes.number,
  hoodsParams: PropTypes.shape({
    reducerStatePath: PropTypes.string,
    apiQuery: PropTypes.object
  }),
  entityType: PropTypes.string,
  postType: PropTypes.string,
  postSubType: PropTypes.string,
  style: stylesScheme,
  initialFilters: PropTypes.object
};

export default FiltersExpandable;
