import React from "react";
import PropTypes from "prop-types";
import { initSearchAddress } from "../../redux/searchAddress/actions";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "../../infra/localization";
import { connect } from "react-redux";
import {
  editImages,
  setCommunity,
  updateUserLanguage,
  addToWaitingList,
  updateUserDestinationNeighborhood
} from "../../redux/auth/actions";
import { apiCommand } from "../../redux/apiCommands/actions";
// import { analytics } from '/infra/reporting';
import {
  Image,
  ImagePlaceholder,
  Text,
  View
} from "../../components/basicComponents";
import { Screen } from "../../components";
import { AwesomeIcon } from "../../assets/icons";
import images from "../../assets/images";
import { daytColors, uiConstants, commonStyles } from "../../vars";
import { entityTypes, mediaTypes, screenNames } from "../../vars/enums";
import { get } from "../../infra/utils";
import { getFirstName } from "../../infra/utils/stringUtils";
import { NativeMediaPicker } from "../../infra/media";
import { navigationService } from "../../infra/navigation";

const styles = StyleSheet.create({
  mainContent: {
    paddingTop: uiConstants.PHONE_BAR_HEIGHT + 30
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 260,
    width: "100%"
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 25
  },
  headerText: {
    textAlign: "center"
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginLeft: 7,
    marginTop: 4
  },
  profileImageWrapper: {
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 30,
    backgroundColor: daytColors.transparent
  },
  userImage: {
    height: 140,
    width: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: daytColors.white
  },
  addImageButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: daytColors.green,
    alignItems: "center",
    justifyContent: "center"
  },
  addYouPhotoText: {
    fontSize: 16,
    marginTop: 10,
    color: daytColors.b30
  }
});

class UserProfilePictureHeader extends React.Component {
  state = {
    profileImage: get(this.props, "user.media.thumbnail", null)
  };

  render() {
    return (
      <React.Fragment>
        {this.renderBackground()}
        <View style={styles.mainContent}>
          {this.renderHeader()}
          {this.renderProfileImage()}
        </View>
      </React.Fragment>
    );
  }

  renderBackground() {
    return (
      <Image
        source={images.onboarding.steps_header_bg}
        style={styles.headerBackground}
        resizeMode="stretch"
      />
    );
  }

  renderHeader() {
    const { user, title, subTitle } = this.props;
    const firstName = getFirstName(user.name);
    return (
      <View style={styles.header}>
        <View style={commonStyles.flexDirectionRow}>
          <Text
            bold
            size={32}
            lineHeight={42}
            color={daytColors.white}
            style={styles.headerText}
          >
            {title ||
              I18n.t("onboarding.user_profile_header.title", { firstName })}
          </Text>
          <Image source={images.chat.hey} style={styles.headerIcon} />
        </View>
        <Text
          size={20}
          lineHeight={30}
          color={daytColors.white}
          style={styles.headerText}
        >
          {subTitle || I18n.t("onboarding.user_profile_header.subtitle")}
        </Text>
      </View>
    );
  }

  renderProfileImage() {
    const { profileImage } = this.state;
    return (
      <View style={[commonStyles.shadow, styles.profileImageWrapper]}>
        <TouchableOpacity activeOpacity={1} onPress={this.handleAddImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.userImage} />
          ) : (
            <ImagePlaceholder
              isAwesomeIcon
              type="circle"
              size="medium"
              iconName="camera"
              iconSize={34}
              text={I18n.t(
                "onboarding.user_profile_header.picture_placeholder"
              )}
              color={daytColors.b30}
              textStyle={styles.addYouPhotoText}
            />
          )}

          {profileImage ? (
            <View activeOpacity={1} style={styles.addImageButton}>
              <AwesomeIcon
                name="camera"
                weight="solid"
                size={18}
                color={daytColors.white}
                onPress={this.handleAddImage}
                style={styles.addImageBtn}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

  handleAddImage = async () => {
    const { editImages, apiCommand, user } = this.props;
    analytics.actionEvents
      .onboardingClickedUploadPicture({ userId: user.id, source: "Browse" })
      .dispatch();
    const res = await NativeMediaPicker.show({ mediaType: mediaTypes.IMAGE });
    if (!res) return;
    const { localUri, fileName } = res;

    navigationService.navigate(screenNames.ImageUpload, {
      localUri,
      fileName,
      entityType: entityTypes.PROFILE,
      onComplete: ({ mediaUrl: profileImage }) => {
        this.setState({ profileImage });
        editImages({
          media: { thumbnail: profileImage, profile: profileImage },
          newUser: true
        });
        apiCommand("profile.editImage", {
          imageUrl: profileImage,
          userId: user.id
        });
      }
    });
  };
}

UserProfilePictureHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  user: PropTypes.object,
  editImages: PropTypes.func,
  apiCommand: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.auth.user,
  communities: state.auth.communities
});

const mapDispatchToProps = {
  editImages,
  initSearchAddress,
  setCommunity,
  updateUserLanguage,
  addToWaitingList,
  updateUserDestinationNeighborhood,
  apiCommand
};

UserProfilePictureHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePictureHeader);
// export default Screen({ modalError: true })(UserProfilePictureHeader);
export default UserProfilePictureHeader;
