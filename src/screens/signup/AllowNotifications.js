import React from "react";
import PropTypes from "prop-types";
import { Dimensions, StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { finishedOnBoarding } from "src/redux/auth/actions";
// import { register } from "src/infra/pushNotifications";
// import { analytics } from "/infra/reporting";
import { View, Video, Text, TextButton } from "src/components/basicComponents";
import { Screen } from "src/components";
import { daytColors } from "src/vars";
import { uiConstants } from "src/vars/uiConstants";
import videos from "src/assets/videos";

const VIDEO_RATIO = 1.3186813186813187;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT + 30,
    backgroundColor: daytColors.white
  },
  containerSmallScreen: {
    paddingTop: uiConstants.PHONE_BAR_HEIGHT
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  lowerSection: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 15 + uiConstants.FOOTER_MARGIN_BOTTOM,
    paddingHorizontal: 15
  },
  title: {
    marginBottom: 10,
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  explanationText: {
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
    color: daytColors.black
  },
  lowerSectionSeparator: {
    flex: 1
  },
  lowerSectionButtonsSeparator: {
    width: "100%",
    height: 10
  }
});

const AllowNotifications = (
  {
    // user, finishedOnBoarding
  }
) => {
  let processing;
  const { width, height } = Dimensions.get("window");
  const smallScreen = height <= uiConstants.NORMAL_DEVICE_HEIGHT;

  const allowPushNotifications = async () => {
    if (processing) {
      return;
    }
    // analytics.actionEvents
    //   .onboardingEnableNotificationsPopup({ userId: user.id, enabled: true })
    //   .dispatch();
    processing = true;
    // const token = await register(user.id);
    // if (token) {
    //   finishedOnBoarding();
    // }
  };

  //   const dontAllowPushNotifications = () => {
  //     // analytics.actionEvents
  //     //   .onboardingEnableNotificationsPopup({ userId: user.id, enabled: false })
  //     //   .dispatch();
  //     finishedOnBoarding();
  //   };

  //   analytics.viewEvents
  //     .entityView({
  //       screenName: "OB - Enable Notifications",
  //       origin: "OB - Add pages",
  //       entityId: user.id,
  //       entityName: user.name
  //     })
  //     .dispatch();

  return (
    <View
      style={[styles.container, smallScreen && styles.containerSmallScreen]}
    >
      <View style={{ width, height: width / VIDEO_RATIO }}>
        <Video
          style={styles.video}
          source={videos.welcome.notification}
          onRef={ref => {
            this.player = ref;
          }}
          rate={1.0}
          volume={0}
          muted
          paused={false}
          resizeMode="contain"
          repeat
          progressUpdateInterval={10000}
          onLoadStart={null}
          onLoad={null}
          onProgress={null}
          onEnd={null}
          onError={null}
        />
      </View>
      <View style={styles.lowerSection}>
        <Text style={styles.title} medium>
          {I18n.t("onboarding.allow_notifications.title")}
        </Text>
        <Text style={styles.explanationText}>
          {I18n.t("onboarding.allow_notifications.description")}
        </Text>
        <View style={styles.lowerSectionSeparator} />
        <TextButton size="big50Height" onPress={allowPushNotifications}>
          {I18n.t("onboarding.allow_notifications.approve_button")}
        </TextButton>
        <View style={styles.lowerSectionButtonsSeparator} />
        <TextButton
          size="big50Height"
          secondary
          active
          //   onPress={dontAllowPushNotifications}
          testID="disallowNotificationsButton"
        >
          {I18n.t("onboarding.allow_notifications.decline_button")}
        </TextButton>
      </View>
    </View>
  );
};

AllowNotifications.propTypes = {
  user: PropTypes.object,
  finishedOnBoarding: PropTypes.func
};

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

// const mapDispatchToProps = {
//   finishedOnBoarding
// };

// const wrappedAllowNotifications = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AllowNotifications);
// export default Screen({ modalError: true })(wrappedAllowNotifications);
export default AllowNotifications;
