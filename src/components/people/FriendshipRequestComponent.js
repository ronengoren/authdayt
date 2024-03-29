import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Platform } from "react-native";
import I18n from "src/infra/localization";
import {
  View,
  Text,
  Image,
  NewTextButton
} from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import images from "src/assets/images";
import { daytColors } from "src/vars";
import { stylesScheme, userScheme } from "src/schemas";
import { navigationService } from "src/infra/navigation";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 15,
    marginRight: 15,
    borderRadius: 15
  },
  avatar: {
    width: 140,
    height: 170,
    borderRadius: 15,
    shadowColor: daytColors.boxShadow,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1
  },
  mask: {
    width: 140,
    height: 170,
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: Platform.OS === "ios" ? 15 : 5
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: daytColors.paleGreyTwo
  },
  bottomSection: {
    flexDirection: "row",
    paddingTop: 15,
    paddingHorizontal: 10
  },
  text: {
    position: "absolute",
    left: 10,
    top: 120,
    marginRight: 15
  },
  name: {
    marginBottom: 5
  },
  approveIcon: {
    marginRight: 0,
    color: daytColors.green
  },
  declineIcon: {
    marginRight: 0,
    color: daytColors.red
  },
  declineButton: {
    marginRight: 6
  },
  button: {
    width: 57
  },
  mutualFriends: {
    textAlign: "left",
    marginBottom: 10
  }
});

class FriendshipRequestComponent extends Component {
  render() {
    const {
      data,
      data: { name, numOfMutualFriends },
      showDeclineFriendshipModal,
      onFriendshipRequestApproval,
      style
    } = this.props;
    const mutualFriendsText =
      numOfMutualFriends > 0
        ? I18n.p(numOfMutualFriends, "people.friendship_request.mutual_friends")
        : I18n.t("people.friendship_request.empty_state");
    return (
      <TouchableOpacity
        onPress={this.navigateToUserProfile}
        activeOpacity={1}
        style={[styles.wrapper, style]}
      >
        {this.renderAvatarImage()}
        <Image
          source={images.people.avatar_mask}
          style={styles.mask}
          resizeMode="stretch"
        />
        <View style={styles.text}>
          <Text
            forceLTR
            size={14}
            lineHeight={17}
            bold
            color={daytColors.white}
            style={styles.name}
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text
            size={13}
            lineHeight={15}
            color={daytColors.white}
            style={styles.mutualFriends}
            numberOfLines={1}
          >
            {mutualFriendsText}
          </Text>
        </View>
        <View style={styles.bottomSection}>
          <NewTextButton
            onPress={() => showDeclineFriendshipModal({ declinedUser: data })}
            iconName="times"
            iconSize={18}
            iconWeight="solid"
            size={NewTextButton.sizes.MEDIUM}
            iconStyle={styles.declineIcon}
            style={[styles.button, styles.declineButton]}
          />
          <NewTextButton
            onPress={() => onFriendshipRequestApproval({ approvedUser: data })}
            iconName="check"
            iconSize={16}
            iconWeight="solid"
            size={NewTextButton.sizes.MEDIUM}
            iconStyle={styles.approveIcon}
            style={styles.button}
          />
        </View>
      </TouchableOpacity>
    );
  }

  renderAvatarImage = () => {
    const { media } = this.props.data;

    if (media && media.thumbnail) {
      return <Image source={{ uri: media.thumbnail }} style={styles.avatar} />;
    }

    return (
      <View style={[styles.avatar, styles.avatarPlaceholder]}>
        <DaytIcon name="discover" size={120} color={daytColors.b90} />
      </View>
    );
  };

  navigateToUserProfile = () => {
    const {
      data: {
        id,
        name,
        themeColor,
        media: { thumbnail }
      }
    } = this.props;
    navigationService.navigateToProfile({
      entityId: id,
      data: { name, themeColor, thumbnail }
    });
  };
}

FriendshipRequestComponent.propTypes = {
  data: userScheme,
  onFriendshipRequestApproval: PropTypes.func,
  showDeclineFriendshipModal: PropTypes.func,
  style: stylesScheme
};

export default FriendshipRequestComponent;
