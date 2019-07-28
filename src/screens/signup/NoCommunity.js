import React, { Component } from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { setCommunity, updateUserLanguage } from "/redux/auth/actions";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  Image,
  TranslatedText,
  NewTextButton,
  TextInLine,
  ScrollView
} from "src/components/basicComponents";
import { Screen } from "src/components";
import { AwesomeIcon } from "src/assets/icons";
import images from "src/assets/images";
// import { analytics } from "/infra/reporting";
import { navigationService } from "src/infra/navigation";
import { uniqBy } from "src/infra/utils";
import { daytColors, uiConstants, commonStyles } from "src/vars";
import { screenNames } from "src/vars/enums";
// import {
//   filterCommunitiesWithSameOriginOrOriginUpperLevel,
//   filterCommunitiesWithSameDestinationCountry
// } from "./utils";

const OOPS_IMAGE_WIDTH = 100;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: daytColors.paleGreyTwo
  },
  mainContent: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT + 30
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 260,
    width: "100%"
  },
  topSection: {
    height: 250
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 25,
    flex: 1
  },
  subtitle: {
    textAlign: "center"
  },
  oopsImage: {
    width: OOPS_IMAGE_WIDTH,
    height: OOPS_IMAGE_WIDTH
  },
  description: {
    margin: 20,
    textAlign: "center"
  },
  suggestedCommunity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    paddingLeft: 16,
    paddingRight: 20
  },
  suggestedCommunityIcon: {
    marginRight: 9
  },
  changeCommunityButton: {
    flex: 0,
    backgroundColor: daytColors.green,
    margin: 20,
    marginBottom: 20 + uiConstants.FOOTER_MARGIN_BOTTOM,
    height: 55
  },
  changeCommunityButtonText: {
    color: daytColors.white
  },
  changeCommunityHeader: {
    marginTop: 3,
    marginBottom: 2,
    paddingHorizontal: 30
  }
});

class NoCommunity extends Component {
  render() {
    return (
      <ScrollView
        style={commonStyles.flex1}
        contentContainerStyle={styles.container}
      >
        {this.renderBackground()}
        <View style={styles.mainContent}>
          <View style={styles.topSection}>
            {this.renderHeader()}
            {this.renderImage()}
          </View>
          <View style={commonStyles.flex1}>
            {this.renderNoCommunityMessage()}
          </View>
        </View>
      </ScrollView>
    );
  }
  renderBackground() {
    return (
      <Image
        source={images.onboarding.steps_header_bg}
        style={styles.headerBackground}
        resizeMode="stretch"
      />
    );
  }
  renderHeader() {
    // const { navigation } = this.props;
    // const { originCountry, destinationCity } = navigation.state.params;
    // const destinationCityName = destinationCity.name.split(',')[0];
    return (
      <View style={styles.header}>
        <Text bold size={32} lineHeight={42} color={daytColors.white}>
          {I18n.t("onboarding.no_community.title")}
        </Text>
        <TranslatedText
          size={20}
          lineHeight={30}
          color={daytColors.white}
          style={styles.subtitle}
          numberOfLines={2}
        >
          {I18n.t("onboarding.no_community.subtitle", {
            originCountry: "originCountry.name",
            destinationCity: "destinationCityName"
          })}
        </TranslatedText>
      </View>
    );
  }
  renderImage() {
    const { width } = Dimensions.get("window");
    return (
      <Image
        source={images.onboarding.oops}
        style={[styles.oopsImage, { left: (width - OOPS_IMAGE_WIDTH) / 2 }]}
      />
    );
  }
  renderNoCommunityMessage = () => (
    <Text
      size={20}
      lineHeight={30}
      color={daytColors.b30}
      style={styles.description}
    >
      {I18n.t("onboarding.no_community.description")}
    </Text>
  );
}
export default NoCommunity;
