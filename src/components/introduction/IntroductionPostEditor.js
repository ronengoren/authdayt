import React from "react";
import PropTypes from "prop-types";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
// import connect from "react-redux/es/connect/connect";
import { apiCommand } from "src/redux/apiCommands/actions";
// import { updateProfile, getProfile, editImages } from "/redux/profile/actions";
// import { updatePost } from "/redux/feed/actions";
// import { createPost } from "/redux/postPage/actions";
// import { initSearchAddress } from "/redux/searchAddress/actions";
import { ErrorModal } from "src/components/modals";
import {
  View,
  Text,
  TranslatedText,
  Image,
  TextArea,
  NewTextButton
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import images from "src/assets/images";
import { daytColors, commonStyles } from "src/vars";
import {
  entityTypes,
  screenNames,
  mediaTypes,
  editModes,
  postTypes
} from "src/vars/enums";
// import { NativeMediaPicker } from "/infra/media";
import { navigationService } from "src/infra/navigation";
import { getLocaleTimeForFeed } from "src/infra/utils/dateTimeUtils";
import { isRTL } from "src/infra/utils/stringUtils";
import { get } from "src/infra/utils";
// import { analytics } from "/infra/reporting";
import { userScheme } from "src/schemas";

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 15,
    marginHorizontal: 10
  },
  extendedWrapper: {
    marginBottom: 500
  },
  header: {
    alignItems: "center",
    paddingBottom: 25
  },
  headerTopText: {
    marginBottom: 4
  },
  bodyWrapper: {
    paddingBottom: 15,
    borderRadius: 15,
    backgroundColor: daytColors.white
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
  closeIntroductionPostEditorBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10
  },
  profileImageWrapper: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
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
  profileImagePlaceholderText: {
    marginTop: 6,
    textAlign: "center"
  },
  separator: {
    height: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: daytColors.b90
  },
  bodyInnerWrapper: {
    marginHorizontal: 15,
    backgroundColor: daytColors.white
  },
  subHeaderText: {
    marginHorizontal: 15,
    marginBottom: 10,
    textAlign: "center"
  },
  pickerRow: {
    flexDirection: "row",
    marginBottom: 10
  },
  pickerRowRtl: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start"
  },
  pickerRowRight: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1
  },
  pickerRowRightRtl: {
    flexDirection: "row-reverse",
    marginLeft: 3
  },
  pickerRowRightIcon: {
    marginLeft: 5
  },
  pickerRowLeftIcon: {
    marginRight: 5
  },
  textArea: {
    width: "100%",
    minHeight: 80,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: daytColors.b70,
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: daytColors.white,
    lineHeight: 20
  },
  textAreaPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 80,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: daytColors.b70,
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: daytColors.paleGreyTwo
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "bold",
    color: daytColors.white
  }
});

const ORIGIN = "origin";
const CURRENTLY_LIVE_IN = "currentlyLiveIn";

class IntroductionPostEditor extends React.Component {
  render() {
    const { mode, newsFeed } = this.props;
    return <View />;
  }

  renderHeader = () => (
    <View style={styles.header}>
      <Text
        size={22}
        lineHeight={24}
        color={daytColors.realBlack}
        style={styles.headerTopText}
        bold
      >
        {I18n.t("posts.introduction.header.first_line")}
      </Text>
      <Text size={16} lineHeight={22} color={daytColors.b30}>
        {I18n.t("posts.introduction.header.second_line")}
      </Text>
    </View>
  );

  renderBody = () => {
    const {
      user: { name },
      mode
    } = this.props;
    const {
      origin,
      currentlyLiveIn,
      journeyArrivedDate,
      showAboutInput,
      aboutText
    } = this.state;
    const isCreateMode = mode === editModes.CREATE;
    return (
      <View style={[styles.bodyWrapper, commonStyles.shadow]}>
        <View style={styles.bgImageWrapper}>
          <Image
            style={styles.bgImage}
            source={images.introduction.introductionBg}
            resizeMode="cover"
          />
        </View>
        {isCreateMode && (
          <AwesomeIcon
            onPress={this.closeIntroductionPostEditor}
            name="times"
            size={16}
            color={daytColors.b60}
            style={styles.closeIntroductionPostEditorBtn}
          />
        )}
        {this.renderProfilePicture()}
        <TranslatedText
          size={18}
          lineHeight={25}
          color={daytColors.realBlack}
          bold
          style={styles.subHeaderText}
        >
          {I18n.t("posts.introduction.sub_header", { name })}
        </TranslatedText>
        <View style={styles.separator} />
        <View style={styles.bodyInnerWrapper}>
          {this.renderSector({
            action: this.onOriginPressed,
            selectorText: `${I18n.t("posts.introduction.origin_text")} `,
            selectorValue: origin.value || I18n.t("posts.introduction.select"),
            hasError: origin.error
          })}
          {this.renderSector({
            action: this.onCurrentlyLiveInPressed,
            selectorText: `${I18n.t("posts.introduction.current_text")} `,
            selectorValue:
              currentlyLiveIn.value || I18n.t("posts.introduction.select"),
            hasError: currentlyLiveIn.error
          })}
          {this.renderSector({
            action: this.navigateToEditArrivalDate,
            selectorText: `${I18n.t("posts.introduction.arrival_date_text")} `,
            selectorValue: journeyArrivedDate.value
              ? getLocaleTimeForFeed(journeyArrivedDate.value)
              : I18n.t("posts.introduction.when"),
            hasError: journeyArrivedDate.error
          })}
          {showAboutInput ? (
            <TextArea
              style={styles.textArea}
              value={aboutText}
              onChange={val => this.setState({ aboutText: val })}
              autoFocus
              maxHeight={240}
              defaultHeight={80}
              onFocus={this.scrollToInput}
              ref={node => {
                this.titleInput = node;
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={this.openAboutInput}
              style={styles.textAreaPlaceholder}
            >
              <Text size={16} lineHeight={22} color={daytColors.b60}>
                {I18n.t("posts.introduction.about_placeholder")}
              </Text>
            </TouchableOpacity>
          )}
          <View style={commonStyles.flexDirectionRow}>
            <NewTextButton
              onPress={this.submit}
              size={NewTextButton.sizes.BIG45}
              customColor={daytColors.green}
              textStyle={styles.buttonText}
            >
              {I18n.t("posts.introduction.post_action")}
            </NewTextButton>
          </View>
        </View>
      </View>
    );
  };

  renderProfilePicture = () => {
    const {
      user: {
        media: { profile }
      }
    } = this.props;
    const { hasProfileImage } = this.state;
    if (!profile) {
      const color = hasProfileImage ? daytColors.red : daytColors.white;
      const iconColor = hasProfileImage ? daytColors.red : daytColors.green;
      const textColor = hasProfileImage ? daytColors.red : daytColors.b60;
      return (
        <TouchableOpacity
          onPress={this.handleAddImage}
          activeOpacity={0.5}
          style={[
            styles.profileImageWrapper,
            { borderColor: color },
            commonStyles.shadow
          ]}
        >
          <AwesomeIcon
            name="camera"
            size={24}
            weight="solid"
            color={iconColor}
          />
          <Text
            size={13}
            lineHeight={16}
            color={textColor}
            style={styles.profileImagePlaceholderText}
          >
            {I18n.t("posts.introduction.picture_placeholder")}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={[styles.profileImageWrapper, commonStyles.shadow]}>
        <Image source={{ uri: profile }} style={styles.profileImage} />
      </View>
    );
  };

  renderSector = ({ action, selectorText, selectorValue, hasError }) => {
    const isRtlSelectorText = isRTL(selectorText);
    const isRtlSelectorValue = isRTL(selectorValue);
    const borderColor = hasError ? daytColors.red : daytColors.green;
    const textColor = hasError ? daytColors.red : daytColors.realBlack;
    return (
      <TouchableOpacity
        onPress={action}
        activeOpacity={0.5}
        style={[styles.pickerRow, isRtlSelectorText && styles.pickerRowRtl]}
      >
        <Text size={16} lineHeight={30} color={daytColors.b30}>
          {selectorText}
        </Text>
        <View
          style={[
            styles.pickerRowRight,
            isRtlSelectorText && styles.pickerRowRightRtl,
            { borderBottomColor: borderColor }
          ]}
        >
          <Text
            size={16}
            lineHeight={isRtlSelectorText && !isRtlSelectorValue ? 16 : 30}
            color={textColor}
            bold
          >
            {selectorValue}
          </Text>
          <AwesomeIcon
            name="caret-down"
            size={12}
            weight="solid"
            color={textColor}
            style={
              isRtlSelectorText
                ? styles.pickerRowLeftIcon
                : styles.pickerRowRightIcon
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  onOriginPressed = () => {
    const {
      initSearchAddress,
      user: { community, journey }
    } = this.props;
    const placeSearchCountryFilter =
      get(journey, "originCountry.placeSearchCountryFilter") ||
      community.placeSearchCountryFilter;
    initSearchAddress({ country: placeSearchCountryFilter, types: "(cities)" });
    navigationService.navigate(screenNames.SearchAddress, {
      onAddressChosen: this.onChangeHandlerWrapper(ORIGIN)
    });
  };

  onCurrentlyLiveInPressed = () => {
    const { initSearchAddress } = this.props;

    initSearchAddress({ isNeighborhoods: true });
    navigationService.navigate(screenNames.SearchAddress, {
      onAddressChosen: this.onChangeHandlerWrapper(CURRENTLY_LIVE_IN)
    });
  };

  navigateToEditArrivalDate = () => {
    Keyboard.dismiss();
    const { journeyArrivedDate } = this.state;
    navigationService.navigate(screenNames.EditProfileDate, {
      data: { date: journeyArrivedDate.value },
      dataFields: ["journeyArrivedDate"],
      saveAction: date =>
        this.setState({
          journeyArrivedDate: { value: date.journeyArrivedDate, error: false }
        }),
      header: I18n.t("profile.edit.my_journey.arrival_picker_header"),
      subHeader: I18n.t("profile.edit.my_journey.arrival_picker_subheader")
    });
  };

  onChangeHandlerWrapper = field => changes => {
    const clonedChanges = Object.assign({}, changes);
    if (field === ORIGIN) {
      [clonedChanges.value] = changes.value.split(",");
    }
    this.setState({
      [field]: {
        ...this.state[field],
        ...clonedChanges,
        error: false
      }
    });
  };

  handleAddImage = async () => {
    const res = await NativeMediaPicker.show({ mediaType: mediaTypes.IMAGE });
    if (!res) return;
    const { localUri, fileName } = res;

    navigationService.navigate(screenNames.ImageUpload, {
      localUri,
      fileName,
      entityType: entityTypes.PROFILE,
      onComplete: this.saveMedia
    });
  };

  saveMedia = async ({ mediaUrl }) => {
    const {
      editImages,
      user: { id }
    } = this.props;
    this.setState({ hasProfileImage: true });
    await editImages({ userId: id, imageUrl: mediaUrl });
  };

  openAboutInput = () => this.setState({ showAboutInput: true });

  submit = () => {
    Keyboard.dismiss();
    const { mode } = this.props;
    if (this.donePressed || this.validate()) {
      return;
    }

    this.donePressed = true;

    if (mode === editModes.CREATE) {
      this.createPost();
    } else {
      this.submitEditedPost();
    }
  };

  createPost = async () => {
    const {
      user: { id, name },
      createPost
    } = this.props;
    const {
      journeyArrivedDate,
      origin,
      currentlyLiveIn,
      aboutText
    } = this.state;
    const data = {
      postType: postTypes.INTRODUCTION,
      text: aboutText,
      templateData: {
        introText: `${I18n.t("posts.introduction.post_text", {
          origin: origin.value,
          currentlyLiveIn: currentlyLiveIn.value,
          arrivedDate: getLocaleTimeForFeed(journeyArrivedDate.value)
        })}${aboutText ? "\n" : ""}`
      },
      contextId: id,
      contextType: entityTypes.USER
    };

    const analyticsData = {
      postCreatorId: id,
      postCreatorName: name,
      mentions: [],
      screenName: screenNames.IntroductionPostEditorScreen
    };

    await createPost({ data, analyticsData });

    this.updateProfileData();
  };

  submitEditedPost = async () => {
    const { apiCommand, updatePost, postId } = this.props;
    const {
      journeyArrivedDate,
      origin,
      currentlyLiveIn,
      aboutText
    } = this.state;
    try {
      const updatedData = {
        text: aboutText,
        templateData: {
          introText: `${I18n.t("posts.introduction.post_text", {
            origin: origin.value,
            currentlyLiveIn: currentlyLiveIn.value,
            arrivedDate: getLocaleTimeForFeed(journeyArrivedDate.value)
          })}${aboutText ? "\n" : ""}`
        }
      };
      const res = await apiCommand("posts.edit", {
        postId,
        postType: postTypes.INTRODUCTION,
        ...updatedData
      });

      analytics.actionEvents
        .postEdit({
          success: true,
          postId,
          delta: Object.keys(updatedData)
            .map(k => k)
            .join(", ")
        })
        .dispatch();

      this.updateProfileData();
      const { payload } = res.data.data;
      updatePost({ id: postId, payload });
      navigationService.goBack();
    } catch (err) {
      analytics.actionEvents
        .postEdit({
          success: false,
          postId,
          failureReason: err.toString()
        })
        .dispatch();
      ErrorModal.showAlert();
      this.donePressed = false;
      throw err;
    }
  };

  updateProfileData = async () => {
    const {
      user: { id },
      updateProfile,
      getProfile
    } = this.props;
    const {
      journeyArrivedDate,
      origin,
      currentlyLiveIn,
      aboutText
    } = this.state;
    const updatedProfileData = { settings: { showIntroPost: false } };
    let journey = { arrivedDate: journeyArrivedDate.value };
    if (origin.googlePlaceId) {
      journey = {
        ...journey,
        originGoogleId: origin.googlePlaceId,
        origin: origin.value
      };
    }
    if (currentlyLiveIn.id) {
      journey = {
        ...journey,
        currentlyLiveIn: currentlyLiveIn.value,
        currentlyLiveInId: currentlyLiveIn.id
      };
    }
    if (aboutText) {
      const { bio } = await getProfile({ userId: id });
      if (!bio) {
        updatedProfileData.bio = aboutText;
      }
    }
    updatedProfileData.user = { journey };
    updateProfile({ userId: id, delta: updatedProfileData });
  };

  validate = () => {
    const {
      user: {
        media: { profile }
      }
    } = this.props;
    const { journeyArrivedDate, origin, currentlyLiveIn } = this.state;
    let newState = {};
    let hasErrors = false;
    if (!profile) {
      newState = { hasProfileImage: true };
      hasErrors = true;
    }
    if (!journeyArrivedDate.value) {
      newState = { ...newState, journeyArrivedDate: { error: true } };
      hasErrors = true;
    }
    if (!origin.value) {
      newState = { ...newState, origin: { error: true } };
      hasErrors = true;
    }
    if (!currentlyLiveIn.value) {
      newState = { ...newState, currentlyLiveIn: { error: true } };
      hasErrors = true;
    }
    this.setState({ ...this.state, ...newState });
    return hasErrors;
  };

  closeIntroductionPostEditor = () => {
    const {
      user: { id },
      updateProfile
    } = this.props;
    updateProfile({
      userId: id,
      delta: { settings: { showIntroPost: false } }
    });
  };

  onLayout = ({ nativeEvent }) => {
    this.height = nativeEvent.layout.height;
  };

  scrollToInput = () => {
    const { scrollToOffset, mode } = this.props;
    if (mode === editModes.CREATE) {
      scrollToOffset({ offset: this.height + 60 });
    }
  };
}

IntroductionPostEditor.defaultProps = {
  mode: editModes.CREATE
};

IntroductionPostEditor.propTypes = {
  user: userScheme,
  postId: PropTypes.string,
  text: PropTypes.string,
  mode: PropTypes.oneOf(Object.values(editModes)),
  createPost: PropTypes.func,
  updatePost: PropTypes.func,
  apiCommand: PropTypes.func,
  updateProfile: PropTypes.func,
  getProfile: PropTypes.func,
  editImages: PropTypes.func,
  initSearchAddress: PropTypes.func,
  scrollToOffset: PropTypes.func,
  newsFeed: PropTypes.array
};

export default IntroductionPostEditor;
