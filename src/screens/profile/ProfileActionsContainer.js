import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { View, NewTextButton } from "src/components/basicComponents";

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftActionBtn: {
    marginRight: 5
  },
  rightActionBtn: {
    marginLeft: 5
  }
});

const ProfileActionsContainer = ({
  isFriend,
  requestedFriendship,
  requestFriendship,
  receivedFriendshipRequest,
  declinedFriendship,
  respondToRequest,
  cancelFriendshipRequest,
  unFriend,
  navigateToConversation
}) => (
  <View style={styles.actionsContainer}>
    {isFriend && (
      <NewTextButton
        style={styles.leftActionBtn}
        size="medium"
        active
        iconName="friends-"
        onPress={unFriend}
        iconSize={25}
      >
        {I18n.t("common.buttons.friends")}
      </NewTextButton>
    )}
    {(requestedFriendship || declinedFriendship) && (
      <NewTextButton
        style={styles.leftActionBtn}
        secondary
        size="medium"
        onPress={declinedFriendship ? null : cancelFriendshipRequest}
      >
        {I18n.t("common.buttons.request_sent")}
      </NewTextButton>
    )}
    {receivedFriendshipRequest && (
      <NewTextButton
        style={styles.leftActionBtn}
        size="medium"
        onPress={respondToRequest}
        iconName="add-friend"
        iconSize={25}
      >
        {I18n.t("common.buttons.respond")}
      </NewTextButton>
    )}
    {!receivedFriendshipRequest &&
      !requestedFriendship &&
      !isFriend &&
      !declinedFriendship && (
        <NewTextButton
          style={styles.leftActionBtn}
          size="medium"
          iconName="add-friend"
          onPress={requestFriendship}
          iconSize={25}
        >
          {I18n.t("common.buttons.add_friend")}
        </NewTextButton>
      )}
    <NewTextButton
      style={styles.rightActionBtn}
      size="medium"
      iconName="comment"
      onPress={navigateToConversation}
      iconSize={17}
      iconWeight="solid"
    >
      {I18n.t("common.buttons.message")}
    </NewTextButton>
  </View>
);

ProfileActionsContainer.propTypes = {
  isFriend: PropTypes.bool,
  requestedFriendship: PropTypes.bool,
  receivedFriendshipRequest: PropTypes.bool,
  declinedFriendship: PropTypes.bool,
  respondToRequest: PropTypes.func,
  requestFriendship: PropTypes.func,
  cancelFriendshipRequest: PropTypes.func,
  unFriend: PropTypes.func,
  navigateToConversation: PropTypes.func
};

export default ProfileActionsContainer;
