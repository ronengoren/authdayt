import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { View, Text, Avatar, HTMLView } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors, daytFontWeights, commonStyles } from "src/vars";
import { avatarBadgePosition, chatStatuses } from "src/vars/enums";
import { isRTL } from "src/infra/utils/stringUtils";
import { getLocaleTimeForFeed } from "src/infra/utils/dateTimeUtils";
import chatService from "src/infra/chat/chatService";
import { get } from "src/infra/utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    marginBottom: 15,
    paddingHorizontal: 15
  },
  firstItemContainer: {
    marginTop: 15
  },
  image: {
    marginRight: 15
  },
  content: {
    flex: 1,
    paddingTop: 5
  },
  conversationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  readText: {
    color: daytColors.b60
  },
  unreadText: {
    color: daytColors.realBlack,
    fontWeight: daytFontWeights.bold
  },
  participantText: {
    flex: 1,
    marginRight: 15
  },
  sentAtText: {
    flex: 0,
    marginLeft: 5
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  htmlTextWrapper: {
    flex: 1,
    fontSize: 16
  },
  htmlText: {
    flex: 1,
    fontSize: 16
  },
  unreadIndicator: {
    alignSelf: "center",
    width: 5,
    height: 5,
    marginLeft: "auto",
    borderRadius: 22.5,
    backgroundColor: daytColors.pinkishRed
  },
  imageMessage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imageMessageIcon: {
    marginRight: 5
  }
});

class ConversationItem extends Component {
  render() {
    const {
      channel,
      channels,
      ownUserId,
      participant,
      chatStatus,
      setActiveChannel
    } = this.props;

    if (!participant) {
      return null;
    }

    const lastMessage =
      channel.state.messages[channel.state.messages.length - 1];
    if (!lastMessage) {
      return null;
    }

    const canShowOnlineStatus = chatStatus === chatStatuses.NOT_BLOCKED;
    const isFirstChannel = channels[0].id === channel.id;
    const wrapperStyle = isFirstChannel
      ? [styles.container, styles.firstItemContainer]
      : styles.container;
    const isLastMessegerMe = lastMessage.user.id === ownUserId;
    const isLastMessageRead = isLastMessegerMe || channel.countUnread() === 0;
    const textStyle = isLastMessageRead ? styles.readText : styles.unreadText;

    return (
      <TouchableOpacity
        onPress={() => setActiveChannel(channel)}
        activeOpacity={0.5}
        style={wrapperStyle}
        key={channel.id}
      >
        <Avatar
          size="medium2"
          style={styles.image}
          entityId={""}
          entityType="user"
          thumbnail={participant.image}
          name={participant.name}
          showBadge={canShowOnlineStatus && participant.online}
          badgePosition={avatarBadgePosition.BOTTOM}
          badgeColor={daytColors.green}
          linkable={false}
        />
        <View style={styles.content}>
          <View style={styles.conversationDetails}>
            <Text
              style={styles.participantText}
              numberOfLines={1}
              bold={!isLastMessageRead}
              size={16}
              lineHeight={19}
              color={isLastMessageRead ? daytColors.b30 : daytColors.realBlack}
            >
              {participant.name}
            </Text>
            <Text
              style={styles.sentAtText}
              size={12}
              lineHeight={14}
              color={daytColors.b60}
            >
              {getLocaleTimeForFeed(lastMessage.created_at)}
            </Text>
          </View>
          <View style={styles.textWrapper}>
            {isLastMessegerMe && (
              <Text style={textStyle} size={16} lineHeight={19}>
                {I18n.t("communication_center.conversations.my_message")}
              </Text>
            )}
            {this.renderMessage({
              message: lastMessage,
              isUnread: !isLastMessageRead
            })}
            {!isLastMessageRead && <View style={styles.unreadIndicator} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    const { participant, onMount } = this.props;
    onMount(participant.id);
  }

  renderMessage = ({ message, isUnread }) => {
    const { attachments, html, text } = message;
    const imageUrl = get(attachments, "0.image_url");

    if (imageUrl) {
      return this.renderImagePlaceholder({ isUnread });
    } else {
      return this.renderHTML({ html: html || text, isUnread });
    }
  };

  renderImagePlaceholder({ isUnread }) {
    const color = isUnread ? daytColors.realBlack : daytColors.b60;
    const textStyle = isUnread ? styles.unreadText : styles.readText;

    return (
      <View style={styles.imageMessage}>
        <AwesomeIcon
          name="camera"
          size={14}
          color={color}
          weight="solid"
          style={styles.imageMessageIcon}
        />
        <Text size={16} lineHeight={19} style={textStyle}>
          {I18n.t("communication_center.conversations.image_message")}
        </Text>
      </View>
    );
  }

  renderHTML({ html, isUnread }) {
    const htmlTextLineHeight = isRTL(html) ? 30 : 19;
    const textStyle = isUnread ? styles.unreadText : styles.readText;

    return (
      <HTMLView
        style={commonStyles.flex1}
        rootComponentProps={{
          numberOfLines: 1,
          style: [styles.htmlTextWrapper, { lineHeight: htmlTextLineHeight }]
        }}
        textComponentProps={{
          numberOfLines: 1,
          style: [
            textStyle,
            styles.htmlText,
            { lineHeight: htmlTextLineHeight }
          ],
          bold: !!isUnread
        }}
        value={html.trim()}
        key={!!isUnread}
      />
    );
  }
}

ConversationItem.propTypes = {
  setActiveChannel: PropTypes.func,
  channel: PropTypes.object,
  ownUserId: PropTypes.string,
  channels: PropTypes.arrayOf(PropTypes.object),
  chatStatus: PropTypes.number,
  participant: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    online: PropTypes.bool
  }),
  onMount: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const ownUserId = state.auth.user.id;
  const participant = chatService.getParticipant({
    channel: ownProps.channel,
    ownUserId
  });

  return {
    ownUserId,
    chatStatus: get(state, `inbox.chatStatus[${participant.id}]`),
    participant
  };
};

export default connect(mapStateToProps)(ConversationItem);
