import React from "react";
import PropTypes from "prop-types";
import {
  Animated,
  BackHandler,
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";
import I18n from "../../infra/localization";
import { connect } from "react-redux";
// import { analytics } from "/infra/reporting";
// import { updateProfile } from "/redux/profile/actions";
import { Text, View, ScrollView } from "../../components/basicComponents";
import { Screen } from "../../components";
import { get, isNil } from "../../infra/utils";
import { AwesomeIcon } from "../../assets/icons";
import { daytColors, uiConstants } from "../../vars";
import { genderType } from "../../vars/enums";
import { getRelevantOnboardingScreen } from "../../infra/utils/onboardingUtils";
import { UserProfilePictureHeader } from "../../screens/signup";
import { navigationService } from "../../infra/navigation";

const supportedGenders = [genderType.MALE, genderType.FEMALE];

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.paleGreyTwo
  },
  mainContent: {
    flex: 1
  },
  nextButton: {
    marginTop: 22,
    marginBottom: 22 + uiConstants.FOOTER_MARGIN_BOTTOM,
    textAlign: "center"
  },
  genderWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 20
  },
  genderCol: {
    maxWidth: 160,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    height: 100,
    borderRadius: 10,
    backgroundColor: daytColors.white,
    shadowColor: daytColors.boxShadow,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1
  },
  genderSelectors: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 10
  },
  genderHeaderTitle: {
    fontSize: 16,
    lineHeight: 30,
    color: daytColors.b30,
    textAlign: "center"
  },
  selectedGenderCol: {
    backgroundColor: daytColors.green
  }
});

class SetUserGender extends React.Component {
  state = {
    selectedGender: null,
    fieldsOpacity: new Animated.Value(0),
    fieldsMarginTop: new Animated.Value(-100)
  };
  render() {
    const { fieldsOpacity, fieldsMarginTop } = this.state;

    return (
      <ScrollView style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <UserProfilePictureHeader />
        <Animated.View
          style={[
            styles.mainContent,
            { opacity: fieldsOpacity, marginTop: fieldsMarginTop }
          ]}
        >
          {this.renderGenderField()}
        </Animated.View>
        {this.renderNextButton()}
      </ScrollView>
    );
  }

  componentDidMount() {
    this.animateContentFields();
  }
  renderGenderField() {
    const { selectedGender } = this.state;
    return (
      <View style={styles.genderWrapper}>
        <Text style={styles.genderHeaderTitle} bold>
          {I18n.t("onboarding.set_user_gender.header")}
        </Text>
        <View style={styles.genderSelectors}>
          {supportedGenders.map(value => {
            const isActive = selectedGender === value;
            return (
              <TouchableOpacity
                testID={`signupSetGender-${value}`}
                style={[styles.genderCol, isActive && styles.selectedGenderCol]}
                activeOpacity={0.5}
                key={`gender${value}`}
                // onPress={this.setGender(value)}
              >
                <AwesomeIcon
                  name={value === genderType.MALE ? "mars" : "venus"}
                  weight="light"
                  color={isActive ? daytColors.white : daytColors.black}
                  size={40}
                />
                <Text
                  style={styles.genderText}
                  color={isActive ? daytColors.white : daytColors.black}
                >
                  {I18n.t(`onboarding.set_user_gender.im_a.${value}`)}&nbsp;
                  {I18n.t(`profile.gender.${value}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
  renderNextButton() {
    const { selectedGender } = this.state;
    const isEnabled = !isNil(selectedGender) && !this.isSubmitting;

    return (
      <TouchableOpacity
        activeOpacity={isEnabled ? 0.5 : 1}
        onPress={isEnabled ? this.next : null}
        testID="signupSetGenderSubmitButton"
      >
        <Text
          bold
          size={16}
          lineHeight={19}
          color={isEnabled ? daytColors.green : daytColors.b70}
          style={styles.nextButton}
        >
          {I18n.t("onboarding.set_user_gender.next")}
        </Text>
      </TouchableOpacity>
    );
  }
  animateContentFields = () => {
    const { fieldsMarginTop, fieldsOpacity } = this.state;
    Animated.parallel([
      Animated.timing(fieldsMarginTop, { toValue: 0, duration: 1000 }),
      Animated.timing(fieldsOpacity, { toValue: 1, duration: 1000 })
    ]).start();
  };
}

export default SetUserGender;
