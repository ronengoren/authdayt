import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  FlatList
} from "react-native";
import I18n from "src/infra/localization";
import {
  View,
  Text,
  IconButton,
  Chip,
  Image,
  NewTextButton
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import {
  filterTypes,
  filtersUiDefinitions,
  postSubTypes
} from "src/vars/enums";
import { get } from "src/infra/utils";
import { getDayAndMonth } from "src/infra/utils/dateTimeUtils";
import images from "src/assets/images";
import AgeFilter from "./AgeFilter";

const CHIP_SIZE = 35;

const styles = StyleSheet.create({
  filterRowWrapper: {
    height: 65,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.veryLightPink
  },
  iconWrapper: {
    width: 24
  },
  upperIcon: {
    position: "absolute"
  },
  filterName: {
    marginLeft: 10
  },
  flatListWrapper: {
    flex: 1,
    display: "flex",
    height: CHIP_SIZE,
    paddingLeft: 15
  },
  flatList: {
    marginRight: -10
  },
  flatListLeftGradient: {
    position: "absolute",
    left: 10,
    top: 0
  },
  chip: {
    backgroundColor: daytColors.paleGreyFour,
    borderWidth: 0,
    borderRadius: 10,
    height: CHIP_SIZE
  },
  chipText: {
    color: daytColors.azure,
    lineHeight: CHIP_SIZE
  },
  clearIcon: {
    marginRight: -10
  },
  placeholderWrapper: {
    flex: 1,
    alignItems: "flex-end"
  },
  toggleBtnsWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  toggleBtn: {
    width: 100,
    height: CHIP_SIZE,
    borderRadius: 10,
    flex: 0,
    borderColor: daytColors.paleGreyFour
  },
  toggleBtnText: {
    color: daytColors.b70,
    fontSize: 14
  },
  activeToggleBtn: {
    backgroundColor: daytColors.paleGreyFour,
    color: daytColors.azure
  },
  firstToggleBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  lastToggleBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
});

class FiltersRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gradientOpacity: 1
    };
  }

  render() {
    const { filterName, onPress } = this.props;
    let values = this.getFilterValue({ filterName }) || [];
    values = Array.isArray(values) ? values : [values];
    const isPostSubTypeFilter = filterName === filterTypes.POST_SUB_TYPE;

    if (isPostSubTypeFilter) {
      return (
        <View key={filterName} style={styles.filterRowWrapper}>
          {this.renderIconAndHeader()}
          {this.renderToggleBtns({ values, filterName })}
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={filterName}
        style={styles.filterRowWrapper}
        onPress={onPress}
      >
        {this.renderIconAndHeader()}
        {this.renderFilterValues({ values, filterName })}
      </TouchableOpacity>
    );
  }

  renderIconAndHeader = () => {
    const { filterName, entityType, postType } = this.props;
    const isListingTypeFilter = filterName === filterTypes.LISTING_TYPE;
    const { iconName } = get(
      filtersUiDefinitions,
      `${filterName}${isListingTypeFilter ? `.${postType || entityType}` : ""}`,
      {}
    );

    return (
      <React.Fragment>
        <View style={styles.iconWrapper}>
          <AwesomeIcon
            name={iconName}
            size={18}
            color={daytColors.veryLightBlueTwo}
            weight="solid"
          />
          <AwesomeIcon
            name={iconName}
            size={18}
            color={daytColors.b30}
            weight="light"
            style={styles.upperIcon}
          />
        </View>
        <Text size={16} color={daytColors.b30} style={styles.filterName}>
          {I18n.t(`filters.${filterName}.header`)}
        </Text>
      </React.Fragment>
    );
  };

  renderToggleBtns = ({ values, filterName }) => {
    const { applyFilter, postType } = this.props;
    return (
      <View style={styles.toggleBtnsWrapper}>
        {[postSubTypes.OFFERING, postSubTypes.SEEKING].map(
          (postSubType, index, postSubTypes) => {
            const isFirstBtn = index === 0;
            const isLastBtn = index === postSubTypes.length - 1;
            const isActive = values.includes(postSubType);
            return (
              <NewTextButton
                key={`${postSubType}FiltersRowToggleBtn`}
                active={isActive}
                style={[
                  styles.toggleBtn,
                  isActive && styles.activeToggleBtn,
                  isFirstBtn && styles.firstToggleBtn,
                  isLastBtn && styles.lastToggleBtn
                ]}
                textStyle={[
                  styles.toggleBtnText,
                  isActive && styles.activeToggleBtn
                ]}
                onPress={
                  isActive
                    ? null
                    : () => applyFilter({ [filterName]: postSubType })
                }
              >
                {I18n.t(
                  `city.city_sub_header.${postType}.sub_header_tab_${index + 1}`
                )}
              </NewTextButton>
            );
          }
        )}
      </View>
    );
  };

  renderFilterValues = ({ values, filterName }) =>
    values.length ? (
      <View style={styles.flatListWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          inverted
          style={styles.flatList}
          data={values}
          renderItem={({ item, index }) =>
            this.renderChip({ filterName, chipValue: item, chipIndex: index })
          }
          ref={ref => {
            this[`chipsFlastList${filterName}`] = ref;
          }}
          onContentSizeChange={() =>
            setTimeout(
              () =>
                this[`chipsFlastList${filterName}`].scrollToEnd({
                  animated: true
                }),
              100
            )
          }
          scrollEventThrottle={50}
          onScroll={this.handleScroll}
        />
        <View
          pointerEvents="none"
          style={[
            styles.flatListLeftGradient,
            { opacity: this.state.gradientOpacity }
          ]}
        >
          <Image
            source={images.common.gradientLeftRightSmall}
            resizeMode="cover"
          />
        </View>
      </View>
    ) : (
      <View style={styles.placeholderWrapper}>
        <Text color={daytColors.b70} size={14}>
          {I18n.t(`filters.${filterName}.placeholder`)}
        </Text>
      </View>
    );

  renderChip = ({ filterName, chipValue, chipIndex }) => {
    const { clearFilter } = this.props;
    return (
      <Chip
        key={chipValue}
        style={styles.chip}
        textStyle={styles.chipText}
        afterTextComponent={
          <IconButton
            name="times-circle"
            isAwesomeIcon
            weight="solid"
            iconSize={14}
            iconColor="azure"
            style={styles.clearIcon}
            onPress={() => clearFilter({ filterName, chipIndex })}
          />
        }
      >
        {chipValue}
      </Chip>
    );
  };

  toggleShowFilters = () => {
    const { showAllFilters } = this.state;
    LayoutAnimation.easeInEaseOut();
    this.setState({ showAllFilters: !showAllFilters });
  };

  handleScroll = event => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollWidth = contentSize.width - layoutMeasurement.width;
    this.setState({
      gradientOpacity: Math.min((scrollWidth - contentOffset.x) / 30, 1)
    });
  };

  getFilterValue = ({ filterName }) => {
    const { filters } = this.props;
    if (!filters[filterName]) {
      if (
        filterName === filterTypes.AGE &&
        (filters.minAge || filters.maxAge)
      ) {
        return `${filters.minAge || AgeFilter.values.min} - ${filters.maxAge ||
          AgeFilter.values.max}`;
      }

      if (
        filterName === filterTypes.PEOPLE_SEARCH &&
        (filters.minCreatedAt || filters.maxCreatedAt)
      ) {
        return I18n.t("filters.peopleSearch.recentlyJoined");
      }
      return null;
    }
    switch (filterName) {
      case filterTypes.RELATIONSHIP_STATUS: {
        return filters[filterName].map(filter =>
          I18n.t(`filters.relationshipStatuses.${filter}`)
        );
      }
      case filterTypes.GENDER: {
        return filters[filterName].map(filter =>
          I18n.t(`filters.genders.${filter}`)
        );
      }
      case filterTypes.FRIENDSHIP_STATUS: {
        return filters[filterName].map(filter =>
          I18n.t(`filters.friendshipStatuses.${filter}`)
        );
      }
      case filterTypes.PRICE: {
        return `${filters.price.currentMin ||
          filters.price.minValue} - ${filters.price.currentMax ||
          filters.price.maxValue}`;
      }
      case filterTypes.ROOMS: {
        return `${filters.rooms}+`;
      }
      case filterTypes.HOODS: {
        return filters.hoodNames;
      }
      case filterTypes.DATES: {
        return `${I18n.t("filters.dates.from")} ${getDayAndMonth(
          filters.dates.startDate
        )}${
          filters.dates.endDate
            ? ` ${I18n.t("filters.dates.to")} ${getDayAndMonth(
                filters.dates.endDate
              )}`
            : ""
        }`;
      }
      case filterTypes.LISTING_TYPE: {
        return filters.translatedTag;
      }
      case filterTypes.POST_SUB_TYPE: {
        return filters[filterName];
      }
      default: {
        return filterName;
      }
    }
  };
}

FiltersRow.propTypes = {
  filterName: PropTypes.string,
  filters: PropTypes.object,
  onPress: PropTypes.func,
  applyFilter: PropTypes.func,
  clearFilter: PropTypes.func,
  entityType: PropTypes.string,
  postType: PropTypes.string
};

export default FiltersRow;
