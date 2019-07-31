import React, { Component } from "react";
// import { Chat as StreamChat, Channel, MessageList } from 'stream-chat-react-native';
import PropTypes from "prop-types";
import {
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
  Keyboard,
  Platform
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { chat as chatLocalStorage } from "src/infra/localStorage";
import { apiQuery } from "src/redux/apiQuery/actions";
import { apiCommand } from "src/redux/apiCommands/actions";
import { openActionSheet } from "src/redux/general/actions";
import { Header, Screen } from "src/components";
import {
  View,
  Text,
  TranslatedText,
  Spinner,
  KeyboardAvoidingView
} from "src/components/basicComponents";
import { ErrorDefault } from "src/components/errorBoundaries/errorScreens";
import { daytColors, commonStyles, uiConstants } from "src/vars";
import { chatStatuses, friendshipStatusType } from "src/vars/enums";
import { get, isBoolean } from "src/infra/utils";
import { getTimeFromNow } from "src/infra/utils/dateTimeUtils";
// import chatService from 'src/infra/chat/chatService';
import { navigationService } from "src/infra/navigation";
import { Logger } from "src/infra/reporting";
import { ChatMessageInput } from "./messageInput";
import { DateSeparator, EmptyList, Message } from "./messageList";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: daytColors.white
  },
  content: {
    flex: 1,
    paddingBottom: uiConstants.FOOTER_MARGIN_BOTTOM,
    backgroundColor: daytColors.white
  },
  contentWithKeyboard: {
    paddingBottom: Platform.select({ ios: 0, android: 20 })
  },
  contentWithToast: {
    paddingBottom: uiConstants.FOOTER_MARGIN_BOTTOM + 10
  },
  blockedUserToast: {
    width: "100%",
    height: 30,
    fontSize: 12,
    color: daytColors.white,
    lineHeight: 30,
    textAlign: "center",
    backgroundColor: daytColors.b70
  },
  unblockBtn: {
    fontSize: 12,
    color: daytColors.white,
    lineHeight: 30,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: daytColors.white
  },
  blockMessage: {
    padding: 20,
    backgroundColor: daytColors.paleGreyTwo,
    borderWidth: 1,
    borderColor: daytColors.b90
  },
  blockActionsRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  blockBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    fontSize: 22
  },
  blockActionsSeparator: {
    width: 1,
    height: 30,
    backgroundColor: daytColors.b90
  }
});

class Chat extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    const {
      isInitComposeMode,
      participantId,
      participantName,
      participantAvatar
    } = navigation.state.params;
    const participant = {
      id: participantId,
      name: participantName,
      image: participantAvatar
    };

    this.state = {
      participant,
      hideBlockMessage: false,
      chatStatus: chatStatuses.UNKNOWN,
      friendshipStatus: null,
      refreshChatKey: 0,
      isKeyboardOpen: isBoolean(isInitComposeMode) ? isInitComposeMode : true
    };
  }

  static screenName = "Chat";

  render() {
    const {
      channel,
      participant,
      hideBlockMessage,
      chatStatus,
      friendshipStatus,
      refreshChatKey,
      isKeyboardOpen
    } = this.state;
    const { client, navigation, user, isOnline, ownUserId } = this.props;
    const { isInitComposeMode, isFromContext } = navigation.state.params;
    const isInitKeyboardOpen = isBoolean(isInitComposeMode)
      ? isInitComposeMode
      : true;

    if (!channel || !client) {
      return this.renderLoadingState();
    }

    const isChatAllowed = chatStatus === chatStatuses.NOT_BLOCKED;
    const isFriend = [
      friendshipStatusType.REQUEST_SENT,
      friendshipStatusType.FRIENDS
    ].includes(friendshipStatus);
    const messages = get(channel, "state.messages", []);
    const hasMessages = !!messages.length;
    const sentMessages = messages.some(
      message => get(message, "user.id") === ownUserId
    );
    const showBlockMessage = !!(
      isChatAllowed &&
      !isFriend &&
      hasMessages &&
      !sentMessages &&
      !hideBlockMessage
    );
    const isBlockToastShown = [
      chatStatuses.BLOCKED,
      chatStatuses.BLOCKER,
      chatStatuses.BLOCKED_AND_BLOCKER
    ].includes(chatStatus);

    return (
      <KeyboardAvoidingView style={styles.wrapper}>
        {/* <StreamChat client={client} key={refreshChatKey}>
          <Channel
            client={client}
            channel={channel}
            LoadingIndicator={this.renderLoadingState}
            LoadingErrorIndicator={this.renderErrorState}
            EmptyStateIndicator={() => <EmptyList participantName={participant.name} participantAvatar={participant.image} participantId={participant.id} />}
          >
            <View style={[styles.content, isKeyboardOpen && styles.contentWithKeyboard, isBlockToastShown && styles.contentWithToast]}>
              {this.renderHeader({ participant })}
              <MessageList messageActions={false} Message={Message} dateSeparator={DateSeparator} />
              {showBlockMessage && this.renderBlockMessage(participant.name)}
              {isChatAllowed && !showBlockMessage && (
                <ChatMessageInput participant={participant} ownUser={user} isDisabled={!isOnline} isInitKeyboardOpen={isInitKeyboardOpen} isFromContext={isFromContext} />
              )}
            </View>
          </Channel>
        </StreamChat> */}
      </KeyboardAvoidingView>
    );
  }

  //   async componentDidMount() {
  //     const { navigation, client, ownUserId } = this.props;
  //     const { participantId } = navigation.state.params;

  //     if (!client) {
  //       await chatService.init(ownUserId);
  //     }

  //     if (participantId) {
  //       this.getChannelAndParticipant(participantId);
  //       this.watchUserPresence();
  //     }

  //     if (participantId) {
  //       this.getChatStatus();
  //     }
  //     this.getLocalStorageHideBlockMessage();
  //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardShown);
  //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardHidden);
  //   }

  //   componentWillUnmount() {
  //     const { client } = this.props;
  //     this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
  //     this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
  //     client.off('user.presence.changed', this.handleUserPresenceChanged);
  //   }

  renderLoadingState = () => (
    <View style={commonStyles.flex1}>
      <Spinner />
    </View>
  );

  renderErrorState = () => {
    Logger.error({
      errType: "chat",
      err: { screen: "Chat", message: "Channel failed" }
    });
    return <ErrorDefault onRefresh={this.refreshChat} />;
  };

  renderHeader({ participant }) {
    const { chatStatus } = this.state;
    const {
      name,
      last_active: memberLastSeenAt,
      online: isOnline
    } = participant;

    return (
      <View>
        <Header
          title={name}
          subTitle={this.getSubTitle({
            isOnline,
            memberLastSeenAt,
            chatStatus
          })}
          titleOnPress={this.navigateToProfile}
          hasBackButton
          rightBtnIconName="more-horizontal"
          rightBtnAction={this.openActionSheet}
        />

        {chatStatus === chatStatuses.BLOCKED && (
          <Text style={styles.blockedUserToast}>
            {I18n.t("chat.disabled_chat_toast_message")}
          </Text>
        )}
        {[chatStatuses.BLOCKER, chatStatuses.BLOCKED_AND_BLOCKER].includes(
          chatStatus
        ) && (
          <Text style={styles.blockedUserToast}>
            {I18n.t("chat.blocked_user_toast_message")}&nbsp;
            <Text
              onPress={this.toggleChatUserBlocking}
              style={styles.unblockBtn}
              bold
            >
              {I18n.t("chat.unblock_user_button")}
            </Text>
          </Text>
        )}
      </View>
    );
  }

  handleKeyboardShown = () => {
    const { isKeyboardOpen } = this.state;
    !isKeyboardOpen && this.setState({ isKeyboardOpen: true });
  };

  handleKeyboardHidden = () => {
    const { isKeyboardOpen } = this.state;
    isKeyboardOpen && this.setState({ isKeyboardOpen: false });
  };

  async getChannelAndParticipant(participantId) {
    const { ownUserId } = this.props;
    const newChannel = await chatService.getChannelOrCreate(participantId);
    if (newChannel) {
      const participant = chatService.getParticipant({
        channel: newChannel,
        ownUserId
      });
      this.setState({ channel: newChannel, participant });
    } else {
      Logger.error({
        errType: "chat",
        err: {
          message: `Failed to fetch chat channel, participantId - ${participantId}, ownUserId - ${ownUserId}`
        }
      });
    }
    return newChannel;
  }

  watchUserPresence() {
    const { client } = this.props;
    if (client) {
      client.on("user.presence.changed", this.handleUserPresenceChanged);
    }
  }

  handleUserPresenceChanged = ({ user }) => {
    const { participantId } = this.props;
    if (user.id === participantId) {
      this.setState({ participant: user });
    }
  };

  getChatStatus = async () => {
    const { participantId, apiQuery } = this.props;
    try {
      const res = await apiQuery({
        query: {
          domain: "users",
          key: "getStatusWithFriendshipStatus",
          params: { chatUserIds: participantId }
        }
      });
      const { chatStatus, friendshipStatus } = res.data.data[participantId];
      LayoutAnimation.easeInEaseOut();
      this.setState({ chatStatus, friendshipStatus });
    } catch (err) {} // eslint-disable-line no-empty
  };

  getSubTitle = ({ isOnline, memberLastSeenAt, chatStatus }) => {
    if (chatStatus !== chatStatuses.NOT_BLOCKED) {
      return "";
    }

    let subTitle = "";
    if (isOnline) {
      subTitle = "Online now";
    } else if (memberLastSeenAt) {
      const lastSeenAtText = getTimeFromNow(memberLastSeenAt);
      subTitle = `Last seen ${lastSeenAtText} ago`;
    }

    return subTitle;
  };

  renderBlockMessage = participantFullName => (
    <View>
      <View style={styles.blockMessage}>
        <TranslatedText style={commonStyles.textAlignCenter}>
          {I18n.t("chat.block.message", { participantFullName })}
        </TranslatedText>
      </View>
      <View style={styles.blockActionsRow}>
        <TouchableOpacity
          style={styles.blockBtn}
          accessibilityTraits="button"
          accessibilityComponentType="button"
          activeOpacity={1}
          onPress={this.toggleChatUserBlocking}
        >
          <Text color={daytColors.red} bold>
            {I18n.t("chat.block.decline_button")}
          </Text>
        </TouchableOpacity>
        <View style={styles.blockActionsSeparator} />
        <TouchableOpacity
          style={styles.blockBtn}
          accessibilityTraits="button"
          accessibilityComponentType="button"
          activeOpacity={1}
          onPress={this.handleAllowClick}
        >
          <Text color={daytColors.azure} bold>
            {I18n.t("chat.block.allow_button")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  getParticipant() {
    const { channel } = this.state;
    const { navigation, ownUserId } = this.props;
    const {
      participantId,
      participantName,
      participantAvatar
    } = navigation.state.params;
    const participant = chatService.getParticipant({ channel, ownUserId }) || {
      id: participantId,
      name: participantName,
      image: participantAvatar
    };
    return participant;
  }

  getLocalStorageHideBlockMessage = async () => {
    const { participantId } = this.props;
    try {
      const localStorageTexts = await chatLocalStorage.get();
      const hideBlockMessage = get(
        localStorageTexts,
        `hideBlockMessage-${participantId}`,
        false
      );

      if (hideBlockMessage) {
        this.setState({ hideBlockMessage });
      }
    } catch (err) {} // eslint-disable-line no-empty
  };

  setLocalStorageHideBlockMessage = () => {
    const { participantId } = this.props;
    const key = `hideBlockMessage-${participantId}`;
    chatLocalStorage.update({ [key]: true });
  };

  refreshChat = () =>
    this.setState(({ refreshChatKey }) => ({
      refreshChatKey: refreshChatKey + 1
    }));

  navigateToProfile = () => {
    const { participant } = this.state;
    navigationService.navigateToProfile({
      entityId: participant.id,
      data: {
        id: participant.id,
        name: participant.name,
        themeColor: participant.themeColor,
        thumbnail: participant.image
      }
    });
  };

  openActionSheet = () => {
    const { chatStatus, participant } = this.state;
    const { openActionSheet } = this.props;

    const options = [
      {
        id: "profile",
        text: I18n.t("chat.action_sheet.view_profile", {
          participantFullName: participant.name
        }),
        iconName: "discover",
        shouldClose: true,
        action: this.navigateToProfile
      }
    ];
    if (chatStatus !== chatStatuses.UNKNOWN) {
      const buttonText = [
        chatStatuses.NOT_BLOCKED,
        chatStatuses.BLOCKED
      ].includes(chatStatus)
        ? I18n.t("chat.action_sheet.block_user")
        : I18n.t("chat.action_sheet.unblock_user");
      options.push({
        id: "block",
        text: buttonText,
        awesomeIconName: [
          chatStatuses.NOT_BLOCKED,
          chatStatuses.BLOCKED
        ].includes(chatStatus)
          ? "lock"
          : "unlock",
        awesomeIconSize: 15,
        shouldClose: true,
        action: this.toggleChatUserBlocking
      });
    }
    const data = {
      options,
      hasCancelButton: true
    };

    openActionSheet(data);
  };

  toggleChatUserBlocking = () => {
    const { chatStatus } = this.state;
    const { participantId, apiCommand, navigation } = this.props;
    const { updateChatListStatuses } = navigation.state.params;
    const action = [
      chatStatuses.BLOCKER,
      chatStatuses.BLOCKED_AND_BLOCKER
    ].includes(chatStatus)
      ? "chatUnblockUser"
      : "chatBlockUser";
    let nextChatStatus;
    switch (chatStatus) {
      case chatStatuses.NOT_BLOCKED: {
        nextChatStatus = chatStatuses.BLOCKER;
        break;
      }
      case chatStatuses.BLOCKER: {
        nextChatStatus = chatStatuses.NOT_BLOCKED;
        break;
      }
      case chatStatuses.BLOCKED: {
        nextChatStatus = chatStatuses.BLOCKED_AND_BLOCKER;
        break;
      }
      case chatStatuses.BLOCKED_AND_BLOCKER: {
        nextChatStatus = chatStatuses.BLOCKED;
        break;
      }
      default:
        break;
    }
    LayoutAnimation.easeInEaseOut();
    this.setLocalStorageHideBlockMessage();
    this.setState({ chatStatus: nextChatStatus, hideBlockMessage: true });
    if (updateChatListStatuses) {
      updateChatListStatuses({ participantId, newStatus: nextChatStatus });
    }
    apiCommand(`users.${action}`, { chatParticipantId: participantId });
  };

  handleAllowClick = () => {
    LayoutAnimation.easeInEaseOut();
    this.setLocalStorageHideBlockMessage();
    this.setState({ hideBlockMessage: true });
  };
}

Chat.propTypes = {
  navigation: PropTypes.object,
  user: PropTypes.object,
  isOnline: PropTypes.bool,
  ownUserId: PropTypes.string,
  client: PropTypes.object,
  apiQuery: PropTypes.func,
  apiCommand: PropTypes.func,
  openActionSheet: PropTypes.func,
  participantId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const { participantId } = ownProps.navigation.state.params;

  return {
    isOnline: get(state, "general.isOnline"),
    user: state.auth.user,
    client: get(state, "inbox.client"),
    ownUserId: state.auth.user.id,
    participantId
  };
};

// const mapDispatchToProps = {
//   apiQuery,
//   apiCommand,
//   openActionSheet
// };

// Chat = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Chat);
// Chat = Screen()(Chat);

export default Chat;
