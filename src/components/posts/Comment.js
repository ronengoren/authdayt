import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import {
  likeComment,
  deleteComment,
  editComment
} from "src/redux/comments/actions";
import { apiCommand } from "src/redux/apiCommands/actions";
import { openActionSheet } from "src/redux/general/actions";
import { clearMentionsList } from "src/redux/mentions/actions";
import { isDateToday } from "src/infra/utils/dateTimeUtils";
import { navigationService } from "src/infra/navigation";
import { DaytIcon } from "src/assets/icons";
import { Text, View, Avatar, Image } from "src/components/basicComponents";
import { HtmlTextWithLinks } from "src/components";
import { ErrorModal } from "src/components/modals";
import { daytColors } from "src/vars";
import {
  screenNamesByEntityType,
  screenNames,
  entityTypes
} from "src/vars/enums";
import { actorScheme, mediaScheme } from "src/schemas";
import {
  commentActionSheetDefinition,
  commentDeleteActionSheetDefinition,
  reportActionSheetDefinition
} from "src/common/actionsheets";

const isAndroid = Platform.OS === "android";
const IMAGE_HEIGHT = 300;
const REPLY_BTN_AND_COMMENT_OFFSET = isAndroid ? 107 : 83;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: daytColors.white
  },
  wrapperReply: {
    paddingLeft: 55
  },
  leftColumn: {
    marginRight: 10,
    backgroundColor: daytColors.white
  },
  rightColumn: {
    flex: 1
  },
  background: {
    flex: 1,
    backgroundColor: daytColors.paleGreyFour,
    borderRadius: 10,
    paddingTop: 10
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    marginRight: 10
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10
  },
  iconWrapper: {
    paddingRight: 5
  },
  actor: {
    textAlign: "left",
    color: daytColors.black,
    paddingBottom: 5
  },
  timestamp: {
    color: daytColors.buttonGrey
  },
  body: {
    flex: 1,
    marginHorizontal: 10
  },
  textWrapper: {
    marginBottom: 10
  },
  text: {
    textAlign: "left",
    color: daytColors.black
  },
  ctaText: {
    backgroundColor: daytColors.paleGreyFour,
    color: daytColors.placeholderGrey
  },
  footerWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 3
  },
  footerSectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 15
  },
  footerLikesText: {
    marginLeft: "auto"
  },
  footerText: {
    color: daytColors.b30
  },
  icon: {
    marginTop: 2
  },
  moreIcon: {
    color: daytColors.placeholderGrey,
    marginTop: -6
  },
  image: {
    borderRadius: 10,
    overflow: "hidden"
  }
});

class _Comment extends React.Component {
  state = {
    imageWidth: 0
  };

  render() {
    if (!this.props.comment) return null;

    const {
      contextEntity,
      comment: { comments }
    } = this.props;
    const isCommentReply = contextEntity.type === entityTypes.COMMENT;

    return (
      <View>
        <View style={[styles.wrapper, isCommentReply && styles.wrapperReply]}>
          {this.renderLeftColumn()}
          {this.renderRightColumn()}
        </View>
        {comments && !!comments.length && this.renderReplies()}
      </View>
    );
  }

  renderLeftColumn() {
    const {
      contextEntity,
      comment: { actor }
    } = this.props;
    const isCommentReply = contextEntity.type === entityTypes.COMMENT;

    return (
      <View style={styles.leftColumn}>
        <Avatar
          size={isCommentReply ? "tiny" : "small"}
          entityId={actor.id}
          entityType={actor.type}
          name={actor.name}
          themeColor={actor.themeColor}
          thumbnail={actor.media.thumbnail}
        />
      </View>
    );
  }

  renderRightColumn() {
    const {
      comment: { actor, eventTime, text, mentions, media }
    } = this.props;
    const { imageWidth } = this.state;
    const commentTimeText = isDateToday(eventTime)
      ? I18n.t("posts.header.today")
      : "";

    return (
      <View style={styles.rightColumn}>
        <View style={styles.background}>
          <View style={styles.headerWrapper}>
            <View style={styles.headerCenter}>
              <Text
                size={13}
                lineHeight={15}
                bold
                style={styles.actor}
                onPress={this.navigateToActor}
              >
                {actor.name}
              </Text>
              {!!commentTimeText && (
                <Text
                  size={13}
                  lineHeight={15}
                  style={styles.timestamp}
                  forceLTR
                >
                  ・{commentTimeText}
                </Text>
              )}
            </View>
            <TouchableOpacity
              accessibilityTraits="button"
              accessibilityComponentType="button"
              activeOpacity={1}
              onPress={this.handleMoreButtonPress}
            >
              <DaytIcon
                name="more-horizontal"
                size={22}
                style={styles.moreIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={styles.body}
            onLayout={event => {
              this.setState({ imageWidth: event.nativeEvent.layout.width });
            }}
          >
            {!!text && (
              <HtmlTextWithLinks
                text={text}
                mentions={mentions}
                numberOfLines={3}
                style={styles.textWrapper}
                textStyle={styles.text}
                ctaTextStyle={styles.ctaText}
                disableRtl
                selectable
                lineHeight={20}
              />
            )}
            {media && !!media.url && (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.navigateToMediasPage({ media })}
              >
                <Image
                  resizeMode="cover"
                  style={[
                    styles.image,
                    { width: imageWidth, height: IMAGE_HEIGHT }
                  ]}
                  source={{ uri: media.thumbnail || media.url }}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {this.renderFooter()}
      </View>
    );
  }

  renderReplies() {
    const {
      comment,
      comment: { comments },
      topEntityOwnership,
      topContextEntity,
      feedContextId,
      onReplyPress,
      shouldReturnOffset,
      resetInput
    } = this.props;
    return comments.map(commentId => (
      <Comment
        commentId={commentId}
        contextEntity={{
          id: comment.id,
          type: entityTypes.COMMENT
        }}
        topContextEntity={topContextEntity}
        key={commentId}
        onReplyPress={onReplyPress}
        resetInput={resetInput}
        shouldReturnOffset={shouldReturnOffset}
        topEntityOwnership={topEntityOwnership}
        feedContextId={feedContextId}
      />
    ));
  }

  renderFooter() {
    const {
      comment: { liked, likes }
    } = this.props;
    return (
      <View
        style={styles.footerWrapper}
        ref={node => {
          this.footer = node;
        }}
        onLayout={() => {}}
      >
        <TouchableOpacity
          accessibilityTraits="button"
          accessibilityComponentType="button"
          activeOpacity={1}
          style={styles.footerSectionWrapper}
          onPress={this.handleLikePress}
        >
          <DaytIcon
            name={liked ? "like" : "like-secondary-"}
            size={20}
            color={liked ? daytColors.red : daytColors.b30}
            style={styles.iconWrapper}
          />
          <Text
            size={13}
            lineHeight={20}
            color={liked ? daytColors.red : daytColors.b30}
          >
            {I18n.t("posts.comment.like_button")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityTraits="button"
          accessibilityComponentType="button"
          activeOpacity={1}
          style={styles.footerSectionWrapper}
          onPress={this.handleReply}
        >
          <DaytIcon
            name="comment-secondary"
            size={20}
            color={daytColors.b30}
            style={[styles.iconWrapper, styles.icon]}
          />
          <Text style={styles.footerText} size={13} lineHeight={20}>
            {I18n.t("posts.comment.reply_button")}
          </Text>
        </TouchableOpacity>
        {!!likes && (
          <TouchableOpacity
            accessibilityTraits="button"
            accessibilityComponentType="button"
            activeOpacity={1}
            style={styles.footerLikesText}
            onPress={this.navigateToLikedByList}
          >
            <Text style={styles.footerText} size={13} lineHeight={20} medium>
              {I18n.p(likes, "posts.comment.likes")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  navigateToMediasPage = ({ media }) => {
    navigationService.navigate(screenNames.MediaGalleryModal, {
      medias: [media],
      transition: {
        fade: true
      }
    });
  };

  navigateToActor = () => {
    const {
      comment: {
        actor: {
          type,
          id,
          name,
          themeColor,
          media: { thumbnail }
        }
      }
    } = this.props;
    navigationService.navigate(screenNamesByEntityType[type], {
      entityId: id,
      data: { name, themeColor, thumbnail }
    });
  };

  handleLikePress = () => {
    const { comment, likeComment } = this.props;
    likeComment({ comment });
  };

  navigateToLikedByList = () => {
    const {
      comment: { id, likes }
    } = this.props;
    const query = {
      domain: "comments",
      key: "likedBy",
      params: { commentId: id }
    };
    const reducerStatePath = `comments.${id}/likeBy`;
    const title = I18n.t("entity_lists.likers", { likes });
    navigationService.navigate(screenNames.EntitiesList, {
      query,
      reducerStatePath,
      title
    });
  };

  handleMoreButtonPress = () => {
    const { comment, user, openActionSheet, topEntityOwnership } = this.props;
    const isCommentOwner = user.id === comment.actor.id;
    openActionSheet(
      commentActionSheetDefinition({
        isCommentOwner,
        isTopEntityOwner: topEntityOwnership,
        onDelete: this.handleCommentDelete,
        onEdit: this.handleCommentEdit,
        onReport: this.handleCommentReport
      })
    );
  };

  handleCommentEdit = () => {
    const { comment, clearMentionsList, resetInput } = this.props;
    clearMentionsList();
    resetInput();

    navigationService.navigate(screenNames.CommentEditor, {
      comment,
      editComment: this.editComment()
    });
  };

  handleCommentReport = () => {
    const {
      openActionSheet,
      comment: { id }
    } = this.props;
    const data = reportActionSheetDefinition({
      entityId: id,
      entityType: entityTypes.COMMENT
    });
    openActionSheet(data);
  };

  editComment = () => ({ text, mentionsList }) => {
    const {
      editComment,
      comment: { id }
    } = this.props;
    editComment({ commentId: id, text, mentionsList });
  };

  handleReply = () => {
    const {
      comment,
      contextEntity,
      topContextEntity,
      onReplyPress,
      shouldReturnOffset
    } = this.props;
    if (shouldReturnOffset) {
      this.footer.measureInWindow((offsetX, offsetY) => {
        onReplyPress({
          comment,
          contextEntity,
          topContextEntity,
          offsetY: offsetY + REPLY_BTN_AND_COMMENT_OFFSET
        });
      });
    } else {
      onReplyPress({ comment, contextEntity, topContextEntity });
    }
  };

  handleCommentDelete = () => {
    const {
      comment,
      openActionSheet,
      deleteComment,
      contextEntity,
      topContextEntity,
      feedContextId
    } = this.props;
    const commentId = comment.id;
    openActionSheet(
      commentDeleteActionSheetDefinition({
        onDelete: async () => {
          try {
            await deleteComment({
              commentId,
              contextEntity,
              topContextEntity,
              replies: comment.comments,
              feedContextId
            });
          } catch (err) {
            ErrorModal.showAlert();
          }
        }
      })
    );
  };
}

_Comment.propTypes = {
  openActionSheet: PropTypes.func,
  contextEntity: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(entityTypes)),
    id: PropTypes.string
  }),
  topContextEntity: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(entityTypes)),
    id: PropTypes.string
  }),
  topEntityOwnership: PropTypes.bool,
  comment: PropTypes.shape({
    id: PropTypes.string,
    media: mediaScheme,
    actor: actorScheme,
    eventTime: PropTypes.string,
    text: PropTypes.string,
    mentions: PropTypes.array,
    liked: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.array
  }),
  likeComment: PropTypes.func,
  deleteComment: PropTypes.func,
  clearMentionsList: PropTypes.func,
  editComment: PropTypes.func,
  user: PropTypes.object,
  feedContextId: PropTypes.string,
  onReplyPress: PropTypes.func,
  shouldReturnOffset: PropTypes.bool,
  resetInput: PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  comment: state.comments[ownProps.commentId],
  user: state.auth.user
});

const mapDispatchToProps = {
  apiCommand,
  openActionSheet,
  likeComment,
  deleteComment,
  editComment,
  clearMentionsList
};

const Comment = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Comment);
export default Comment;
