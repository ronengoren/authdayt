import React, { Component } from "react";
import { StyleSheet, StatusBar, Dimensions } from "react-native";
import PropTypes from "prop-types";
import {
  Text,
  View,
  IconButton,
  Video,
  Image
} from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { navigationService } from "src/infra/navigation";

const BACK_BUTTON_ICON_SIZE = 32;
const BACK_BUTTON_HIT_SLOP = { left: 15, right: 15, top: 15, bottom: 15 };
const TITLE_TEXT_SIZE = 24;

const styles = StyleSheet.create({
  headerWrapper: {
    zIndex: 1,
    backgroundColor: daytColors.transparent,
    elevation: 4
  },
  innerHeaderWrapper: {
    backgroundColor: daytColors.white
  },
  headerTitleWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20
  },
  media: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%"
  },
  topMedia: {
    zIndex: 1,
    elevation: 1,
    backgroundColor: daytColors.transparent
  },
  backButton: {
    position: "absolute",
    top: (TITLE_TEXT_SIZE - BACK_BUTTON_ICON_SIZE) / 2,
    left: 12,
    zIndex: 2
  }
});

class EntityMediaHeader extends Component {
  constructor(props) {
    super(props);

    this.mediaHeight = Dimensions.get("screen").width * 0.5625;
    this.state = {
      paused: true
    };
  }

  render() {
    const { title, image, video, withBackButton } = this.props;
    const { paused } = this.state;

    return (
      <React.Fragment>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <View style={styles.headerWrapper}>
          <View style={styles.innerHeaderWrapper}>
            <View style={styles.headerTitleWrapper}>
              <Text
                color={daytColors.b30}
                size={TITLE_TEXT_SIZE}
                lineHeight={TITLE_TEXT_SIZE}
                bolder
              >
                {title}
              </Text>
              {withBackButton && this.renderBackButton()}
            </View>
            <View style={{ height: this.mediaHeight }}>
              {image && (
                <Image
                  style={[styles.media, paused && styles.topMedia]}
                  source={image}
                  resizeMode="cover"
                />
              )}
              {video && (
                <Video
                  style={styles.media}
                  // source={video}
                  rate={1.0}
                  volume={0}
                  muted
                  paused={paused}
                  onLoad={this.handleVideoLoad}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        </View>
      </React.Fragment>
    );
  }

  renderBackButton = () => (
    <IconButton
      name="back-arrow"
      iconColor={daytColors.b30}
      iconSize={BACK_BUTTON_ICON_SIZE}
      onPress={navigationService.goBack}
      style={styles.backButton}
      hitSlop={BACK_BUTTON_HIT_SLOP}
    />
  );

  handleVideoLoad = () => {
    setTimeout(() => {
      this.setState({ paused: false });
    }, 1000);
  };
}

EntityMediaHeader.propTypes = {
  title: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  video: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withBackButton: PropTypes.bool
};

export default EntityMediaHeader;
