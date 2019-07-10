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

import { hasNotch } from "../infra/utils/deviceUtils";

import images from "../assets/images";

import { daytColors, uiConstants } from "../vars";
import { screenNames } from "../vars/enums";

const LOGO_MARGIN_TOP = hasNotch() ? 60 : 25;
const SLIDER_MARGIN_TOP = hasNotch() ? 40 : 0;

class Welcome extends React.Component {
  navigateToSignUp = () => {
    this.props.navigation.navigate({
      routeName: "login"
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { width: screenWidth, height: screenHeight } = Dimensions.get(
      "window"
    );

    return (
      <View style={styles.container}>
        <StatusBar translucent={false} barStyle="dark-content" />
        {/* <Image style={styles.logo} source={images.welcome.dayts} /> */}

        <View style={styles.lowerSection}>
          <TextButton />
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
