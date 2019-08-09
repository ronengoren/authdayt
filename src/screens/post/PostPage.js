import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { getPost } from "src/redux/postPage/actions";
import { openActionSheet } from "src/redux/general/actions";
import { deletePost } from "src/redux/feed/actions";
import { clearMentionsList } from "src/redux/mentions/actions";
import { apiCommand } from "src/redux/apiCommands/actions";
import {
  Screen,
  Header,
  PostHeader,
  PostContent,
  PostFooter,
  Comment,
  ScrollItemErrorBoundary
} from "src/components";
import { IntroductionPost } from "src/components/introduction";
// // import { ActivationPost } from '/components/activation';
// import { JoinedYourCommunityPost } from "src/components/joinedYourCommunity";
// import { InstagramPassivePostFooter } from "src/components/instagram";
import {
  View,
  IconButton,
  FloatingHeader,
  CommentInput
} from "src/components/basicComponents";
// import { PollPost } from "/components/poll";
import ViewCountsService from "src/infra/viewCounts";
import { daytColors, uiConstants, commonStyles } from "src/vars";
import {
  postTypes,
  listViewTypes,
  screenNames,
  entityTypes,
  originTypes,
  passivePostSubTypes
} from "src/vars/enums";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { PostActionSheetButton } from "src/components/posts";

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.white
  },
  postBody: {
    flex: 1
  },
  listContent: {
    flexGrow: 1
  },
  scrollContainer: {
    flex: 1
  },
  shadowWithMargin: {
    marginBottom: 20,
    ...commonStyles.shadow
  },
  floatingHeaderWrapper: {
    paddingLeft: 0,
    paddingRight: 0,
    height: 65
  },
  headerButtons: {
    position: "absolute",
    top: uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    backgroundColor: daytColors.transparent,
    paddingHorizontal: 10
  }
});

class PostPage extends React.Component {
  state = {
    scrollY: 0,
    throwError: null,
    showFloatingHeader: false
  };

  render() {
    const {
      postPageData,
      showKeyboard,
      postId,
      navigation: {
        state: {
          params: { placeHolder }
        }
      }
    } = this.props;
    const postType = get(postPageData, "post.payload.postType");
    const contextEntity = {
      id: postId,
      type: entityTypes.POST
    };
    const feedContextId = get(postPageData, "post.context.id");
    const isAlternatePostView = [
      postTypes.REAL_ESTATE,
      postTypes.GIVE_TAKE,
      postTypes.JOB,
      postTypes.GUIDE
    ].includes(postType);
    return (
      <CommentInput
        style={styles.container}
        ref={node => {
          this.commentInput = node && node.getWrappedInstance();
        }}
        showKeyboard={showKeyboard}
        screenName={screenNames.PostPage}
        onMentionSearchClosed={this.handleMentionSearchClosed}
        contextEntity={contextEntity}
        topContextEntity={contextEntity}
        placeHolder={placeHolder}
        feedContextId={feedContextId}
        isInputPermanent
      >
        {this.renderPostBody({ isAlternatePostView })}
      </CommentInput>
    );
  }

  componentDidMount = async () => {
    const { getPost, postId } = this.props;

    try {
      await getPost({ postId });
    } catch (err) {
      this.setState({ throwError: err });
    }
  };

  componentDidUpdate(prevProps) {
    const { postPageData, postId } = this.props;
    const prevCommentsCount = get(prevProps, "postPageData.comments.length", 0);
    const commentsCount = get(postPageData, "comments.length", 0);
    const isNewComment = commentsCount > prevCommentsCount;

    if (isNewComment) {
      this.scroller.scrollToEnd();
    }

    if (this.state.throwError) {
      throw this.state.throwError;
    }

    if (!get(prevProps, "postPageData.loaded") && get(postPageData, "loaded")) {
      ViewCountsService.handlePostViewEvent({ id: postId });
    }
  }

  handleMentionSearchClosed = () => {
    this.scroller.scrollToOffset({
      offset: this.state.scrollY,
      animated: false
    });
  };

  renderPostContent = ({ isAlternatePostView }) => {
    const { postPageData, navigation } = this.props;

    const postDataLoaded = postPageData && postPageData.loaded;
    const origin = get(navigation, "state.params.origin");
    if (!postDataLoaded || !postPageData.post) return null;

    const postType = get(postPageData, "post.payload.postType");
    const postSubType = get(postPageData, "post.payload.postSubType");
    const isPollPost =
      get(postPageData.post, "sharedEntity.entity.viewType") ===
        listViewTypes.POLL &&
      get(postPageData.post, "sharedEntity.entity.items");
    const isIntroPost = postType === postTypes.INTRODUCTION;
    const isJoinCommunityPost =
      postType === postTypes.PASSIVE_POST &&
      postSubType === passivePostSubTypes.COMMUNITY_JOINED;
    const isActivationPost = postType === postTypes.ACTIVATION;
    const isInstagramPost =
      postType === postTypes.PASSIVE_POST &&
      postSubType === passivePostSubTypes.INSTAGRAM_CONNECT;

    const isWithShareEntityActionButton = [
      postTypes.REAL_ESTATE,
      postTypes.GIVE_TAKE,
      postTypes.JOB,
      postTypes.GUIDE
    ].includes(postType);

    const { scheduledDate } = postPageData.post;

    if (isPollPost) {
      return (
        <PollPost
          data={postPageData.post}
          originType={originTypes.POST_PAGE}
          isPostPage
        />
      );
    }
    if (isIntroPost) {
      return <IntroductionPost data={postPageData.post} isPostPage />;
    }
    if (isActivationPost) {
      return (
        <ActivationPost
          data={postPageData.post}
          isPostPage
          shouldGoBackOnDeletion
        />
      );
    }
    if (isJoinCommunityPost) {
      return <JoinedYourCommunityPost data={postPageData.post} isPostPage />;
    }

    if (isInstagramPost) {
      return (
        <View style={styles.container}>
          <PostHeader post={postPageData.post} isPostPage />
          <PostContent
            post={postPageData.post}
            isPostPage
            originType={originTypes.POST_PAGE}
          />
          <InstagramPassivePostFooter isPostPage data={postPageData.post} />
        </View>
      );
    }

    return (
      <View testID="postPageBody">
        <View style={[styles.postBody, commonStyles.shadow]}>
          {!isAlternatePostView && (
            <PostHeader post={postPageData.post} isPostPage />
          )}
          <PostContent
            post={postPageData.post}
            origin={origin}
            originType={originTypes.POST_PAGE}
            onAnswerPress={this.handleAnswerPress}
            isPostPage
            isAlternatePostView={isAlternatePostView}
            isWithShareEntityActionButton={isWithShareEntityActionButton}
          />
          {isAlternatePostView && this.renderPostHeaderButtons()}
          {!scheduledDate && (
            <PostFooter
              post={postPageData.post}
              isPostPage
              isWithoutShare={isWithShareEntityActionButton}
            />
          )}
        </View>
      </View>
    );
  };

  renderPostBody = ({ isAlternatePostView }) => {
    const { postPageData, postId, user } = this.props;
    const contextEntity = {
      id: postId,
      type: entityTypes.POST,
      name:
        get(postPageData, "post.payload.title") ||
        get(postPageData, "post.payload.text")
    };
    const feedContextId = get(postPageData, "post.context.id");

    return (
      <React.Fragment>
        {!isAlternatePostView && <Header hasBackButton />}
        <FlatList
          onScroll={this.handleScroll}
          scrollEventThrottle={50}
          style={styles.scrollContainer}
          contentContainerStyle={styles.listContent}
          data={postPageData && postPageData.comments}
          keyExtractor={commentId => commentId}
          renderItem={({ item, index }) => (
            <ScrollItemErrorBoundary boundaryName="commentItem">
              {index === 0 && (
                <View style={[commonStyles.shadow, styles.shadowWithMargin]} />
              )}
              <Comment
                commentId={item}
                contextEntity={contextEntity}
                topContextEntity={contextEntity}
                topEntityOwnership={user.id === postPageData.post.actor.id}
                feedContextId={feedContextId}
                onReplyPress={this.handleReplyPress}
                resetInput={this.resetInput}
              />
            </ScrollItemErrorBoundary>
          )}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          ref={node => {
            this.scroller = node;
          }}
          ListHeaderComponent={this.renderPostContent({ isAlternatePostView })}
        />
        {isAlternatePostView && this.renderFloatingHeader()}
      </React.Fragment>
    );
  };

  renderPostHeaderButtons = () => {
    const { postPageData } = this.props;
    return (
      <View style={styles.headerButtons}>
        <IconButton
          name="back-arrow"
          style={styles.removeIcon}
          iconColor="b30"
          iconSize={26}
          onPress={() => navigationService.goBack()}
          hitSlop={uiConstants.BTN_HITSLOP}
        />
        <PostActionSheetButton
          iconColor="b30"
          isPostPage
          post={postPageData.post}
        />
      </View>
    );
  };

  renderFloatingHeader = () => {
    const { postPageData } = this.props;
    const { showFloatingHeader } = this.state;
    return (
      <FloatingHeader
        key="floatingHeader"
        showFloatingHeader={showFloatingHeader}
        style={styles.floatingHeaderWrapper}
        height={uiConstants.NAVBAR_HEIGHT}
      >
        <Header
          hasBackButton
          titleColor={homeisColors.b30}
          buttonColor="b30"
          backgroundColor={homeisColors.white}
          rightComponent={
            <PostActionSheetButton
              iconColor="b30"
              isPostPage
              post={postPageData && postPageData.post}
            />
          }
        />
      </FloatingHeader>
    );
  };

  handleReplyPress = ({ comment, contextEntity }) =>
    this.commentInput.handleCommentItemReply({ comment, contextEntity });

  handleAnswerPress = () => this.commentInput && this.commentInput.focusInput();

  resetInput = () => this.commentInput.resetInput();

  handleScroll = e => {
    const breakpoint = FloatingHeader.getAdjustedBreakpoint(60);
    const contentOffset = e.nativeEvent.contentOffset.y;
    const { showFloatingHeader } = this.state;

    if (contentOffset > breakpoint && !showFloatingHeader) {
      this.setState({
        showFloatingHeader: true,
        scrollY: e.nativeEvent.contentOffset.y
      });
    } else if (contentOffset < breakpoint && showFloatingHeader) {
      this.setState({
        showFloatingHeader: false,
        scrollY: e.nativeEvent.contentOffset.y
      });
    }
  };
}

PostPage.propTypes = {
  postPageData: PropTypes.object,
  user: PropTypes.object,
  postId: PropTypes.string,
  showKeyboard: PropTypes.bool,
  navigation: PropTypes.object,
  getPost: PropTypes.func
};

// const mapStateToProps = (state, ownProps) => {
//   const postId = ownProps.navigation.state.params.entityId;
//   const { showKeyboard } = ownProps.navigation.state.params;
//   return {
//     user: state.auth.user,
//     postPageData: state.postPage[postId],
//     postId,
//     showKeyboard
//   };
// };

// const mapDispatchToProps = {
//   getPost,
//   apiCommand,
//   openActionSheet,
//   deletePost,
//   clearMentionsList
// };

// PostPage = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PostPage);
// PostPage = Screen()(PostPage);
export default PostPage;
