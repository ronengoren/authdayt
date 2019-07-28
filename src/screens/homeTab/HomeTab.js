import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { getListItemCta } from '/redux/lists/actions';
import { Screen, Feed, Header, SubHeader } from "src/components";
// import { GenericListEmptyState } from '/components/emptyState';
// import { MY_HOOD } from '/components/themes';
// import { IntroductionPostEditor } from '/components/introduction';
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
      <View testID="homeTab" style={commonStyles.flex1}>
        <Feed />
      </View>
    );
  }
}

export default HomeTab;
