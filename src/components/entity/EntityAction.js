import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { likePost } from "src/redux/feed/actions";
import { unsave } from "src/redux/themes/actions";
import { followPage } from "src/redux/pages/actions";
import { joinGroup } from "src/redux/groups/actions";
import { setRSVP } from "src/redux/events/actions";
import {
  inviteFriendRequest,
  approveFriendRequest,
  declineFriendRequest
} from "src/redux/friendships/actions";
import { openActionSheet } from "src/redux/general/actions";
import {
  AvatarsList,
  GroupRulesModal,
  ShareableProvider
} from "src/components";
import {
  View,
  Text,
  NewTextButton,
  Image,
  IconButton
} from "src/components/basicComponents";
import { SaveModal } from "src/components/modals";
import { MY_HOOD } from "src/components/themes";
import images from "src/assets/images";
import { daytColors } from "src/vars";
import {
  friendshipStatusType,
  screenNames,
  groupPrivacyType,
  groupRoleTypes,
  rsvpStatuses,
  originTypes,
  postTypes,
  entityTypes,
  screenNamesByEntityType,
  componentNamesForAnalytics,
  passivePostSubTypes
} from "src/vars/enums";
import PropTypes from "prop-types";
import { userScheme, actorScheme } from "src/schemas/common";
import { get, isEmpty } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
// import { analytics } from "/infra/reporting";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  paddingHorizontalRow: {
    paddingHorizontal: 10
  },
  paddingTop: {
    paddingTop: 10
  },
  paddingVerticalSmall: {
    paddingVertical: 5
  },
  // eslint-disable-next-line react-native/no-unused-styles
  tinyWrapper: {
    backgroundColor: daytColors.transparent
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallWrapper: {
    backgroundColor: daytColors.white
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigWrapper: {
    paddingHorizontal: 15
  },
  buttonsSeparator: {
    marginHorizontal: 5
  },
  tinyIconOnlyWrap: {
    width: 34,
    height: 34,
    borderRadius: 18,
    backgroundColor: daytColors.boxShadow30,
    borderColor: daytColors.white,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tinyIconOnlyActiveWrap: {
    backgroundColor: daytColors.azure,
    borderColor: daytColors.transparent
  },
  sharedEntityWrapper: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 10
  },
  avatarsWrapper: {
    flex: 1,
    flexDirection: "row",
    marginRight: 5,
    alignItems: "center"
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigAvatarsTextWrapper: {
    marginLeft: 5
  },
  avatarsEmptyStateAvatar: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  avatarsEmptyStateText: {
    flex: 1,
    alignSelf: "center"
  },
  interestedIcon: {
    marginLeft: -2,
    marginRight: 2
  },
  goingIcon: {
    color: daytColors.white,
    marginLeft: 4
  },
  goingIconWrapper: {
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: daytColors.azure
  },
  actionButton: {
    marginLeft: "auto",
    backgroundColor: daytColors.paleGreyFour,
    borderColor: daytColors.paleGreyFour,
    borderRadius: 10
  }
});

class EntityAction extends Component {
  static sizes = {
    TINY: "tiny",
    SMALL: "small",
    MEDIUM: "medium",
    BIG: "big"
  };

  constructor(props) {
    super(props);
    const {
      data: { payload: { postSubType } = {} },
      contentType
    } = props;
    this.isCommunityJoinedPost =
      contentType === postTypes.PASSIVE_POST &&
      postSubType === passivePostSubTypes.COMMUNITY_JOINED;
    this.isInstagramPost =
      contentType === postTypes.PASSIVE_POST &&
      postSubType === passivePostSubTypes.INSTAGRAM_CONNECT;

    this.state = {
      showGroupRulesModal: false,
      showSaveModal: false
    };
  }

  render() {
    const {
      data: { id, rules },
      contentType,
      isSharedPostEntity,
      isWithShareEntityActionButton,
      size,
      isAvatarsShown
    } = this.props;

    const { showGroupRulesModal, showSaveModal } = this.state;
    const shouldRenderAvatars =
      isAvatarsShown !== false &&
      ![EntityAction.sizes.TINY, EntityAction.sizes.SMALL].includes(size) &&
      ![postTypes.REAL_ESTATE, postTypes.GIVE_TAKE, postTypes.JOB].includes(
        contentType
      );
    const isFullWidthButton = !shouldRenderAvatars;
    const groupModalComponent = (
      <GroupRulesModal
        show={showGroupRulesModal}
        id={id}
        rules={rules}
        onAccept={this.joinGroup}
        onClose={() => this.setState({ showGroupRulesModal: false })}
      />
    );

    if (isWithShareEntityActionButton) {
      return (
        <View
          style={[
            styles.wrapper,
            styles[`${size}Wrapper`],
            isSharedPostEntity && styles.sharedEntityWrapper
          ]}
        >
          <View style={[styles.row, styles.paddingVerticalSmall]}>
            {this.renderActions({ isFullWidthButton })}
          </View>
          {shouldRenderAvatars && (
            <View style={[styles.row, styles.paddingVerticalSmall]}>
              {this.renderAvatars()}
            </View>
          )}
          {showGroupRulesModal && groupModalComponent}
          {showSaveModal && this.renderSaveModal()}
        </View>
      );
    }

    return (
      <View
        style={[
          styles.wrapper,
          styles.row,
          styles.paddingHorizontalRow,
          styles.paddingTop,
          styles[`${size}Wrapper`],
          isSharedPostEntity && styles.sharedEntityWrapper
        ]}
      >
        {shouldRenderAvatars && this.renderAvatars()}
        {this.renderActions({ isFullWidthButton })}
        {showGroupRulesModal && groupModalComponent}
        {showSaveModal && this.renderSaveModal()}
      </View>
    );
  }

  renderSaveModal = () => {
    const {
      data,
      contentType,
      entityType,
      contextPost,
      context,
      componentName,
      originType,
      isInUserHood
    } = this.props;
    const { id, actor, creator, name, title, tags, page } = data;
    const entitySubType = this.getEntitySubType();

    // If the entity (e.g page) doesn't have tags - then we'll take the context's (e.g post/list item) tags
    // If the entity has a page element inside (e.g passive post) then we'll take that page's tags
    let entityThemes = tags || get(context, "entity.tags") || get(page, "tags");
    if (isInUserHood) {
      entityThemes = [MY_HOOD, ...entityThemes];
    }

    return (
      <SaveModal
        onClose={this.toggleSaveModal}
        entityType={entityType}
        entitySubType={entitySubType}
        entityId={id}
        name={name || title}
        creator={creator || actor}
        contextPost={contextPost}
        context={context}
        postType={contentType}
        preSelectedThemes={entityThemes}
        componentName={componentName}
        originType={originType}
      />
    );
  };

  renderAvatars = () => {
    const {
      size,
      data: {
        likers,
        lastSavers,
        savers,
        follows,
        invitees,
        mutualFriends,
        lastMembers,
        manager,
        likes,
        saves,
        membersCount,
        totalFollowed,
        rsvpCounts,
        totalSaves,
        hideMemberList,
        payload: { postSubType } = {}
      },
      contentType,
      isThemePage
    } = this.props;
    let actorsList;
    let totalActors;
    let action = null;
    let isPageInThemePage;
    const entityActionWithoutAvatars =
      this.isCommunityJoinedPost ||
      [
        postTypes.TIP_REQUEST,
        postTypes.PACKAGE,
        postTypes.INTRODUCTION,
        postTypes.ACTIVATION
      ].includes(contentType) ||
      hideMemberList;
    if (entityActionWithoutAvatars) {
      return null;
    }

    switch (contentType) {
      case postTypes.STATUS_UPDATE:
      case postTypes.GROUP_ANNOUNCEMENT:
      case postTypes.PROMOTION:
        actorsList = likers;
        totalActors = likes;
        action = this.navigateToThankersList;
        break;
      case postTypes.GUIDE:
      case postTypes.RECOMMENDATION:
      case postTypes.PASSIVE_POST:
        actorsList = savers;
        totalActors = saves;
        action = this.navigateToSaversList;
        if (postSubType === passivePostSubTypes.INSTAGRAM_CONNECT) {
          actorsList = likers;
          totalActors = likes;
          action = this.navigateToThankersList;
        }
        break;
      case entityTypes.LIST_ITEM:
        actorsList = savers;
        totalActors = saves;
        action = this.navigateToListItemSaversList;
        break;
      case entityTypes.LIST:
        actorsList = savers;
        totalActors = totalSaves;
        action = this.navigateToListSaversList;
        break;
      case entityTypes.GROUP:
        if (mutualFriends && mutualFriends.length) {
          actorsList = mutualFriends;
        } else if (lastMembers && lastMembers.length) {
          actorsList = lastMembers;
        } else {
          actorsList = manager;
        }
        totalActors = membersCount;
        action = this.navigateToGroupMembers;
        break;
      case entityTypes.EVENT:
        actorsList = invitees;
        totalActors = rsvpCounts && rsvpCounts.maybe + rsvpCounts.yes;
        action = this.navigateToInviteesList;
        break;
      case entityTypes.PAGE:
        actorsList = isThemePage ? lastSavers || saves : follows;
        totalActors = isThemePage ? totalSaves : totalFollowed;
        action = isThemePage
          ? this.navigateToPageSaversList
          : this.navigateToFollowersList;
        isPageInThemePage = isThemePage;
        break;
      default:
    }
    const hasActors = !isEmpty(actorsList);
    let translation;
    if (postSubType === passivePostSubTypes.INSTAGRAM_CONNECT) {
      translation = !hasActors
        ? I18n.t(`posts.users_list.passive_instagram.empty_state`)
        : I18n.p(totalActors, "posts.users_list.passive_instagram.text");
    } else if (size === EntityAction.sizes.BIG && !hasActors) {
      translation = isPageInThemePage
        ? I18n.t(`posts.users_list.page.savers_empty_state`)
        : I18n.t(`posts.users_list.${contentType}.empty_state`);
    } else {
      translation = isPageInThemePage
        ? I18n.t(`posts.users_list.page.savers_text`)
        : I18n.p(totalActors, `posts.users_list.${contentType}.text`);
    }

    if (
      size === EntityAction.sizes.BIG &&
      (!actorsList || !actorsList.length)
    ) {
      return (
        <View style={styles.avatarsWrapper}>
          <Image
            source={images.feed.avatar_placeholder}
            style={styles.avatarsEmptyStateAvatar}
          />
          <Text
            size={13}
            lineHeight={15}
            color={daytColors.b60}
            style={styles.avatarsEmptyStateText}
          >
            {translation}
          </Text>
        </View>
      );
    }
    if (!totalActors) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={action}
        style={styles.avatarsWrapper}
        activeOpacity={1}
      >
        {size === EntityAction.sizes.BIG && <AvatarsList list={actorsList} />}
        <View style={styles[`${size}AvatarsTextWrapper`]}>
          <Text size={13} lineHeight={15} color={daytColors.b60}>
            {totalActors}
          </Text>
          <Text size={13} lineHeight={15} color={daytColors.b60}>
            {translation}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderActions = ({ isFullWidthButton }) => {
    const {
      size,
      data: { userRSVP, memberType, liked },
      contentType,
      actor,
      user,
      isThemePage,
      isWithShareEntityActionButton
    } = this.props;
    const buttonWidth =
      isWithShareEntityActionButton ||
      isFullWidthButton ||
      size === EntityAction.sizes.SMALL
        ? null
        : 115;
    const buttonSize = size;

    switch (contentType) {
      case postTypes.INTRODUCTION: {
        return (
          <React.Fragment>
            {this.renderFriendRequestOrMessageAction({ buttonSize })}
            <View style={styles.buttonsSeparator} />
            {this.renderButton({
              active: liked,
              emoji: "clap",
              onPress: this.thanksAction,
              buttonSize,
              text: I18n.t(
                `posts.introduction.${liked ? "welcomed_btn" : "welcome_btn"}`
              )
            })}
          </React.Fragment>
        );
      }
      case postTypes.PASSIVE_POST: {
        if (this.isInstagramPost) {
          return this.renderButton({
            active: liked,
            emoji: "thanks",
            onPress: this.thanksAction,
            buttonWidth,
            buttonSize,
            text: liked
              ? I18n.t("posts.actions.thanked")
              : I18n.t("posts.actions.thanks")
          });
        }
        if (this.isCommunityJoinedPost) {
          return (
            <React.Fragment>
              {this.renderButton({
                iconName: "eye",
                iconSize: 16,
                iconWeight: "solid",
                onPress: this.viewAllAction,
                buttonSize,
                text: I18n.t("posts.community_joined.view_all")
              })}
              <View style={styles.buttonsSeparator} />
              {this.renderButton({
                active: liked,
                emoji: "clap",
                onPress: this.thanksAction,
                buttonSize,
                text: I18n.t(
                  `posts.community_joined.${
                    liked ? "welcomed_btn" : "welcome_btn"
                  }`
                )
              })}
            </React.Fragment>
          );
        }
        return null;
      }
      case postTypes.ACTIVATION: {
        return (
          <React.Fragment>
            {this.renderFriendRequestOrMessageAction({ buttonSize })}
            <View style={styles.buttonsSeparator} />
            {this.renderButton({
              active: liked,
              emoji: "thanks",
              onPress: this.thanksAction,
              buttonSize,
              text: I18n.t(`posts.actions.${liked ? "thanked" : "thanks"}`)
            })}
          </React.Fragment>
        );
      }

      case postTypes.STATUS_UPDATE:
      case postTypes.PROMOTION:
      case postTypes.GROUP_ANNOUNCEMENT: {
        return this.renderButton({
          active: liked,
          emoji: "thanks",
          onPress: this.thanksAction,
          buttonWidth,
          buttonSize,
          text: liked
            ? I18n.t("posts.actions.thanked")
            : I18n.t("posts.actions.thanks")
        });
      }
      case postTypes.REAL_ESTATE:
      case postTypes.GIVE_TAKE:
      case postTypes.JOB: {
        const actorId = actor.ownerId || actor.id;
        return (
          <React.Fragment>
            {isWithShareEntityActionButton &&
              this.renderShareAction({ buttonSize })}
            {this.renderButton({
              iconName: "comment",
              iconSize: 17,
              iconWeight: "solid",
              disabled: actorId === user.id,
              onPress: this.messageAction,
              buttonSize,
              text:
                size === EntityAction.sizes.SMALL ||
                isWithShareEntityActionButton
                  ? I18n.t("posts.actions.message_short")
                  : I18n.t("posts.actions.message")
            })}
          </React.Fragment>
        );
      }
      case postTypes.GUIDE: {
        return (
          <React.Fragment>
            {isWithShareEntityActionButton &&
              this.renderShareAction({ buttonSize })}
            {this.renderSaveAction({ buttonSize, buttonWidth })}
          </React.Fragment>
        );
      }
      case postTypes.RECOMMENDATION:
        return this.renderSaveAction({ buttonSize, buttonWidth });
      case postTypes.PACKAGE:
      case postTypes.TIP_REQUEST: {
        return this.renderButton({
          iconName: "z-comment-fill",
          iconSize: 14,
          onPress: this.answerAction,
          buttonSize,
          text: I18n.t("posts.actions.answer")
        });
      }
      case entityTypes.GROUP: {
        let iconName;
        let iconSize;
        let iconWeight = null;
        let text;
        if (memberType === groupRoleTypes.NOT_MEMBER) {
          iconName = "groups-";
          iconSize = 22;
          text = I18n.t("posts.actions.join");
        } else if (memberType === groupRoleTypes.PENDING) {
          iconName = "clock";
          iconSize = 17;
          iconWeight = "solid";
          text = I18n.t("posts.actions.pending");
        } else {
          iconName = "check-circle";
          iconSize = 18;
          iconWeight = "solid";
          text = I18n.t("posts.actions.joined");
        }
        return this.renderButton({
          active:
            memberType !== groupRoleTypes.NOT_MEMBER &&
            memberType !== groupRoleTypes.PENDING,
          iconName,
          iconSize,
          onPress: this.groupAction,
          buttonWidth,
          buttonSize,
          text,
          iconWeight,
          secondary: memberType === groupRoleTypes.PENDING
        });
      }
      case entityTypes.EVENT: {
        const parsedRSVP = parseInt(userRSVP, 10);
        const interested = [rsvpStatuses.MAYBE, rsvpStatuses.YES].includes(
          parsedRSVP
        );
        const isGoing = parsedRSVP === rsvpStatuses.YES;
        return this.renderButton({
          active: interested,
          iconName: isGoing ? "check" : "star",
          iconWeight: isGoing ? "solid" : null,
          iconSize: isGoing ? 10 : 21,
          iconLineHeight: 20,
          iconStyle: isGoing ? styles.goingIcon : styles.interestedIcon,
          onPress: this.eventAction,
          buttonWidth,
          buttonSize,
          text: isGoing
            ? I18n.t("events.view.action_buttons.going")
            : I18n.t("posts.actions.interested"),
          iconWrapperStyle: isGoing ? styles.goingIconWrapper : null
        });
      }
      case entityTypes.PAGE:
        return isThemePage
          ? this.renderSaveAction({ buttonSize, buttonWidth })
          : this.renderFollowAction({ buttonSize, buttonWidth });
      case entityTypes.LIST:
        return this.renderSaveAction({ buttonSize, buttonWidth });
      case entityTypes.LIST_ITEM:
        return this.renderSaveAction({ buttonSize, buttonWidth });
      default:
        return null;
    }
  };

  renderShareAction = ({ buttonSize }) => {
    const { data: post } = this.props;
    return (
      <React.Fragment>
        <ShareableProvider post={post}>
          {({ openShareActionSheet }) =>
            this.renderButton({
              iconName: "share",
              iconSize: 24,
              onPress: openShareActionSheet,
              buttonSize,
              text: I18n.t("posts.actions.share")
            })
          }
        </ShareableProvider>
        <View style={styles.buttonsSeparator} />
      </React.Fragment>
    );
  };
  renderSaveAction = ({ buttonSize, buttonWidth }) => {
    const {
      data: { saved, isSaved }
    } = this.props;
    return this.renderButton({
      iconName: "z-save-fill",
      onPress: this.saveAction,
      iconSize: 18,
      buttonWidth,
      buttonSize,
      active: saved || isSaved,
      text:
        saved || isSaved
          ? I18n.t("posts.actions.saved")
          : I18n.t("posts.actions.save")
    });
  };

  renderFollowAction = ({ buttonSize, buttonWidth }) => {
    const {
      data: { followed }
    } = this.props;
    return this.renderButton({
      active: followed,
      iconName: "follow",
      iconSize: 20,
      onPress: this.pageFollowAction,
      buttonWidth,
      buttonSize,
      text: followed
        ? I18n.t("posts.actions.following")
        : I18n.t("posts.actions.follow")
    });
  };

  renderButton = ({
    iconName,
    iconSize,
    onPress,
    iconWrapperStyle,
    buttonWidth,
    buttonSize,
    active,
    text,
    iconLineHeight,
    iconStyle,
    iconWeight,
    secondary,
    emoji,
    disabled
  }) => {
    const { size } = this.props;
    const iconOnly = size === EntityAction.sizes.TINY;

    return iconOnly ? (
      <IconButton
        onPress={onPress}
        style={[
          styles.tinyIconOnlyWrap,
          active ? styles.tinyIconOnlyActiveWrap : null
        ]}
        name={iconName}
        iconSize={iconSize - 3}
        iconColor={"white"}
      />
    ) : (
      <NewTextButton
        style={styles.actionButton}
        disabled={disabled}
        emoji={emoji}
        active={active}
        iconName={iconName}
        iconWrapperStyle={iconWrapperStyle}
        iconSize={iconSize}
        onPress={onPress}
        width={buttonWidth}
        size={buttonSize}
        iconLineHeight={iconLineHeight}
        iconStyle={iconStyle}
        iconWeight={iconWeight}
        secondary={secondary}
      >
        {text}
      </NewTextButton>
    );
  };

  renderFriendRequestOrMessageAction = ({ buttonSize }) => {
    const {
      data: {
        actor: { friendshipStatus }
      }
    } = this.props;
    const isFriend = friendshipStatus === friendshipStatusType.FRIENDS;
    const requestedFriendship =
      friendshipStatus === friendshipStatusType.REQUEST_SENT;
    const receivedFriendshipRequest =
      friendshipStatus === friendshipStatusType.REQUEST_RECEIVED;
    return (
      <React.Fragment>
        {isFriend && (
          <NewTextButton
            style={styles.actionButton}
            size={buttonSize}
            iconName="comment"
            onPress={this.messageAction}
            iconSize={17}
            iconWeight="solid"
          >
            {I18n.t("common.buttons.message")}
          </NewTextButton>
        )}
        {requestedFriendship && (
          <NewTextButton
            style={styles.actionButton}
            secondary
            size={buttonSize}
            onPress={this.cancelFriendshipRequest}
          >
            {I18n.t("common.buttons.request_sent")}
          </NewTextButton>
        )}
        {receivedFriendshipRequest && (
          <NewTextButton
            style={styles.actionButton}
            size={buttonSize}
            onPress={this.respondToFriendRequest}
            iconName="add-friend"
            iconSize={25}
          >
            {I18n.t("common.buttons.respond")}
          </NewTextButton>
        )}
        {!receivedFriendshipRequest && !requestedFriendship && !isFriend && (
          <NewTextButton
            style={styles.actionButton}
            size={buttonSize}
            iconName="add-friend"
            onPress={this.toggleFriendshipRequest}
            iconSize={25}
          >
            {I18n.t("common.buttons.add_friend")}
          </NewTextButton>
        )}
      </React.Fragment>
    );
  };

  thanksAction = () => {
    const {
      contextPost,
      user,
      context,
      data: { id, liked, actor },
      contentType,
      likePost,
      originType,
      componentName
    } = this.props;
    likePost({
      contextPost,
      postId: id,
      actor: user,
      liked,
      postType: contentType,
      entityId: context.id,
      originType,
      componentName,
      entityType: entityTypes.POST,
      entitySubType: contentType,
      entitySubSubType: null,
      creator: actor
    });
  };

  viewAllAction = () => {
    const {
      minBetweenDate,
      maxBetweenDate
    } = this.props.data.payload.templateData;
    navigationService.navigate(screenNames.PeopleTab, {
      initialFilters: {
        minCreatedAt: minBetweenDate,
        maxCreatedAt: maxBetweenDate
      }
    });
  };

  messageAction = () => {
    const {
      actor,
      user,
      data: {
        id,
        payload: { postSubType }
      },
      contentType,
      originType,
      componentName
    } = this.props;
    const actorId = actor.ownerId || actor.id;
    analytics.actionEvents
      .clickToMessageAction({
        actorId: user.id,
        actorName: user.name,
        screenCollection: originType,
        componentName,
        entityType: entityTypes.POST,
        entitySubType: contentType,
        entitySubSubType: postSubType,
        entityId: id,
        recipientId: actor.id,
        recipientName: actor.name,
        recipientType: actor.type
      })
      .dispatch();

    const participant = {
      participantId: actorId,
      participantName: actor.name,
      participantAvatar: get(actor, "media.thumbnail")
    };
    navigationService.navigate(screenNames.Chat, {
      ...participant,
      isFromContext: true
    });
  };

  answerAction = () => {
    const {
      data: { id },
      isPostPage,
      onAnswerPress
    } = this.props;
    if (isPostPage) {
      onAnswerPress();
    } else {
      navigationService.navigate(screenNames.PostPage, {
        entityId: id,
        showKeyboard: true,
        placeHolder: I18n.t("posts.actions.answer_action_placeholder")
      });
    }
  };

  groupAction = () => {
    const {
      data: { memberType, rules, hasRules }
    } = this.props;
    if (memberType === groupRoleTypes.NOT_MEMBER) {
      if (rules || hasRules) {
        this.setState({ showGroupRulesModal: true });
      } else {
        this.joinGroup();
      }
    } else {
      this.navigateToEntityPage();
    }
  };

  joinGroup = () => {
    const {
      data: { id, name, membersCount, privacyType },
      context,
      joinGroup,
      user
    } = this.props;
    const contextEntityId = get(context, "id");
    joinGroup({
      groupId: id,
      groupName: name,
      totalMembers: membersCount,
      privacyType,
      user,
      originType: originTypes.FEED,
      contextEntityId
    });
    this.setState({ showGroupRulesModal: false });
  };

  eventAction = () => {
    const {
      data: { id, userRSVP, tags },
      context,
      contextPost,
      setRSVP
    } = this.props;
    const contextEntityId = get(context, "id");
    const parsedRSVP = parseInt(userRSVP, 10);
    if (
      [rsvpStatuses.NO, rsvpStatuses.NO_RSVP, rsvpStatuses.INVITED].includes(
        parsedRSVP
      )
    ) {
      setRSVP({
        eventId: id,
        rsvpStatus: rsvpStatuses.MAYBE,
        oldRSVP: parsedRSVP,
        tags,
        sharedPost: true,
        postId: contextPost.id,
        contextEntityId
      });
    } else {
      this.navigateToEntityPage();
    }
  };

  pageFollowAction = () => {
    const {
      data: { id, name, followed },
      context,
      followPage
    } = this.props;
    const contextEntityId = get(context, "id");
    if (!followed) {
      followPage({
        pageId: id,
        pageName: name,
        originType: originTypes.FEED,
        contextEntityId
      });
    } else {
      this.navigateToEntityPage();
    }
  };

  saveAction = () => {
    const {
      unsave,
      data: { id, saved, isSaved, listId, creator = {}, title, name, payload },
      user,
      originType,
      componentName,
      entityType,
      contentType,
      contextPost,
      context
    } = this.props;

    if (saved || isSaved) {
      const data = {
        entityType,
        entityId: id,
        actor: user,
        originType,
        componentName,
        creator,
        context
      };

      switch (contentType) {
        case entityTypes.LIST:
          data.entityName = name;
          break;
        case entityTypes.LIST_ITEM:
          data.entitySubType = postTypes.PASSIVE_POST;
          data.listId = listId;
          data.entityName = title;
          break;
        case entityTypes.PAGE:
          data.entityName = name;
          break;
        case postTypes.GUIDE:
        case postTypes.RECOMMENDATION:
          data.contextPost = contextPost;
          data.context = context;
          data.postType = contentType;
          data.entityName = payload.title;
          break;
        default:
      }

      unsave(data);
    } else {
      this.toggleSaveModal();
    }
  };

  respondToFriendRequest = () => {
    const { openActionSheet } = this.props;
    openActionSheet({
      options: [
        {
          id: "confirmFriendshipRequest",
          text: I18n.t("profile.action_sheets.confirm_friend_request"),
          shouldClose: true,
          action: this.onFriendshipRequestApproval
        },
        {
          id: "deleteFriendshipRequest",
          text: I18n.t("profile.action_sheets.delete_friend_request"),
          shouldClose: true,
          color: daytColors.red,
          action: this.onUnFriend
        }
      ],
      hasCancelButton: true
    });
  };

  cancelFriendshipRequest = () => {
    const { openActionSheet } = this.props;
    openActionSheet({
      options: [
        {
          id: "cancelFriendRequest",
          text: I18n.t("profile.action_sheets.cancel_friend_request"),
          shouldClose: true,
          action: this.onUnFriend
        }
      ],
      hasCancelButton: true
    });
  };

  toggleFriendshipRequest = () => {
    const {
      inviteFriendRequest,
      declineFriendRequest,
      data,
      data: {
        actor: { id, name }
      }
    } = this.props;
    const { invited } = this.state;
    this.setState({ invited: !invited }, () => {
      if (!invited) {
        inviteFriendRequest({ userId: id, postId: data.id });
      } else {
        declineFriendRequest({ userId: id, name, postId: data.id });
      }
    });
  };

  onFriendshipRequestApproval = async () => {
    const {
      approveFriendRequest,
      data,
      data: {
        actor: { id, name }
      }
    } = this.props;
    approveFriendRequest({ userId: id, name, postId: data.id });
  };

  onUnFriend = async () => {
    const {
      declineFriendRequest,
      data,
      data: {
        actor: { id, name }
      }
    } = this.props;
    this.setState({ invited: false });
    declineFriendRequest({ userId: id, name, postId: data.id });
  };

  navigateToEntityPage = () => {
    const {
      data: { id },
      contentType
    } = this.props;
    navigationService.navigate(screenNamesByEntityType[contentType], {
      entityId: id
    });
  };

  navigateToGroupMembers = () => {
    const {
      data: { id, memberType }
    } = this.props;
    const memberAllowedToAdd = [
      groupRoleTypes.OWNER,
      groupRoleTypes.MODERATOR,
      groupRoleTypes.MEMBER
    ].includes(memberType);
    navigationService.navigate(screenNames.ViewOnlyMembersList, {
      entityId: id,
      memberAllowedToAdd
    });
  };

  navigateToFollowersList = () => {
    const {
      data: { id, name }
    } = this.props;
    navigationService.navigate(screenNames.FollowersList, {
      pageId: id,
      pageName: name
    });
  };

  navigateToPageSaversList = () => {
    const {
      data: { id }
    } = this.props;
    const title = I18n.t("page.view.saved_by.header");
    navigationService.navigate(screenNames.EntitiesList, {
      query: { domain: "pages", key: "saves", params: { pageId: id } },
      reducerStatePath: `pages.${id}/savedBy`,
      title
    });
  };

  navigateToInviteesList = () => {
    const {
      data: { id, hosts, privacyType, rsvpCounts, hasEditPermissions },
      user
    } = this.props;
    navigationService.navigate(screenNames.EventInviteesList, {
      hasEditPermissions,
      hostId: hosts[0].id,
      userId: user.id,
      privacyType,
      eventId: id,
      rsvpCounts,
      type: rsvpStatuses.YES
    });
  };

  navigateToThankersList = () => {
    const {
      data: { id, likes }
    } = this.props;
    const query = { domain: "posts", key: "thankedBy", params: { postId: id } };
    const reducerStatePath = `postPage.${id}/thankedBy`;
    const title = I18n.t("entity_lists.thankers", { likes });
    navigationService.navigate(screenNames.EntitiesList, {
      query,
      reducerStatePath,
      title
    });
  };

  navigateToSaversList = () => {
    const {
      data: { id, saves }
    } = this.props;
    const query = { domain: "posts", key: "savedBy", params: { postId: id } };
    const reducerStatePath = `postPage.${id}/savedBy`;
    const title = I18n.t("entity_lists.savers", { saves });
    navigationService.navigate(screenNames.EntitiesList, {
      query,
      reducerStatePath,
      title
    });
  };

  navigateToListSaversList = () => {
    const {
      data: { id, totalSaves }
    } = this.props;
    const query = {
      domain: "lists",
      key: "getListSavers",
      params: { listId: id }
    };
    const reducerStatePath = `lists.byId.${id}.saversList`;
    const title = I18n.t("list.savers_list.header", { totalSaves });
    navigationService.navigate(screenNames.EntitiesList, {
      query,
      reducerStatePath,
      title
    });
  };

  navigateToListItemSaversList = () => {
    const {
      data: { id, listId, saves }
    } = this.props;
    const query = {
      domain: "lists",
      key: "getListItemSavers",
      params: { listId, listItemId: id }
    };
    const reducerStatePath = `lists.${id}/savedBy`;
    const title = I18n.t("entity_lists.savers", { saves });
    navigationService.navigate(screenNames.EntitiesList, {
      query,
      reducerStatePath,
      title
    });
  };

  toggleSaveModal = () =>
    this.setState({ showSaveModal: !this.state.showSaveModal });

  getEntitySubType = () => {
    const { contentType } = this.props;
    switch (contentType) {
      case entityTypes.LIST:
        return null;
      case entityTypes.LIST_ITEM:
        return postTypes.PASSIVE_POST;
      case entityTypes.PAGE:
        return null;
      default:
        return contentType;
    }
  };
}

EntityAction.defaultProps = {
  size: EntityAction.sizes.BIG
};

EntityAction.propTypes = {
  isInUserHood: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(EntityAction.sizes)),
  data: PropTypes.shape({
    id: PropTypes.string,
    userRSVP: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    followed: PropTypes.bool,
    liked: PropTypes.bool,
    memberType: PropTypes.oneOf(Object.values(groupRoleTypes)),
    name: PropTypes.string,
    privacyType: PropTypes.oneOf(Object.values(groupPrivacyType)),
    follows: PropTypes.arrayOf(userScheme),
    invitees: PropTypes.arrayOf(userScheme),
    mutualFriends: PropTypes.arrayOf(userScheme),
    lastMembers: PropTypes.arrayOf(userScheme),
    manager: PropTypes.arrayOf(userScheme),
    savers: PropTypes.arrayOf(userScheme),
    likers: PropTypes.arrayOf(userScheme),
    saves: PropTypes.oneOfType([PropTypes.number, PropTypes.array]), // due to BE model issue saves in page will be an array of savers
    likes: PropTypes.number,
    membersCount: PropTypes.number,
    totalFollowed: PropTypes.number,
    totalSaves: PropTypes.number,
    rsvpCounts: PropTypes.object,
    payload: PropTypes.object
  }),
  contextPost: PropTypes.shape({
    id: PropTypes.string,
    actor: actorScheme,
    payload: PropTypes.object,
    context: PropTypes.object
  }),
  contentType: PropTypes.oneOf([
    ...Object.values(postTypes),
    ...Object.values(entityTypes)
  ]),
  entityType: PropTypes.oneOf(Object.values(entityTypes)),
  isPostPage: PropTypes.bool,
  isThemePage: PropTypes.bool,
  isWithShareEntityActionButton: PropTypes.bool,
  isSharedPostEntity: PropTypes.bool,
  actor: userScheme,
  context: PropTypes.object,
  originType: PropTypes.oneOf(Object.values(originTypes)),
  componentName: PropTypes.oneOf(Object.values(componentNamesForAnalytics)),
  onAnswerPress: PropTypes.func,
  user: userScheme,
  likePost: PropTypes.func,
  followPage: PropTypes.func,
  joinGroup: PropTypes.func,
  setRSVP: PropTypes.func,
  unsave: PropTypes.func,
  inviteFriendRequest: PropTypes.func,
  approveFriendRequest: PropTypes.func,
  declineFriendRequest: PropTypes.func,
  openActionSheet: PropTypes.func,
  isAvatarsShown: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  likePost,
  inviteFriendRequest,
  approveFriendRequest,
  declineFriendRequest,
  openActionSheet,
  followPage,
  joinGroup,
  setRSVP,
  unsave
};

EntityAction = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityAction);
export default EntityAction;
