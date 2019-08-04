import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Platform } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { markAllAsSeen } from "src/redux/notifications/actions";
// import * as pushManager from "src/infra/pushNotifications";
import permissionsService from "src/infra/permissions/permissionsService";
import {
  View,
  Text,
  Separator,
  TextButton
} from "src/components/basicComponents";
import { NotificationsLoadingState } from "src/components/loaders";
import { InfiniteScroll } from "src/components";
import { daytColors } from "src/vars";
import NotificationItem from "./NotificationItem";
import EmptyList from "./EmptyList";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerNoNotifications: {
    backgroundColor: daytColors.white
  },
  notificationsCta: {
    backgroundColor: daytColors.white,
    paddingHorizontal: 15,
    paddingTop: 30
  },
  ctaTextWrapper: {
    alignItems: "center"
  },
  ctaTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 17
  },
  ctaText: {
    color: daytColors.buttonGrey,
    textAlign: "center"
  },
  ctaButton: {
    marginTop: 20,
    marginBottom: 30
  },
  separator: {
    backgroundColor: daytColors.white
  }
});

class Notifications extends Component {
  state = {
    showNotificationsCta: false
  };

  render() {
    const { notifications } = this.props;

    return (
      <View
        style={[
          styles.container,
          notifications &&
            !notifications.length &&
            styles.containerNoNotifications
        ]}
      >
        <InfiniteScroll
          apiQuery={{ domain: "notifications", key: "notifications" }}
          ListItemComponent={NotificationItem}
          reducerStatePath="notifications"
          onUpdate={this.handleInfiniteScrollUpdated}
          ListHeaderComponent={this.renderNotificationsCta()}
          ListEmptyComponent={<EmptyList />}
          ListLoadingComponent={<NotificationsLoadingState />}
        />
      </View>
    );
  }

  componentDidMount() {
    this.updateNotificationsEnabled({ forcePopup: false });
  }

  renderNotificationsCta = () => {
    const { showNotificationsCta } = this.state;

    if (!showNotificationsCta) {
      return null;
    }

    return (
      <View>
        <View style={styles.notificationsCta}>
          <View style={styles.ctaTextWrapper}>
            <Text medium style={styles.ctaTitle}>
              {I18n.t(
                "communication_center.notifications.turn_on_notifications_cta.header"
              )}
            </Text>
            <Text style={styles.ctaText}>
              {I18n.t(
                "communication_center.notifications.turn_on_notifications_cta.text"
              )}
            </Text>
            <TextButton
              size="large"
              style={styles.ctaButton}
              onPress={() =>
                this.updateNotificationsEnabled({ forcePopup: true })
              }
            >
              {I18n.t(
                "communication_center.notifications.turn_on_notifications_cta.button"
              )}
            </TextButton>
          </View>
        </View>
        <Separator height={5} style={styles.separator} />
      </View>
    );
  };

  async updateNotificationsEnabled({ forcePopup }) {
    if (Platform.OS === "ios") {
      const actionText = I18n.t(
        "communication_center.notifications.notifications_permission_reason"
      );
      const isNotificationsEnabled = await permissionsService.requestPermissionConditionally(
        "notification",
        { actionText, requestOnlyUndetermined: !forcePopup }
      );
      if (isNotificationsEnabled) {
        this.registerNotifications();
      } else {
        this.setState({ showNotificationsCta: true });
      }
    } else {
      this.registerNotifications();
    }
  }

  handleInfiniteScrollUpdated = () => {
    const { notifications, unreadChats } = this.props;

    if (notifications && notifications.length) {
      this.props.markAllAsSeen(unreadChats);
    }
  };

  registerNotifications = async () => {
    const { user } = this.props;
    // const pushToken = await pushManager.getPushToken();

    if (pushToken) {
      this.setState({ showNotificationsCta: false });
    } else {
      // const newPushToken = await pushManager.register(user);

      if (newPushToken && this.state.showNotificationsCta) {
        this.setState({ showNotificationsCta: false });
      }
    }
  };
}

Notifications.propTypes = {
  markAllAsSeen: PropTypes.func,
  user: PropTypes.object,
  notifications: PropTypes.array,
  unreadChats: PropTypes.number
};

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   notifications: state.notifications.data
// });

// const mapDispatchToProps = { markAllAsSeen };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Notifications);
export default Notifications;
