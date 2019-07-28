import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Dimensions } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { upload, cancelUpload } from "src/redux/uploads/actions";
import { apiCommand } from "src/redux/apiCommands/actions";
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

  static renderProgress({ progress }) {
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText} medium>
          {I18n.t("image_upload.uploading")}
        </Text>
        <ProgressBar progress={progress} style={styles.progressBar} />
      </View>
    );
  }

  render() {
    const { activeUploadId, screenStateUploading } = this.state;
    const { uploads, navigation } = this.props;
    // const { params } = navigation.state;
    const { width } = Dimensions.get("window");
    const upload = uploads[activeUploadId];

    return (
      <View style={styles.container}>
        <Header
          title={I18n.t("image_upload.header")}
          hasBackButton
          backAction={this.cancelUploading}
          rightComponent={this.renderHeaderBtn()}
        />
        <View style={styles.innerContainer}>
          <Image
            // source={{ uri: params.localUri }}
            style={[styles.image, { width }]}
            resizeMode="contain"
          />
          {/* {upload &&
            screenStateUploading &&
            ImageUpload.renderProgress({ progress: upload.progress })} */}
        </View>
      </View>
    );
  }

  //   componentDidMount() {
  //     this.upload();
  //   }

  //   componentWillUnmount() {
  //     const { activeUploadId } = this.state;

  //     if (activeUploadId) {
  //       cancelUpload({ uploadId: activeUploadId });
  //     }
  //   }

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

  //   upload = async () => {
  //     const { upload, navigation } = this.props;
  //     const { localUri, fileName, entityType } = navigation.state.params;

  //     const filePath = getFilePathFromLocalUri(localUri);
  //     const { url } = await upload({
  //       entityType,
  //       fileName,
  //       filePath,
  //       onStart: id => this.setState({ activeUploadId: id }),
  //       onFinish: () => this.setState({ activeUploadId: null })
  //     });

  //     if (url) {
  //       this.setState({ mediaUrl: url });

  //       if (this.state.screenStateUploading) {
  //         this.saveFile();
  //       }
  //     }
  //   };

  handleHeaderBtnClick = () => {
    this.state.screenStateUploading ? this.cancelUploading() : this.saveFile();
  };

  async saveFile() {
    const { activeUploadId, mediaUrl } = this.state;
    const { navigation } = this.props;
    const { onComplete } = navigation.state.params;

    if (activeUploadId) {
      this.setState({ screenStateUploading: true });
    } else {
      await onComplete({ mediaUrl });
      navigationService.goBack();
    }
  }

  cancelUploading = () => {
    const { activeUploadId } = this.state;
    const { cancelUpload } = this.props;

    if (activeUploadId) {
      cancelUpload({ uploadId: activeUploadId });
    }
    navigationService.goBack();
  };
}

ImageUpload.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object
  }),
  cancelUpload: PropTypes.func,
  uploads: PropTypes.object
};

// const mapStateToProps = state => ({
//   uploads: state.uploads
// });

// const mapDispatchToProps = { upload, cancelUpload, apiCommand };

// ImageUpload = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ImageUpload);
// ImageUpload = Screen({ modalError: true })(ImageUpload);

export default ImageUpload;
