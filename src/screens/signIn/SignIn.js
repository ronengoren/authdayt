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
// import { signIn } from '/redux/auth/actions';
// import { facebookLogin, AccessToken } from '/infra/facebook/loginService';
import { Screen, ApiCommandTextButton, FormInput } from "src/components";
import { View, Text, TextButton } from "src/components/basicComponents";
// import { ErrorModal } from '/components/modals';
// import ErrorsLogger from '/infra/reporting/ErrorsLogger';
// import { Logger, analytics } from '/infra/reporting';
import { get } from "src/infra/utils";
// import { navigationService } from '/infra/navigation';
import { DaytIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";
// import { screenGroupNames, screenNames, signInMethodTypes, authErrors } from '/vars/enums';
// import { getRelevantOnboardingScreen } from '/infra/utils/onboardingUtils';

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
    //     const submitDisabled = Object.keys(this.state).some((key) => this.state[key].isValid === false);

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
                // onChange={this.onChangeHandlerWrapper('email')}
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
                // onChange={this.onChangeHandlerWrapper('password')}
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
              <Text>ApiCommandTextButton</Text>
              {/* <ApiCommandTextButton
                size="big50Height"
                command="auth.signIn"
                onPress={this.handleSubmit}
                disabled={submitDisabled}
                testID="loginBtn"
              >
                {I18n.t("onboarding.sign_in.submit_button")}
              </ApiCommandTextButton> */}
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
}

export default SignIn;
