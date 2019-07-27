import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { Screen, InfiniteScroll } from "src/components";
import { View, Text } from "src/components/basicComponents";
import { navigationService } from "src/infra/navigation";
import { DaytIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";
import { screenNames } from "src/vars/enums";
import {
  UserEntityComponent,
  UserEntityLoadingState
} from "src/components/entity";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: uiConstants.PHONE_BAR_HEIGHT
  },
  header: {
    width: "100%",
    height: 30,
    marginTop: 10,
    marginBottom: 20
  },
  headerText: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  nextButton: {
    position: "absolute",
    right: 15,
    width: 40,
    height: 30,
    fontSize: 16,
    lineHeight: 30,
    textAlign: "right",
    color: daytColors.black
  },
  centerTextWrapper: {
    justifyContent: "center",
    paddingBottom: 50,
    backgroundColor: daytColors.white,
    borderBottomColor: daytColors.disabledGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 15
  },
  centerText: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  findFriendsFacebookWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 15,
    borderTopColor: daytColors.fillGrey,
    borderTopWidth: 1
  },
  findFriendsFacebookInnerWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  findFriendFacebookIcon: {
    marginRight: 15
  },
  findFriendFacebookText: {
    fontSize: 15,
    lineHeight: 22,
    color: daytColors.black
  },
  suggestedFriendsText: {
    paddingTop: 15,
    paddingHorizontal: 15,
    borderTopColor: daytColors.disabledGrey,
    borderTopWidth: 1,
    backgroundColor: daytColors.paleGreyTwo
  },
  scroll: {
    flex: 1,
    backgroundColor: daytColors.paleGreyTwo
  }
});

class OnBoardingAddFriends extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} medium>
            {I18n.t("onboarding.add_friends.page_header")}
          </Text>
          <Text
            style={styles.nextButton}
            onPress={this.onNextButtonPress}
            medium
            testID="addFriendsSubmitButton"
          >
            {I18n.t("onboarding.add_friends.continue_button")}
          </Text>
        </View>
        <InfiniteScroll
          ListHeaderComponent={this.renderTopSection()}
          ListLoadingComponent={<UserEntityLoadingState />}
          ListItemComponent={UserEntityComponent}
        />
      </View>
    );
  }
  renderTopSection = () => (
    <View>
      <View style={styles.centerTextWrapper}>
        <Text style={styles.centerText} medium>
          {I18n.t("onboarding.add_friends.title")}
        </Text>
      </View>

      {false && ( // TODO hidden until backend ready
        <TouchableOpacity
          accessibilityTraits="button"
          accessibilityComponentType="button"
          activeOpacity={1}
          onPress={() => {}}
          style={styles.findFriendsFacebookWrapper}
        >
          <View style={styles.findFriendsFacebookInnerWrapper}>
            <DaytIcon
              name="facebook-logo"
              size={25}
              color={daytColors.facebookDarkBlue}
              style={styles.findFriendFacebookIcon}
            />
            <Text style={styles.findFriendFacebookText} medium>
              {I18n.t("onboarding.add_friends.fb_friends_button")}
            </Text>
          </View>
          <DaytIcon name="right-arrow" size={22} color={daytColors.black} />
        </TouchableOpacity>
      )}

      <Text
        size={15}
        lineHeight={20}
        color={daytColors.b60}
        style={styles.suggestedFriendsText}
      >
        {I18n.t("onboarding.add_friends.list_title")}
      </Text>
    </View>
  );
}
export default OnBoardingAddFriends;
