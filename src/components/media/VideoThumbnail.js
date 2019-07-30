import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { VideoPlayer } from "src/components";
import { View, Text, Video, Image } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import images from "src/assets/images";
import { daytColors } from "src/vars";
import { videoStatus, screenNames, mediaTypes } from "src/vars/enums";
import { formatVideoTime } from "src/infra/utils/dateTimeUtils";
import { navigationService } from "src/infra/navigation";
import { mediaScheme } from "src/schemas/common";
import MediaErrorMessage from "./MediaErrorMessage";

const styles = StyleSheet.create({
  videoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: daytColors.realBlack,
    width: "100%",
    overflow: "hidden"
  },
  localVideoTapOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  playVideoBtnWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: daytColors.transparent
  },
  playBtnWrapper: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: daytColors.halfRealBlack,
    borderWidth: 1,
    borderColor: daytColors.white80
  },
  gifPlayBtnWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 10,
    backgroundColor: daytColors.halfRealBlack,
    borderWidth: 1,
    borderColor: daytColors.white80,
    width: 80,
    height: 40,
    borderRadius: 15
  },
  gifPlayBtnText: {
    fontWeight: "bold",
    paddingLeft: 8
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallPlayBtnWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  // eslint-disable-next-line react-native/no-unused-styles
  mediumPlayBtnWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigPlayBtnWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  playBtn: {
    marginLeft: 4
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },
  videoDuration: {
    position: "absolute",
    bottom: 12,
    left: 15,
    right: 15,
    textAlign: "right",
    backgroundColor: daytColors.transparent
  }
});

class VideoThumbnail extends Component {
  state = {
    showVideoPlayer: false
  };

  static sizes = {
    BIG: "big",
    MEDIUM: "medium",
    SMALL: "small"
  };

  render() {
    const { media, width, maxHeight } = this.props;
    const { thumbnail, videoStatus: mediaStatus, gifInfo } = media;
    const calculatedHeight = width / media.ratio;
    const thumbUrl = gifInfo ? gifInfo.thumbnail : thumbnail;
    this.height = maxHeight
      ? Math.min(maxHeight, calculatedHeight)
      : calculatedHeight;
    if (mediaStatus !== videoStatus.ENCODING_COMPLETED && !gifInfo) {
      return this.renderVideoErrorMessage();
    } else if (thumbUrl) {
      return this.renderVideoThumbnail();
    } else {
      return this.renderVideoPlayer();
    }
  }

  renderVideoErrorMessage = () => {
    const { media, width, maxHeight, size } = this.props;
    const { videoStatus: mediaStatus } = media;

    return (
      <MediaErrorMessage
        type={mediaTypes.VIDEO}
        size={size}
        mediaStatus={mediaStatus}
        width={width}
        height={maxHeight}
      />
    );
  };

  renderVideoPlayer = () => {
    const { media, width, onPress, onLoad, onError } = this.props;
    const { url, duration } = media;

    return (
      <View style={[styles.container, { width, height: this.height }]}>
        <Video
          source={{
            uri: url,
            mainVer: 1,
            patchVer: 0
          }}
          rate={1.0}
          volume={1.0}
          muted
          paused
          resizeMode="contain"
          repeat={false}
          progressUpdateInterval={1000}
          onLoad={onLoad}
          onError={onError}
        />
        <View style={styles.playVideoBtnWrapper}>
          <View style={styles.playBtn}>
            <AwesomeIcon
              name="play"
              size={20}
              color={daytColors.white}
              weight="solid"
            />
          </View>
          <Image
            style={styles.gradient}
            source={images.common.gradientDownTop}
            resizeMode="stretch"
          />
          {!!duration && (
            <Text
              size={14}
              color={daytColors.white}
              lineHeight={15}
              style={styles.videoDuration}
            >
              {formatVideoTime(duration)}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.localVideoTapOverlay}
          activeOpacity={1}
          onPress={onPress || this.openMediaModal}
        />
      </View>
    );
  };

  renderVideoThumbnail = () => {
    const {
      media,
      width,
      onPress,
      size,
      maxHeight,
      shouldStretch,
      onLoad,
      onError,
      onlyThumbnail
    } = this.props;
    const { showVideoPlayer } = this.state;
    const { gifInfo, thumbnail } = media;
    const isGif = !!gifInfo;
    const thumbUrl = isGif ? gifInfo.thumbnail : thumbnail;

    const content = (
      <React.Fragment>
        <Image
          resizeMode="cover"
          style={{ width, height: shouldStretch ? maxHeight : this.height }}
          source={{ uri: thumbUrl }}
          onLoad={onLoad}
          onError={onError}
        />
        <View style={styles.playVideoBtnWrapper}>
          {this.renderPlayButton({ isGif, size })}
          <Image
            style={styles.gradient}
            source={images.common.gradientDownTop}
            resizeMode="stretch"
          />
          {!isGif && !!media.duration && (
            <Text
              size={14}
              color={daytColors.white}
              lineHeight={15}
              style={styles.videoDuration}
            >
              {formatVideoTime(media.duration)}
            </Text>
          )}
        </View>
      </React.Fragment>
    );

    const videoThumbnail = onlyThumbnail ? (
      <View>{content}</View>
    ) : (
      <TouchableOpacity
        onPress={onPress || this.openMediaModal}
        activeOpacity={1}
      >
        {content}
      </TouchableOpacity>
    );

    return (
      <View style={[styles.videoWrapper, { height: maxHeight }]}>
        {!showVideoPlayer ? videoThumbnail : this.renderActiveVideoPlayer()}
      </View>
    );
  };

  renderActiveVideoPlayer = () => {
    const {
      media,
      width,
      maxHeight,
      shouldStretch,
      landscapeMode
    } = this.props;
    const { gifInfo, thumbnail, url } = media;
    const isGif = !!gifInfo;
    const thumbUrl = isGif ? gifInfo.thumbnail : thumbnail;
    const videoUrl = isGif ? gifInfo.video : url;
    return (
      <VideoPlayer
        resizeMode="cover"
        hideDuration
        paused={false}
        url={videoUrl}
        maxHeight={shouldStretch ? maxHeight : this.height}
        width={width}
        ratio={1}
        poster={thumbUrl}
        landscapeMode={landscapeMode}
      />
    );
  };

  renderPlayButton = ({ isGif, size }) =>
    isGif ? (
      <View style={[styles.gifPlayBtnWrapper, styles.gifPlayBtnWrapper]}>
        <AwesomeIcon
          name="play"
          size={size === VideoThumbnail.sizes.SMALL ? 10 : 15}
          color={daytColors.white}
          weight="solid"
          style={styles.playBtn}
        />
        <Text
          color={daytColors.white}
          size={size === VideoThumbnail.sizes.SMALL ? 10 : 15}
          style={styles.gifPlayBtnText}
        >
          GIF
        </Text>
      </View>
    ) : (
      <View style={[styles.playBtnWrapper, styles[`${size}PlayBtnWrapper`]]}>
        <AwesomeIcon
          name="play"
          size={size === VideoThumbnail.sizes.SMALL ? 15 : 20}
          color={daytColors.white}
          weight="solid"
          style={styles.playBtn}
        />
      </View>
    );

  openMediaModal = () => {
    const { media } = this.props;
    const { gifInfo } = media;
    if (gifInfo) {
      this.setState({ showVideoPlayer: true });
    } else {
      navigationService.navigate(screenNames.PostVideoModal, { media });
    }
  };
}

VideoThumbnail.defaultProps = {
  size: VideoThumbnail.sizes.BIG,
  landscapeMode: false
};

VideoThumbnail.propTypes = {
  media: mediaScheme,
  landscapeMode: PropTypes.bool,
  width: PropTypes.number,
  maxHeight: PropTypes.number,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(Object.values(VideoThumbnail.sizes)),
  shouldStretch: PropTypes.bool,
  onlyThumbnail: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};

export default VideoThumbnail;
