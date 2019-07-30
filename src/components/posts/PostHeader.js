import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { apiCommand } from "src/redux/apiCommands/actions";
import {
  View,
  Text,
  Avatar,
  TranslatedText
} from "src/components/basicComponents";
import { daytColors } from "src/vars";
import {
  entityTypes,
  postTypes,
  screenNamesByEntityType,
  passivePostSubTypes,
  screenNames
} from "src/vars/enums";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { DaytIcon, AwesomeIcon } from "src/assets/icons";
import { userScheme, mentionsSchema } from "src/schemas/common";
import PostHeaderAddFriendButton from "./PostHeaderAddFriendButton";
import PostActionSheetButton from "./PostActionSheetButton";
import { getPostTimeText } from "./utils";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: daytColors.white
  },
  headerCenter: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10
  },
  headerDetailsText: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  blackText: {
    lineHeight: 19,
    color: daytColors.realBlack
  },
  regularText: {
    lineHeight: 19,
    color: daytColors.b60
  },
  smallText: {
    fontSize: 13,
    lineHeight: 18,
    color: daytColors.b60
  },
  editedIcon: {
    lineHeight: 18
  },
  avatar: {
    justifyContent: "center"
  },
  menuButton: {
    marginRight: -13,
    marginTop: 4
  }
});

class PostHeader extends React.Component {
  constructor(props) {
    super(props);
    const {
      post: {
        payload: { postType, postSubType }
      }
    } = props;
    this.isInstagramConnected =
      postType === postTypes.PASSIVE_POST &&
      postSubType === passivePostSubTypes.INSTAGRAM_CONNECT;
  }

  render() {
    const {
      isPostPage,
      post,
      post: { actor },
      showMenuBtn,
      refreshFeed,
      activeHomeTab
    } = this.props;
    return (
      <View style={styles.header}>
        <Avatar
          entityId={actor.id}
          entityType={actor.type}
          name={actor.name}
          themeColor={actor.themeColor}
          thumbnail={actor.media.thumbnail}
          size="medium1"
          style={styles.avatar}
        />
        <View style={styles.headerCenter}>
          {this.renderTitle()}
          {this.renderDetailsText()}
        </View>
        {showMenuBtn && (
          <PostActionSheetButton
            style={styles.menuButton}
            activeHomeTab={activeHomeTab}
            refreshFeed={refreshFeed}
            isPostPage={isPostPage}
            post={post}
          />
        )}
      </View>
    );
  }

  renderTitle = () => {
    const {
      post: {
        id,
        actor,
        context,
        communityItem,
        payload: { templateData, postType, postSubType },
        sharedEntity,
        inHood
      },
      userHood,
      screenContextType,
      user
    } = this.props;
    let action = () => {
      actor.type === entityTypes.USER
        ? this.navigateToUserPage(actor)
        : this.navigateToEntityPage({
            entityId: actor.id,
            entityType: actor.type,
            groupType: context.payload.groupType
          });
    };
    let text;
    const postInGroupNotInGroupContext =
      context &&
      context.type === entityTypes.GROUP &&
      screenContextType !== entityTypes.GROUP;
    const postInEventNotInEventContext =
      context &&
      context.type === entityTypes.EVENT &&
      screenContextType !== entityTypes.EVENT;
    const postInNeighborhoodNotInNeighborhoodContext =
      context &&
      context.type === entityTypes.NEIGHBORHOOD &&
      screenContextType !== entityTypes.NEIGHBORHOOD;

    if (postInGroupNotInGroupContext) {
      text = I18n.t("posts.header.posted.in_group");
    }
    if (postInEventNotInEventContext) {
      text = I18n.t("posts.header.posted.in_event");
    }
    if (postInNeighborhoodNotInNeighborhoodContext) {
      text = I18n.t("posts.header.posted.in_neighborhood");
    }

    const isGuide = postType === postTypes.GUIDE;
    const isListItemCreated =
      postType === postTypes.PASSIVE_POST &&
      postSubType === passivePostSubTypes.LIST_ITEM_CREATED;

    const isInUserHood =
      userHood &&
      inHood &&
      inHood.some(hood => hood.neighborhoodId === userHood.id);

    if (postType === postTypes.SHARE) {
      const isSharedPost = sharedEntity.entityType === entityTypes.POST;
      const postType = get(sharedEntity, "entity.post.payload.postType");
      const sharedPostActorName = get(sharedEntity, "entity.post.actor.name");
      const isSharedGuide =
        isSharedPost && !!sharedEntity.entity && postType === postTypes.GUIDE;
      const actionText = I18n.t(
        `posts.header.shared.${sharedEntity.entityType}`
      );
      action = () =>
        this.navigateToEntityPage({
          entityId: sharedEntity.entityId,
          entityType: sharedEntity.entityType
        });
      const sharedText =
        templateData && templateData.entityCreation
          ? I18n.t("posts.header.shared.created")
          : I18n.t("posts.header.shared.shared");
      const entityType = I18n.t(
        `entity_type_to_name.${context.type}`
      ).toLowerCase();
      const sharedToEntityText = I18n.t(
        `posts.header.shared.${
          templateData && templateData.entityCreation
            ? "in_entity"
            : "to_entity"
        }`,
        { entityType }
      );
      return (
        <Text numberOfLines={2} forceLTR>
          <Text
            style={styles.blackText}
            onPress={() => this.navigateToActorPage(actor)}
            bold
          >
            {actor.name}
          </Text>
          <Text style={styles.regularText}>{sharedText}</Text>
          {isSharedPost && !!sharedEntity.entity && (
            <TranslatedText
              onPress={() =>
                this.navigateToEntityPage({
                  entityId: sharedEntity.entityId,
                  entityType: sharedEntity.entityType
                })
              }
              map={[
                {
                  text: sharedPostActorName,
                  onPress: () =>
                    this.navigateToActorPage(sharedEntity.entity.post.actor),
                  bold: true
                }
              ]}
              style={styles.blackText}
            >
              {isSharedGuide
                ? I18n.t("posts.header.shared.guide", { name: "%0%" })
                : I18n.t("posts.header.shared.post", { name: "%0%" })}
            </TranslatedText>
          )}
          {!isSharedPost && (
            <Text style={styles.blackText} bold onPress={action}>
              {actionText}
            </Text>
          )}
          {(postInGroupNotInGroupContext || postInEventNotInEventContext) && (
            <Text>
              <Text style={styles.regularText}>{sharedToEntityText}</Text>
              <Text
                style={styles.blackText}
                bold
                onPress={() =>
                  this.navigateToEntityPage({
                    entityId: context.id,
                    entityType: context.type
                  })
                }
              >
                {context.name}
              </Text>
            </Text>
          )}
          {isInUserHood &&
            postInNeighborhoodNotInNeighborhoodContext &&
            this.renderInHoodText({
              text: I18n.t("posts.header.shared.in"),
              hoodName: userHood.name
            })}
          <Text style={styles.regularText}>.</Text>
        </Text>
      );
    } else if (postInGroupNotInGroupContext || postInEventNotInEventContext) {
      return (
        <Text forceLTR numberOfLines={2}>
          <Text onPress={action} style={styles.blackText} bold>
            {actor.name}
          </Text>
          <Text style={styles.regularText}>{text}</Text>
          {actor.type !== entityTypes.GROUP && (
            <Text
              style={styles.blackText}
              bold
              onPress={() =>
                this.navigateToEntityPage({
                  entityId: context.id,
                  entityType: context.type,
                  groupType: context.payload && context.payload.groupType
                })
              }
            >
              {context.name}
            </Text>
          )}
        </Text>
      );
    } else {
      let navigationFunction = null;
      if (actor.type === entityTypes.USER) {
        navigationFunction = () => this.navigateToUserPage(actor);
      } else if (actor.type === entityTypes.PAGE) {
        navigationFunction = () =>
          this.navigateToEntityPage({
            entityId: actor.id,
            entityType: entityTypes.PAGE
          });
      }
      return (
        <Text numberOfLines={2} forceLTR>
          <Text style={styles.blackText} bold onPress={navigationFunction}>
            {actor.name}
          </Text>
          {isGuide && (
            <Text style={styles.regularText}>
              {communityItem && user.id !== actor.id ? "\n" : " "}
              {I18n.t("posts.header.published")}
              <Text
                onPress={() =>
                  this.navigateToEntityPage({
                    entityId: id,
                    entityType: entityTypes.POST
                  })
                }
                style={styles.blackText}
                bold
              >
                {I18n.t("posts.header.guide")}
              </Text>
            </Text>
          )}
          {isListItemCreated && (
            <Text style={styles.regularText}>
              {I18n.t("posts.header.added_list_item")}
              <Text
                onPress={() =>
                  this.navigateToEntityPage({
                    entityId: context.id,
                    entityType: entityTypes.LIST
                  })
                }
                style={styles.blackText}
                bold
              >
                {context.name}
              </Text>
            </Text>
          )}

          {isInUserHood &&
            postInNeighborhoodNotInNeighborhoodContext &&
            this.renderInHoodText({
              text: isListItemCreated
                ? I18n.t("posts.header.shared.in")
                : I18n.t("feed.post_header.posted_in"),
              hoodName: userHood.name
            })}
        </Text>
      );
    }
  };

  renderInHoodText = ({ text, hoodName }) => (
    <Text style={styles.regularText}>
      {text}
      <Text style={styles.blackText} onPress={this.navigateToHood} bold>
        {hoodName}
      </Text>
    </Text>
  );

  renderDetailsText = () => {
    const {
      post: {
        actor,
        actor: { friendshipStatus },
        eventTime,
        edited,
        communityItem,
        injectedPinnedPost,
        payload: { postType },
        scheduledDate
      },
      user,
      apiCommand
    } = this.props;

    if (this.isInstagramConnected) {
      return (
        <Text style={styles.regularText} color={daytColors.b60}>
          {I18n.t("posts.header.connect_instagram")}
        </Text>
      );
    }

    const content = [];
    const separator = index => (
      <Text style={styles.smallText} key={`separator${index}`}>
        {" · "}
      </Text>
    );
    const postTimeText = getPostTimeText(postType, eventTime, scheduledDate);
    if (postTimeText) {
      content.push(
        <Text style={styles.smallText} key="postTime">
          {postTimeText}
        </Text>
      );
    }
    if (injectedPinnedPost) {
      if (postTimeText) {
        content.push(separator(1));
      }
      content.push([
        <AwesomeIcon
          name="thumbtack"
          weight="solid"
          size={11}
          color={daytColors.b70}
          style={styles.editedIcon}
          key="pinnedIcon"
        />,
        <Text style={styles.smallText} key="pinnedText">
          {I18n.t("posts.header.pinned_post")}
        </Text>
      ]);
    } else if (edited) {
      if (postTimeText) {
        content.push(separator(2));
      }
      content.push([
        <DaytIcon
          name="edit"
          size={12}
          color={daytColors.b70}
          style={styles.editedIcon}
          key="editedIcon"
        />,
        <Text style={styles.smallText} key="text">
          {I18n.t("posts.header.edited_post")}
        </Text>
      ]);
    }
    if (
      communityItem &&
      actor.type === entityTypes.USER &&
      user.id !== actor.id
    ) {
      if (postTimeText) {
        content.push(separator(3));
      }
      content.push(
        <PostHeaderAddFriendButton
          userId={actor.id}
          userName={actor.name}
          apiCommand={apiCommand}
          friendshipStatus={friendshipStatus}
          postType={postType}
          key="btn"
        />
      );
    }
    if (content.length) {
      return <View style={styles.headerDetailsText}>{content}</View>;
    }
    return null;
  };

  navigateToUserPage = user => {
    const {
      id,
      name,
      media: { thumbnail },
      themeColor
    } = user;
    navigationService.navigateToProfile({
      entityId: id,
      data: { name, thumbnail, themeColor }
    });
  };

  navigateToEntityPage = ({ entityId, entityType, groupType }) => {
    navigationService.navigate(screenNamesByEntityType[entityType], {
      entityId,
      groupType
    });
  };

  navigateToActorPage = entity => {
    switch (entity.type) {
      case entityTypes.USER:
        this.navigateToUserPage(entity);
        break;
      case entityTypes.PAGE:
      case entityTypes.GROUP:
        this.navigateToEntityPage({
          entityId: entity.id,
          entityType: entity.type
        });
        break;
      default:
        break;
    }
  };

  navigateToHood = () => {
    const { userHood } = this.props;

    navigationService.navigate(screenNames.MyNeighborhoodView, {
      neighborhood: userHood
    });
  };
}

PostHeader.defaultProps = {
  showMenuBtn: true
};

PostHeader.propTypes = {
  post: PropTypes.shape({
    actor: PropTypes.shape({
      id: PropTypes.string,
      thumbnail: PropTypes.string,
      name: PropTypes.string
    }),
    eventTime: PropTypes.string,
    payload: PropTypes.shape({
      postType: PropTypes.oneOf(Object.values(postTypes)),
      text: PropTypes.string,
      image: PropTypes.string,
      templateData: PropTypes.object
    }),
    context: PropTypes.object,
    liked: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.number,
    mentions: mentionsSchema,
    sharedEntity: PropTypes.shape({
      entityId: PropTypes.string,
      entityType: PropTypes.string,
      entity: PropTypes.object
    }),
    hasPermissions: PropTypes.array
  }),
  activeHomeTab: PropTypes.string,
  refreshFeed: PropTypes.func,
  screenContextType: PropTypes.string,
  showMenuBtn: PropTypes.bool,
  user: userScheme,
  userHood: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }),
  isPostPage: PropTypes.bool,
  apiCommand: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.auth.user,
  userHood: get(state, "auth.user.journey.neighborhood", null)
});

const mapDispatchToProps = {
  apiCommand
};

PostHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostHeader);
export default PostHeader;
