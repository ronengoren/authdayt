import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
// import { withChannelContext } from 'stream-chat-react-native';
// import { analytics } from '/infra/reporting';
import I18n from "src/infra/localization";
import { chat as chatLocalStorage } from "src/infra/localStorage";
import { View, Text, TextArea } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import ChatAttachmentsButtons from "./ChatAttachmentsButtons";
import MessageIndicator from "../messageList/MessageIndicator";

const HITSLOP = { left: 15, right: 15, top: 15, bottom: 15 };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: daytColors.white
  },
  offlineContainer: {
    backgroundColor: daytColors.b97
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: daytColors.b90
  },
  textInput: {
    paddingTop: 0,
    padding: 0,
    lineHeight: 19,
    flex: 1,
    marginRight: 15
  }
});

class ChatMessageInput extends Component {
  state = {
    text: "",
    isUploadingMedia: false,
    uploadIdsStatus: {}
  };

  render() {
    const {
      channel,
      sendMessage,
      isDisabled,
      participant,
      ownUser,
      isInitKeyboardOpen
    } = this.props;
    const { text, uploadIdsStatus, isUploadingMedia } = this.state;

    return (
      <React.Fragment>
        <MessageIndicator
          participant={participant}
          isTyping={this.isTyping({ ownUser, typing: channel.state.typing })}
          isUploadingMedia={isUploadingMedia}
        />
        <View style={[styles.container, isDisabled && styles.offlineContainer]}>
          <View style={[styles.inputSection]}>
            <TextArea
              editable={!isDisabled}
              onChange={this.handleFormChange}
              value={text}
              placeholder={I18n.t("chat.form_input_placeholder")}
              autoFocus={isInitKeyboardOpen}
              style={[styles.textInput]}
              defaultHeight={19}
              maxHeight={76}
              selectionColor={daytColors.azure}
              backgroundColor={daytColors.transparent}
            />
            {!!text && (
              <TouchableOpacity
                onPress={!isDisabled ? this.handleFormSubmit : null}
                hitSlop={HITSLOP}
              >
                <Text
                  size={16}
                  lineHeight={19}
                  bold
                  color={isDisabled ? daytColors.b60 : daytColors.azure}
                >
                  {I18n.t("chat.send_button")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {!text && (
            <ChatAttachmentsButtons
              uploadIdsStatus={uploadIdsStatus}
              onChangeUploadsState={this.changeUploadsStatus}
              onMessageSent={this.trackSendingMessage}
              sendMessage={sendMessage}
            />
          )}
        </View>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getLocalStorageText();
  }

  inputTimeOut = null;

  changeUploadsStatus = nextState => {
    this.setState(nextState);
  };

  trackSendingMessage = () => {
    const { ownUser, participant } = this.props;
    const { id } = participant;
    analytics.actionEvents
      .chatMessageAction({ senderId: ownUser.id, recipientId: id })
      .dispatch();
  };

  handleFormChange = text => {
    const { channel } = this.props;
    this.debouncedSetLocalStorageValue(text);
    this.setState({ text });
    channel.keystroke();
  };

  handleFormSubmit = () => {
    const { channel, sendMessage, isFromContext } = this.props;
    const { text } = this.state;
    const message = { text: text.trim() };
    if (isFromContext) {
      message.isFromContext = true;
    }
    try {
      this.setState({ text: "" });
      clearTimeout(this.inputTimeOut);
      sendMessage(message);
      this.trackSendingMessage();
      chatLocalStorage.update({ [channel.id]: "" });
    } catch (err) {
      console.log("Failed! \n ", err);
    }
  };

  debouncedSetLocalStorageValue = text => {
    clearTimeout(this.inputTimeOut);
    this.inputTimeOut = setTimeout(() => this.setLocalStorageValue(text), 1000);
  };

  getLocalStorageText = async () => {
    const { channel } = this.props;
    try {
      const localStorageTexts = await chatLocalStorage.get();
      const value = localStorageTexts[channel.id];
      if (value && value.length) {
        this.setState({ text: value });
      }
    } catch (err) {} // eslint-disable-line no-empty
  };

  setLocalStorageValue = text => {
    const { channel } = this.props;
    chatLocalStorage.update({ [channel.id]: text });
  };

  // TODO - replace with nicer function rather than stream implementation
  isTyping = ({ typing, ownUser }) => {
    const arr2 = Object.keys(typing);
    const arr3 = [];
    arr2.forEach((item, i) => {
      if (ownUser.id === typing[arr2[i]].user.id) {
        return;
      }
      arr3.push(typing[arr2[i]].user.name || typing[arr2[i]].user.id);
    });
    return arr3.length > 0;
  };
}

ChatMessageInput.propTypes = {
  participant: PropTypes.object,
  ownUser: PropTypes.object,
  isDisabled: PropTypes.bool,
  channel: PropTypes.object,
  sendMessage: PropTypes.func,
  isInitKeyboardOpen: PropTypes.bool,
  isFromContext: PropTypes.bool
};

// ChatMessageInput = withChannelContext(ChatMessageInput);
export default ChatMessageInput;
