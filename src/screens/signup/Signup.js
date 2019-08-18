import React from "react";
import PropTypes from "prop-types";

import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  PanResponder
} from "react-native";
import { daytColors, uiConstants } from "src/vars";
import { Screen, ApiCommandTextButton, FormInput } from "src/components";

import { View, Text, TextButton } from "src/components/basicComponents";
import { connect } from "react-redux";
import I18n from "src/infra/localization";
import { get } from "src/infra/utils";
import { DaytIcon } from "src/assets/icons";
import { navigationService } from "src/infra/navigation";

import {
  screenNames,
  screenGroupNames,
  signUpMethodTypes,
  authErrors,
  downloadLinks
} from "src/vars/enums";
import { getRelevantOnboardingScreen } from "src/infra/utils/onboardingUtils";

const hitSlop = { left: 40, right: 40, top: 40, bottom: 40 };
const slidingDistance = 110;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT
  },
  header: {
    width: "100%",
    height: 40,
    paddingTop: 10,
    backgroundColor: daytColors.white,
    zIndex: 10
  },
  backButtonWrapper: {
    position: "absolute",
    top: 10,
    left: 15,
    height: 30,
    width: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  topSeparator: {
    flex: 1,
    maxHeight: 40
  },
  wrapper: {
    height: 320,
    marginHorizontal: 20,
    overflow: "hidden"
  },
  signUpBtnWithFacebookWrapper: {
    marginBottom: 15
  },
  facebookButton: {
    backgroundColor: daytColors.facebookBlue,
    borderColor: daytColors.facebookBlue
  },
  separatorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: daytColors.disabledGrey
  },
  separatorText: {
    height: 22,
    marginHorizontal: 10,
    marginVertical: 4,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: daytColors.black
  },
  nameAndLastNameInputs: {
    flexDirection: "row"
  },
  nameAndLastNameInputsSeparator: {
    height: "100%",
    width: 20
  },
  signUpButton: {
    marginTop: 20
  },
  disabledSignUpButton: {
    backgroundColor: daytColors.disabledGrey,
    borderColor: daytColors.disabledGrey
  },
  footerWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20 + uiConstants.FOOTER_MARGIN_BOTTOM,
    backgroundColor: daytColors.white,
    zIndex: 1
  },
  footerUpperPart: {
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomColor: daytColors.disabledGrey,
    borderBottomWidth: 1
  },
  footerText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    color: daytColors.placeholderGrey
  },
  footerLink: {
    fontSize: 13,
    lineHeight: 20,
    color: daytColors.blue
  },
  footerLowerPart: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 15
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.registerPanResponder();
    this.state = {
      slidedUp: false,
      translateY: new Animated.Value(0),
      facebookSignUp: false,
      email: { value: "" },
      firstName: { value: "" },
      referrer: {
        id: undefined,
        linkType: undefined
      },
      lastName: { value: "" },
      password: { value: "" }
    };
  }
  render() {
    const {
      translateY,
      facebookSignUp,
      email,
      firstName,
      lastName,
      password
    } = this.state;
    const submitDisabled = Object.keys(this.state).some(
      key => this.state[key].isValid === false
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} medium>
            {I18n.t("onboarding.sign_up.page_header")}
          </Text>
          <TouchableOpacity
            accessibilityTraits="button"
            accessibilityComponentType="button"
            activeOpacity={1}
            style={styles.backButtonWrapper}
            hitSlop={hitSlop}
            onPress={this.onBackButtonPress}
          >
            <DaytIcon
              name="back-arrow"
              size={25}
              color={daytColors.placeholderGrey}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topSeparator} />
        <View style={styles.wrapper}>
          <Animated.View
            style={[styles.innerWrapper, { transform: [{ translateY }] }]}
          >
            <View style={styles.signUpBtnWithFacebookWrapper}>
              <TextButton
                size="big50Height"
                iconName="facebook-logo"
                iconSize={23}
                style={styles.facebookButton}
                onPress={this.handleFacebookSignUp}
                busy={facebookSignUp}
              >
                {I18n.t("onboarding.sign_up.facebook_button")}
              </TextButton>
            </View>
            <View style={styles.separatorWrapper}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>
                {I18n.t("onboarding.sign_up.methods_separator")}
              </Text>
              <View style={styles.separatorLine} />
            </View>
            <View {...this.panResponder.panHandlers}>
              <View style={styles.nameAndLastNameInputs}>
                <FormInput
                  label={I18n.t("common.form.first_name")}
                  autoCapitalize={"words"}
                  onChange={this.handleChangeHandlerWrapper("firstName")}
                  onFocus={this.handleInputFocus}
                  value={firstName.value}
                  errorText={firstName.errorText}
                  validations={[
                    {
                      type: "minLength",
                      value: 2,
                      errorText: I18n.t("common.form.min_chars", {
                        minChars: 2
                      })
                    }
                  ]}
                  required
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    this.lastNameInput.focus();
                  }}
                  autoCorrect={false}
                  testID="signupFirstNamelInput"
                />
                <View style={styles.nameAndLastNameInputsSeparator} />
                <FormInput
                  label={I18n.t("common.form.last_name")}
                  autoCapitalize={"words"}
                  onChange={this.handleChangeHandlerWrapper("lastName")}
                  onFocus={this.handleInputFocus}
                  value={lastName.value}
                  errorText={lastName.errorText}
                  validations={[
                    {
                      type: "minLength",
                      value: 2,
                      errorText: I18n.t("common.form.min_chars", {
                        minChars: 2
                      })
                    }
                  ]}
                  required
                  returnKeyType={"next"}
                  ref={node => {
                    this.lastNameInput = node;
                  }}
                  onSubmitEditing={() => {
                    this.emailInput.focus();
                  }}
                  autoCorrect={false}
                  testID="signupLastNamelInput"
                />
              </View>
              <FormInput
                label={I18n.t("common.form.email")}
                keyboardType={"email-address"}
                autoCapitalize={"none"}
                onChange={this.handleChangeHandlerWrapper("email")}
                onFocus={this.handleInputFocus}
                value={email.value}
                validations={["email"]}
                errorText={email.errorText}
                required
                returnKeyType={"next"}
                ref={node => {
                  this.emailInput = node;
                }}
                onSubmitEditing={() => {
                  this.passwordInput.focus();
                }}
                autoCorrect={false}
                testID="signupEmailInput"
              />
              <FormInput
                label={I18n.t("common.form.password")}
                autoCapitalize={"none"}
                secureTextEntry
                onChange={this.handleChangeHandlerWrapper("password")}
                onFocus={this.handleInputFocus}
                value={password.value}
                validations={[
                  {
                    type: "minLength",
                    value: 6,
                    errorText: I18n.t("common.form.password_min_chars", {
                      minChars: 6
                    })
                  }
                ]}
                errorText={password.errorText}
                required
                returnKeyType={"done"}
                ref={node => {
                  this.passwordInput = node;
                }}
                onSubmitEditing={() => {
                  this.handleSubmit(submitDisabled);
                }}
                autoCorrect={false}
                testID="signupPasswordInput"
              />
            </View>
            <View style={styles.signUpButton}>
              <ApiCommandTextButton
                size="big50Height"
                command="auth.signUp"
                onPress={() => this.handleSubmit(submitDisabled)}
                style={[submitDisabled && styles.disabledSignUpButton]}
                disabled={submitDisabled}
                testID="signupSubmitBtn"
              >
                {I18n.t("onboarding.sign_up.submit_button")}
              </ApiCommandTextButton>
            </View>
          </Animated.View>
        </View>
        <View style={styles.footerWrapper}>
          <View style={styles.footerUpperPart}>
            <Text style={styles.footerText}>
              {I18n.t("onboarding.sign_up.legal.agreement")}
              <Text
                onPress={this.navigateToTermsAndConditions}
                style={styles.footerLink}
              >
                {" "}
                {I18n.t("onboarding.sign_up.legal.terms_link")}{" "}
              </Text>
              {I18n.t("onboarding.sign_up.legal.conjunction")}{" "}
              <Text
                style={styles.footerLink}
                onPress={this.navigateToPrivacyPolicy}
              >
                {I18n.t("onboarding.sign_up.legal.privacy_policy")}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.navigateToSignIn}
            style={styles.footerLowerPart}
          >
            <Text style={styles.footerText}>
              {I18n.t("onboarding.sign_up.have_account")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  regularSignUpErrorHandler = err => {
    const { email } = this.state;
    Logger.error(`sign up failed: ${err}`);
    const code = get(err, "response.data.error.code");
    if (code || code === 0) {
      if (authErrors[code].field) {
        this.setState({
          [authErrors[code].field]: {
            ...this.state[authErrors[code].field],
            valid: false,
            errorText: authErrors[code].message
          }
        });
        analytics.actionEvents
          .onboardingClickedClickedGetStarted({
            email: email.value,
            success: false,
            failureReason: authErrors[code].message
          })
          .dispatch();
      } else {
        analytics.actionEvents
          .onboardingClickedClickedGetStarted({
            email: email.value,
            success: false,
            failureReason: authErrors[code].signUp.message
          })
          .dispatch();
        this.showErrorAlert(err);
      }
    } else {
      ErrorModal.showAlert("Sign Up failed");
    }
  };
  handleSubmit = async submitDisabled => {
    if (submitDisabled) {
      Alert.alert(
        "There was a problem",
        "Please review the form and try again",
        [{ text: "OK" }]
      );
      return;
    }
    Keyboard.dismiss();
    const { email, firstName, lastName, password, referrer } = this.state;
    const { id, linkType } = referrer;
    const { signUp } = this.props;

    await signUp({
      method: signUpMethodTypes.EMAIL,
      params: {
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        referrer: {
          id,
          linkType
        }
      },
      onNewUserSignUp: this.onNewUserRegistration(false),
      onError: this.regularSignUpErrorHandler
    });
  };
  registerPanResponder() {
    if (Platform.OS === "android") {
      this.panResponder = { panHandlers: {} };
    } else {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderRelease: this.handlePanResponderEnd,
        onPanResponderTerminate: this.handlePanResponderEnd
      });
    }
  }
  handleChangeHandlerWrapper = field => changes => {
    this.setState(state => ({
      [field]: {
        ...state[field],
        ...changes
      }
    }));
  };
  handlePanResponderEnd = (evt, gestureState) => {
    const { vy, dx, dy } = gestureState;
    if (Math.abs(vy) > 0.3 && Math.abs(dx) < 50) {
      dy > 0
        ? this.state.slidedUp && this.onBackButtonPress()
        : this.handleInputFocus();
    }
  };
  toggleSlideUpFlag = () => {
    this.setState({ slidedUp: !this.state.slidedUp });
  };
  onBackButtonPress = () => {
    const { slidedUp } = this.state;
    if (!slidedUp) {
      navigationService.goBack();
    } else {
      Keyboard.dismiss(); // blur the input in case of showing the full page
      Animated.timing(this.state.translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(this.toggleSlideUpFlag);
    }
  };
  handleInputFocus = () => {
    const { slidedUp } = this.state;
    if (!slidedUp) {
      Animated.timing(this.state.translateY, {
        toValue: -slidingDistance,
        duration: 300,
        useNativeDriver: true
      }).start(this.toggleSlideUpFlag);
      if (!this.reportedRegularSignUp) {
        this.reportedRegularSignUp = true;
        // analytics.viewEvents
        //   .entityView({
        //     screenName: "OB - Email Sign-up",
        //     origin: "OB - Welcome "
        //   })
        //   .dispatch();
      }
    }
    return true;
  };
  navigateToTermsAndConditions = () => {
    navigationService.navigate(screenNames.WebView, {
      title: " ",
      url: "https://www.ronengoren.com"
    });
  };
  navigateToPrivacyPolicy = () => {
    navigationService.navigate(screenNames.WebView, {
      title: " ",
      url: "https://www.ronengoren.com"
    });
  };
  navigateToSignIn = () => {
    navigationService.navigate(screenNames.SignIn, {}, { noPush: true });
  };
}

export default Signup;
