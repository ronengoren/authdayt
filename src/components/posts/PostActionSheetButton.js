// import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// // import { apiCommand } from '/redux/apiCommands/actions';
// // import { openActionSheet } from '/redux/general/actions';
// // import { deletePost } from '/redux/feed/actions';
// // import { deleteScheduledPost } from '/redux/scheduledPosts/actions';
// // import { setHiddenPinnedItems } from '/redux/auth/actions';
// // import { highlightEntity, dehighlightEntity } from '/redux/groups/actions';
// import { IconButton } from "src/components/basicComponents";
// import { postActionSheetDefinition } from "src/components/posts";
// import { reportActionSheetDefinition } from "/common/actionsheets";
// import { entityTypes, postTypes, reportTypes } from "/vars/enums";
// import { hiddenPinnedItems as hiddenPinnedItemsLocalStorage } from "/infra/localStorage";
// import { get, isAppAdmin } from "/infra/utils";
// import { navigationService } from "/infra/navigation";
// import { userScheme, mentionsSchema } from "/schemas/common";

// class PostActionSheetButton extends React.Component {
//   render() {
//     const { style, iconColor } = this.props;

//     return (
//       <IconButton
//         name="more"
//         iconColor={iconColor}
//         iconSize={22}
//         onPress={this.onMenuClick}
//         testID="postHeaderMoreBtn"
//         style={style}
//       />
//     );
//   }

//   onMenuClick = () => {
//     const {
//       post,
//       user,
//       openActionSheet,
//       post: { hasPermissions, context, actor },
//       activeHomeTab
//     } = this.props;
//     const isAdmin = isAppAdmin(user);
//     const actionSheet = postActionSheetDefinition({
//       contextEntityId: context.id,
//       contextEntityType: context.type,
//       contextEntityName: context.name,
//       publishAs: actor,
//       onReport: () => this.onReport(isAdmin),
//       post,
//       userId: user.id,
//       enterDeleteMode: this.onDelete,
//       hasPermissions,
//       activeHomeTab,
//       onHidePinnedPost: this.handleHidePinnedPost,
//       onHighlight: this.handleHighlightPost,
//       onDehighlight: this.handleDehighlightPost,
//       onPin: this.handlePinPost,
//       onUnpin: this.handleUnpinPost,
//       canReportBadContent: isAdmin
//     });
//     openActionSheet(actionSheet);
//   };

//   onReport = isAdmin => {
//     const { post, openActionSheet } = this.props;
//     const actionSheet = reportActionSheetDefinition({
//       entityId: post.id,
//       entityType: entityTypes.POST,
//       reports: isAdmin ? [reportTypes.BAD_CONTENT] : undefined
//     });
//     openActionSheet(actionSheet);
//   };

//   onDelete = () => {
//     const { post, user, openActionSheet } = this.props;
//     const actionSheet = postActionSheetDefinition({
//       deletePostMode: true,
//       onReport: this.onReport,
//       post,
//       userId: user.id,
//       deletePost: this.handlePostDeletion
//     });
//     openActionSheet(actionSheet);
//   };

//   handlePostDeletion = async () => {
//     const {
//       isPostPage,
//       deletePost,
//       deleteScheduledPost,
//       post: { id, context, scheduledDate }
//     } = this.props;
//     if (scheduledDate) {
//       deleteScheduledPost({ postId: id });
//     } else {
//       deletePost({ postId: id, entityId: context && context.id });
//     }
//     if (isPostPage) {
//       navigationService.goBack();
//     }
//   };

//   handleHidePinnedPost = async () => {
//     const {
//       post: { id },
//       setHiddenPinnedItems
//     } = this.props;

//     await hiddenPinnedItemsLocalStorage.add(id);
//     setHiddenPinnedItems();
//   };

//   handleHighlightPost = () => {
//     const {
//       highlightEntity,
//       post: {
//         id,
//         context,
//         payload: { postType },
//         sharedEntity,
//         eventType
//       },
//       post
//     } = this.props;
//     let entityId;
//     let entityType;
//     let entityData;
//     if (postType === postTypes.SHARE) {
//       ({ entityId, entityType } = sharedEntity);
//       if (entityType === entityTypes.PAGE) {
//         entityData = sharedEntity.entity.page;
//       } else if (entityType === entityTypes.POST) {
//         entityData = sharedEntity.entity.post;
//       } else {
//         entityData = sharedEntity.entity;
//       }
//     } else {
//       entityId = id;
//       entityType = eventType;
//       entityData = post;
//     }
//     highlightEntity({ groupId: context.id, entityId, entityType, entityData });
//   };

//   handleDehighlightPost = () => {
//     const {
//       dehighlightEntity,
//       post: {
//         id,
//         context,
//         payload: { postType },
//         sharedEntity,
//         eventType
//       }
//     } = this.props;
//     const entityId =
//       sharedEntity && sharedEntity.entity && sharedEntity.highlighted
//         ? sharedEntity.entity.id
//         : id;
//     const entityType =
//       postType === postTypes.SHARE ? sharedEntity.entityType : eventType;
//     dehighlightEntity({ groupId: context.id, entityId, entityType });
//   };

//   handlePinPost = async () => {
//     const {
//       apiCommand,
//       refreshFeed,
//       post: { id }
//     } = this.props;
//     await apiCommand("posts.pin", { postId: id });
//     refreshFeed();
//   };

//   handleUnpinPost = async () => {
//     const {
//       apiCommand,
//       refreshFeed,
//       post: { id }
//     } = this.props;
//     await apiCommand("posts.unpin", { postId: id });
//     refreshFeed();
//   };
// }

// PostActionSheetButton.propTypes = {
//   style: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.array,
//     PropTypes.object
//   ]),
//   post: PropTypes.shape({
//     actor: PropTypes.shape({
//       id: PropTypes.string,
//       thumbnail: PropTypes.string,
//       name: PropTypes.string
//     }),
//     eventTime: PropTypes.string,
//     payload: PropTypes.shape({
//       postType: PropTypes.oneOf(Object.values(postTypes)),
//       text: PropTypes.string,
//       image: PropTypes.string,
//       templateData: PropTypes.object
//     }),
//     context: PropTypes.object,
//     liked: PropTypes.bool,
//     likes: PropTypes.number,
//     comments: PropTypes.number,
//     mentions: mentionsSchema,
//     sharedEntity: PropTypes.shape({
//       entityId: PropTypes.string,
//       entityType: PropTypes.string,
//       entity: PropTypes.object
//     }),
//     hasPermissions: PropTypes.array
//   }),
//   activeHomeTab: PropTypes.string,
//   refreshFeed: PropTypes.func,
//   user: userScheme,
//   isPostPage: PropTypes.bool,
//   deletePost: PropTypes.func,
//   deleteScheduledPost: PropTypes.func,
//   openActionSheet: PropTypes.func,
//   setHiddenPinnedItems: PropTypes.func,
//   apiCommand: PropTypes.func,
//   highlightEntity: PropTypes.func,
//   dehighlightEntity: PropTypes.func,
//   iconColor: PropTypes.string
// };

// PostActionSheetButton.defaultProps = {
//   iconColor: "b80"
// };

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   userHood: get(state, "auth.user.journey.neighborhood", null)
// });

// const mapDispatchToProps = {
//   openActionSheet,
//   deletePost,
//   deleteScheduledPost,
//   setHiddenPinnedItems,
//   apiCommand,
//   highlightEntity,
//   dehighlightEntity
// };

// PostActionSheetButton = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PostActionSheetButton);
// export default PostActionSheetButton;
