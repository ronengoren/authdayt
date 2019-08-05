import * as React from "react";
import PropTypes from "prop-types";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Image,
  View
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { getConnectedAcounts } from "src/redux/auth/actions";
import { Text, Avatar } from "src/components/basicComponents";
import images from "src/assets/images";
import { DaytIcon } from "src/assets/icons";
import {
  screenNames,
  screenGroupNames,
  screensWithoutFooter
} from "src/vars/enums";
import { daytColors, uiConstants } from "src/vars";
import { userScheme } from "src/schemas";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";

const isAndroid = Platform.OS === "android";
const INACTIVE_TAB_ICON_COLOR = daytColors.b30;
const INACTIVE_TAB_TEXT_COLOR = daytColors.b60;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 55,
    marginBottom: uiConstants.FOOTER_MARGIN_BOTTOM
  },
  innerWrapper: {
    height: "100%",
    flexDirection: "row"
  },
  wrapperAndroid: {
    height: 64,
    marginBottom: -13
  },
  footerBackgroundWrapper: {
    position: "absolute",
    top: -13,
    left: 0,
    width: "100%",
    height: Platform.select({ ios: 65, android: 71 })
  },
  footerBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabAndroid: {
    marginTop: -11
  },
  icon: {
    marginBottom: 4,
    textAlign: "center"
  },
  label: {
    textAlign: "center",
    zIndex: 1
  },
  cityTab: {
    flex: 1,
    alignItems: "center"
  },
  cityTabAndroid: {
    marginTop: -10,
    paddingTop: 10
  },
  profileImageWrapper: {
    width: 43,
    height: 47,
    marginTop: -10,
    marginBottom: -4
  },
  profileMask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1
  },
  avatar: {
    width: 31,
    height: 32,
    marginTop: 7,
    marginLeft: 6
  },
  badgeWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: Platform.select({ ios: 3, android: 12 }),
    left: Platform.select({ ios: 38, android: 40 }),
    minWidth: 21,
    height: 21,
    borderRadius: 12,
    backgroundColor: daytColors.white
  },
  counterWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 17,
    minWidth: 17,
    borderRadius: 10,
    backgroundColor: daytColors.pinkishRed
  },
  counterText: {
    textAlign: "center",
    color: daytColors.white
  }
});

const tabs = {
  [screenGroupNames.HOME_TAB]: {
    labelName: "home",
    icon: {
      name: "home-fill",
      activeName: "home-fill",
      size: 20
    },
    activeColor: daytColors.flatBlue
  },
  [screenGroupNames.GROUPS_TAB]: {
    labelName: "groups",
    icon: {
      name: "groups-2",
      activeName: "groups-2",
      size: 20
    },
    activeColor: daytColors.golden
  },
  [screenGroupNames.PEOPLE_TAB]: {
    labelName: "people",
    icon: {
      name: "people-2",
      activeName: "people-2",
      size: 20
    },
    activeColor: daytColors.pinkishRed
  },
  [screenGroupNames.COMMUNICATIONS]: {
    labelName: "activity",
    icon: {
      name: "inbox-2",
      activeName: "inbox-2",
      size: 20
    },
    activeColor: daytColors.azure
  }
};

class CustomTabBar extends React.PureComponent {
  render() {
    const { navigation, getTestID } = this.props;
    const {
      state: { routes, index }
    } = navigation;
    // const { name, params = {} } = navigationService.getCurrentRouteName({
    //   withParams: true
    // });
    // if (screensWithoutFooter[name] || params.hideCustomTabBar) {
    //   return null;
    // }

    return (
      <View style={isAndroid ? styles.wrapperAndroid : styles.wrapper}>
        <View style={styles.footerBackgroundWrapper}>
          {/* <Image
            source={images.tabsFooter.background}
            style={styles.footerBackground}
          /> */}
        </View>
        <View style={styles.innerWrapper}>
          {routes.map((route, routeIndex) => {
            const isFocused = routeIndex === index;
            const testID = getTestID({ route });
            return this.renderTabWithIcon({ isFocused, route, testID });
            {
              /* {
              if (routeIndex === 2) {
                return this.renderMyCityTab({ isFocused, route, testID });
              }
            }
            return this.renderTabWithIcon({ isFocused, route, testID }); */
            }
          })}
        </View>
      </View>
    );
  }

  renderTabWithIcon = ({ isFocused, route, testID }) => {
    const {
      friendRequestsNumber,
      unseenNotifications,
      unreadChats
    } = this.props;
    let counter = 0;
    if (route.routeName === screenGroupNames.PEOPLE_TAB) {
      counter = friendRequestsNumber;
    } else if (route.routeName === screenGroupNames.COMMUNICATIONS) {
      counter = Math.min(unseenNotifications + unreadChats, 99);
    }
    const tab = tabs[route.routeName];
    const iconColor = isFocused ? tab.activeColor : INACTIVE_TAB_ICON_COLOR;
    const iconName = isFocused ? tab.icon.activeName : tab.icon.name;
    const textColor = isFocused ? tab.activeColor : INACTIVE_TAB_TEXT_COLOR;
    return (
      <TouchableWithoutFeedback
        key={route.key}
        onPress={() => this.handleTabPress({ route, isFocused })}
      >
        <View style={[styles.tab, isAndroid && styles.tabAndroid]}>
          <DaytIcon
            name={iconName}
            size={tab.icon.size}
            color={iconColor}
            style={styles.icon}
          />
          {!!counter && this.renderBadge({ counter })}
          <Text
            style={styles.label}
            size={11}
            lineHeight={13}
            color={textColor}
            bold={isFocused}
            testID={testID}
          >
            {I18n.t(`tab_names.${tab.labelName}`)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderMyCityTab = ({ isFocused, route, testID }) => {
    const {
      user: { media, themeColor, name }
      // community
    } = this.props;
    const community = "this.props";
    const textColor = isFocused ? daytColors.darkPink : INACTIVE_TAB_TEXT_COLOR;
    const maskUrl = isFocused
      ? images.tabsFooter.profile_mask_focused
      : images.tabsFooter.profile_mask;
    return (
      <TouchableWithoutFeedback
        key={route.key}
        onPress={() => this.handleTabPress({ route, isFocused })}
        onLongPress={this.navigateToConnectedAccounts}
      >
        <View style={[styles.cityTab, isAndroid && styles.cityTabAndroid]}>
          <View style={styles.profileImageWrapper}>
            <Image source={maskUrl} style={styles.profileMask} />
            <Avatar
              imageStyle={styles.avatar}
              size="tiny"
              entityType="user"
              themeColor={themeColor}
              thumbnail={media.thumbnail}
              name={name}
              linkable={false}
            />
          </View>
          <Text
            style={styles.label}
            size={11}
            lineHeight={13}
            color={textColor}
            bold={isFocused}
            testID={testID}
          >
            {I18n.t(
              `tab_names.city.${get(
                community,
                "destinationPartitionLevel",
                "city"
              )}`
            )}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderBadge = ({ counter }) => (
    <View style={styles.badgeWrapper}>
      <View style={styles.counterWrapper}>
        <Text size={10} lineHeight={12} bold style={styles.counterText}>
          {counter}
        </Text>
      </View>
    </View>
  );

  handleTabPress = ({ route, isFocused }) => {
    const { onTabPress } = this.props;
    if (isFocused) {
      if (route.routes.length > 1) {
        const { key } = route.routes[1];
        navigationService.goBack(key);
      } else {
        const { routeName } = route.routes[0];
        navigationService.resetToScreen(routeName);
      }
    } else {
      onTabPress({ route });
    }
  };

  extractTestIDProps = scene => {
    const { getTestID } = this.props;
    if (getTestID) {
      const data = getTestID(scene);
      return data ? data.testID : null;
    }
    return null;
  };

  navigateToConnectedAccounts = async () => {
    const { getConnectedAcounts } = this.props;
    const connectedAccounts = await getConnectedAcounts();
    if (connectedAccounts.length) {
      navigationService.navigate(screenNames.ConnectedUsersList, {
        connectedAccounts,
        isSoundEnabled: false
      });
    }
  };
}

CustomTabBar.propTypes = {
  navigation: PropTypes.object,
  onTabPress: PropTypes.func,
  getTestID: PropTypes.func,
  friendRequestsNumber: PropTypes.number,
  unseenNotifications: PropTypes.number,
  unreadChats: PropTypes.number,
  user: userScheme,
  community: PropTypes.shape({
    destinationLocation: PropTypes.array,
    destinationCountryCode: PropTypes.string,
    destinationPartitionLevel: PropTypes.string
  })
};

const mapStateToProps = state => ({
  user: state.auth.user,
  friendRequestsNumber: state.friendships.friendRequestsNumber,
  unseenNotifications: state.notifications.unseenNotifications,
  unreadChats: state.inbox.unreadChats,
  community: state.auth.user.community
});

export default CustomTabBar;
