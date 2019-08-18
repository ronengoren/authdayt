import React, { Component } from "react";
// import {
//   Chat,
//   ChannelList,
//   ChannelListMessenger,
//   InfiniteScrollPaginator
// } from "stream-chat-react-native";
import { StyleSheet } from "react-native";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getChatStatus } from "src/redux/inbox/actions";
import { View, Spinner } from "src/components/basicComponents";
import { NotificationsLoadingState } from "src/components/loaders";
import { ErrorDefault } from "src/components/errorBoundaries/errorScreens";
import { ScrollItemErrorBoundary } from "src/components";
import chatService from "src/infra/chat/chatService";
import { get, debounce } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { Logger } from "src/infra/reporting";
import { commonStyles, daytColors } from "src/vars";
import { screenNames } from "src/vars/enums";
import ConversationItem from "./ConversationItem";
import EmptyList from "./EmptyList";

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 0
  },
  loadingContainerBorder: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: daytColors.veryLightPink
  },
  emptyList: {
    backgroundColor: daytColors.white
  }
});

class ConversationsList extends Component {
  state = {
    refreshConversationsKey: 0
  };

  render() {
    const { refreshConversationsKey } = this.state;
    const { client, userId } = this.props;
    const filters = { type: "messaging", members: { $in: [userId] } };
    const sort = { last_message_at: -1 };
    const options = { message_limit: 1, limit: 30, presence: true };

    if (!client) {
      return (
        <React.Fragment>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingContainerBorder} />
            <NotificationsLoadingState />
          </View>
        </React.Fragment>
      );
    }

    return (
      <View client={client}>
        <ChannelList
          key={refreshConversationsKey}
          List={ChannelListMessenger}
          Preview={props => (
            <ScrollItemErrorBoundary boundaryName="conversationItem">
              <ConversationItem {...props} onMount={this.handleItemMount} />
            </ScrollItemErrorBoundary>
          )}
          Paginator={props => (
            <InfiniteScrollPaginator threshold={300} {...props} />
          )}
          LoadingIndicator={NotificationsLoadingState}
          EmptyStateIndicator={() => <EmptyList />}
          LoadingErrorIndicator={this.renderErrorState}
          filters={filters}
          sort={sort}
          options={options}
          loadMoreThreshold={4}
          onSelect={this.navigateToChat}
        />
      </View>
    );
  }

  componentDidMount() {
    this.initConversations();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;
    if (userId && userId !== prevProps.userId) {
      this.initConversations();
    }
  }

  chatStatusesToFetch = [];

  renderErrorState = () => {
    const { refreshConversationsKey } = this.state;
    Logger.error({
      errType: "chat",
      err: {
        screen: "ConversationsList",
        message: "ChannelList failed",
        trialCount: refreshConversationsKey + 1
      }
    });
    if (!refreshConversationsKey) {
      this.setState({ refreshConversationsKey: 1 });
      return null;
    }
    return <ErrorDefault onRefresh={this.refreshConversations} />;
  };

  async initConversations() {
    const { client } = this.props;
    if (!client) {
      await chatService.getClient();
    }
  }

  handleItemMount = participantId => {
    this.chatStatusesToFetch.push(participantId);
    this.getChatStatus();
  };

  getChatStatus = debounce(() => {
    const { getChatStatus } = this.props;
    getChatStatus({ userIds: this.chatStatusesToFetch });
    this.chatStatusesToFetch = [];
  }, 500);

  refreshConversations = () =>
    this.setState(({ refreshConversationsKey }) => ({
      refreshConversationsKey: refreshConversationsKey + 1
    }));

  navigateToChat = channel => {
    const { userId: ownUserId } = this.props;
    const participant = chatService.getParticipant({ channel, ownUserId });
    navigationService.navigate(screenNames.Chat, {
      participantId: participant.id,
      participantName: participant.name,
      participantAvatar: participant.image,
      isInitComposeMode: false
    });
  };
}

ConversationsList.propTypes = {
  userId: PropTypes.string,
  client: PropTypes.object,
  getChatStatus: PropTypes.func
};

// const mapStateToProps = state => ({
//   userId: state.auth.user.id,
//   client: get(state, "inbox.client")
// });
// const mapDispatchToProps = { getChatStatus };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ConversationsList);
export default ConversationsList;
