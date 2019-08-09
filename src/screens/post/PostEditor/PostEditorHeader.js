import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Keyboard
} from "react-native";
import I18n from "src/infra/localization";
import { View, Text, Toast } from "src/components/basicComponents";
import { uiConstants, daytColors } from "src/vars";
import { screenNames, editModes } from "src/vars/enums";
import { AwesomeIcon, DaytIcon } from "src/assets/icons";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import UploadHeader from "./UploadHeader";

const MIN_TITLE_HORIZONTAL_MARGIN = 10;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 30 + uiConstants.NAVBAR_TOP_MARGIN,
    paddingBottom: 7,
    paddingHorizontal: 15,
    backgroundColor: daytColors.paleGreyTwo,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90,
    overflow: "hidden"
  },
  middleSection: {
    flex: 1,
    alignItems: "center",
    height: 38
  },
  text: {
    flex: 1
  },
  postInSelector: {
    flexDirection: "row"
  },
  postInIconSelector: {
    marginLeft: 5
  },
  toastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  toastContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  toastIcon: {
    marginRight: 5
  }
});

class PostEditorHeader extends Component {
  state = {
    leftComponentWidth: 0,
    rightComponentWidth: 0
  };

  render() {
    const { uploads, isUploading } = this.props;

    if (uploads && isUploading) {
      return this.renderUploadHeader();
    }

    return (
      <View style={styles.wrapper}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        {this.renderCancelButton()}
        {this.renderMiddleSection()}
        {this.renderSubmitButton()}
        {this.renderToastView()}
      </View>
    );
  }

  renderUploadHeader() {
    const { uploads, uploadIds } = this.props;
    const progress =
      uploadIds.reduce((total, current) => {
        const itemProgress = get(uploads, `[${current}].progress`, 1);
        return total + itemProgress;
      }, 0) / uploadIds.length;

    return <UploadHeader progress={progress} />;
  }

  renderCancelButton() {
    const { onClose } = this.props;
    return (
      <Text
        size={16}
        lineHeight={20}
        color={daytColors.azure}
        onPress={onClose}
        testID="postEditorHeaderCloseButton"
        onLayout={this.calcLeftComponentWidth}
      >
        {I18n.t("common.buttons.cancel")}
      </Text>
    );
  }

  renderMiddleSection() {
    const { leftComponentWidth, rightComponentWidth } = this.state;
    const {
      postType,
      onPostTypePress,
      hasPublishAsSelector,
      isMiddleSectionHidden
    } = this.props;

    const marginRight =
      Math.max(leftComponentWidth - rightComponentWidth, 0) +
      MIN_TITLE_HORIZONTAL_MARGIN;
    const marginLeft =
      Math.max(rightComponentWidth - leftComponentWidth, 0) +
      MIN_TITLE_HORIZONTAL_MARGIN;

    return (
      <View style={[styles.middleSection, { marginLeft, marginRight }]}>
        {!isMiddleSectionHidden && (
          <React.Fragment>
            <Text
              size={16}
              lineHeight={20}
              color={daytColors.b30}
              bold
              style={styles.text}
              onPress={onPostTypePress}
            >
              {I18n.t(`post_editor.post_type_definitions.${postType}.text`)}
            </Text>
            {hasPublishAsSelector && this.renderPublishAsSelector()}
          </React.Fragment>
        )}
      </View>
    );
  }

  renderPublishAsSelector() {
    const { publishAs, isPostAsPickerEnabled } = this.props;

    return (
      <TouchableOpacity
        onPress={
          isPostAsPickerEnabled ? this.navigateToHookedEntitiesList : null
        }
        activeOpacity={0.5}
        style={styles.postInSelector}
      >
        <Text
          fontSize={13}
          lineHeight={15}
          color={daytColors.b60}
          numberOfLines={1}
        >
          {I18n.t("post_editor.post_as", { publisherName: publishAs.name })}
        </Text>
        {isPostAsPickerEnabled && (
          <AwesomeIcon
            name="caret-down"
            size={14}
            color={daytColors.b60}
            weight="solid"
            style={styles.postInIconSelector}
          />
        )}
      </TouchableOpacity>
    );
  }

  renderSubmitButton() {
    const { mode, onSubmit, isSubmitEnabled } = this.props;
    const text =
      mode === editModes.CREATE
        ? I18n.t("post_editor.post_button")
        : I18n.t("post_editor.post_button");

    return (
      <Text
        bold
        size={16}
        lineHeight={20}
        color={isSubmitEnabled ? daytColors.azure : daytColors.b70}
        onPress={isSubmitEnabled ? onSubmit : null}
        testID="postEditorSubmitCommand"
        onLayout={this.calcRightComponentWidth}
      >
        {text}
      </Text>
    );
  }

  renderToastView = () => {
    const { errorsCount, hideToast, isShowToast } = this.props;
    return (
      <Toast
        color={daytColors.red}
        showToast={isShowToast}
        onComplete={hideToast}
        toastTopPosition={-40}
      >
        <View style={styles.toastContainer}>
          <View style={styles.toastContent}>
            <AwesomeIcon
              name="exclamation-circle"
              size={16}
              weight="solid"
              color={daytColors.white}
              style={styles.toastIcon}
            />
            <Text color={daytColors.white}>
              {I18n.p(errorsCount, "post_editor.image_upload_error.toast")}
            </Text>
          </View>
          <DaytIcon
            name="close"
            size={11}
            color={daytColors.white}
            onPress={hideToast}
            hitSlop={uiConstants.BTN_HITSLOP}
          />
        </View>
      </Toast>
    );
  };

  navigateToHookedEntitiesList = () => {
    Keyboard.dismiss();
    const { updatePuplishAsEntity } = this.props;
    navigationService.navigate(screenNames.HookedEntitiesList, {
      saveAction: updatePuplishAsEntity
    });
  };

  calcLeftComponentWidth = e => {
    this.setState({ leftComponentWidth: e.nativeEvent.layout.width });
  };

  calcRightComponentWidth = e => {
    this.setState({ rightComponentWidth: e.nativeEvent.layout.width });
  };
}

PostEditorHeader.propTypes = {
  isMiddleSectionHidden: PropTypes.bool,
  uploads: PropTypes.shape({
    progress: PropTypes.number
  }),
  uploadIds: PropTypes.arrayOf(PropTypes.string),
  isUploading: PropTypes.bool,
  postType: PropTypes.string,
  hasPublishAsSelector: PropTypes.bool,
  publishAs: PropTypes.shape({
    id: PropTypes.string,
    entityType: PropTypes.string,
    name: PropTypes.string,
    media: PropTypes.object
  }),
  errorsCount: PropTypes.number,
  isShowToast: PropTypes.bool,
  hideToast: PropTypes.func,
  onPostTypePress: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  updatePuplishAsEntity: PropTypes.func,
  mode: PropTypes.number,
  isSubmitEnabled: PropTypes.bool,
  isPostAsPickerEnabled: PropTypes.bool
};

PostEditorHeader.defaultProps = {
  isMiddleSectionHidden: false
};

export default PostEditorHeader;
