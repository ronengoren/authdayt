import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { getProfile, editImages } from '/redux/profile/actions';
// import { inviteFriendRequest, approveFriendRequest, declineFriendRequest } from '/redux/friendships/actions';
// import { getEntityFeedInfiniteScrollProps } from '/redux/entityFeed/actions';
// import { apiCommand } from '/redux/apiCommands/actions';
// import { openActionSheet } from '/redux/general/actions';
import {
  View,
  Text,
  CallToActionArea,
  ScrollView,
  DashedBorder,
  FloatingHeader
} from "src/components/basicComponents";
import { Screen, Feed, HtmlTextWithLinks } from "src/components";
import { daytColors, uiConstants } from "src/vars";
import { OthersFriendsList } from "src/screens";
import {
  entityTypes,
  friendshipStatusType,
  relationshipType,
  screenNames,
  originTypes,
  screenGroupNames
} from "src/vars/enums";
import { AwesomeIcon } from "src/assets/icons";
// import { analytics, ErrorsLogger } from '/infra/reporting';
import { get } from "src/infra/utils";
import { getAge } from "src/infra/utils/dateTimeUtils";
import { navigationService } from "src/infra/navigation";
import { userScheme } from "src/schemas";
// import { pluralTranslateWithZero } from '/redux/utils/common';
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderButtons from "./ProfileHeaderButtons";
import ProfileActionsContainer from "./ProfileActionsContainer";
import {
  mainActionSheetDefinition,
  reportActionSheetDefinition,
  cancelFriendRequestActionSheetDefinition,
  confirmOrDeleteFriendshipRequest
} from "./actionSheetDefinitions";
import ProfileJourney from "./ProfileJourney";
import EntitiesCarousel from "./EntitiesCarousel";
import SavedItems from "./SavedItems";
// import ActivationsCarousel from "./ActivationsCarousel";

const HEADER_BREAKPOINT_WITH_IMAGE = 360;
const HEADER_BREAKPOINT_WITHOUT_IMAGE = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.white
  },
  profileJourneyContent: {
    marginTop: 15
  },
  detailsContent: {
    marginVertical: 10
  },
  contentMarginBottom: {
    marginBottom: 10
  },
  horizontalMarginContent: {
    marginHorizontal: 15
  },
  feed: {
    flex: 1,
    backgroundColor: daytColors.paleGreyTwo
  },
  bioDashedBorder: {
    marginBottom: 15
  },
  myOwnBioTextWrapper: {
    paddingTop: 5,
    marginBottom: 15
  },
  myOwnBioText: {
    fontSize: 16,
    lineHeight: 22
  },
  bioPlaceholder: {
    height: 100,
    marginTop: 11,
    marginBottom: 15,
    backgroundColor: daytColors.paleGreyTwo,
    borderColor: daytColors.azure
  },
  bioPlaceholderText: {
    height: 19,
    fontSize: 16,
    lineHeight: 19,
    color: daytColors.azure
  },
  darkBackground: {
    backgroundColor: daytColors.paleGreyTwo,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: daytColors.b90
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
  },
  createBusinessRow: {
    marginBottom: 3
  },
  detailsRowText: {
    fontSize: 16,
    paddingRight: 15
  },
  detailsRowIcon: {
    marginRight: 10
  },
  personalDetailsPlaceholderText: {
    fontSize: 16,
    lineHeight: 22,
    color: daytColors.azure
  },
  ownedPagesRow: {
    marginRight: 12
  },
  ownedPagesText: {
    color: daytColors.azure,
    fontWeight: "bold",
    fontSize: 16
  },
  recentActivityHeaderText: {
    fontSize: 16,
    lineHeight: 21,
    color: daytColors.black
  },
  feedErrorText: {
    color: daytColors.placeholderGrey,
    textAlign: "center"
  },
  firstItemCarouselStyle: {
    marginLeft: 15
  },
  actionButtonsMarginTop: {
    marginTop: 15
  },
  buttonsSpacing: {
    marginTop: 15
  }
});

class Profile extends React.Component {
  state = {
    invited: false,
    withoutFeed: true,
    showFloatingHeader: true
  };
  render() {
    const { showFloatingHeader } = this.state;
    if (this.state.withoutFeed) {
      return (
        <ScrollView onScroll={this.handleScroll}>
          {this.renderUserDetails()}
          {this.renderFeedError()}
          <FloatingHeader
            showFloatingHeader={showFloatingHeader}
            height={uiConstants.NAVBAR_HEIGHT}
          >
            {this.renderHeaderButtons({ isRenderedInHeader: false })}
          </FloatingHeader>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.feed}>
          <Feed
            ListHeaderComponent={this.renderUserDetails()}
            // {...getEntityFeedInfiniteScrollProps({ entityId: userProfileId })}
            onRef={node => {
              this.feed = node;
            }}
            showErrorPageOnFail={false}
            normalizedSchema="FEED"
            originType={originTypes.PROFILE_FEED}
            onScroll={this.handleScroll}
            onTopFetchAction={this.getProfileConditionaly}
          />
          <FloatingHeader
            showFloatingHeader={showFloatingHeader}
            height={uiConstants.NAVBAR_HEIGHT}
          >
            {this.renderHeaderButtons({ isRenderedInHeader: false })}
          </FloatingHeader>
        </View>
      );
    }
  }
  renderHeaderButtons({ isRenderedInHeader } = {}) {
    const { profile } = this.props;

    return (
      <ProfileHeaderButtons
        text={null}
        isViewingOwnProfile={this.isViewingOwnProfile}
        isRenderedInHeader={isRenderedInHeader}
        navigateToEditProfile={this.navigateToEditProfile}
        navigateToSettings={this.navigateToSettings}
        navigateToConnectedAccounts={this.navigateToConnectedAccounts}
        navigateBack={() => navigationService.goBack()}
        openProfileActionsheet={() =>
          this.openMainActionSheet({ withReport: true })
        }
        hasProfileData={null}
      />
    );
  }
  renderUserDetails() {
    const {
      profile,
      thumbnail,
      userProfileId,
      appUser,
      hasFeedContent
    } = this.props;
    const { user, numOfFriends } = get(profile, "data", {});
    const userImage = get(profile, "data.user.media.profile");
    const instagramToken = get(profile, "data.user.instagramToken");
    const groupsCount =
      get(profile, "data.totals.joinedGroups", 0) +
      get(profile, "data.totals.ownedGroups", 0);
    const savedTotals = get(profile, "data.themes.savedTotals");
    const shouldRenderSavedItems = this.isViewingOwnProfile && !!savedTotals;
    return (
      <View style={styles.container}>
        <ProfileHeader
          saveMedia={this.saveMedia}
          image={userImage}
          thumbnail={thumbnail}
          isWithoutBackground={!userImage && this.isViewingOwnProfile}
          //   name={user.name}
        />
        {this.renderProfileDetails()}
      </View>
    );
  }
  renderFeedError = () => (
    <View>
      <Text size={15} lineHeight={22} style={styles.feedErrorText}>
        {I18n.t("error_boundaries.default.title")}
      </Text>
    </View>
  );
  renderFeedTitle() {
    return (
      <View
        onLayout={({
          nativeEvent: {
            layout: { y }
          }
        }) => this.setState({ subHeaderLayoutY: y })}
        style={styles.horizontalMarginContent}
      >
        <Text
          bold
          style={styles.recentActivityHeaderText}
          color={daytColors.b30}
        >
          {this.isViewingOwnProfile
            ? I18n.t("profile.view.activity_header.mine")
            : I18n.t("profile.view.activity_header.others")}
        </Text>
      </View>
    );
  }
  renderProfileDetails = () => {
    const { profile, appUser } = this.props;
    const {
      birthday,
      relationship,
      workDetails = {},
      aroundCurrent,
      aroundOrigin,
      user,
      bio
    } = get(profile, "data", {});
    const hasRelationship =
      relationship >= 0 && relationship !== relationshipType.UNKNOWN;
    const showDetails = !!(
      this.isViewingOwnProfile ||
      birthday ||
      hasRelationship ||
      workDetails.title ||
      workDetails.place
    );
    const showBio = !!(this.isViewingOwnProfile || bio);
    const userCommunity = get(appUser, "community");
    return (
      <View style={styles.content}>
        <ProfileJourney
          userCommunity={userCommunity}
          style={[styles.profileJourneyContent, styles.horizontalMarginContent]}
          //   journey={user.journey}
          aroundCurrent={aroundCurrent}
          aroundOrigin={aroundOrigin}
          isViewingOwnProfile={this.isViewingOwnProfile}
          navigateToEditProfile={this.navigateToEditProfile}
        />
        {!this.isViewingOwnProfile && (
          <View style={styles.actionButtonsMarginTop}>
            <View style={[styles.horizontalMarginContent]}>
              {this.renderProfileActions()}
            </View>
            {showDetails ? (
              <DashedBorder style={styles.buttonsSpacing} />
            ) : (
              <View style={styles.buttonsSpacing} />
            )}
          </View>
        )}
        {showDetails && (
          <View style={styles.detailsContent}>{this.renderDetails()}</View>
        )}
        {showBio && this.renderBio()}
      </View>
    );
  };

  renderDetails() {
    const { profile } = this.props;
    const { birthday, relationship, numOfKids, workDetails = {} } = get(
      profile,
      "data",
      {}
    );
    const birthdayText = birthday && getAge(birthday);
    const relationshipText =
      relationship >= 0 &&
      relationship !== relationshipType.UNKNOWN &&
      pluralTranslateWithZero(
        numOfKids || 0,
        `profile.profile_relationship.${relationship}`
      );
    const workText =
      workDetails.title && workDetails.place
        ? I18n.t("profile.view.workplace", workDetails)
        : workDetails.title || workDetails.place;

    return (
      <View style={styles.horizontalMarginContent}>
        {(this.isViewingOwnProfile || !!birthdayText) &&
          this.renderDetailsRow({
            iconName: "birthday-cake",
            iconSize: 15,
            text: birthdayText,
            placeholderText: I18n.t("profile.view.date_of_birth_placeholder"),
            focusField: "date_of_birth"
          })}
        {(this.isViewingOwnProfile || !!relationshipText) &&
          this.renderDetailsRow({
            iconName: "heart",
            iconSize: 14,
            text: relationshipText,
            placeholderText: I18n.t("profile.view.relationship_placeholder"),
            focusField: "relationship"
          })}
        {(this.isViewingOwnProfile || !!workText) &&
          this.renderDetailsRow({
            iconName: "suitcase",
            iconSize: 14,
            text: workText,
            placeholderText: I18n.t("profile.view.workplace_placeholder"),
            noMarginBottom: true,
            focusField: "workplace"
          })}
        {this.renderOwnedPagesRow()}
        {this.isViewingOwnProfile && this.renderCreateBusinessRow()}
      </View>
    );
  }

  renderDetailsRow({ iconName, iconSize, text, placeholderText, focusField }) {
    return (
      <View style={[styles.detailsRow]}>
        <AwesomeIcon
          name={iconName}
          size={iconSize}
          color={daytColors.b70}
          style={styles.detailsRowIcon}
        />
        {text ? (
          <Text
            color={daytColors.b30}
            style={styles.detailsRowText}
            lineHeight={22}
          >
            {text}
          </Text>
        ) : (
          <Text
            color={daytColors.b30}
            style={styles.personalDetailsPlaceholderText}
            onPress={() => this.navigateToEditProfile({ focusField })}
          >
            {placeholderText}
          </Text>
        )}
      </View>
    );
  }
  renderOwnedPagesRow() {
    const { profile } = this.props;
    const { pages } = get(profile, "data", {});
    const numOfOwnedPages = get(pages, "data.length", 0);
    return numOfOwnedPages ? (
      <View style={[styles.detailsRow, styles.ownedPagesRow]}>
        <AwesomeIcon
          name="globe"
          size={14}
          color={daytColors.b70}
          style={styles.detailsRowIcon}
        />
        <Text numberOfLines={1} style={styles.detailsRowText} alignLocale>
          <Text style={styles.detailsRowText}>
            {I18n.t("profile.view.owner_of")}&nbsp;
          </Text>
          {numOfOwnedPages > 1 && (
            <Text
              onPress={this.navigateToPagesList}
              style={styles.ownedPagesText}
            >
              {I18n.t("profile.view.owner_of_pages", {
                count: numOfOwnedPages
              })}
              &nbsp;
            </Text>
          )}
          {pages.data.map((page, idx) => (
            <Text
              style={styles.ownedPagesText}
              onPress={() => this.navigateToPage(page.id)}
              key={page.id}
            >
              {idx !== 0 ? ", " : ""}
              {page.name}
            </Text>
          ))}
        </Text>
      </View>
    ) : null;
  }
  renderCreateBusinessRow() {
    return (
      <TouchableOpacity
        style={[styles.detailsRow, styles.createBusinessRow]}
        onPress={this.navigateToPageCreation}
      >
        <AwesomeIcon
          name="globe"
          size={14}
          color={daytColors.b70}
          style={styles.detailsRowIcon}
        />
        <Text style={styles.personalDetailsPlaceholderText} lineHeight={22}>
          {I18n.t("profile.view.create_a_business")}
        </Text>
      </TouchableOpacity>
    );
  }

  renderBio() {
    return (
      <View style={styles.horizontalMarginContent}>
        <DashedBorder style={styles.bioDashedBorder} />
        {this.renderBioTitle()}
        {this.renderBioText()}
      </View>
    );
  }

  renderBioTitle() {
    const { profile } = this.props;
    const firstName = get(profile, "data.name.firstName", "");

    return (
      <Text bold size={16} lineHeight={21} color={daytColors.b30}>
        {this.isViewingOwnProfile
          ? I18n.t("profile.view.details_title.mine")
          : I18n.t("profile.view.details_title.others", { firstName })}
      </Text>
    );
  }

  renderBioText() {
    const { profile } = this.props;
    const bio = get(profile, "data.bio");

    if (bio) {
      return (
        <HtmlTextWithLinks
          text={bio}
          style={styles.myOwnBioTextWrapper}
          textStyle={styles.myOwnBioText}
          lineHeight={22}
          disableRtl
        />
      );
    } else if (this.isViewingOwnProfile) {
      return (
        <CallToActionArea
          style={styles.bioPlaceholder}
          textStyle={styles.bioPlaceholderText}
          text={I18n.t("profile.view.bio_placeholder")}
          onPress={() => this.navigateToEditProfile({ focusField: "bio" })}
        />
      );
    } else {
      return null;
    }
  }
  renderProfileActions() {
    const { profile } = this.props;
    const { friendshipStatus } = "profile.data";

    return (
      <ProfileActionsContainer
        isFriend={friendshipStatus === friendshipStatusType.FRIENDS}
        requestedFriendship={
          friendshipStatus === friendshipStatusType.REQUEST_SENT
        }
        receivedFriendshipRequest={
          friendshipStatus === friendshipStatusType.REQUEST_RECEIVED
        }
        declinedFriendship={friendshipStatus === friendshipStatusType.REJECTED}
        respondToRequest={this.respondToFriendRequest}
        requestFriendship={this.toggleFriendshipRequest}
        cancelFriendshipRequest={this.openCancelFriendRequestActionSheet}
        unFriend={this.openMainActionSheet}
        navigateToConversation={this.navigateToConversation}
      />
    );
  }
  handleScroll = e => {
    const { profile } = this.props;
    const hasProfileImage = !!get(
      profile,
      "data.user.media.profile",
      profile.data.user.thumbnail
    );
    const headerBreakpoint = hasProfileImage
      ? HEADER_BREAKPOINT_WITH_IMAGE
      : HEADER_BREAKPOINT_WITHOUT_IMAGE;
    const breakpoint = FloatingHeader.getAdjustedBreakpoint(headerBreakpoint);
    const contentOffset = e.nativeEvent.contentOffset.y;
    const { showFloatingHeader } = this.state;

    if (contentOffset > breakpoint && !showFloatingHeader) {
      this.setState({ showFloatingHeader: true });
    } else if (contentOffset < breakpoint && showFloatingHeader) {
      this.setState({ showFloatingHeader: false });
    }
  };
}
export default Profile;
