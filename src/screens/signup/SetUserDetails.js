import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { initSearchAddress } from '/redux/searchAddress/actions';
// import { updateProfile } from '/redux/profile/actions';
// import { joinedCommunity } from '/redux/auth/actions';
import {
  Image,
  Text,
  View,
  TranslatedText,
  ScrollView
} from "src/components/basicComponents";
import { Screen } from "src/components";
import images from "src/assets/images";
import { daytColors, uiConstants, commonStyles } from "src/vars";
import { screenNames, destinationPartitionLevel } from "src/vars/enums";
// import { analytics } from 'src/infra/reporting';
import { get, isEmpty } from "src/infra/utils";
import { translateDate } from "src/infra/utils/dateTimeUtils";
import { navigationService } from "src/infra/navigation";
import OnboardingInputField from "./OnboardingInputField";

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.paleGreyTwo
  },
  mainContent: {
    flex: 1
  },
  headerBackground: {
    height: 260,
    width: "100%"
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT + 30,
    zIndex: 5,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 5
  },
  communityImages: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 16
  },
  communityImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: daytColors.transparent
  },
  destinationImage: {
    marginLeft: -3
  },
  originImage: {
    marginRight: -3
  },
  submitButton: {
    marginTop: 22,
    marginBottom: 22 + uiConstants.FOOTER_MARGIN_BOTTOM,
    textAlign: "center"
  }
});

class SetUserDetails extends Component {
  state = {
    originCity: null,
    destinationNeighborhood: null,
    arrivalDate: null,
    fieldsOpacity: new Animated.Value(0),
    fieldsMarginTop: new Animated.Value(-100)
  };

  render() {
    const { fieldsOpacity, fieldsMarginTop } = this.state;
    // const isShownFields = this.shouldShowFields();

    return (
      <ScrollView style={styles.container} testID="setUserDetailsScroll">
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        {this.renderBackground()}
        {this.renderHeader()}
        <Animated.View
          style={[
            styles.mainContent,
            { opacity: fieldsOpacity, marginTop: fieldsMarginTop }
          ]}
        >
          {this.renderOriginCityField()}
          {this.renderDestinationNeighborhoodField()}
          {this.renderArrivalDateField()}
        </Animated.View>
        {/* {!!isShownFields && this.renderSubmitButton()} */}
        {this.renderSubmitButton()}
      </ScrollView>
    );
  }

  componentDidMount() {
    // const { user } = this.props;
    // analytics.viewEvents
    //   .entityView({
    //     screenName: 'OB - Set Profile',
    //     origin: 'OB - Choose Community',
    //     entityId: user.id,
    //     entityName: user.name
    //   })
    //   .dispatch();

    // if (this.shouldShowFields()) {
    this.animateContentFields();
    // }
  }

  //   componentDidUpdate(prevProps) {
  //     const { community, neighborhood } = this.props;

  //     if (community.destinationPartitionLevel === destinationPartitionLevel.CITY && !prevProps.neighborhood && neighborhood) {
  //       this.animateContentFields();
  //     }
  //   }

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
    const { originCountryName, cityName, community } = this.props;
    //     const { originCountryMedia, destinationMedia } = community;
    //     const originCountryThumbnail = get(originCountryMedia, 'thumbnail');
    //     const destinationThumbnail = get(destinationMedia, 'thumbnail');
    //     const showCommunityImages = !!(originCountryThumbnail && destinationThumbnail);

    return (
      <View style={styles.header}>
        <Text
          bold
          size={32}
          lineHeight={42}
          color={daytColors.white}
          style={commonStyles.textAlignCenter}
        >
          {I18n.t("onboarding.set_user_details.title")}
        </Text>
        <TranslatedText
          size={20}
          lineHeight={30}
          color={daytColors.white}
          style={commonStyles.textAlignCenter}
        >
          {I18n.t("onboarding.set_user_details.community", {
            originCountry: originCountryName,
            destinationCity: cityName
          })}
        </TranslatedText>
        {/* {showCommunityImages && this.renderCommunityImages({ originCountryThumbnail, destinationThumbnail })} */}
        <Text
          size={16}
          lineHeight={19}
          color={daytColors.white}
          onPress={this.onChangeCommunityPress}
        >
          {I18n.t("onboarding.set_user_details.change_community_button")}
        </Text>
      </View>
    );
  }

  //   renderCommunityImages = ({ originCountryThumbnail, destinationThumbnail }) => (
  //     <View style={styles.communityImages}>
  //       <Image source={{ uri: destinationThumbnail }} style={[commonStyles.shadow, styles.communityImage, styles.destinationImage]} />
  //       <Image source={{ uri: originCountryThumbnail }} style={[commonStyles.shadow, styles.communityImage, styles.originImage]} />
  //     </View>
  //   );

  renderOriginCityField() {
    const { originCity } = this.state;
    const { navigation, originCountryName } = this.props;
    const adjustedOriginCountryName = get(
      navigation,
      "state.params.originCountry.name",
      originCountryName
    );
    const value = originCity && originCity.name;
    return (
      <OnboardingInputField
        label={I18n.t("onboarding.set_user_details.origin_city_field.label", {
          originCountry: adjustedOriginCountryName
        })}
        placeholderText={I18n.t(
          "onboarding.set_user_details.origin_city_field.placeholder"
        )}
        placeholderIconName="search"
        onPress={this.navigateToCityPicker}
        value={value}
        isDummy
      />
    );
  }

  renderDestinationNeighborhoodField() {
    const { destinationNeighborhood } = this.state;
    const { navigation, cityName, community, neighborhood } = this.props;
    const destinationCityName = get(
      navigation,
      "state.params.destinationCity.name",
      cityName
    );
    const value = destinationNeighborhood && destinationNeighborhood.name;

    // if (
    //   community.destinationPartitionLevel === destinationPartitionLevel.CITY &&
    //   neighborhood &&
    //   !isEmpty(neighborhood)
    // ) {
    //   return null;
    // }

    return (
      <OnboardingInputField
        label={I18n.t(
          "onboarding.set_user_details.destination_neighbourhood_field.label",
          { destinationCity: destinationCityName }
        )}
        placeholderText={I18n.t(
          `onboarding.set_user_details.destination_${get(
            community,
            "destinationPartitionLevel",
            "neighbourhood"
          )}_field.placeholder`
        )}
        placeholderIconName="search"
        onPress={this.navigateToNeighborhoodPicker}
        value={value}
        isDummy
      />
    );
  }

  renderArrivalDateField() {
    const { arrivalDate } = this.state;
    const { navigation, cityName } = this.props;
    const destinationCity = get(
      navigation,
      "state.params.destinationCity.name",
      cityName
    );
    return (
      <OnboardingInputField
        label={I18n.t("onboarding.set_user_details.arrival_date_field.label", {
          destinationCity
        })}
        placeholderText={I18n.t(
          "onboarding.set_user_details.arrival_date_field.placeholder"
        )}
        placeholderIconName="calendar"
        onPress={this.navigateToDatePicker}
        value={translateDate(arrivalDate)}
        isDummy
      />
    );
  }

  renderSubmitButton = () => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={!this.isSubmitting ? this.submit : null}
      testID="setUserDetailsSubmitButton"
    >
      <Text
        bold
        size={16}
        lineHeight={19}
        color={daytColors.black}
        style={styles.submitButton}
      >
        {I18n.t("onboarding.set_user_details.submit_button")}
      </Text>
    </TouchableOpacity>
  );

  //   onChangeCommunityPress = () => {
  //     const { user } = this.props;
  //     analytics.actionEvents.onboardingChangeCommunity({ userId: user.id }).dispatch();
  //     navigationService.goBack();
  //   };

  //   navigateToCityPicker = () => {
  //     const { navigation, community, initSearchAddress } = this.props;
  //     let placeSearchCountryFilter = get(navigation, 'state.params.originCountry.alpha-2', community.placeSearchCountryFilter);
  //     if (placeSearchCountryFilter) {
  //       placeSearchCountryFilter = placeSearchCountryFilter.toLowerCase();
  //     }
  //     initSearchAddress({ country: placeSearchCountryFilter, types: '(cities)' });
  //     navigationService.navigate(screenNames.SearchAddress, { onAddressChosen: this.onOriginCitySelection });
  //   };

  //   onOriginCitySelection = ({ value, googlePlaceId }) => {
  //     const { user, originCountryName, navigation } = this.props;
  //     const adjustedOriginCountryName = get(navigation, 'state.params.originCountry.name', originCountryName);
  //     analytics.actionEvents.onboardingSetOriginCity({ userId: user.id, country: adjustedOriginCountryName, city: value }).dispatch();
  //     this.setState({ originCity: { name: value, googlePlaceId } });
  //   };

  //   navigateToNeighborhoodPicker = () => {
  //     const { initSearchAddress } = this.props;
  //     initSearchAddress({ isNeighborhoods: true });
  //     navigationService.navigate(screenNames.SearchAddress, { onAddressChosen: this.onDestinationNeighborhoodSelection });
  //   };

  //   onDestinationNeighborhoodSelection = ({ value, id }) => {
  //     const { user, navigation, cityName } = this.props;
  //     const destinationCity = get(navigation, 'state.params.destinationCity.name', cityName);
  //     this.setState({ destinationNeighborhood: { name: value, id } });
  //     analytics.actionEvents.onboardingSetNeighbourhood({ userId: user.id, city: destinationCity, neighbourhood: value }).dispatch();
  //   };

  //   navigateToDatePicker = () => {
  //     const { arrivalDate } = this.state;
  //     navigationService.navigate(screenNames.EditProfileDate, {
  //       data: { date: arrivalDate },
  //       dataFields: ['journeyArrivedDate'],
  //       saveAction: this.onArrivalDateSelection,
  //       header: I18n.t('profile.edit.my_journey.arrival_picker_header'),
  //       subHeader: I18n.t('profile.edit.my_journey.arrival_picker_subheader')
  //     });
  //   };

  //   onArrivalDateSelection = ({ journeyArrivedDate }) => {
  //     const { user } = this.props;
  //     analytics.actionEvents.onboardingSetArrivalDate({ userId: user.id, arrivalDate: journeyArrivedDate }).dispatch();
  //     this.setState({ arrivalDate: journeyArrivedDate });
  //   };

  //   submit = async () => {
  //     const { navigation, joinedCommunity, community, isOnWaitingList, cityName } = this.props;
  //     const destinationCity = get(navigation, 'state.params.destinationCity.name', cityName);

  //     if (this.isSubmitting) {
  //       return;
  //     }
  //     this.isSubmitting = true;
  //     await this.updateProfile();
  //     await joinedCommunity({ communityId: community.id, destinationCity, isOnWaitingList });
  //     navigationService.navigate(screenNames.OnBoardingAddFriends);
  //     this.isSubmitting = false;
  //   };

  //   async updateProfile() {
  //     const { originCity, arrivalDate } = this.state;
  //     const { user, community, updateProfile, navigation, originCountryName } = this.props;
  //     const placeSearchCountryFilter = get(navigation, 'state.params.placeSearchCountryFilter', community.placeSearchCountryFilter);
  //     const adjustedOriginCountryName = get(navigation, 'state.params.originCountry.name', originCountryName);
  //     const destinationNeighborhood = this.state.destinationNeighborhood || this.props.neighborhood;

  //     const dataToSend = {
  //       user: {
  //         journey: {
  //           arrivedDate: arrivalDate,
  //           originGoogleId: originCity && originCity.googlePlaceId,
  //           origin: originCity && originCity.name,
  //           originCountryName: adjustedOriginCountryName,
  //           originPlaceSearchCountryFilter: placeSearchCountryFilter,
  //           currentlyLiveIn: destinationNeighborhood && destinationNeighborhood.name,
  //           currentlyLiveInId: destinationNeighborhood && destinationNeighborhood.id
  //         }
  //       },
  //       communityId: community.id,
  //       settings: {
  //         language: community.defaultLanguage
  //       }
  //     };

  //     await updateProfile({ userId: user.id, delta: { ...dataToSend } });
  //   }

  animateContentFields = () => {
    const { fieldsMarginTop, fieldsOpacity } = this.state;
    Animated.parallel([
      Animated.timing(fieldsMarginTop, { toValue: 30, duration: 1000 }),
      Animated.timing(fieldsOpacity, { toValue: 1, duration: 1000 })
    ]).start();
  };

  //   shouldShowFields = () => {
  //     const { community, user, navigation } = this.props;
  //     const { showFields } = navigation.state.params;

  //     return community.destinationPartitionLevel === destinationPartitionLevel.NEIGHBORHOOD || !!user.journey.neighborhood || showFields;
  //   };
}

// SetUserDetails.propTypes = {
//   user: PropTypes.object,
//   community: PropTypes.object,
//   originCountryName: PropTypes.string,
//   cityName: PropTypes.string,
//   isOnWaitingList: PropTypes.bool,
//   initSearchAddress: PropTypes.func,
//   navigation: PropTypes.object,
//   updateProfile: PropTypes.func,
//   joinedCommunity: PropTypes.func,
//   neighborhood: PropTypes.object
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
//   community: state.auth.user.community,
//   cityName: state.auth.user.community.city || state.auth.user.community.cityName,
//   originCountryName: state.auth.user.community.originCountry || state.auth.user.community.originCountryName,
//   neighborhood: state.auth.user.journey.neighborhood,
//   isOnWaitingList: state.auth.waitingList
// });

// const mapDispatchToProps = { initSearchAddress, updateProfile, joinedCommunity };

// SetUserDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SetUserDetails);
// export default Screen({ modalError: true })(SetUserDetails);
export default SetUserDetails;
