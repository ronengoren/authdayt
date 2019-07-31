import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
  Platform
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { turnOffNewUserWelcome } from '/redux/auth/actions';
import { View, Text, Video } from "src/components/basicComponents";
import videos from "src/assets/videos";
import { get } from "src/infra/utils";
import { addSpaceOnCapitalsAndCapitalize } from "src/infra/utils/stringUtils";
// import { analytics } from '/infra/reporting';
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10
  },
  background: {
    height: "100%",
    backgroundColor: daytColors.white
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  bannerWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  bannerInnerWrapper: {
    marginHorizontal: 10,
    height: 106
  },
  upperTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  titleLine1: {
    textAlign: "center"
  },
  titleLine2: {
    marginTop: 10,
    textAlign: "center"
  }
});

class NewUserWelcomeModal extends React.Component {
  constructor(props) {
    super(props);
    const { newUser } = props;
    this.state = {
      showNewUserWelcome: newUser,
      videoLoaded: false,
      opacity: new Animated.Value(1)
    };
  }

  render() {
    const { showNewUserWelcome, opacity, videoLoaded } = this.state;
    const { community } = this.props;
    const screenWidth = Dimensions.get("screen").width;

    return (
      <Modal
        animationType={"none"}
        transparent
        visible={showNewUserWelcome}
        onRequestClose={() => {}}
      >
        {showNewUserWelcome && (
          <Animated.View style={[styles.wrapper, { opacity }]}>
            <View style={[styles.background, { width: screenWidth }]}>
              <Video
                style={styles.video}
                source={videos.welcome.welcome}
                rate={1.0}
                volume={0}
                muted
                paused={false}
                resizeMode="cover"
                repeat
                progressUpdateInterval={10000}
                onLoadStart={null}
                onLoad={this.videoLoadedHandler}
                onProgress={null}
                onEnd={null}
                onError={null}
              />
            </View>
            {videoLoaded && (
              <View style={styles.bannerWrapper}>
                <View style={styles.bannerInnerWrapper}>
                  <View style={styles.upperTitle}>
                    <Text
                      style={styles.titleLine1}
                      bold
                      size={24}
                      lineHeight={30}
                      color={daytColors.b30}
                    >
                      {addSpaceOnCapitalsAndCapitalize(
                        I18n.t(
                          `common.natives_name.${community.originNativesName}`,
                          { defaultValue: community.originCountryName }
                        )
                      )}
                    </Text>
                    <DaytIcon
                      name="dayt-symbol"
                      size={47}
                      color={daytColors.green}
                      style={styles.icon}
                    />
                    <Text
                      style={styles.titleLine1}
                      bold
                      size={24}
                      lineHeight={30}
                      color={daytColors.b30}
                    >
                      {I18n.t(
                        `onboarding.new_user_city.${
                          community.destinationTagName
                        }`,
                        {
                          defaultValue: addSpaceOnCapitalsAndCapitalize(
                            community.cityName
                          )
                        }
                      )}
                    </Text>
                  </View>
                  <Text
                    style={styles.titleLine2}
                    light
                    size={Platform.select({ ios: 32, android: 28 })}
                    lineHeight={Platform.select({ ios: 38, android: 34 })}
                    color={daytColors.b30}
                  >
                    {I18n.t("onboarding.new_user_welcome_message")}
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>
        )}
      </Modal>
    );
  }

  componentDidMount() {
    const { user, newUser, turnOffNewUserWelcome } = this.props;
    if (newUser) {
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 750,
        delay: 5000,
        useNativeDriver: true
      }).start(() => {
        turnOffNewUserWelcome();
        this.setState({ showNewUserWelcome: false });
      });
      analytics.viewEvents
        .entityView({
          screenName: "OB - Joined",
          origin: "OB - Enable Notifications",
          entityId: user.id,
          entityName: user.name
        })
        .dispatch();
    }
  }

  videoLoadedHandler = () => {
    this.setState({ videoLoaded: true });
  };
}

NewUserWelcomeModal.propTypes = {
  user: PropTypes.object,
  newUser: PropTypes.bool,
  turnOffNewUserWelcome: PropTypes.func,
  community: PropTypes.shape({
    destinationTagName: PropTypes.string,
    cityName: PropTypes.string,
    originNativesName: PropTypes.string
  })
};

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
//   newUser: state.auth.newUser,
//   community: get(state, 'auth.user.community')
// });

// const mapDispatchToProps = {
//   turnOffNewUserWelcome
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NewUserWelcomeModal);
export default NewUserWelcomeModal;
