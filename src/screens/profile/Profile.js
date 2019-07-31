import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, LayoutAnimation } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { getProfile, editImages } from "src/redux/profile/actions";
import {
  inviteFriendRequest,
  approveFriendRequest,
  declineFriendRequest
} from "src/redux/friendships/actions";
import { getEntityFeedInfiniteScrollProps } from "src/redux/entityFeed/actions";
import { apiCommand } from "src/redux/apiCommands/actions";
import { openActionSheet } from "src/redux/general/actions";
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
import { pluralTranslateWithZero } from "src/redux/utils/common";
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
import ActivationsCarousel from "./ActivationsCarousel";

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
  // isViewingOwnProfile = this.props.appUser.id === this.props.userProfileId; // eslint-disable-line react/sort-comp
  isViewingOwnProfile = true; // eslint-disable-line react/sort-comp

  state = {
    invited: false,
    withoutFeed: true,
    showFloatingHeader: false
  };

  render() {
    const { userProfileId } = this.props;
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
            {...getEntityFeedInfiniteScrollProps({ entityId: userProfileId })}
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

  componentDidMount = async () => {
    const { userProfileId, getProfile } = this.props;

    try {
      const profile = await getProfile({ userId: userProfileId });
      this.sendViewAnalytics(profile);
      LayoutAnimation.easeInEaseOut();
    } catch (err) {
      this.setState({ throwError: err });
    }

    if (this.state.throwError) {
      throw this.state.throwError;
    }
  };

  componentDidCatch(error) {
    this.setState({ withoutFeed: true });

    ErrorsLogger.boundaryError("ProfileFeed", error);
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
          journey={"user.journey"}
          userProfileId={userProfileId}
          image={userImage}
          thumbnail={thumbnail}
          isWithoutBackground={!userImage && this.isViewingOwnProfile}
          name={"user.name"}
          ButtonsComponent={this.renderHeaderButtons({
            isRenderedInHeader: true
          })}
          isViewingOwnProfile={this.isViewingOwnProfile}
          instagramToken={instagramToken}
          navigateToEditProfile={this.navigateToEditProfile}
        />
        {this.renderProfileDetails()}
        <View style={styles.darkBackground}>
          {
            <ActivationsCarousel
              style={styles.contentMarginBottom}
              firstItemStyle={styles.firstItemCarouselStyle}
              user={user}
              isViewingOwnActivations={this.isViewingOwnProfile}
              name={"user.name"}
            />
          }

          {shouldRenderSavedItems && (
            <View style={[styles.contentMarginBottom]}>
              <SavedItems
                firstItemStyle={styles.firstItemCarouselStyle}
                totals={savedTotals}
                appUser={appUser}
                profileUser={user}
              />
            </View>
          )}

          {!!numOfFriends && (
            <View style={[styles.contentMarginBottom]}>
              <EntitiesCarousel
                firstItemStyle={styles.firstItemCarouselStyle}
                title={I18n.t("profile.view.friends")}
                query={{
                  domain: "friendships",
                  key: "friends",
                  params: { userId: user.id, excludeMutual: true }
                }}
                count={numOfFriends}
                onAllPress={this.navigateToFriendsList}
                onItemPress={this.navigateToProfle}
                isUserEntity
              />
            </View>
          )}

          {!!groupsCount && (
            <View style={[styles.contentMarginBottom]}>
              <EntitiesCarousel
                showItemBadge={item =>
                  item &&
                  item.manager &&
                  item.manager.some(m => m.id === userProfileId)
                }
                firstItemStyle={styles.firstItemCarouselStyle}
                title={I18n.t("profile.view.groups")}
                query={{
                  domain: "groups",
                  key: "getMembered",
                  params: { userId: userProfileId }
                }}
                userProfileId={userProfileId}
                count={groupsCount}
                onAllPress={this.navigateToGroupsList}
                onItemPress={this.navigateToGroup}
              />
            </View>
          )}
          {hasFeedContent && this.renderFeedTitle()}
        </View>
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
          // journey={user.journey}
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

  renderHeaderButtons({ isRenderedInHeader } = {}) {
    const { profile } = this.props;

    return (
      <ProfileHeaderButtons
        text={isRenderedInHeader ? null : "profile.data.user.name"}
        isViewingOwnProfile={this.isViewingOwnProfile}
        isRenderedInHeader={isRenderedInHeader}
        navigateToEditProfile={this.navigateToEditProfile}
        navigateToSettings={this.navigateToSettings}
        navigateToConnectedAccounts={this.navigateToConnectedAccounts}
        navigateBack={() => navigationService.goBack()}
        openProfileActionsheet={() =>
          this.openMainActionSheet({ withReport: true })
        }
        hasProfileData={!!"profile.data"}
      />
    );
  }

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

  sendViewAnalytics(profile) {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { origin, originType, entityId } = params;
    const {
      user: { name: userName, id }
    } = profile;

    analytics.viewEvents
      .entityView({
        screenName: screenNames.Profile,
        origin,
        originType,
        entityId: entityId || id,
        entityName: userName
      })
      .dispatch();
  }

  getProfileConditionaly = ({ isInitialFetch }) => {
    const { getProfile, userProfileId } = this.props;
    if (!isInitialFetch) {
      getProfile({ userId: userProfileId });
    }
  };

  navigateToProfle = profile => {
    const {
      entityId,
      data: { name, themeColor }
    } = profile;
    const thumbnail = get(profile, "data.thumbnail.uri", "");
    navigationService.navigateToProfile({
      entityId,
      data: { name, thumbnail, themeColor }
    });
  };

  navigateToSettings = () => {
    navigationService.navigate(screenNames.Settings);
  };

  navigateToConnectedAccounts = () => {
    const {
      profile: { data }
    } = this.props;
    const {
      connectedAccounts = [],
      settings: { enableSound = true }
    } = data;
    if (connectedAccounts.length) {
      navigationService.navigate(screenNames.ConnectedUsersList, {
        connectedAccounts,
        isSoundEnabled: enableSound
      });
    }
  };

  navigateToConversation = async () => {
    const { profile } = this.props;
    const participant = {
      participantId: "profile.data.user.id",
      participantName: "profile.data.user.name",
      participantAvatar: get(profile, "data.user.media.thumbnail")
    };
    navigationService.navigate(screenNames.Chat, participant);
  };

  navigateToEditProfile = ({ focusField } = {}) => {
    const {
      profile: { data }
    } = this.props;
    navigationService.navigate(screenNames.EditProfile, { data, focusField });
  };

  navigateToFriendsList = ({ navigateToMutual = false }) => {
    const { appUser, profile } = this.props;
    const hasFriends = !!get(profile, "data.numOfFriends", 0);
    if (!hasFriends) {
      return;
    }

    const { user } = profile.data;
    const subTab = navigateToMutual
      ? OthersFriendsList.subTabs.MUTUAL_FRIENDS
      : OthersFriendsList.subTabs.ALL_FRIENDS;
    navigationService.navigate(screenNames.OthersFriendsList, {
      entityId: "user.id",
      name: "user.name",
      subTab,
      hideSubHeader: "user.id" === appUser.id
    });
  };

  navigateToGroupsList = () => {
    const {
      profile: {
        data: { user, groups }
      }
    } = this.props;
    const isGroupManager = !!groups.data.length;
    navigationService.navigate(screenNames.ProfileGroupsList, {
      user,
      isGroupManager,
      isOwnProfile: this.isViewingOwnProfile
    });
  };

  navigateToGroup = params =>
    navigationService.navigate(screenNames.GroupView, params);

  navigateToPagesList = () => {
    const {
      profile: {
        data: { user, pages }
      }
    } = this.props;
    const isPageOwner = !!pages.data.length;
    navigationService.navigate(screenNames.ProfilePagesList, {
      user,
      isPageOwner,
      isOwnProfile: this.isViewingOwnProfile
    });
  };

  navigateToPageCreation = () => {
    navigationService.navigate(screenGroupNames.CREATE_PAGE_MODAL);
  };

  navigateToPage = pageId => {
    navigationService.navigate(screenNames.PageView, { entityId: pageId });
  };

  respondToFriendRequest = () => {
    const {
      openActionSheet,
      profile: {
        data: { user }
      }
    } = this.props;
    const actionSheet = confirmOrDeleteFriendshipRequest({
      confirmFriendshipRequest: () =>
        this.onFriendshipRequestApproval({ user }),
      deleteFriendshipRequest: this.onUnFriend
    });
    openActionSheet(actionSheet);
  };

  toggleFriendshipRequest = () => {
    const {
      inviteFriendRequest,
      declineFriendRequest,
      profile: {
        data: { user }
      }
    } = this.props;
    const { invited } = this.state;
    this.setState({ invited: !invited }, async () => {
      if (!invited) {
        inviteFriendRequest({ userId: "user.id" });
      } else {
        declineFriendRequest({ userId: "user.id", name: user.name });
      }
    });
  };

  onFriendshipRequestApproval = async ({ user }) => {
    const { approveFriendRequest } = this.props;
    const { id, name } = user;
    approveFriendRequest({ userId: id, name });
  };

  onUnFriend = async () => {
    const {
      declineFriendRequest,
      profile: {
        data: { user }
      }
    } = this.props;
    this.setState({ invited: false });
    declineFriendRequest({ userId: "user.id", name: user.name });
  };

  saveMedia = async ({ mediaUrl }) => {
    const { editImages, userProfileId } = this.props;
    await editImages({ userId: userProfileId, imageUrl: mediaUrl });
  };

  scrollToFeedTop = () => {
    this.feed.scrollToOffset({ offset: this.state.subHeaderLayoutY });
  };

  openCancelFriendRequestActionSheet = () => {
    const { openActionSheet } = this.props;
    const actionSheet = cancelFriendRequestActionSheetDefinition({
      cancelFriendRequest: this.onUnFriend
    });
    openActionSheet(actionSheet);
  };

  openMainActionSheet = ({ withReport }) => {
    const {
      openActionSheet,
      profile: {
        data: { user, friendshipStatus }
      }
    } = this.props;
    const isFriend = friendshipStatus === friendshipStatusType.FRIENDS;

    if (isFriend || withReport) {
      const actionSheet = mainActionSheetDefinition({
        withReport,
        withUnfriend: isFriend,
        onReport: this.openReportActionSheet,
        onUnFriend: this.onUnFriend,
        userName: user.name
      });
      openActionSheet(actionSheet);
    }
  };

  openReportActionSheet = () => {
    const {
      openActionSheet,
      profile: {
        data: { user }
      }
    } = this.props;
    const actionSheet = reportActionSheetDefinition({
      entityType: entityTypes.USER,
      entityId: "user.id"
    });
    openActionSheet(actionSheet);
  };

  handleScroll = e => {
    const { profile } = this.props;
    const hasProfileImage = !!get(
      profile,
      "data.user.media.profile",
      "profile.data.user.thumbnail"
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

Profile.propTypes = {
  getProfile: PropTypes.func,
  apiCommand: PropTypes.func,
  openActionSheet: PropTypes.func,
  editImages: PropTypes.func,
  navigation: PropTypes.object,
  profile: PropTypes.object,
  appUser: userScheme,
  ownThemesTotals: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string,
      total: PropTypes.number
    })
  ),
  thumbnail: PropTypes.string,
  userProfileId: PropTypes.string,
  inviteFriendRequest: PropTypes.func,
  approveFriendRequest: PropTypes.func,
  declineFriendRequest: PropTypes.func,
  hasFeedContent: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  const userProfileId = get(
    ownProps,
    "navigation.state.params.entityId",
    state.auth.user.id
  );
  const loadedProfileData = get(state, `profile[${userProfileId}].data`);
  const isOwnProfile = state.auth.user.id === userProfileId;
  let profile;

  if (loadedProfileData) {
    profile = state.profile[userProfileId];
  } else if (isOwnProfile) {
    profile = {
      data: { user: { ...state.auth.user, ...state.auth.user.media } }
    };
  } else {
    profile = {
      data: { user: get(ownProps, "navigation.state.params.data", {}) }
    };
  }

  return {
    profile,
    appUser: state.auth.user,
    userProfileId,
    ownThemesTotals: get(state, "themes.savedThemes"),
    hasFeedContent: !!get(state, `entityFeed.${userProfileId}.data.length`),
    thumbnail: isOwnProfile
      ? get(state, "auth.user.media.thumbnail")
      : get(ownProps, "navigation.state.params.data.thumbnail")
  };
};

const mapDispatchToProps = {
  getProfile,
  editImages,
  apiCommand,
  openActionSheet,
  inviteFriendRequest,
  approveFriendRequest,
  declineFriendRequest
};

// Profile = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Profile);
// Profile = Screen({ modalError: true })(Profile);

export default Profile;
