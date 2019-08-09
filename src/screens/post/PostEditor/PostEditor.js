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
import { navigationService } from "src/infra/navigation";
import { userScheme } from "src/schemas";
import { HomeTab } from "src/screens";
import PostEditorHeader from "./PostEditorHeader";
import PostTypePicker from "./PostTypePicker";
import BottomSection from "./BottomSection";
import ContextSlider from "./ContextSlider";
import Picker from "react-native-wheel-picker";

// import {
//   RegularPostEditor
//   // SharePostEditor,
//   // GuidePostEditor,
//   // JobPostEditor,
//   // RealEstatePostEditor,
//   // GiveTakePostEditor,
//   // TitledPostEditor,
//   // ListPostEditor,
//   // RecommendationPostEditor
// } from "./postTypesEditors";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  confirmationModalText: {
    paddingHorizontal: 20,
    marginBottom: 30,
    textAlign: "center"
  }
});
var PickerItem = Picker.Item;

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 2,
      itemList: [
        "刘备",
        "张飞",
        "关羽",
        "赵云",
        "黄忠",
        "马超",
        "魏延",
        "诸葛亮"
      ]
    };
  }

  onPickerSelect(index) {
    this.setState({
      selectedItem: index
    });
  }

  onAddItem = () => {
    var name = "司马懿";
    if (this.state.itemList.indexOf(name) == -1) {
      this.state.itemList.push(name);
    }
    this.setState({
      selectedItem: this.state.itemList.indexOf(name)
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Picker
          style={{ width: 150, height: 180 }}
          selectedValue={this.state.selectedItem}
          itemStyle={{ color: "white", fontSize: 26 }}
          onValueChange={index => this.onPickerSelect(index)}
        >
          {this.state.itemList.map((value, i) => (
            <PickerItem label={value} value={i} key={"money" + value} />
          ))}
        </Picker>
        <Text style={{ margin: 20, color: "#ffffff" }}>
          你最喜欢的是：{this.state.itemList[this.state.selectedItem]}
        </Text>
        {/* <Text
          fontSize={15}
          lineHeight={20}
          color={daytColors.buttonGrey}
          style={styles.confirmationModalText}
        >
          {I18n.t("post_editor.discard_modal.delete_explanation")}
          {I18n.t("post_editor.discard_modal.discard_explanation")}
          {mode === editModes.CREATE
            ? I18n.t("post_editor.discard_modal.delete_explanation")
            : I18n.t("post_editor.discard_modal.discard_explanation")}
        </Text> */}
        {/* <Text
          fontSize={15}
          lineHeight={20}
          color={daytColors.buttonGrey}
          style={styles.confirmationModalText}
        >
          {I18n.t("post_editor.publish_now_modal.proceed_explanation")}
        </Text> */}
      </View>
    );
  }
}
export default PostEditor;
