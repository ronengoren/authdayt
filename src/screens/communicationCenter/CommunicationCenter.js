import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { Screen, Header, SubHeader } from "src/components";
import { daytColors, commonStyles } from "src/vars";
import { screenNames } from "src/vars/enums";
import { get } from "src/infra/utils";
import { Notifications } from "./notifications";
import {
  ConversationsList,
  ConversationsListHeader
} from "./conversationsList";

class CommunicationCenter extends Component {
  static subTabs = {
    NOTIFICATIONS: "Notifications",
    MESSAGES: "Messages"
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSubTab: get(
        props,
        "navigation.state.params.subTab",
        CommunicationCenter.subTabs.NOTIFICATIONS
      )
    };
  }

  render() {
    const { activeSubTab } = this.state;
    const { unseenNotifications, unreadChats } = this.props;

    return (
      <View style={commonStyles.flex1}>
        {this.renderHeader()}
        <SubHeader
          tabs={[
            {
              name: I18n.t("communication_center.sub_tabs.sub_tab_1"),
              value: CommunicationCenter.subTabs.NOTIFICATIONS,
              counter: unseenNotifications
            },
            {
              name: I18n.t("communication_center.sub_tabs.sub_tab_2"),
              value: CommunicationCenter.subTabs.MESSAGES,
              counter: unreadChats
            }
          ]}
          screenName={screenNames.CommunicationCenter}
          activeTab={activeSubTab}
          onTabChange={val => this.setState({ activeSubTab: val })}
          activeUnderlineColor={daytColors.azure}
          fullWidth
          enableAnalytics
        />
        {this.renderActiveSubTab()}
      </View>
    );
  }

  renderHeader = () => {
    const { activeSubTab } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    if (activeSubTab === CommunicationCenter.subTabs.NOTIFICATIONS) {
      return (
        <Header
          title={I18n.t("communication_center.title")}
          rightBtnIconName="compose"
          rightBtnIconSize={31}
          rightBtnAction={() =>
            navigate(screenNames.ChatUserSelector, { selectFriends: true })
          }
        />
      );
    }
    return <ConversationsListHeader />;
  };

  renderActiveSubTab = () => {
    const { activeSubTab } = this.state;
    const { unreadChats } = this.props;
    if (activeSubTab === CommunicationCenter.subTabs.NOTIFICATIONS) {
      return <Notifications unreadChats={unreadChats} />;
    }
    return <ConversationsList />;
  };
}

CommunicationCenter.propTypes = {
  unseenNotifications: PropTypes.number,
  unreadChats: PropTypes.number,
  navigation: PropTypes.object // eslint-disable-line react/no-unused-prop-types
};

// const mapStateToProps = state => ({
//   unseenNotifications: state.notifications.unseenNotifications,
//   unreadChats: state.inbox.unreadChats
// });

// CommunicationCenter = connect(mapStateToProps)(CommunicationCenter);
// CommunicationCenter = Screen()(CommunicationCenter);

export default CommunicationCenter;
