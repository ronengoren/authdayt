import React from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
// import { analytics } from '/infra/reporting';
import { Text } from "src/components/basicComponents";
import { friendshipStatusType, postTypes } from "src/vars/enums";
import { daytColors } from "src/vars";

class PostHeaderAddFriendButton extends React.Component {
  state = {
    requested: this.props.friendshipStatus === friendshipStatusType.REQUEST_SENT
  };

  render() {
    const { postType, friendshipStatus } = this.props;
    const { requested } = this.state;
    const isFriendshipDeclinded =
      friendshipStatus === friendshipStatusType.REJECTED;
    const text =
      requested || isFriendshipDeclinded
        ? I18n.t("feed.post_header.friendship_button.pending")
        : I18n.t("feed.post_header.friendship_button.add_friend");
    const color =
      requested || isFriendshipDeclinded ? daytColors.b60 : daytColors.green;
    if (postType === postTypes.SHARE) {
      return null;
    }
    return (
      <Text
        size={13}
        lineHeight={18}
        onPress={isFriendshipDeclinded ? null : this.toggleFriendshipRequest}
        color={color}
      >
        {text}
      </Text>
    );
  }

  toggleFriendshipRequest = () => {
    const { apiCommand, userId, userName } = this.props;
    const { requested } = this.state;
    let command;
    let params;
    if (!requested) {
      command = "friendships.invite";
      params = { toIds: [userId] };
    } else {
      command = "friendships.unfriend";
      params = { toId: userId };
    }
    this.setState({ requested: !requested });
    apiCommand(command, params);
    // if (!requested) {
    //   analytics.actionEvents.friendRequest({ friendId: userId, friendName: userName }).dispatch();
    // }
  };
}

PostHeaderAddFriendButton.propTypes = {
  friendshipStatus: PropTypes.oneOf(Object.values(friendshipStatusType)),
  postType: PropTypes.oneOf(Object.values(postTypes)),
  apiCommand: PropTypes.func,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};

export default PostHeaderAddFriendButton;
