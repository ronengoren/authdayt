import React from "react";
import PropTypes from "prop-types";
import memoize from "memoize-one";
import { StyleSheet, View, Text } from "react-native";
import I18n from "./node_modules/src/infra/localization";
import { connect } from "react-redux";
import {
  resetSuggestedGroups,
  getSuggestedGroupsTags
} from "./node_modules/src/redux/groups/actions";
import {
  Screen,
  EntityListsView,
  OptionsSelector
} from "./node_modules/src/components";
import { GenericListEmptyState } from "./node_modules/src/components/emptyState";
import { CarouselItem } from "./node_modules/src/components/entityCarousel";
import {
  EntityCompactView,
  EntitiesLoadingState
} from "./node_modules/src/components/entity";
import { daytColors } from "./node_modules/src/vars";
import {
  screenGroupNames,
  entityTypes,
  originTypes,
  componentNamesForAnalytics
} from "./node_modules/src/vars/enums";
import { get } from "./node_modules/src/infra/utils";
import { addSpaceOnCapitalsAndCapitalize } from "./node_modules/src/infra/utils/stringUtils";
import { navigationService } from "./node_modules/src/infra/navigation";
import { userScheme } from "./node_modules/src/schemas";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.paleGreyTwo
  }
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedGroupsProps: {
        normalizedSchema: "GROUPS",
        // reducerStatePath: "groups.suggestedGroups",
        // apiQuery: {
        //   domain: "groups",
        //   key: "getSuggested",
        //   params: { filter: null, featured: true }
        // },
        ListItemComponent: EntityCompactView,
        listItemProps: { entityType: entityTypes.GROUP },
        listEmptyState: (
          <GenericListEmptyState
            type={entityTypes.GROUP}
            headerText={I18n.t(`empty_states.${entityTypes.GROUP}.header`)}
            bodyText={I18n.t(`empty_states.${entityTypes.GROUP}.body`)}
          />
        ),
        listLoadingComponent: (
          <EntitiesLoadingState
            type={EntitiesLoadingState.COMPONENT_TYPE.COMPACT}
          />
        )
      }
    };
    this.myGroupsProps = {
      normalizedSchema: "GROUPS",
      // reducerStatePath: "groups.myGroups",
      // apiQuery: {
      //   domain: "groups",
      //   key: "getManagedAndRecent",
      //   params: { userId: 1 }
      // },
      EntityComponent: this.renderMyGroupComponent()
    };
    this.createEntityButton = {
      text: I18n.t("groups.create_button"),
      action: () =>
        navigationService.navigate(screenGroupNames.CREATE_GROUP_MODAL),
      testID: "createGroupBtn"
    };
    this.topSectionSubHeaderProps = {
      leftText: I18n.t("groups.sub_tabs.sub_tab_2")
    };
    this.bottomSectionSubHeaderProps = {
      leftText: I18n.t("groups.sub_tabs.sub_tab_1")
    };
  }
  static translateThemes = memoize(themes =>
    themes
      ? themes.map(tag =>
          I18n.t(`shared.tags.${tag}`, {
            defaultValue: addSpaceOnCapitalsAndCapitalize(tag)
          })
        )
      : []
  );

  render() {
    const { suggestedGroupsProps } = this.state;
    const { suggestedGroupsThemes } = this.props;
    const translatedThemes = Calendar.translateThemes(suggestedGroupsThemes);

    return (
      <View style={styles.container}>
        <EntityListsView
          // createEntityButton={this.createEntityButton}
          // topSectionSubHeaderProps={this.topSectionSubHeaderProps}
          // bottomSectionSubHeaderProps={this.bottomSectionSubHeaderProps}
          topSectionListProps={this.myGroupsProps}
          bottomSectionListProps={suggestedGroupsProps}
          componentColor={daytColors.golden}
          optionsSelectorProps={{
            options: translatedThemes,
            updateParentSelectedOption: this.changeTheme,
            showOptionAll: true,
            optionAllCustomName: I18n.t("themes.suggested")
          }}
        />
      </View>
    );
  }
  // componentDidMount() {
  //   const { getSuggestedGroupsTags } = this.props;
  //   getSuggestedGroupsTags();
  // }
  renderMyGroupComponent = () => ({ data, index }) => (
    <CarouselItem
      size={CarouselItem.sizes.SMALL_ACTIONLESS}
      itemNumber={index}
      item={data}
      key={data.id}
      entityType={entityTypes.GROUP}
      originType={originTypes.VIEW}
      componentName={componentNamesForAnalytics.FEED_ITEM}
      testID={`groupDisplayComponent${data.name}`}
    />
  );
  changeTheme = ({ index }) => {
    const { resetSuggestedGroups, suggestedGroupsThemes } = this.props;
    const { suggestedGroupsProps } = this.state;
    const theme =
      index === OptionsSelector.ALL_OPTION_INDEX
        ? null
        : suggestedGroupsThemes[index];
    // if (theme !== suggestedGroupsProps.apiQuery.params.theme) {
    resetSuggestedGroups();
    this.setState({
      suggestedGroupsProps: {
        ...suggestedGroupsProps
        // apiQuery: {
        //   domain: "groups",
        //   key: "getSuggested",
        //   params: { theme, featured: !theme }
        // }
        // reducerStatePath: "groups.suggestedGroups"
      }
    });
    // }
  };
}
Calendar.propTypes = {
  user: userScheme,
  resetSuggestedGroups: PropTypes.func,
  getSuggestedGroupsTags: PropTypes.func,
  suggestedGroupsThemes: PropTypes.array
};

// const mapStateToProps = state => ({
//   suggestedGroupsThemes: get(state, "groups.suggestedGroupsTags.data", []),
//   user: state.auth.user
// });

// const mapPropsToDispatch = {
//   resetSuggestedGroups,
//   getSuggestedGroupsTags
// };

export default Calendar;
