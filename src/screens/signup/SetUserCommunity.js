import React from "react";
import PropTypes from "prop-types";
// import { initSearchAddress } from "/redux/searchAddress/actions";
import {
  BackHandler,
  Platform,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import I18n from "/infra/localization";
import { connect } from "react-redux";
// import {
//   setCommunity,
//   updateUserLanguage,
//   addToWaitingList,
//   updateUserDestinationNeighborhood
// } from "/redux/auth/actions";
// import { apiCommand } from "/redux/apiCommands/actions";
// import { analytics } from "/infra/reporting";
import { Image, Text, View, ScrollView } from "/components/basicComponents";
import { Screen } from "/components";
import { DaytIcon } from "/assets/icons";
import { daytColors, uiConstants, commonStyles } from "/vars";
import {
  screenNames,
  destinationPartitionLevel,
  communityTypes
} from "/vars/enums";
import { UserProfilePictureHeader } from "/screens/signup";
import { get, uniqBy, intersectionBy } from "/infra/utils";
import { transparentize } from "/infra/utils/stringUtils";
import { navigationService } from "/infra/navigation";
// import googlePlacesService from "/infra/google/googlePlacesService";
import OnboardingInputField from "./OnboardingInputField";
// import {
//   filterCommunitiesWithSameOriginOrOriginUpperLevel,
//   filterCommunitiesWithDestinationIntersection,
//   filterCommunitiesWithSameDestinationCountry
// } from "./utils";

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.paleGreyTwo
  },
  mainContent: {
    flex: 1
  },
  destinationInputDisabled: {
    backgroundColor: transparentize(daytColors.paleGreyTwo, 80)
  },
  submitButton: {
    marginTop: 22,
    marginBottom: 22 + uiConstants.FOOTER_MARGIN_BOTTOM,
    textAlign: "center"
  },
  suggestedCitiesTitle: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 13
  },
  suggestedCitiesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 18,
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  },
  suggestedCity: {
    width: 70,
    alignItems: "center"
  },
  suggestedCityImageWrapper: {
    marginBottom: 10
  },
  suggestedCityImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: daytColors.lakeBlue,
    overflow: "hidden"
  }
});

class SetUserCommunity extends React.Component {
  state = {
    originCountry: null,
    destinationCity: null
  };

  //   static findMatchedCommunity = async ({
  //     communities,
  //     originCountry,
  //     destinationCity
  //   }) => {
  //     const communitiesWithSameOriginOrOriginUpperLevel = filterCommunitiesWithSameOriginOrOriginUpperLevel(
  //       {
  //         communities,
  //         value: originCountry.name
  //       }
  //     );
  //     const { googlePlaceId } = destinationCity;
  //     const placeInfo = googlePlaceId
  //       ? await googlePlacesService.getPlaceDetails({
  //           googlePlaceId,
  //           fields: ["geometry"]
  //         })
  //       : {};
  //     const communitiesWithDestinationIntersection = filterCommunitiesWithDestinationIntersection(
  //       { communities, viewport: get(placeInfo, "geometry.viewport") }
  //     );
  //     const communitiesWithSameDestinationCountry = filterCommunitiesWithSameDestinationCountry(
  //       {
  //         communities,
  //         value: destinationCity.name,
  //         placeId: googlePlaceId
  //       }
  //     );
  //     const communitiesWithSameDestination = [
  //       ...communitiesWithDestinationIntersection,
  //       ...communitiesWithSameDestinationCountry
  //     ];
  //     const communitiesWithSameOriginAndDestination = intersectionBy(
  //       communitiesWithSameOriginOrOriginUpperLevel,
  //       communitiesWithSameDestination,
  //       "id"
  //     );
  //     return communitiesWithSameOriginAndDestination[0];
  //   };

  //   isFirstScreen = get(
  //     this.props,
  //     "navigation.state.params.isFirstScreen",
  //     false
  //   ); // eslint-disable-line react/sort-comp

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <UserProfilePictureHeader />
        <View style={styles.mainContent}>
          {this.renderOriginField()}
          {this.renderDestinationField()}
        </View>
        {this.renderSubmitButton()}
      </ScrollView>
    );
  }
  renderOriginField() {
    const { originCountry } = this.state;
    // const value = originCountry && originCountry.name;

    return (
      <OnboardingInputField
        label={I18n.t(
          `onboarding.set_user_community.origin_field.${
            // value ?
            "label"
            // : "label_empty_field"
          }`
        )}
        placeholderText={I18n.t(
          "onboarding.set_user_community.origin_field.placeholder"
        )}
        placeholderIconName="search"
        onPress={this.navigateToCountryPicker}
        // value={value}
        testID="signupOriginButton"
        isDummy
      />
    );
  }
  renderDestinationField() {
    const { originCountry, destinationCity } = this.state;
    const value = destinationCity && destinationCity.name;

    return (
      <View>
        <OnboardingInputField
          label={I18n.t(
            `onboarding.set_user_community.destination_field.${
              //   value ?
              "label"
              //    : 'label_empty_field'
            }`
          )}
          placeholderText={I18n.t(
            "onboarding.set_user_community.destination_field.placeholder"
          )}
          placeholderIconName="search"
          onPress={this.navigateToCityPicker}
          //   value={value}
          testID="signupDestinationButton"
          isDummy
        />
        {!originCountry && (
          <View
            style={[StyleSheet.absoluteFill, styles.destinationInputDisabled]}
          />
        )}
      </View>
    );
  }
  renderSubmitButton() {
    const { originCountry, destinationCity } = this.state;
    const isEnabled = !!(originCountry && destinationCity);
    return (
      <TouchableOpacity
        activeOpacity={isEnabled ? 0.5 : 1}
        onPress={isEnabled ? this.submit : null}
        testID="selectCommunitySubmitButton"
      >
        <Text
          bold
          size={16}
          lineHeight={19}
          color={isEnabled ? daytColors.green : daytColors.b70}
          style={styles.submitButton}
        >
          {I18n.t("onboarding.set_user_community.next")}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default SetUserCommunity;
