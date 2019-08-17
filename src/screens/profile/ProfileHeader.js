import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image, Text, View } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import images from "src/assets/images";
import { daytColors, commonStyles } from "src/vars";
import { mediaTypes, entityTypes, screenNames } from "src/vars/enums";
import { getYearsAgo } from "src/infra/utils/dateTimeUtils";
import I18n from "src/infra/localization";
// import { NativeMediaPicker } from '/infra/media';
import { navigationService } from "src/infra/navigation";
// import ProfileInstagram from './ProfileInstagram';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: daytColors.paleGreyTwo,
    height: 480,
    borderColor: daytColors.b90,
    borderBottomWidth: 1
  },
  content: {
    marginBottom: 15
  },
  wrapperWithPlaceholder: {
    height: 280
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  imageMask: {
    position: "absolute",
    width: "100%",
    height: 240,
    bottom: 0
  },
  imageCta: {
    margin: 15,
    marginTop: 50,
    flex: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 15,
    borderColor: daytColors.azure,
    alignItems: "center",
    justifyContent: "center"
  },
  imagePLaceholderIcon: {
    marginBottom: 11
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  name: {
    marginHorizontal: 15,
    backgroundColor: daytColors.transparent
  },
  arriveTime: {
    marginTop: 5,
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center"
  },
  plane: {
    marginTop: -1,
    marginRight: 7
  }
});

class ProfileHeader extends Component {
  render() {
    const { image, TopComponent, isViewingOwnProfile } = this.props;

    return (
      <View
        style={[
          styles.wrapper,
          !isViewingOwnProfile && !image && styles.wrapperWithPlaceholder
        ]}
      >
        {this.renderImage()}
        {TopComponent || <View />}
        {this.renderContent()}
      </View>
    );
  }

  renderImage() {
    const { isViewingOwnProfile, image, thumbnail } = this.props;

    if (isViewingOwnProfile && !image && !thumbnail) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.handleAddImage}
          style={styles.imageCta}
        >
          <AwesomeIcon
            name="camera"
            size={30}
            weight="solid"
            color={daytColors.azure}
            style={styles.imagePLaceholderIcon}
          />
          <Text color={daytColors.azure} size={16} lineHeight={19}>
            {I18n.t("profile.view.image_placeholder")}
          </Text>
        </TouchableOpacity>
      );
    }

    if (!image && !thumbnail) {
      return (
        <Image
          source={images.profile.imagePlaceholder}
          style={styles.image}
          resizeMode="cover"
          key="image"
        />
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={
          isViewingOwnProfile
            ? this.handleAddImage
            : this.navigateToProfileImageModal
        }
        style={styles.image}
      >
        <Image
          source={{ uri: thumbnail }}
          style={styles.image}
          resizeMode="cover"
          key="thumbnail"
        />
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
          key="image"
        />
        <Image
          style={styles.imageMask}
          source={images.profile.imageGradient}
          resizeMode="stretch"
          key="mask"
        />
      </TouchableOpacity>
    );
  }

  renderContent() {
    const {
      name,
      ButtonsComponent,
      isViewingOwnProfile,
      instagramToken,
      isWithoutBackground
    } = this.props;
    const shouldRenderInstagram = !!(isViewingOwnProfile || instagramToken);

    return (
      <View style={styles.content}>
        <View style={styles.topSection}>
          <View style={commonStyles.flex1}>
            <Text
              bolder
              size={28}
              lineHeight={32}
              color={isWithoutBackground ? daytColors.b30 : daytColors.white}
              style={[
                !isWithoutBackground && commonStyles.textShadow,
                styles.name
              ]}
              testID="profileUserName"
            >
              {name}
            </Text>
            {this.renderJourney()}
          </View>
          {ButtonsComponent}
        </View>
        {/* {shouldRenderInstagram && <ProfileInstagram token={instagramToken} isDarkPlaceholder={isWithoutBackground} />} */}
      </View>
    );
  }

  renderJourney() {
    const {
      journey,
      isViewingOwnProfile,
      isWithoutBackground,
      navigateToEditProfile
    } = this.props;
    const hasJourneyDetails = !!(journey && journey.arrivedDate);

    if (!hasJourneyDetails && !isViewingOwnProfile) {
      return null;
    }

    const forceLocale = I18n.getLocale() === "he" && "en";
    const text = hasJourneyDetails
      ? I18n.t("profile.view.time_of_arrival", {
          timeSince: getYearsAgo(journey.arrivedDate, forceLocale)
        })
      : I18n.t("profile.edit.my_journey.arrival_picker_header");

    const color =
      hasJourneyDetails && !isWithoutBackground
        ? daytColors.white
        : daytColors.azure;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={hasJourneyDetails ? null : navigateToEditProfile}
        style={styles.arriveTime}
      >
        <AwesomeIcon
          name="plane"
          weight="solid"
          color={color}
          size={14}
          style={styles.plane}
        />
        <Text size={16} lineHeight={20} color={color}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

  handleAddImage = async () => {
    const { saveMedia } = this.props;
    const res = await NativeMediaPicker.show({ mediaType: mediaTypes.IMAGE });
    if (!res) return;
    const { localUri, fileName } = res;

    navigationService.navigate(screenNames.ImageUpload, {
      localUri,
      fileName,
      entityType: entityTypes.PROFILE,
      onComplete: saveMedia
    });
  };

  navigateToProfileImageModal = () => {
    const { image } = this.props;
    image &&
      navigationService.navigate(screenNames.MediaModal, {
        mediaUri: image,
        mediaType: mediaTypes.IMAGE
      });
  };
}

ProfileHeader.propTypes = {
  isWithoutBackground: PropTypes.bool,
  journey: PropTypes.object,
  thumbnail: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  ButtonsComponent: PropTypes.node,
  isViewingOwnProfile: PropTypes.bool,
  instagramToken: PropTypes.string,
  navigateToEditProfile: PropTypes.func
};

export default ProfileHeader;
