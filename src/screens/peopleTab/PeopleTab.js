import React from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { StyleSheet, LayoutAnimation } from "react-native";
import { Screen, Header } from "src/components";
import { resetUsersResults } from "src/redux/users/actions";
import { FriendsList } from "src/components/people";
import {
  EntityMediaHeader,
  EntityActionButton
} from "src/components/entityListsView";
import { FiltersExpandable } from "src/components/filters";
import { View } from "src/components/basicComponents";
import { get, isEqual, isNil } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { screenNames, filterTypes } from "src/vars/enums";
import videos from "src/assets/videos";
import images from "src/assets/images";
import { userScheme } from "src/schemas";
import {
  hasActiveFilters,
  getFiltersScrollYOffset
  // shouldShowFloatingHeader
} from "src/components/filters/utils";

const styles = StyleSheet.create({
  header: {
    marginTop: 0
  }
  // floatingHeader: {
  //   borderBottomWidth: 0,
  //   paddingLeft: 0,
  //   paddingRight: 0,
  //   paddingTop: 10
  // }
});

const FILTERS = [
  filterTypes.PEOPLE_SEARCH,
  filterTypes.HOODS,
  filterTypes.GENDER,
  filterTypes.RELATIONSHIP_STATUS,
  filterTypes.AGE,
  filterTypes.FRIENDSHIP_STATUS
];

class PeopleTab extends React.Component {
  constructor(props) {
    super(props);
    const { params = {} } = props.navigation.state;

    const { initialFilters } = params;

    this.state = {
      filters: { ...initialFilters }
      // showFloatingHeader: false
    };
    this.contentYOffset = 0;
  }
  render() {
    return (
      <FriendsList
        ref={node => {
          this.friendsList = node;
        }}
        additionalHeaderComponent={this.renderHeader()}
      />
    );
  }

  renderHeader() {
    const {
      featureFlags,
      refProgram,
      resetUsersResults,
      navigation: {
        state: { params = {} }
      }
    } = this.props;
    // const { filters } = this.state;
    // const isFiltersActive = hasActiveFilters({ filters });
    // const { initialFilters } = params;
    // const { active: isRefProgramActive } = refProgram;
    // const isReferralProgramActive = !!(
    //   isRefProgramActive || featureFlags.enableReferralProgram
    // );

    return (
      <React.Fragment>
        <EntityMediaHeader
          title={I18n.t("tab_names.people")}
          video={videos.people.main}
          image={images.people.main}
        />
        <View onLayout={this.handleFiltersLayout}>
          <FiltersExpandable
            filterDefinitions={FILTERS}
            hoodsParams={{
              reducerStatePath: "users.hoods",
              apiQuery: { domain: "users", key: "getHoodsByUsers" }
            }}
            // applyAction={this.handleFiltersChange}
            resetAction={resetUsersResults}
            // initialFilters={initialFilters}
          />
        </View>
        {/* {!isFiltersActive && isReferralProgramActive && ( */}
        <EntityActionButton
          text={I18n.t("people.invite_friends_button")}
          iconName="smile-plus"
          //   onPress={this.navigateToInviteFriends}
        />
        {/* )} */}
      </React.Fragment>
    );
  }

  handleFiltersChange = filters => {
    const { filters: prevFilters } = this.state;

    if (!isEqual(prevFilters, filters)) {
      const shouldScrollToFilters =
        this.filtersScrollYOffset &&
        this.contentYOffset < this.filtersScrollYOffset;
      if (shouldScrollToFilters) {
        this.friendsList &&
          this.friendsList
            .getWrappedInstance()
            .scrollToOffset({ offset: this.filtersScrollYOffset, force: true });
      }

      LayoutAnimation.easeInEaseOut();
      this.setState({ filters });
    }
  };

  handleFiltersLayout = event => {
    this.filtersScrollYOffset = getFiltersScrollYOffset(event);
  };

  // handleScroll = event => {
  //   const { y: contentYOffset } = event.nativeEvent.contentOffset;
  //   const showFloatingHeader = shouldShowFloatingHeader({
  //     contentYOffset,
  //     prevShowFloatingHeader: this.state.showFloatingHeader
  //   });
  //   this.contentYOffset = contentYOffset;
  //   if (!isNil(showFloatingHeader)) {
  //     this.setState({ showFloatingHeader });
  //   }
  // };

  navigateToInviteFriends = () => {
    const {
      user: { id }
    } = this.props;
    navigationService.navigate(screenNames.InviteFriends, {
      entityId: id,
      inviteOrigin: "People Tab"
    });
  };
}

PeopleTab.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        filters: PropTypes.object
      })
    })
  }),
  user: userScheme,
  featureFlags: PropTypes.object,
  refProgram: PropTypes.shape({
    active: PropTypes.bool,
    maxUsers: PropTypes.number,
    sumPerUser: PropTypes.number
  }),
  resetUsersResults: PropTypes.func
};

export default PeopleTab;
