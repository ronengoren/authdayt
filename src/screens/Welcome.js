import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  NativeModules
} from "react-native";
import {
  View,
  Text,
  TextButton,
  Image,
  TranslatedText,
  Video
} from "../components/basicComponents";
import Slide from "./Slide";
import I18n from "../infra/localization";

import { Screen, persistentAuth, Slider } from "../components";


import { hasNotch } from "../infra/utils/deviceUtils";

import images from "../assets/images";

import { daytColors, uiConstants } from "../vars";
import { screenNames } from "../vars/enums";
import { isObject } from "../infra/utils";

import { misc as miscLocalStorage } from "../infra/localStorage";

const LOGO_MARGIN_TOP = hasNotch() ? 60 : 25;
const SLIDER_MARGIN_TOP = hasNotch() ? 40 : 0;
const NUMBER_OF_SLIDES = 4;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoPlay: true
    };
  }

  render() {
    const { autoPlay } = this.state;

    const { navigate } = this.props.navigation;
    const { width: screenWidth, height: screenHeight } = Dimensions.get(
      "window"
    );
    const smallScreen =
      screenHeight <=
      uiConstants.NORMAL_DEVICE_HEIGHT +
        Platform.select({ android: 100, ios: 0 });

    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Slider
          withAndroidIntervals
          numberOfSlides={NUMBER_OF_SLIDES}
          autoPlay={autoPlay}
          style={styles.slider}
          showBullets
          sliderWidth={screenWidth}
        >
          {slideProps => [
            <View key={0}>
              <Slide key={0} slide={0} {...slideProps}>
                <TranslatedText
                  style={[
                    styles.subTitle,
                    smallScreen && styles.subTitleSmallScreen
                  ]}
                  textStyle={[
                    styles.subTitleText,
                    smallScreen && styles.subTitleSmallScreen
                  ]}
                >
                  {I18n.t("onboarding.welcome.slide1")}
                </TranslatedText>
              </Slide>
            </View>,
            <View key={1}>
              <Slide key={1} slide={1} {...slideProps}>
                <TranslatedText
                  style={[
                    styles.subTitle,
                    smallScreen && styles.subTitleSmallScreen
                  ]}
                  textStyle={[
                    styles.subTitleText,
                    smallScreen && styles.subTitleSmallScreen
                  ]}
                >
                  {I18n.t("onboarding.welcome.slide2")}
                </TranslatedText>
              </Slide>
            </View>,
            <View key={2}>
              <Slide key={2} slide={2} {...slideProps}>
                <TranslatedText
                  style={[
                    styles.subTitle,
                    smallScreen && styles.subTitleSmallScreen,
                    styles.subTitle1
                  ]}
                  textStyle={[
                    styles.subTitleText,
                    smallScreen && styles.subTitleSmallScreen
                  ]}
                >
                  {I18n.t("onboarding.welcome.slide3")}
                </TranslatedText>
              </Slide>
            </View>,
            <View key={3}>
              <Slide key={3} slide={3} {...slideProps}>
                <TranslatedText
                  style={[
                    styles.subTitle,
                    smallScreen && styles.subTitleSmallScreen,
                    styles.subTitle1
                  ]}
                  textStyle={[
                    styles.subTitleText,
                    smallScreen && styles.subTitleSmallScreen
                  ]}
                >
                  {I18n.t("onboarding.welcome.slide4")}
                </TranslatedText>
              </Slide>
            </View>
          ]}
        </Slider>

        <View style={styles.lowerSection}>
          <TextButton />

          <Text>Welcome9</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT
  },
  lowerSection: {
    height: 80,
    marginBottom: 20 + uiConstants.FOOTER_MARGIN_BOTTOM,
    paddingHorizontal: 15
  },
  footerInnerWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  footerText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
    color: daytColors.placeholderGrey
  },
  footerLink: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
    color: daytColors.black
  },
  logo: {
    alignSelf: "center",
    width: 130,
    height: 30,
    marginTop: LOGO_MARGIN_TOP,
    marginBottom: 30
  },
  slider: {
    marginTop: SLIDER_MARGIN_TOP
  },
  subTitle: {
    marginTop: 20,
    paddingHorizontal: 30,
    alignSelf: "center",
    width: "100%",
    textAlign: "center"
  },
  subTitleText: {
    fontSize: 19,
    lineHeight: 30,
    color: daytColors.black
  },
  subTitleSmallScreen: {
    paddingHorizontal: 15,
    fontSize: 17,
    lineHeight: 22
  },
  subTitle1: {
    paddingHorizontal: 15
  }
});

Welcome.propTypes = {
  navigation: PropTypes.object
};
export default Welcome;
