import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { getListItemCta } from '/redux/lists/actions';
// import { Screen, Feed, Header, SubHeader } from '/components';
// import { GenericListEmptyState } from '/components/emptyState';
// import { MY_HOOD } from '/components/themes';
// import { IntroductionPostEditor } from '/components/introduction';
// import { View, Text, PostButton, Image, Chip, FloatingHeader, PlaceholderRectangle } from '/components/basicComponents';
// import { AwesomeIcon } from '/assets/icons';
// import images from '/assets/images';
// import { daytColors, commonStyles, uiConstants } from '/vars';
// import { editModes, screenNames, originTypes, groupType, entityTypes } from '/vars/enums';
// import { get, isAppAdmin, compact } from '/infra/utils';
// import { navigationService } from '/infra/navigation';
// import { getGreetingTime } from '/infra/utils/dateTimeUtils';
// import { addSpaceOnCapitalsAndCapitalize, getFirstName } from '/infra/utils/stringUtils';
// import { misc as miscLocalStorage } from '/infra/localStorage';
// import { userScheme } from '/schemas';
// import NewUserWelcomeModal from './NewUserWelcomeModal';
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
  render() {
    return (
      <View>
        <Text>homeTab</Text>
      </View>
    );
  }
}
//   static subTabs = {
//     COMMUNITY_FEED: 'Community',
//     NEWS_FEED: 'My Feed',
//     SCHEDULED_POSTS: 'Scheduled Posts',
//     PERSONALIZED: 'Personalized'
//   };

//   constructor(props) {
//     super(props);
//     const { enablePersonalizedFeed } = this.props;
//     const {
//       navigation: {
//         state: { params }
//       }
//     } = props;
//     this.state = {
//       activeSubTab: (params && params.subTab) || enablePersonalizedFeed ? HomeTab.subTabs.PERSONALIZED : HomeTab.subTabs.NEWS_FEED,
//       showFloatingHeader: false,
//       screenTabs: []
//     };

//     this.scrollY = 0;
//   }

//   render() {
//     const { showIntroPost, getListItemCta, enablePersonalizedFeed } = this.props;
//     const { activeSubTab, showFloatingHeader } = this.state;
//     const isNewsFeed = [HomeTab.subTabs.NEWS_FEED, HomeTab.subTabs.PERSONALIZED].includes(activeSubTab);
//     const isScheduledPostsSubTab = activeSubTab === HomeTab.subTabs.SCHEDULED_POSTS;
//     const normalizedSchema = 'FEED';
//     const { apiQuery, reducerStatePath } = this.getFeedParams();

//     return (
//       <View testID="homeTab" style={commonStyles.flex1}>
//         <Feed
//           onScroll={this.handleFeedScroll}
//           scrollToFeedTop={this.scrollToFeedTop}
//           activeHomeTab={enablePersonalizedFeed ? HomeTab.subTabs.PERSONALIZED : HomeTab.subTabs.NEWS_FEED}
//           apiQuery={apiQuery}
//           reducerStatePath={reducerStatePath}
//           normalizedSchema={normalizedSchema}
//           ListHeaderComponent={this.renderFeedHeader}
//           ListEmptyComponent={isScheduledPostsSubTab ? <GenericListEmptyState type={entityTypes.SCHEDULED_POST} headerText={I18n.t(`home.scheduled_empty_state.header`)} /> : null}
//           originType={originTypes.HOME_FEED}
//           ref={(feedRef) => {
//             this.feedRef = feedRef;
//           }}
//           extraTopComponent={showIntroPost && isNewsFeed ? <IntroductionPostEditor scrollToOffset={this.scrollToOffset} key="introPost" /> : null}
//           onTopFetchAction={isNewsFeed ? getListItemCta : null}
//         />
//         <NewUserWelcomeModal />
//         <FloatingHeader style={styles.floatingHeader} showFloatingHeader={showFloatingHeader} height={uiConstants.NAVBAR_HEIGHT}>
//           <Header />
//         </FloatingHeader>
//       </View>
//     );
//   }

//   static getDerivedStateFromProps(props, state) {
//     const { enablePersonalizedFeed, enableCommunityFeed, navigation, user } = props;
//     const { params } = navigation.state;
//     const { screenTabs: previousScreenTabs } = state;
//     const isAdmin = isAppAdmin(user);
//     let derivedState = null;
//     if (enablePersonalizedFeed || isAdmin) {
//       derivedState = {
//         screenTabs: compact([
//           enablePersonalizedFeed && { name: I18n.t('home.sub_tabs.personalized'), value: HomeTab.subTabs.PERSONALIZED },
//           { name: I18n.t('home.sub_tabs.sub_tab_1'), value: HomeTab.subTabs.NEWS_FEED },
//           !enablePersonalizedFeed && enableCommunityFeed && { name: I18n.t('home.sub_tabs.sub_tab_2'), value: HomeTab.subTabs.COMMUNITY_FEED },
//           isAdmin && { name: I18n.t('home.sub_tabs.sub_tab_3'), value: HomeTab.subTabs.SCHEDULED_POSTS }
//         ])
//       };
//       if (previousScreenTabs.length !== derivedState.screenTabs.length) {
//         derivedState.activeSubTab = derivedState.screenTabs[0].value;
//       }
//     }
//     if (params && params.subTab !== state.activeSubTab) {
//       derivedState = { ...(derivedState || {}), activeSubTab: params.subTab };
//     }
//     return derivedState;
//   }

//   componentDidMount() {
//     this.props.getListItemCta();
//     miscLocalStorage.updateHasOpened();
//   }

//   renderFeedHeader = () => {
//     const { appLanguage, topics, enableCommunityFeed, user } = this.props;
//     const { activeSubTab, screenTabs } = this.state;
//     const greetingLines = this.getGreeting();
//     const isRtlDesign = appLanguage === 'he';
//     const textColor = Platform.select({ ios: daytColors.halfLightWhite, android: daytColors.white });
//     const isAdmin = isAppAdmin(user);

//     return (
//       <View style={styles.feedHeaderWrapper}>
//         <View style={styles.headerUpperSection}>
//           <Image source={images.homeTab.gradient} style={styles.headerUpperSectionBackground} />
//           <Text size={36} lineHeight={40} color={daytColors.white} bold style={[styles.userName, isRtlDesign && styles.userNameRTL]}>
//             {greetingLines[0]}
//           </Text>
//           <Text size={36} lineHeight={40} color={textColor} bold style={[styles.greetingTime, isRtlDesign && styles.greetingTimeRTL]}>
//             {greetingLines[1]}
//           </Text>
//           <TouchableOpacity onPress={this.navigateToSearch} activeOpacity={0.5} style={[styles.searchBox, commonStyles.shadow, isRtlDesign && styles.searchBoxRTL]}>
//             <AwesomeIcon name="search" size={20} color={daytColors.b60} style={isRtlDesign ? styles.searchBoxIconRTL : styles.searchBoxIcon} weight="solid" />
//             <Text size={16} lineHeight={19} color={daytColors.b60} numberOfLines={1} style={isRtlDesign ? styles.searchBoxTextRTL : styles.searchBoxText}>
//               {I18n.t('home.search_placeholder')}
//             </Text>
//           </TouchableOpacity>
//           {topics && topics.length ? this.renderTopicChips({ isRtlDesign }) : this.renderTopicChipsLoadingState({ isRtlDesign })}
//         </View>
//         <BoardsHeader />
//         <View style={styles.themesCarouselBottomBorder} />
//         {(enableCommunityFeed || isAdmin) && (
//           <SubHeader
//             tabs={screenTabs}
//             screenName={screenNames.HomeTab}
//             activeTab={activeSubTab}
//             onTabChange={(val) => this.setState({ activeSubTab: val })}
//             enableAnalytics
//             style={styles.subHeader}
//           />
//         )}
//         <View style={styles.postButtonWrapper} key="postButton">
//           <PostButton text={I18n.t('home.post_button_text')} onPress={this.navigateToPostCreationPage} testID="postButton" />
//         </View>
//       </View>
//     );
//   };

//   renderTopicChipsLoadingState = ({ isRtlDesign }) => {
//     const row = (index) => (
//       <View key={`row-${index}`} style={isRtlDesign ? styles.topicChipsLoadingWrapperRTL : styles.topicChipsLoadingWrapper}>
//         <PlaceholderRectangle width={'35%'} height={34} backgroundColor={daytColors.white20} borderRadius={18} marginBottom={10} marginRight={7} />
//         <PlaceholderRectangle width={'20%'} height={34} backgroundColor={daytColors.white20} borderRadius={18} marginBottom={10} marginRight={7} />
//         <PlaceholderRectangle width={'25%'} height={34} backgroundColor={daytColors.white20} borderRadius={18} marginBottom={10} marginRight={7} />
//       </View>
//     );
//     return <View style={styles.chipsLoadingState}>{[1, 2, 3].map(row)}</View>;
//   };

//   renderTopicChips = ({ isRtlDesign }) => {
//     const { topics } = this.props;
//     const adjustedTopics = [{ tags: [MY_HOOD] }, ...topics];
//     const topicChips = adjustedTopics.map((topic) => {
//       const topicTranslation = this.getTopicTranslation({ topic });
//       const topicTag = topic.tags[0];
//       return (
//         <Chip testID={topicTag} key={topicTag} onPress={() => this.navigateToTopic({ topic })} style={styles.topicItem} textStyle={styles.topicItemText} isBold>
//           {topicTranslation}
//         </Chip>
//       );
//     });
//     return <View style={[styles.topicChipsWrapper, isRtlDesign && styles.topicChipsWrapperRTL]}>{topicChips}</View>;
//   };

//   getFeedParams() {
//     const { activeSubTab } = this.state;
//     switch (activeSubTab) {
//       case HomeTab.subTabs.SCHEDULED_POSTS:
//         return { apiQuery: { domain: 'scheduledPosts', key: 'getPosts' }, reducerStatePath: 'scheduledPosts' };
//       case HomeTab.subTabs.PERSONALIZED:
//         return { apiQuery: { domain: 'feed', key: 'news', params: { personalized: true } }, reducerStatePath: 'personalizedFeed' };
//       case HomeTab.subTabs.COMMUNITY_FEED:
//         return { apiQuery: { domain: 'feed', key: 'community' }, reducerStatePath: 'communityFeed' };
//       case HomeTab.subTabs.NEWS_FEED:
//       default:
//         return { apiQuery: { domain: 'feed', key: 'news' }, reducerStatePath: 'newsFeed' };
//     }
//   }

//   getTopicTranslation = ({ topic }) => {
//     const { community, userNeighborhood } = this.props;
//     const { tags, name } = topic;
//     const isMyHood = tags[0] === MY_HOOD;

//     if (isMyHood) {
//       return userNeighborhood ? userNeighborhood.name : I18n.t(`themes.${MY_HOOD}.${community.destinationPartitionLevel}`, { defaultValue: addSpaceOnCapitalsAndCapitalize(name) });
//     } else {
//       return name ? addSpaceOnCapitalsAndCapitalize(name) : I18n.t(`shared.tags.${tags[0]}`, { defaultValue: addSpaceOnCapitalsAndCapitalize(tags[0]) });
//     }
//   };

//   getGreeting = () => {
//     const {
//       community,
//       user: { name }
//     } = this.props;
//     const greetingTimeDefinition = getGreetingTime();
//     const customGreetings = get(community, 'customAppFace.greetings', []);
//     const customGreeting = this.getFirstValidGreeting(customGreetings);
//     const greetingLines = [I18n.t('home.user_greeting', { name: getFirstName(name) }), I18n.t(`home.${greetingTimeDefinition}`)];

//     if (customGreeting) {
//       if (customGreeting.line1) {
//         greetingLines[0] = customGreeting.line1.replace('{name}', getFirstName(name));
//       }
//       if (customGreeting.line2) {
//         greetingLines[1] = customGreeting.line2.replace('{name}', getFirstName(name));
//       }
//     }
//     return greetingLines;
//   };

//   getFirstValidGreeting = (customGreetings) =>
//     customGreetings.find((greeting) => {
//       const now = Date.now();
//       const startTime = Date.parse(greeting.startTime);
//       const endTime = Date.parse(greeting.endTime);
//       return now >= startTime && now <= endTime;
//     });

//   handleFeedScroll = (e) => {
//     const { showFloatingHeader } = this.state;
//     this.scrollY = e.nativeEvent.contentOffset.y;
//     const breakpoint = FloatingHeader.getAdjustedBreakpoint(400);
//     if (this.scrollY > breakpoint && !showFloatingHeader) {
//       this.setState({ showFloatingHeader: true });
//     } else if (this.scrollY < breakpoint && showFloatingHeader) {
//       this.setState({ showFloatingHeader: false });
//     }
//   };

//   navigateToPostCreationPage = () => {
//     const { userNeighborhood } = this.props;
//     const { activeSubTab } = this.state;
//     const params = { mode: editModes.CREATE, onCreated: this.scrollToFeedTop, activeSubTab };
//     if (userNeighborhood) {
//       params.additionalContexts = [{ ...userNeighborhood, entityType: entityTypes.NEIGHBORHOOD }];
//     }
//     navigationService.navigate(screenNames.PostEditor, params);
//   };

//   scrollToFeedTop = () => {
//     this.feedRef && this.feedRef.getWrappedInstance().scrollToIndex({ index: 0 });
//   };

//   scrollToOffset = ({ offset }) => {
//     this.feedRef && this.feedRef.getWrappedInstance().scrollToOffset({ offset });
//   };

//   navigateToSearch = () => {
//     navigationService.navigate(screenNames.Search, {
//       withPeopleSearch: true
//     });
//   };

//   navigateToTopic = ({ topic }) => {
//     if (topic.tags[0] === MY_HOOD) {
//       navigationService.navigate(screenNames.MyNeighborhoodView, {});
//     } else {
//       navigationService.navigate(screenNames.GroupView, { entityId: topic.id, groupType: groupType.TOPIC, originType: originTypes.HOME_TAB });
//     }
//   };
// }

// HomeTab.propTypes = {
//   user: userScheme,
//   appLanguage: PropTypes.string,
//   topics: PropTypes.array,
//   navigation: PropTypes.object,
//   userNeighborhood: PropTypes.object,
//   community: PropTypes.shape({
//     destinationLocation: PropTypes.array,
//     destinationCountryCode: PropTypes.string,
//     destinationPartitionLevel: PropTypes.string
//   }),
//   showIntroPost: PropTypes.bool,
//   enableCommunityFeed: PropTypes.bool,
//   enablePersonalizedFeed: PropTypes.bool,
//   getListItemCta: PropTypes.func
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
//   appLanguage: get(state.auth.user, 'settings.language', ''),
//   topics: get(state.auth, 'appSettings.data.topics', []),
//   userNeighborhood: get(state, 'auth.user.journey.neighborhood'),
//   community: state.auth.user.community,
//   showIntroPost: get(state, 'auth.user.settings.showIntroPost', false),
//   enableCommunityFeed: get(state.auth.featureFlags, 'enableCommunityFeed', false),
//   enablePersonalizedFeed: get(state.auth.featureFlags, 'enablePersonalizedFeed', false)
// });

// HomeTab = connect(
//   mapStateToProps,
//   { getListItemCta }
// )(HomeTab);
// HomeTab = Screen()(HomeTab);
export default HomeTab;
