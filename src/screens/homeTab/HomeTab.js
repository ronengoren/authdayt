import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { getListItemCta } from '/redux/lists/actions';
import { Screen, Feed, Header, SubHeader } from "src/components";
// import { GenericListEmptyState } from '/components/emptyState';
// import { MY_HOOD } from '/components/themes';
import { IntroductionPostEditor } from "src/components/introduction";
import {
  View,
  Text,
  PostButton,
  Image,
  Chip,
  FloatingHeader,
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
// import { get, isAppAdmin, compact } from '/infra/utils';
// import { navigationService } from '/infra/navigation';
// import { getGreetingTime } from '/infra/utils/dateTimeUtils';
// import { addSpaceOnCapitalsAndCapitalize, getFirstName } from '/infra/utils/stringUtils';
// import { misc as miscLocalStorage } from '/infra/localStorage';
// import { userScheme } from '/schemas';
import NewUserWelcomeModal from "./NewUserWelcomeModal";
// import BoardsHeader from './BoardsHeader';

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
    flexDirection: "row",
    marginHorizontal: 15
  },
  topicChipsLoadingWrapperRTL: {
    flexDirection: "row-reverse",
    marginHorizontal: 15
  },
  chipsLoadingState: {
    marginBottom: 15
  },
  themesCarouselBottomBorder: {
    marginBottom: 20,
    marginHorizontal: 15,
    height: 1,
    backgroundColor: daytColors.b90
  },
  postButtonWrapper: {
    marginBottom: 5
  },
  floatingHeader: {
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
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
    this.state = {
      showFloatingHeader: false,
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
    const { activeSubTab, showFloatingHeader } = this.state;

    return (
      <View testID="homeTab" style={commonStyles.flex1}>
        <Feed
          onScroll={this.handleFeedScroll}
          scrollToFeedTop={this.scrollToFeedTop}
          normalizedSchema={normalizedSchema}
          ListHeaderComponent={this.renderFeedHeader}
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
        />
        {/* <NewUserWelcomeModal /> */}

        <FloatingHeader
          style={styles.floatingHeader}
          showFloatingHeader={showFloatingHeader}
          height={uiConstants.NAVBAR_HEIGHT}
        >
          <Header />
        </FloatingHeader>
      </View>
    );
  }
  handleFeedScroll = e => {
    const { showFloatingHeader } = this.state;
    this.scrollY = e.nativeEvent.contentOffset.y;
    const breakpoint = FloatingHeader.getAdjustedBreakpoint(400);
    if (this.scrollY > breakpoint && !showFloatingHeader) {
      this.setState({ showFloatingHeader: true });
    } else if (this.scrollY < breakpoint && showFloatingHeader) {
      this.setState({ showFloatingHeader: false });
    }
  };
  renderFeedHeader = () => {
    const { appLanguage, topics, enableCommunityFeed, user } = this.props;
    const { activeSubTab, screenTabs } = this.state;
    const greetingLines = this.getGreeting();
    const isRtlDesign = appLanguage === "he";
    const textColor = Platform.select({
      ios: homeisColors.halfLightWhite,
      android: homeisColors.white
    });
    const isAdmin = isAppAdmin(user);

    return (
      <View style={styles.feedHeaderWrapper}>
        <View style={styles.headerUpperSection}>
          <Image
            source={images.homeTab.gradient}
            style={styles.headerUpperSectionBackground}
          />
          <Text
            size={36}
            lineHeight={40}
            color={homeisColors.white}
            bold
            style={[styles.userName, isRtlDesign && styles.userNameRTL]}
          >
            {greetingLines[0]}
          </Text>
          <Text
            size={36}
            lineHeight={40}
            color={textColor}
            bold
            style={[styles.greetingTime, isRtlDesign && styles.greetingTimeRTL]}
          >
            {greetingLines[1]}
          </Text>
          <TouchableOpacity
            onPress={this.navigateToSearch}
            activeOpacity={0.5}
            style={[
              styles.searchBox,
              commonStyles.shadow,
              isRtlDesign && styles.searchBoxRTL
            ]}
          >
            <AwesomeIcon
              name="search"
              size={20}
              color={homeisColors.b60}
              style={
                isRtlDesign ? styles.searchBoxIconRTL : styles.searchBoxIcon
              }
              weight="solid"
            />
            <Text
              size={16}
              lineHeight={19}
              color={homeisColors.b60}
              numberOfLines={1}
              style={
                isRtlDesign ? styles.searchBoxTextRTL : styles.searchBoxText
              }
            >
              {I18n.t("home.search_placeholder")}
            </Text>
          </TouchableOpacity>
          {topics && topics.length
            ? this.renderTopicChips({ isRtlDesign })
            : this.renderTopicChipsLoadingState({ isRtlDesign })}
        </View>
        <BoardsHeader />
        <View style={styles.themesCarouselBottomBorder} />
        {(enableCommunityFeed || isAdmin) && (
          <SubHeader
            tabs={screenTabs}
            screenName={screenNames.HomeTab}
            activeTab={activeSubTab}
            onTabChange={val => this.setState({ activeSubTab: val })}
            enableAnalytics
            style={styles.subHeader}
          />
        )}
        <View style={styles.postButtonWrapper} key="postButton">
          <PostButton
            text={I18n.t("home.post_button_text")}
            onPress={this.navigateToPostCreationPage}
            testID="postButton"
          />
        </View>
      </View>
    );
  };
}

export default HomeTab;
