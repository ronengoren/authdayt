import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from "react-native";
import { View, Text, Image } from "src/components/basicComponents";
import { AvatarsList } from "src/components";
import { AwesomeIcon } from "src/assets/icons";
import { get, isEmpty } from "src/infra/utils";
import images from "src/assets/images";
import { daytColors, commonStyles } from "src/vars";
import { screenNames, locationTypes } from "src/vars/enums";
import { navigationService } from "src/infra/navigation";
import I18n from "src/infra/localization";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  backgroundShadow: {
    position: "absolute",
    margin: 5,
    top: 0,
    left: 0,
    height: 80,
    shadowOffset: {
      width: 0,
      height: 10
    }
  },
  dashedBorder: {
    position: "absolute",
    height: 78,
    top: 6,
    width: 6
  },
  journeyBox: {
    borderWidth: 1,
    borderColor: daytColors.b90,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 90,
    backgroundColor: daytColors.white
  },
  journeyFrom: {
    marginRight: -1
  },
  journeyTo: {
    marginLeft: -1
  },
  locationText: {
    marginTop: 3,
    marginBottom: 5,
    marginHorizontal: 15
  },
  journeyPlane: {
    position: "absolute",
    top: 34,
    backgroundColor: daytColors.white,
    paddingVertical: 2
  },
  usersCount: {
    marginLeft: 3
  },
  aroundUsersDummy: {
    width: 1,
    height: 18
  }
});

class ProfileJourney extends Component {
  render() {
    const { journey, style } = this.props;
    const { width } = Dimensions.get("window");
    if (!journey) return null;

    return (
      <View style={[style, styles.container]}>
        {Platform.OS === "ios" && (
          <View
            style={[
              commonStyles.shadow,
              styles.backgroundShadow,
              { width: width - 30 - 10 }
            ]}
          />
        )}
        {this.renderFromBox()}
        {this.renderToBox()}
        <Image
          source={images.common.dotted_border_vertical}
          style={[styles.dashedBorder, { left: (width - 30) / 2 - 3 }]}
          resizeMode="cover"
        />
        <AwesomeIcon
          name="plane"
          weight="solid"
          color={daytColors.b90}
          size={18}
          style={[styles.journeyPlane, { left: (width - 30 - 20) / 2 }]}
        />
      </View>
    );
  }

  renderFromBox() {
    const { journey, aroundOrigin, isViewingOwnProfile } = this.props;
    const origin = get(journey, "origin");

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={[styles.journeyBox, styles.journeyFrom]}
        onPress={
          origin ? this.navigateToOriginCityUsers : this.navigateToPickOrigin
        }
      >
        <Text
          size={13}
          lineHeight={15}
          color={daytColors.b60}
          numberOfLines={1}
        >
          {isViewingOwnProfile && !origin
            ? I18n.t("profile.view.journey.edit.from.title")
            : I18n.t("profile.view.journey.view.from.title")}
        </Text>
        <Text
          bold
          size={16}
          lineHeight={19}
          color={daytColors.azure}
          style={styles.locationText}
          numberOfLines={1}
        >
          {this.getOriginText()}
        </Text>
        {this.checkIfShouldRenderAroundUsers() &&
          this.renderAroundUsers({ aroundData: aroundOrigin })}
      </TouchableOpacity>
    );
  }

  renderToBox() {
    const { aroundCurrent, journey, isViewingOwnProfile } = this.props;
    const currentlyLiveIn = get(journey, "currentlyLiveIn");
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        style={[styles.journeyBox, styles.journeyTo]}
        onPress={
          !!currentlyLiveIn || isViewingOwnProfile
            ? this.navigateToNeighborhoodUsers
            : null
        }
      >
        <Text
          size={13}
          lineHeight={15}
          color={daytColors.b60}
          numberOfLines={1}
        >
          {isViewingOwnProfile && !currentlyLiveIn
            ? I18n.t("profile.view.journey.edit.to.title")
            : I18n.t("profile.view.journey.view.to.title")}
        </Text>
        <Text
          bold
          size={16}
          lineHeight={19}
          color={daytColors.azure}
          style={styles.locationText}
          numberOfLines={1}
        >
          {this.getDestinationsText()}
        </Text>
        {this.checkIfShouldRenderAroundUsers() &&
          this.renderAroundUsers({ aroundData: aroundCurrent })}
      </TouchableOpacity>
    );
  }

  renderAroundUsers({ aroundData = {} }) {
    const { data, totalCount } = aroundData;

    if (!data || totalCount === 0) {
      return <View style={styles.aroundUsersDummy} />;
    }
    return (
      <View style={commonStyles.flexDirectionRow}>
        <AvatarsList size="extraTiny" list={data} />
        <Text
          size={13}
          lineHeight={17}
          color={daytColors.b60}
          style={styles.usersCount}
        >
          {totalCount}
        </Text>
      </View>
    );
  }

  navigateToPickOrigin = () => {
    const { isViewingOwnProfile, navigateToEditProfile } = this.props;
    isViewingOwnProfile && navigateToEditProfile({ focusField: "origin" });
  };

  navigateToOriginCityUsers = () => {
    const { journey } = this.props;
    navigationService.navigate(screenNames.EntitiesInLocation, {
      name: journey.origin,
      type: locationTypes.ORIGIN,
      coordinates: journey.originCoordinates
    });
  };

  navigateToNeighborhoodUsers = () => {
    const { journey } = this.props;
    navigationService.navigate(screenNames.MyNeighborhoodView, {
      neighborhood: journey.neighborhood
    });
  };

  checkIfShouldRenderAroundUsers = () =>
    !isEmpty(get(this.props, "aroundOrigin.data")) ||
    !isEmpty(get(this.props, "aroundCurrent.data"));

  getOriginText = () => {
    const { journey, isViewingOwnProfile, userCommunity } = this.props;
    const origin = get(journey, "origin");
    const defaultOriginCountry = get(userCommunity, "originCountryName");

    if (origin) {
      return origin;
    }
    if (!isViewingOwnProfile && defaultOriginCountry) {
      return defaultOriginCountry;
    }
    return I18n.t(
      `profile.view.journey.${
        isViewingOwnProfile ? "edit" : "view"
      }.from.placeholder`
    );
  };

  getDestinationsText = () => {
    const { journey, userCommunity, isViewingOwnProfile } = this.props;
    const currentlyLiveIn = get(journey, "currentlyLiveIn");
    const destinationDefaultCity = get(userCommunity, "cityName");
    if (currentlyLiveIn) {
      return currentlyLiveIn;
    }
    if (!isViewingOwnProfile && destinationDefaultCity) {
      return destinationDefaultCity;
    }
    return I18n.t(
      `profile.view.journey.${
        isViewingOwnProfile ? "edit" : "view"
      }.to.placeholder`
    );
  };
}

ProfileJourney.propTypes = {
  navigateToEditProfile: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  aroundCurrent: PropTypes.shape({
    data: PropTypes.array,
    totalCount: PropTypes.number
  }),
  aroundOrigin: PropTypes.shape({
    data: PropTypes.array,
    totalCount: PropTypes.number
  }),
  journey: PropTypes.shape({
    origin: PropTypes.string,
    currentlyLiveIn: PropTypes.string
  }),
  userCommunity: PropTypes.object,
  isViewingOwnProfile: PropTypes.bool
};

export default ProfileJourney;
