import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { getListItemCta } from "src/redux/lists/actions";
import { Screen, Feed, Header, SubHeader } from "src/components";
import { GenericListEmptyState } from "src/components/emptyState";
import { MY_HOOD } from "src/components/themes";
import { IntroductionPostEditor } from "src/components/introduction";
import {
  View,
  Text,
  PostButton,
  Image,
  Chip,
  // FloatingHeader,
  PlaceholderRectangle
} from "src/components/basicComponents";
import { AwesomeIcon } from "src/assets/icons";
import images from "src/assets/images";
import { daytColors, commonStyles, uiConstants } from "src/vars";
import {
  editModes,
  screenNames,
  originTypes,
  groupType,
  entityTypes
} from "src/vars/enums";
import { get, isAppAdmin, compact } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { getGreetingTime } from "src/infra/utils/dateTimeUtils";
import {
  addSpaceOnCapitalsAndCapitalize,
  getFirstName
} from "src/infra/utils/stringUtils";
import { misc as miscLocalStorage } from "src/infra/localStorage";
import { userScheme } from "src/schemas";
import NewUserWelcomeModal from "./NewUserWelcomeModal";
import BoardsHeader from "./BoardsHeader";
import ActionButton from "react-native-action-button";
import PostEditor from "src/screens/post/PostEditor/PostEditor";
const styles = StyleSheet.create({
  feedHeaderWrapper: {
    flex: 1,
    backgroundColor: daytColors.paleGreyTwo
  },
  headerUpperSection: {
    flex: 1
  },
  headerUpperSectionBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%"
  },
  userName: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 30 + uiConstants.PHONE_BAR_HEIGHT_TRANSLUCENT,
    textAlign: "left"
  },
  userNameRTL: {
    textAlign: "right"
  },
  greetingTime: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: 15
  },
  greetingTimeRTL: {
    textAlign: "right"
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    marginHorizontal: 15,
    marginBottom: 25,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: daytColors.white
  },
  searchBoxRTL: {
    flexDirection: "row-reverse"
  },
  searchBoxIcon: {
    marginRight: 10
  },
  searchBoxIconRTL: {
    marginLeft: 10
  },
  searchBoxText: {
    flex: 1
  },
  searchBoxTextRTL: {
    flex: 1,
    textAlign: "right"
  },
  topicChipsWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  topicChipsWrapperRTL: {
    flexDirection: "row-reverse"
  },
  topicItem: {
    height: 34,
    borderRadius: 18,
    marginBottom: 10,
    marginRight: 7,
    backgroundColor: daytColors.clearBlack,
    borderColor: daytColors.transparent
  },
  topicItemText: {
    fontSize: 13,
    color: daytColors.white
  },
  topicChipsLoadingWrapper: {
    flexDirection: "row"
    // marginHorizontal: 15
  },
  topicChipsLoadingWrapperRTL: {
    flexDirection: "row-reverse"
    // marginHorizontal: 15
  },
  chipsLoadingState: {
    // marginBottom: 15
  },
  themesCarouselBottomBorder: {
    // marginBottom: 20
    // marginHorizontal: 0,
    // height: 3,
    backgroundColor: daytColors.b90
  },
  postButtonWrapper: {
    marginTop: 20
  },
  // floatingHeader: {
  //   borderBottomWidth: 0,
  //   paddingLeft: 0,
  //   paddingRight: 0
  // },
  subHeader: {
    marginTop: -20,
    marginBottom: 20
  }
});

class HomeTab extends React.Component {
  static subTabs = {
    COMMUNITY_FEED: "Community",
    NEWS_FEED: "My Feed",
    SCHEDULED_POSTS: "Scheduled Posts",
    PERSONALIZED: "Personalized"
  };

  constructor(props) {
    super(props);
    const { enablePersonalizedFeed } = this.props;

    const {
      navigation: {
        state: { params }
      }
    } = props;
    this.state = {
      activeSubTab:
        (params && params.subTab) || enablePersonalizedFeed
          ? HomeTab.subTabs.PERSONALIZED
          : HomeTab.subTabs.NEWS_FEED,

      screenTabs: []
    };

    this.scrollY = 0;
  }

  render() {
    const normalizedSchema = "FEED";
    const {
      showIntroPost,
      getListItemCta,
      enablePersonalizedFeed
    } = this.props;
    const { activeSubTab } = this.state;
    const isNewsFeed = [
      HomeTab.subTabs.NEWS_FEED,
      HomeTab.subTabs.PERSONALIZED
    ].includes(activeSubTab);

    const isScheduledPostsSubTab =
      activeSubTab === HomeTab.subTabs.SCHEDULED_POSTS;

    return (
      <View testID="homeTab" style={commonStyles.flex1}>
        <Feed
          onScroll={this.handleFeedScroll}
          scrollToFeedTop={this.scrollToFeedTop}
          activeHomeTab={
            enablePersonalizedFeed
              ? HomeTab.subTabs.PERSONALIZED
              : HomeTab.subTabs.NEWS_FEED
          }
          normalizedSchema={normalizedSchema}
          ListHeaderComponent={this.renderFeedHeader}
          ListEmptyComponent={
            isScheduledPostsSubTab ? (
              <GenericListEmptyState
                type={entityTypes.SCHEDULED_POST}
                headerText={I18n.t(`home.scheduled_empty_state.header`)}
              />
            ) : null
          }
          originType={originTypes.HOME_FEED}
          ref={feedRef => {
            this.feedRef = feedRef;
          }}
          extraTopComponent={
            showIntroPost && isNewsFeed ? (
              <IntroductionPostEditor
                scrollToOffset={this.scrollToOffset}
                key="introPost"
              />
            ) : null
          }
          onTopFetchAction={isNewsFeed ? getListItemCta : null}
        />

        {/* <NewUserWelcomeModal /> */}

        {/* <FloatingHeader
          style={styles.floatingHeader}
          showFloatingHeader={showFloatingHeader}
          height={uiConstants.NAVBAR_HEIGHT}
        > */}
        {/* <Header /> */}
        {/* </FloatingHeader> */}
      </View>
    );
  }
  getGreeting = () => {
    // const {
    //   community,
    //   user: { name }
    // } = this.props;
    const greetingTimeDefinition = getGreetingTime();
    const customGreetings = ("community", "customAppFace.greetings", []);
    const customGreeting = this.getFirstValidGreeting(customGreetings);
    const greetingLines = [
      I18n.t("home.user_greeting", { name: "getFirstName(name)" }),
      I18n.t(`home.${greetingTimeDefinition}`)
    ];

    if (customGreeting) {
      if (customGreeting.line1) {
        greetingLines[0] = customGreeting.line1.replace(
          "{name}"
          // getFirstName(name)
        );
      }
      if (customGreeting.line2) {
        greetingLines[1] = customGreeting.line2.replace(
          "{name}"
          // getFirstName(name)
        );
      }
    }
    return greetingLines;
  };
  getFirstValidGreeting = customGreetings =>
    customGreetings.find(greeting => {
      const now = Date.now();
      const startTime = Date.parse(greeting.startTime);
      const endTime = Date.parse(greeting.endTime);
      return now >= startTime && now <= endTime;
    });
  // handleFeedScroll = e => {
  //   this.scrollY = e.nativeEvent.contentOffset.y;
  //   const breakpoint = FloatingHeader.getAdjustedBreakpoint(400);
  //   if (this.scrollY > breakpoint && !showFloatingHeader) {
  //     this.setState({ showFloatingHeader: true });
  //   } else if (this.scrollY < breakpoint && showFloatingHeader) {
  //     this.setState({ showFloatingHeader: false });
  //   }
  // };
  renderFeedHeader = () => {
    const { appLanguage, topics, enableCommunityFeed, user } = this.props;
    const { activeSubTab, screenTabs } = this.state;
    const greetingLines = this.getGreeting();
    const isRtlDesign = appLanguage === "he";
    const textColor = Platform.select({
      ios: daytColors.halfLightWhite,
      android: daytColors.white
    });
    const isAdmin = isAppAdmin(true);

    return (
      // <View style={{ marginBottom: 50, backgroundColor: "#f3f3f3" }}>
      //   {/* Rest of the app comes ABOVE the action button component !*/}
      //   <ActionButton buttonColor="rgba(231,76,60,1)" useNativeFeedback="true">
      //     <ActionButton.Item
      //       buttonColor="#9b59b6"
      //       onPress={() => console.log("notes tapped!")}
      //     >
      //       <AwesomeIcon name="md-create" style={styles.actionButtonIcon} />
      //     </ActionButton.Item>
      //     <ActionButton.Item buttonColor="#3498db" onPress={() => {}}>
      //       <AwesomeIcon
      //         name="md-notifications-off"
      //         style={styles.actionButtonIcon}
      //       />
      //     </ActionButton.Item>
      //     <ActionButton.Item buttonColor="#1abc9c" onPress={() => {}}>
      //       <AwesomeIcon name="md-done-all" style={styles.actionButtonIcon} />
      //     </ActionButton.Item>
      //     <ActionButton.Item
      //       buttonColor="#9b59b6"
      //       onPress={() => console.log("notes tapped!")}
      //     >
      //       <AwesomeIcon name="md-create" style={styles.actionButtonIcon} />
      //     </ActionButton.Item>
      //     <ActionButton.Item
      //       buttonColor="green"
      //       onPress={() => console.log("notes tapped!")}
      //     >
      //       <AwesomeIcon name="md-create" style={styles.actionButtonIcon} />
      //     </ActionButton.Item>
      //     <ActionButton.Item
      //       buttonColor="yellow"
      //       onPress={() => console.log("notes tapped!")}
      //     >
      //       <AwesomeIcon name="md-create" style={styles.actionButtonIcon} />
      //     </ActionButton.Item>
      //     <ActionButton.Item
      //       buttonColor="pink"
      //       onPress={() => console.log("notes tapped!")}
      //     >
      //       <AwesomeIcon name="md-create" style={styles.actionButtonIcon} />
      //     </ActionButton.Item>
      //   </ActionButton>
      //   </View>

      <View style={styles.feedHeaderWrapper}>
        {/* <TouchableOpacity onPress={this.props.navigation.openDrawer}>
          <Text>Open Drawer</Text>
        </TouchableOpacity> */}
        <View style={styles.headerUpperSection}>
          {/* <ScrollView style={styles.postButtonWrapper} key="postButton">
            <PostButton
              text={I18n.t("home.post_button_text")}
              onPress={this.navigateToPostCreationPage}
              testID="postButton"
            />
          </ScrollView> */}

          {/* <View style={{ height: 700 }}>
            <PostEditor />
          </View> */}

          {/* <Image
            source={images.homeTab.gradient}
            style={styles.headerUpperSectionBackground}
          />
          <Text
            size={36}
            lineHeight={40}
            color={daytColors.white}
            bold
            style={[styles.userName, isRtlDesign && styles.userNameRTL]}
          >
            {greetingLines[0]}
          </Text> */}

          {/* <Text
            size={36}
            lineHeight={40}
            color={textColor}
            bold
            style={[styles.greetingTime, isRtlDesign && styles.greetingTimeRTL]}
          >
            {greetingLines[1]}
          </Text> */}
        </View>

        <View style={styles.themesCarouselBottomBorder} />
        {(enableCommunityFeed || isAdmin) &&
          {
            /* <SubHeader
            tabs={screenTabs}
            screenName={screenNames.HomeTab}
            activeTab={activeSubTab}
            onTabChange={val => this.setState({ activeSubTab: val })}
            enableAnalytics
            style={styles.subHeader}
          /> */
          }}
      </View>
    );
  };
  navigateToPostCreationPage = () => {
    // const { userNeighborhood } = this.props;
    // const { activeSubTab } = this.state;
    // const params = {
    //   mode: editModes.CREATE,
    //   onCreated: this.scrollToFeedTop,
    //   activeSubTab
    // };
    // if (userNeighborhood) {
    //   params.additionalContexts = [{ ...userNeighborhood, entityType: entityTypes.NEIGHBORHOOD }];
    // }
    navigationService.navigate(screenNames.PostEditor);
  };

  renderTopicChipsLoadingState = ({ isRtlDesign }) => {
    const row = index => (
      <View
        key={`row-${index}`}
        style={
          isRtlDesign
            ? styles.topicChipsLoadingWrapperRTL
            : styles.topicChipsLoadingWrapper
        }
      >
        <PlaceholderRectangle
          width={"35%"}
          height={34}
          backgroundColor={daytColors.white20}
          borderRadius={18}
          marginBottom={10}
          marginRight={7}
        />
        <PlaceholderRectangle
          width={"20%"}
          height={34}
          backgroundColor={daytColors.white20}
          borderRadius={18}
          marginBottom={10}
          marginRight={7}
        />
        <PlaceholderRectangle
          width={"25%"}
          height={34}
          backgroundColor={daytColors.white20}
          borderRadius={18}
          marginBottom={10}
          marginRight={7}
        />
      </View>
    );
    return <View style={styles.chipsLoadingState}>{[1, 2, 3].map(row)}</View>;
  };
  renderTopicChips = ({ isRtlDesign }) => {
    const { topics } = this.props;
    const adjustedTopics = [{ tags: [MY_HOOD] }, ...topics];
    const topicChips = adjustedTopics.map(topic => {
      const topicTranslation = this.getTopicTranslation({ topic });
      const topicTag = topic.tags[0];
      return (
        <Chip
          testID={topicTag}
          key={topicTag}
          onPress={() => this.navigateToTopic({ topic })}
          style={styles.topicItem}
          textStyle={styles.topicItemText}
          isBold
        >
          {topicTranslation}
        </Chip>
      );
    });
    return (
      <View
        style={[
          styles.topicChipsWrapper,
          isRtlDesign && styles.topicChipsWrapperRTL
        ]}
      >
        {topicChips}
      </View>
    );
  };
}

export default HomeTab;
