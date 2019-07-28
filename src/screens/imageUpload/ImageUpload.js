import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Dimensions } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { upload, cancelUpload } from "src/redux/uploads/actions";
// import { apiCommand } from "src/redux/apiCommands/actions";
import { Screen, Header } from "src/components";
import { View, Text, Image, ProgressBar } from "src/components/basicComponents";
import { getFilePathFromLocalUri } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    backgroundColor: daytColors.white,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15
  },
  progressText: {
    fontSize: 13,
    marginRight: 15
  },
  progressBar: {
    flex: 1
  },
  image: {
    height: "100%"
  },
  headerBtn: {
    paddingVertical: 5,
    paddingHorizontal: 5
  }
});

class ImageUpload extends Component {
  state = {
    activeUploadId: null,
    screenStateUploading: true
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          title={I18n.t("image_upload.header")}
          hasBackButton
          backAction={this.cancelUploading}
          rightComponent={this.renderHeaderBtn()}
        />
        <View style={styles.innerContainer} />

        <Text style={styles.progressText} medium>
          {I18n.t("image_upload.uploading")}
        </Text>
      </View>
    );
  }
  renderHeaderBtn = () => {
    const btnText = this.state.screenStateUploading
      ? I18n.t("image_upload.cancel_button")
      : I18n.t("image_upload.save_button");
    return (
      <Text
        medium
        color={daytColors.azure}
        onPress={this.handleHeaderBtnClick}
        style={styles.headerBtn}
      >
        {btnText}
      </Text>
    );
  };
}

export default ImageUpload;
