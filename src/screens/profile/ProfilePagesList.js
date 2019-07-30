import React from "react";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Screen } from "src/components";
import { EntityCompactView, EntitiesLoadingState } from "src/components/entity";
import { entityTypes } from "src/vars/enums";
import ProfileEntitiesList from "./ProfileEntitiesList";

class ProfilePagesList extends React.Component {
  static renderCreateButton = () =>
    ProfileEntitiesList.renderCreateButton({ entityType: entityTypes.PAGE });

  render() {
    return (
      <ProfileEntitiesList
        entityType={entityTypes.PAGE}
        topSectionSubHeaderProps={this.topSectionSubHeaderProps}
        bottomSectionSubHeaderProps={this.bottomSectionSubHeaderProps}
        topSectionListProps={
          this.shouldRenderSuggestedPages
            ? this.suggestedPagesProps
            : this.ownedPagesProps
        }
        bottomSectionListProps={this.followedPagesProps}
        userProfileId={this.props.userProfileId}
      />
    );
  }

  topSectionSubHeaderProps = {
    leftText: this.shouldRenderSuggestedPages
      ? I18n.t("profile_entities_list.pages.suggested_title")
      : I18n.t("profile_entities_list.pages.owner_title")
  };

  bottomSectionSubHeaderProps = {
    leftText: I18n.t("profile_entities_list.pages.following_title")
  };

  suggestedPagesProps = {
    reducerStatePath: "pages.suggested",
    apiQuery: {
      domain: "pages",
      key: "getSuggested",
      params: { userId: this.props.appUserId }
    }
  };

  ownedPagesProps = {
    reducerStatePath: "pages.owned",
    apiQuery: {
      domain: "pages",
      key: "getOwned",
      params: { userId: this.props.userProfileId }
    }
  };

  followedPagesProps = {
    reducerStatePath: "pages.followed",
    apiQuery: {
      domain: "pages",
      key: "getFollowed",
      params: { userId: this.props.userProfileId }
    },
    ListItemComponent: EntityCompactView,
    listItemProps: {
      entityType: entityTypes.PAGE,
      originType: entityTypes.PROFILE_PAGES
    },
    listLoadingComponent: (
      <EntitiesLoadingState
        type={EntitiesLoadingState.COMPONENT_TYPE.COMPACT}
      />
    )
  };

  shouldRenderSuggestedPages =
    this.isViewingOwnPages && !this.props.isPageOwner;

  isViewingOwnPages = this.props.appUserId === this.props.userProfileId;
}

ProfilePagesList.propTypes = {
  appUserId: PropTypes.string,
  userProfileId: PropTypes.string,
  isPageOwner: PropTypes.bool
};

// const mapStateToProps = (state, ownProps) => ({
//   appUserId: state.auth.user.id,
//   userProfileId: ownProps.navigation.state.params.user.id,
//   isPageOwner: ownProps.navigation.state.params.isPageOwner
// });

// ProfilePagesList = connect(mapStateToProps)(ProfilePagesList);
// export default Screen()(ProfilePagesList);
export default ProfilePagesList;
