import React, { Component } from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import { StyleSheet } from "react-native";
import { View, Text } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { videoStatus, mediaTypes } from "src/vars/enums";

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.paleGreyTwo,
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigContainer: {
    padding: 50
  },
  iconWrapper: {
    backgroundColor: daytColors.b90,
    alignItems: "center",
    justifyContent: "center"
  },
  // eslint-disable-next-line react-native/no-unused-styles
  smallIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  // eslint-disable-next-line react-native/no-unused-styles
  mediumIconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  // eslint-disable-next-line react-native/no-unused-styles
  bigIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    color: daytColors.b60,
    textAlign: "center",
    marginTop: 15
  }
});

class MediaErrorMessage extends Component {
  static sizes = {
    BIG: "big",
    MEDIUM: "medium",
    SMALL: "small"
  };

  render() {
    const { type } = this.props;

    switch (type) {
      case mediaTypes.VIDEO:
        return this.renderVideoMessage();
      case mediaTypes.IMAGE:
        return this.renderImageMessage();
      default:
        return null;
    }
  }

  renderVideoMessage() {
    const { mediaStatus, size } = this.props;

    const isEncoding = [
      videoStatus.ENCODING_PROGRESS,
      videoStatus.ENCODING_STARTED,
      videoStatus.UPLOADED
    ].includes(mediaStatus);
    const textPath = isEncoding ? "encoding_progress" : "encoding_error";
    const text = I18n.t(`posts.video.${textPath}.header`);
    const icon = isEncoding ? "video" : "exclamation-circle";
    let iconSize;
    if (isEncoding) {
      iconSize = size === MediaErrorMessage.sizes.BIG ? 30 : 20;
    } else {
      iconSize = size === MediaErrorMessage.sizes.BIG ? 35 : 23;
    }

    return this.renderMessage({ icon, iconSize, text });
  }

  renderImageMessage() {
    const { size } = this.props;
    const text = I18n.t(`posts.image.general_error.header`);
    const icon = "exclamation-circle";
    const iconSize = size === MediaErrorMessage.sizes.BIG ? 35 : 23;

    return this.renderMessage({ icon, iconSize, text });
  }

  renderMessage({ icon, iconSize, text }) {
    const { size, width, height } = this.props;

    return (
      <View
        style={[
          styles.container,
          styles[`${size}Container`],
          { width, height }
        ]}
      >
        <View style={[styles.iconWrapper, styles[`${size}IconWrapper`]]}>
          <AwesomeIcon
            name={icon}
            weight="solid"
            size={iconSize}
            color={daytColors.white}
          />
        </View>
        {[MediaErrorMessage.sizes.BIG, MediaErrorMessage.sizes.MEDIUM].includes(
          size
        ) && <Text style={styles.text}>{text}</Text>}
      </View>
    );
  }
}

MediaErrorMessage.defaultProps = {
  size: "big"
};

MediaErrorMessage.propTypes = {
  mediaStatus: PropTypes.oneOf(Object.values(videoStatus)),
  size: PropTypes.oneOf(Object.values(MediaErrorMessage.sizes)),
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.oneOf(Object.values(mediaTypes))
};

export default MediaErrorMessage;
