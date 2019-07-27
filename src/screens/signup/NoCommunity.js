import React, { Component } from "react";
import PropTypes from "prop-types";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { setCommunity, updateUserLanguage } from "/redux/auth/actions";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import {
  View,
  Text
  //   Image,
  //   TranslatedText,
  //   NewTextButton,
  //   TextInLine,
  //   ScrollView
} from "src/components/basicComponents";
// import { Screen } from "/components";
// import { AwesomeIcon } from "/assets/icons";
// import images from "/assets/images";
// import { analytics } from "/infra/reporting";
// import { navigationService } from "/infra/navigation";
// import { uniqBy } from "/infra/utils";
// import { daytColors, uiConstants, commonStyles } from "/vars";
// import { screenNames } from "/vars/enums";
// import {
//   filterCommunitiesWithSameOriginOrOriginUpperLevel,
//   filterCommunitiesWithSameDestinationCountry
// } from "./utils";

// const OOPS_IMAGE_WIDTH = 100;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: daytColors.paleGreyTwo
//   },
//   mainContent: {
//     flex: 1,
//     paddingTop: uiConstants.PHONE_BAR_HEIGHT + 30
//   },
//   headerBackground: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 260,
//     width: "100%"
//   },
//   topSection: {
//     height: 250
//   },
//   header: {
//     alignItems: "center",
//     paddingHorizontal: 20,
//     marginBottom: 25,
//     flex: 1
//   },
//   subtitle: {
//     textAlign: "center"
//   },
//   oopsImage: {
//     width: OOPS_IMAGE_WIDTH,
//     height: OOPS_IMAGE_WIDTH
//   },
//   description: {
//     margin: 20,
//     textAlign: "center"
//   },
//   suggestedCommunity: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     height: 55,
//     borderRadius: 10,
//     marginHorizontal: 20,
//     marginBottom: 15,
//     paddingLeft: 16,
//     paddingRight: 20
//   },
//   suggestedCommunityIcon: {
//     marginRight: 9
//   },
//   changeCommunityButton: {
//     flex: 0,
//     backgroundColor: daytColors.green,
//     margin: 20,
//     marginBottom: 20 + uiConstants.FOOTER_MARGIN_BOTTOM,
//     height: 55
//   },
//   changeCommunityButtonText: {
//     color: daytColors.white
//   },
//   changeCommunityHeader: {
//     marginTop: 3,
//     marginBottom: 2,
//     paddingHorizontal: 30
//   }
// });

class NoCommunity extends Component {
  //   constructor(props) {
  //     super(props);
  //     const {
  //       navigation: {
  //         state: {
  //           params: { originCountry, destinationCity }
  //         }
  //       },
  //       communities
  //     } = props;
  //     const communitiesWithSameOriginOrOriginUpperLevel = filterCommunitiesWithSameOriginOrOriginUpperLevel(
  //       { communities, value: originCountry.name }
  //     );
  //     const communitiesWithSameDestinationCountry = filterCommunitiesWithSameDestinationCountry(
  //       { communities, value: destinationCity.name }
  //     );
  //     this.suggestedCommunities = uniqBy(
  //       [
  //         ...communitiesWithSameOriginOrOriginUpperLevel,
  //         ...communitiesWithSameDestinationCountry
  //       ],
  //       "id"
  //     );
  //   }

  render() {
    return (
      <View>
        <Text>NoCommunity</Text>
      </View>
      //       <ScrollView
      //         style={commonStyles.flex1}
      //         contentContainerStyle={styles.container}
      //       >
      //         {this.renderBackground()}
      //         <View style={styles.mainContent}>
      //           <View style={styles.topSection}>
      //             {this.renderHeader()}
      //             {this.renderImage()}
      //           </View>
      //           <View style={commonStyles.flex1}>
      //             {this.suggestedCommunities.length
      //               ? this.renderSuggestedCommunities(this.suggestedCommunities)
      //               : this.renderNoCommunityMessage()}
      //           </View>
      //         </View>
      //         {this.renderChangeCommunityButton()}
      //       </ScrollView>
    );
  }

  //   componentDidMount() {
  //     const { user } = this.props;
  //     analytics.viewEvents
  //       .entityView({
  //         screenName: "OB - Missing Community",
  //         origin: "OB - Choose Community",
  //         entityId: user.id,
  //         entityName: user.name
  //       })
  //       .dispatch();
  //   }

  //   renderBackground() {
  //     return (
  //       <Image
  //         source={images.onboarding.steps_header_bg}
  //         style={styles.headerBackground}
  //         resizeMode="stretch"
  //       />
  //     );
  //   }

  //   renderHeader() {
  //     const { navigation } = this.props;
  //     const { originCountry, destinationCity } = navigation.state.params;
  //     const destinationCityName = destinationCity.name.split(",")[0];
  //     return (
  //       <View style={styles.header}>
  //         <Text bold size={32} lineHeight={42} color={daytColors.white}>
  //           {I18n.t("onboarding.no_community.title")}
  //         </Text>
  //         <TranslatedText
  //           size={20}
  //           lineHeight={30}
  //           color={daytColors.white}
  //           style={styles.subtitle}
  //           numberOfLines={2}
  //         >
  //           {I18n.t("onboarding.no_community.subtitle", {
  //             originCountry: originCountry.name,
  //             destinationCity: destinationCityName
  //           })}
  //         </TranslatedText>
  //       </View>
  //     );
  //   }

  //   renderImage() {
  //     const { width } = Dimensions.get("window");
  //     return (
  //       <Image
  //         source={images.onboarding.oops}
  //         style={[styles.oopsImage, { left: (width - OOPS_IMAGE_WIDTH) / 2 }]}
  //       />
  //     );
  //   }

  //   renderNoCommunityMessage = () => (
  //     <Text
  //       size={20}
  //       lineHeight={30}
  //       color={daytColors.b30}
  //       style={styles.description}
  //     >
  //       {I18n.t("onboarding.no_community.description")}
  //     </Text>
  //   );

  //   renderSuggestedCommunities(suggestedCommunities) {
  //     const { navigation } = this.props;
  //     const { originCountry } = navigation.state.params;
  //     return (
  //       <View style={commonStyles.flex1}>
  //         <Text
  //           size={20}
  //           lineHeight={30}
  //           color={daytColors.b30}
  //           style={styles.description}
  //         >
  //           {I18n.t("onboarding.no_community.suggested_communities_title", {
  //             originCountry: originCountry.name
  //           })}
  //         </Text>
  //         {suggestedCommunities.map(this.renderSuggestedCommunity)}
  //         <TextInLine
  //           style={styles.changeCommunityHeader}
  //           textSize={16}
  //           textColor={daytColors.b60}
  //         >
  //           {I18n.t(
  //             "onboarding.no_community.suggested_communities_change_community_header"
  //           )}
  //         </TextInLine>
  //       </View>
  //     );
  //   }

  //   renderSuggestedCommunity = (community, index) => {
  //     const { originCountry, city, id } = community;

  //     return (
  //       <TouchableOpacity
  //         style={[styles.suggestedCommunity, commonStyles.shadow]}
  //         key={id}
  //         onPress={() => this.onSuggestedCommunityChosen(community)}
  //         testID={`suggestedCommunity-${index}`}
  //       >
  //         <View style={commonStyles.flexDirectionRow}>
  //           <AwesomeIcon
  //             name="check-circle"
  //             size={20}
  //             color={daytColors.green}
  //             weight="solid"
  //             style={styles.suggestedCommunityIcon}
  //           />
  //           <TranslatedText size={16} lineHeight={19} color={daytColors.b30}>
  //             {I18n.t("onboarding.no_community.suggested_community_name", {
  //               originCountry,
  //               destinationCity: city
  //             })}
  //           </TranslatedText>
  //         </View>
  //         <Text bold size={16} lineHeight={19} color={daytColors.green}>
  //           {I18n.t("onboarding.no_community.suggested_community_button")}
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   };

  //   renderChangeCommunityButton = () => (
  //     <NewTextButton
  //       size={NewTextButton.sizes.BIG50}
  //       onPress={this.onChangeCommunityPress}
  //       style={styles.changeCommunityButton}
  //       textStyle={styles.changeCommunityButtonText}
  //     >
  //       {I18n.t("onboarding.no_community.change_community_button")}
  //     </NewTextButton>
  //   );

  //   onSuggestedCommunityChosen = chosenCommunity => {
  //     const { user, setCommunity, updateUserLanguage } = this.props;
  //     analytics.actionEvents
  //       .onboardingJoinAlternateCommunity({
  //         userId: user.id,
  //         communityName: chosenCommunity.name
  //       })
  //       .dispatch();
  //     setCommunity({ community: chosenCommunity });
  //     updateUserLanguage({ locale: chosenCommunity.defaultLanguage });

  //     navigationService.navigate(screenNames.SetUserDetails, {
  //       showFields: true
  //     });
  //   };

  //   onChangeCommunityPress = () => {
  //     const { user } = this.props;
  //     analytics.actionEvents
  //       .onboardingChangeCommunity({ userId: user.id })
  //       .dispatch();
  //     navigationService.goBack();
  //   };
}

// NoCommunity.propTypes = {
//   navigation: PropTypes.object,
//   communities: PropTypes.array,
//   user: PropTypes.object,
//   setCommunity: PropTypes.func,
//   updateUserLanguage: PropTypes.func
// };

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   communities: state.auth.communities
// });
// const mapDispatchToProps = { setCommunity, updateUserLanguage };

// NoCommunity = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NoCommunity);
// export default Screen({ modalError: true })(NoCommunity);
export default NoCommunity;
