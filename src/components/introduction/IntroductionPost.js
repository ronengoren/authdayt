import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import connect from "react-redux/es/connect/connect";
// import { likePost, deletePost } from "/redux/feed/actions";
// import { openActionSheet } from "/redux/general/actions";
import { PostFooter, HtmlText } from "src/components";
import { EntityAction } from "src/components/entity";
import {
  View,
  TranslatedText,
  Image,
  IconButton
} from "src/components/basicComponents";
import images from "src/assets/images";
import { navigationService } from "src/infra/navigation";
import { daytColors, commonStyles } from "src/vars";
import { postTypes, entityTypes } from "src/vars/enums";
// import { introductionPostActionSheetDefinitions } from "./introductionPostActionSheetDefinitions";

const styles = StyleSheet.create({
  wrapper: {
    margin: 15,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: daytColors.white,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3
  },
  postPageWrapper: {
    marginHorizontal: 0
  },
  bodyWrapper: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  bgImageWrapper: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 170,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden"
  },
  bgImage: {
    width: "100%",
    height: "100%"
  },
  menuButton: {
    position: "absolute",
    top: 5,
    right: 0,
    zIndex: 10
  },
  profileImageWrapper: {
    alignSelf: "center",
    width: 135,
    height: 135,
    marginTop: -15,
    marginBottom: 10,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: daytColors.white,
    backgroundColor: daytColors.white
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70
  },
  separator: {
    height: 1,
    marginHorizontal: 15,
    backgroundColor: daytColors.b90
  },
  subHeaderText: {
    marginHorizontal: 15,
    marginBottom: 10,
    textAlign: "center"
  },
  postText: {
    marginHorizontal: 15,
    marginVertical: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: daytColors.b30
  }
});

class IntroductionPost extends React.Component {
  render() {
    return <View style={styles.bodyWrapper} />;
  }

  onMenuClick = () => {
    const { openActionSheet, data } = this.props;
    const actionSheet = introductionPostActionSheetDefinitions({
      post: data,
      deletePostMode: false,
      enterDeleteMode: this.onDelete,
      deletePost: this.handlePostDeletion
    });
    openActionSheet(actionSheet);
  };

  onDelete = () => {
    const { openActionSheet, data } = this.props;
    const actionSheet = introductionPostActionSheetDefinitions({
      post: data,
      deletePostMode: true,
      enterDeleteMode: this.onDelete,
      deletePost: this.handlePostDeletion
    });
    openActionSheet(actionSheet);
  };

  handlePostDeletion = async () => {
    const {
      deletePost,
      data: { id, context }
    } = this.props;
    deletePost({ postId: id, entityId: context && context.id });
  };

  navigateToUserProfile = () => {
    const {
      data: {
        actor: {
          id,
          name,
          media: { thumbnail },
          themeColor
        }
      }
    } = this.props;
    navigationService.navigateToProfile({
      entityId: id,
      data: { name, thumbnail, themeColor }
    });
  };
}

IntroductionPost.propTypes = {
  appUserId: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    about: PropTypes.string
  }),
  isPostPage: PropTypes.bool,
  deletePost: PropTypes.func,
  openActionSheet: PropTypes.func
};

export default IntroductionPost;
