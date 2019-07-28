import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Keyboard, Platform, LayoutAnimation } from "react-native";
import I18n from "src/infra/localization";
import { commonStyles, daytColors } from "src/vars";
import { connect } from "react-redux";
import { Screen, mentionUtils } from "src/components";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Spinner
} from "src/components/basicComponents";
import {
  postTypes,
  entityTypes,
  editModes,
  editorFeaturesTypes,
  screenGroupNames,
  screenNames,
  screenStateTypes,
  uploadStateTypes
} from "src/vars/enums";
import {
  get,
  getFilePathFromLocalUri,
  arrayToStringByKey,
  uniqueId,
  pick,
  isAppAdmin
} from "src/infra/utils";
// import { navigationService } from "src/infra/navigation";
// import { userScheme } from "src/schemas";
// import { HomeTab, DatesPicker } from '/screens';
// import PostEditorHeader from './PostEditorHeader';
// import PostTypePicker from './PostTypePicker';
// import BottomSection from './BottomSection';
// import ContextSlider from './ContextSlider';
// import {
//   RegularPostEditor,
//   SharePostEditor,
//   GuidePostEditor,
//   JobPostEditor,
//   RealEstatePostEditor,
//   GiveTakePostEditor,
//   TitledPostEditor,
//   ListPostEditor,
//   RecommendationPostEditor
// } from './postTypesEditors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.white
  },
  confirmationModalText: {
    paddingHorizontal: 20,
    marginBottom: 30,
    textAlign: "center"
  }
});
class PostEditor extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text
          fontSize={15}
          lineHeight={20}
          color={daytColors.buttonGrey}
          style={styles.confirmationModalText}
        >
          {I18n.t("post_editor.discard_modal.delete_explanation")}
          {I18n.t("post_editor.discard_modal.discard_explanation")}
          {/* {mode === editModes.CREATE
            ? I18n.t("post_editor.discard_modal.delete_explanation")
            : I18n.t("post_editor.discard_modal.discard_explanation")} */}
        </Text>
        <Text
          fontSize={15}
          lineHeight={20}
          color={daytColors.buttonGrey}
          style={styles.confirmationModalText}
        >
          {I18n.t("post_editor.publish_now_modal.proceed_explanation")}
        </Text>
      </View>
    );
  }
}
export default PostEditor;
