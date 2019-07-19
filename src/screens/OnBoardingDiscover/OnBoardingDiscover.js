import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Platform } from "react-native";
import I18n from "../../infra/localization";
import { connect } from "react-redux";
import { apiCommand } from "../../redux/apiCommands/actions";
// import { followPages } from "/redux/pages/actions";
// import { finishedOnBoarding } from "/redux/auth/actions";
// import { register } from "/infra/pushNotifications";
import { Screen } from "../../components";
import {
  View,
  Text,
  ScrollView,
  IconButton
} from "../../components/basicComponents";
// import { analytics } from "/infra/reporting";
// import { navigationService } from "/infra/navigation";
import { get } from "../../infra/utils";
import { daytColors, uiConstants, commonStyles } from "../../vars";
import { screenNames } from "../../vars/enums";
import SuggestedTopicItem from "./SuggestedTopicItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT,
    backgroundColor: daytColors.paleGreyTwo
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15
  },
  centerTextWrapper: {
    marginBottom: 20
  },
  centerText: {
    marginHorizontal: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  followButton: {
    textAlign: "center"
  }
});

const HIT_SLOP = { left: 15, top: 10, right: 15, bottom: 10 };

class OnBoardingDiscover extends React.Component {
  state = {
    selectedTopics: {},
    selectAll: false,
    hasError: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            name="back-arrow"
            iconSize={25}
            iconColor="b60"
            // onPress={navigationService.goBack}
          />
          <Text
            size={16}
            lineHeight={30}
            color={daytColors.b30}
            style={styles.headerText}
            bold
          >
            {I18n.t("onboarding.discover_pages.page_header")}
          </Text>
          <Text
            size={16}
            lineHeight={30}
            color={daytColors.green}
            onPress={this.onDoneButtonPress}
            hitslop={HIT_SLOP}
            bold
            testID="discoverSubmitButton"
          >
            {I18n.t("onboarding.discover_pages.continue_button")}
          </Text>
        </View>
        <ScrollView style={commonStyles.flex1}>
          {this.renderListHeader()}
          {/* {this.renderTopics()} */}
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    // const {
    //   user: { id, name }
    // } = this.props;
    //   analytics.viewEvents
    //     .entityView({
    //       screenName: "OB - Add topics",
    //       origin: "OB - Add friends",
    //       entityId: id,
    //       entityName: name
    //     })
    //     .dispatch();
  }

  renderListHeader = () => {
    const { selectAll, hasError } = this.state;
    return (
      <View style={styles.centerTextWrapper}>
        {hasError ? (
          <Text
            size={16}
            lineHeight={22}
            color={daytColors.red}
            style={styles.centerText}
          >
            {I18n.t("onboarding.discover_pages.error_title")}
            {"\n "}
          </Text>
        ) : (
          <Text
            size={16}
            lineHeight={22}
            color={daytColors.b30}
            style={styles.centerText}
          >
            {I18n.t("onboarding.discover_pages.title")}
          </Text>
        )}
        <Text
          size={16}
          lineHeight={19}
          color={selectAll ? daytColors.secondaryBlack : daytColors.azure}
          onPress={this.toggleAllSelected}
          bold
          style={styles.followButton}
        >
          {I18n.t(
            `onboarding.discover_pages.${
              selectAll ? "unfollow_all_button" : "follow_all_button"
            }`
          )}
        </Text>
      </View>
    );
  };

  renderTopics = () => {
    const { topics } = this.props;
    const { selectedTopics } = this.state;
    return topics.map((topic, index) => (
      <SuggestedTopicItem
        topic={topic}
        isSelected={selectedTopics[topic.id]}
        toggleSelection={this.toggleTopicSelection}
        key={topic.id}
        testID={`suggestedTopic-${index}`}
      />
    ));
  };

  //   toggleTopicSelection = ({ topicId }) => {
  //     const { selectedTopics } = this.state;
  //     this.setState({
  //       selectedTopics: { ...selectedTopics, [topicId]: !selectedTopics[topicId] }
  //     });
  //   };

  //   toggleAllSelected = () => {
  //     const { topics } = this.props;
  //     const { selectAll } = this.state;
  //     const tmpSelectedTopics = {};
  //     topics.forEach(topic => {
  //       tmpSelectedTopics[topic.id] = !selectAll;
  //     });
  //     this.setState({ selectedTopics: tmpSelectedTopics, selectAll: !selectAll });
  //   };

  //   onDoneButtonPress = () => {
  //     const { finishedOnBoarding, user } = this.props;
  //     if (!this.pressedDone && this.validate()) {
  //       this.pressedDone = true;
  //       this.followTopics();

  //       if (Platform.OS === "android") {
  //         // android requests for permission on app install so this code is important cause it does actual registration to pushwoosh
  //         analytics.actionEvents
  //           .onboardingEnableNotificationsPopup({
  //             userId: user.id,
  //             enabled: true
  //           })
  //           .dispatch();
  //         register(user.id);
  //         finishedOnBoarding();
  //       } else {
  //         navigationService.navigate(screenNames.AllowNotifications);
  //       }
  //     }
  //   };

  //   validate = () => {
  //     const { topics } = this.props;
  //     const { selectedTopics } = this.state;
  //     let topicsCount = 0;
  //     Object.keys(selectedTopics).forEach(topicId => {
  //       if (selectedTopics[topicId]) {
  //         topicsCount += 1;
  //       }
  //     });
  //     this.setState({ hasError: topicsCount < Math.min(topics.length, 2) });
  //     return topicsCount >= 2;
  //   };

  //   followTopics = () => {
  //     const { apiCommand } = this.props;
  //     const { selectedTopics } = this.state;
  //     const groupsIds = [];
  //     Object.keys(selectedTopics).forEach(topicId => {
  //       if (selectedTopics[topicId]) {
  //         groupsIds.push(topicId);
  //       }
  //     });
  //     groupsIds.length &&
  //       apiCommand("groups.follow", { groupsIds: groupsIds.join(",") });
  //   };
}

OnBoardingDiscover.propTypes = {
  user: PropTypes.object,
  topics: PropTypes.array,
  apiCommand: PropTypes.func,
  finishedOnBoarding: PropTypes.func
};

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   topics: get(state.auth, "appSettings.data.topics", [])
// });

// const mapDispatchToProps = {
//   apiCommand,
//   followPages,
//   finishedOnBoarding
// };

// OnBoardingDiscover = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(OnBoardingDiscover);
// export default Screen({ modalError: true })(OnBoardingDiscover);
export default OnBoardingDiscover;
