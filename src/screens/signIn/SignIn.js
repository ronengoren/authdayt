import React from "react";
import PropTypes from "prop-types";
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert
} from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { signIn } from "src/redux/auth/actions";
// import { facebookLogin, AccessToken } from '/infra/facebook/loginService';
import { Screen, ApiCommandTextButton, FormInput } from "src/components";
import { View, Text, TextButton } from "src/components/basicComponents";
// import { ErrorModal } from '/components/modals';
// import ErrorsLogger from '/infra/reporting/ErrorsLogger';
// import { Logger, analytics } from '/infra/reporting';
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import { DaytIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";
import {
  screenGroupNames,
  screenNames,
  signInMethodTypes,
  authErrors
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
    height: 80,
    paddingTop: 10,
    paddingBottom: 40,
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
    height: 30,
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  innerContainer: {
    height: 380,
    marginHorizontal: 20,
    overflow: "hidden"
  },
  signInBtnWithFacebookWrapper: {
    marginBottom: 20
  },
  facebookButton: {
    height: 50,
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
    color: daytColors.buttonGrey
  },
  form: {
    marginBottom: 20
  },
  signInBtnWrapper: {
    marginBottom: 30
  },
  forgotPasswordText: {
    lineHeight: 20,
    fontSize: 13,
    textAlign: "center",
    letterSpacing: 0.2,
    color: daytColors.placeholderGrey
  },
  footerWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20 + uiConstants.FOOTER_MARGIN_BOTTOM
  },
  footerInnerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20
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
  }
});

class SignIn extends React.Component {
  state = {
    slidedUp: false,
    marginTop: new Animated.Value(0),
    facebookSignIn: false,
    email: { value: "" },
    password: { value: "" }
  };

  render() {
    const { marginTop, facebookSignIn, email, password } = this.state;
    const submitDisabled = Object.keys(this.state).some(
      key => this.state[key].isValid === false
    );

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} medium>
            {I18n.t("onboarding.sign_in.page_header")}
          </Text>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            hitSlop={hitSlop}
            accessibilityTraits="button"
            accessibilityComponentType="button"
            activeOpacity={1}
            onPress={this.onBackButtonPress}
          >
            <DaytIcon
              name="back-arrow"
              size={25}
              color={daytColors.placeholderGrey}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <Animated.View style={{ marginTop }}>
            <View style={styles.signInBtnWithFacebookWrapper}>
              <TextButton
                size="big50Height"
                iconName="facebook-logo"
                iconSize={23}
                style={styles.facebookButton}
                onPress={this.handleFacebookSignIn}
                busy={facebookSignIn}
              >
                {I18n.t("onboarding.sign_in.facebook_button")}
              </TextButton>
            </View>
            <View style={styles.separatorWrapper}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>
                {I18n.t("onboarding.sign_in.methods_separator")}
              </Text>
              <View style={styles.separatorLine} />
            </View>
            <View style={styles.form}>
              <FormInput
                label={I18n.t("common.form.email")}
                keyboardType="email-address"
                autoCapitalize="none"
                onChange={this.onChangeHandlerWrapper("email")}
                onFocus={this.onInputFocus}
                value={email.value}
                validations={["email"]}
                errorText={email.errorText}
                required
                testID="emailInput"
                autoCorrect={false}
              />
              <FormInput
                label={I18n.t("common.form.password")}
                autoCapitalize={"none"}
                secureTextEntry
                onChange={this.onChangeHandlerWrapper("password")}
                onFocus={this.onInputFocus}
                value={password.value}
                validations={[
                  {
                    type: "minLength",
                    value: 4,
                    errorText: I18n.t("common.form.password_min_chars", {
                      minChars: 6
                    })
                  }
                ]}
                errorText={password.errorText}
                required
                testID="passwordInput"
                autoCorrect={false}
              />
            </View>
            <View style={styles.signInBtnWrapper}>
              <ApiCommandTextButton
                size="big50Height"
                command="auth.signIn"
                onPress={this.handleSubmit}
                disabled={submitDisabled}
                testID="loginBtn"
              >
                {I18n.t("onboarding.sign_in.submit_button")}
              </ApiCommandTextButton>
            </View>
            <Text
              style={styles.forgotPasswordText}
              onPress={() =>
                navigationService.navigate(
                  screenNames.ForgotPassword,
                  {},
                  { noPush: true }
                )
              }
              medium
            >
              {I18n.t("onboarding.sign_in.password_recovery_button")}
            </Text>
          </Animated.View>
        </View>
        <View style={styles.footerWrapper}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={this.navigateToSignUp}
            style={styles.footerInnerWrapper}
          >
            <Text style={styles.footerText}>
              {I18n.t("onboarding.sign_in.no_account")}
              <Text onPress={this.navigateToSignUp} style={styles.footerLink}>
                {" "}
                {I18n.t("onboarding.sign_in.no_account_button")}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  onInputFocus = () => {
    const { slidedUp } = this.state;
    if (!slidedUp) {
      Animated.timing(this.state.marginTop, {
        toValue: -1 * slidingDistance,
        duration: 300
      }).start(this.toggleSlidedUpFlag);
    }
  };

  onChangeHandlerWrapper = field => changes => {
    this.setState(state => ({
      [field]: {
        ...state[field],
        ...changes
      }
    }));
  };
  toggleSlidedUpFlag = () => {
    if (this.state.slidedUp) {
      // blur the input in case of showing the upper part
      Keyboard.dismiss();
    }
    this.setState({ slidedUp: !this.state.slidedUp });
  };

  handleFacebookSignIn = async () => {
    Keyboard.dismiss();
    this.setState({ facebookSignIn: true });
    const { signIn } = this.props;
    try {
      analytics.actionEvents
        .onboardingClickedContinueWithFacebook({ success: true })
        .dispatch();

      const result = await facebookLogin([
        "public_profile",
        "email",
        "user_friends",
        "user_hometown",
        "user_location",
        "user_gender"
      ]);

      analytics.viewEvents
        .tabView({
          screenName: "OB - Facebook Sign In",
          origin: "OB - Add pages",
          subTab: "Approved"
        })
        .dispatch();

      if (!result.isCancelled) {
        const data = await AccessToken.getCurrentAccessToken();
        const accessToken = data.accessToken.toString();
        await signIn({
          method: signInMethodTypes.FACEBOOK,
          params: {
            accessToken
          },
          onUnregisteredUserSignIn: this.onNewUserRegistration,
          onError: this.facebookSignInErrorHandler
        });
      } else {
        this.setState({ facebookSignIn: false });
      }
    } catch (err) {
      analytics.viewEvents
        .tabView({
          screenName: "OB - Facebook Sign In",
          origin: "OB - Add pages",
          subTab: "Canceled"
        })
        .dispatch();
      analytics.actionEvents
        .onboardingClickedContinueWithFacebook({
          success: false,
          failureReason: err
        })
        .dispatch();
      this.facebookSignInErrorHandler(err);
    }
  };
  onBackButtonPress = () => {
    const { slidedUp } = this.state;
    if (!slidedUp) {
      navigationService.goBack();
    } else {
      Animated.timing(this.state.marginTop, {
        toValue: 0,
        duration: 300
      }).start(this.toggleSlidedUpFlag);
    }
  };
  handleSubmit = async () => {
    Keyboard.dismiss();
    const { email, password } = this.state;
    const { signIn } = this.props;

    await signIn({
      method: signInMethodTypes.EMAIL,
      params: {
        email: email.value,
        password: password.value
      },
      onUnregisteredUserSignIn: this.onNewUserRegistration,
      onError: this.emailSignInErrorHandler
    });
  };
  onNewUserRegistration = ({ user }) => {
    const initialScreen = getRelevantOnboardingScreen({ user });
    navigationService.navigate(
      screenGroupNames.SIGN_UP_WIZARD,
      { origin: screenNames.SignIn, isFirstScreen: true },
      { initialScreen }
    );
  };
  navigateToSignUp = () => {
    Keyboard.dismiss();
    navigationService.navigate(screenNames.SignUp, {}, { noPush: true });
  };
}

export default SignIn;
