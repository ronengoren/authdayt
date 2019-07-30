import React, { Component } from "react";
import { StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { View, Text, IconButton } from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import { daytColors, uiConstants, commonStyles } from "src/vars";
import { screenNames } from "src/vars/enums";
import { navigationService } from "src/infra/navigation";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: uiConstants.NAVBAR_HEIGHT,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
    backgroundColor: daytColors.white,
    borderBottomWidth: 1,
    borderBottomColor: daytColors.b90
  },
  fakeSearchWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    height: 40,
    width: "100%",
    marginLeft: 10,
    marginRight: 55,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: daytColors.veryLightPink
  },
  fakeSearch: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 11
  },
  fakeSearchIcon: {
    marginRight: 7
  },
  composeButton: {
    position: "absolute",
    right: 10,
    bottom: 13
  }
});

class ConversationsListHeader extends Component {
  render() {
    return (
      <View style={[styles.wrapper, commonStyles.tinyShadow]}>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <TouchableOpacity
          onPress={this.handleFakeSearchPress}
          activeOpacity={0.5}
          style={styles.fakeSearchWrapper}
        >
          <View style={styles.fakeSearch}>
            <AwesomeIcon
              name="search"
              size={17}
              color={daytColors.b60}
              style={styles.fakeSearchIcon}
              weight="solid"
            />
            <Text size={16} lineHeight={19} color={daytColors.b60}>
              {I18n.t("communication_center.conversations.input_placeholder")}
            </Text>
          </View>
        </TouchableOpacity>
        <IconButton
          name="compose"
          style={styles.composeButton}
          iconColor="azure"
          iconSize={31}
          onPress={this.navigateToFriendSelector}
          hitSlop={uiConstants.BTN_HITSLOP}
        />
      </View>
    );
  }

  navigateToFriendSelector = () =>
    navigationService.navigate(screenNames.ChatUserSelector, {
      selectFriends: true
    });

  handleFakeSearchPress = () =>
    navigationService.navigate(screenNames.ChatUserSelector);
}

export default ConversationsListHeader;
