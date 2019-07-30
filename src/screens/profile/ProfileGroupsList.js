import React from "react";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Screen } from "src/components";
import { EntityCompactView, EntitiesLoadingState } from "src/components/entity";
import { entityTypes } from "src/vars/enums";
import ProfileEntitiesList from "./ProfileEntitiesList";

class ProfileGroupsList extends React.Component {
  static renderCreateButton = () =>
    ProfileEntitiesList.renderCreateButton({ entityType: entityTypes.GROUP });

  render() {
    return (
      <ProfileEntitiesList
        entityType={entityTypes.GROUP}
        topSectionSubHeaderProps={this.topSectionSubHeaderProps}
        bottomSectionSubHeaderProps={this.bottomSectionSubHeaderProps}
        topSectionListProps={
          this.shouldRenderSuggestedGroups
            ? this.suggestedGroupsProps
            : this.managedGroupsProps
        }
        bottomSectionListProps={this.memberedGroupsProps}
        userProfileId={this.props.userProfileId}
      />
    );
  }

  topSectionSubHeaderProps = {
    leftText: this.shouldRenderSuggestedGroups
      ? I18n.t("profile_entities_list.groups.suggested_title")
      : I18n.t("profile_entities_list.groups.admin_title")
  };

  bottomSectionSubHeaderProps = {
    leftText: I18n.t("profile_entities_list.groups.membered_title")
  };

  managedGroupsProps = {
    reducerStatePath: "groups.managed",
    apiQuery: {
      domain: "groups",
      key: "getManaged",
      params: { userId: this.props.userProfileId }
    }
  };

  suggestedGroupsProps = {
    reducerStatePath: "groups.suggested",
    apiQuery: {
      domain: "groups",
      key: "getSuggested",
      params: { userId: this.props.appUserId }
    }
  };

  memberedGroupsProps = {
    reducerStatePath: "groups.membered",
    apiQuery: {
      domain: "groups",
      key: "getMembered",
      params: { userId: this.props.userProfileId }
    },
    ListItemComponent: EntityCompactView,
    listItemProps: { entityType: entityTypes.GROUP },
    listLoadingComponent: (
      <EntitiesLoadingState
        type={EntitiesLoadingState.COMPONENT_TYPE.COMPACT}
      />
    )
  };

  shouldRenderSuggestedGroups =
    this.isViewingOwnGroups && !this.props.isGroupManager;

  isViewingOwnGroups = this.props.appUserId === this.props.userProfileId;
}

ProfileGroupsList.propTypes = {
  appUserId: PropTypes.string,
  userProfileId: PropTypes.string,
  isGroupManager: PropTypes.bool
};

// const mapStateToProps = (state, ownProps) => ({
//   appUserId: state.auth.user.id,
//   userProfileId: ownProps.navigation.state.params.user.id,
//   isGroupManager: ownProps.navigation.state.params.isGroupManager
// });

// ProfileGroupsList = connect(mapStateToProps)(ProfileGroupsList);
// ProfileGroupsList = Screen()(ProfileGroupsList);
export default ProfileGroupsList;
