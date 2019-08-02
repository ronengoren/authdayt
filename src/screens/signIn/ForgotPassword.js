import React from "react";
import PropTypes from "prop-types";
import { Keyboard, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { apiQuery } from '/redux/apiQuery/actions';
import { Screen, FormInput } from "src/components";
import { View, Text, TextButton } from "src/components/basicComponents";
// import { ErrorModal } from '/components/modals';
import { DaytIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";
import EmailSentModal from "./EmailSentModal";

const hitSlop = { left: 15, right: 5, top: 5, bottom: 5 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT
  },
  header: {
    width: "100%",
    height: 30,
    marginTop: 10,
    backgroundColor: daytColors.white,
    zIndex: 10
  },
  backButtonWrapper: {
    position: "absolute",
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
  form: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  forgotPasswordBtnWrapper: {
    marginHorizontal: 15,
    marginBottom: 20
  },
  forgotPasswordText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    letterSpacing: 0.2,
    color: daytColors.placeholderGrey
  }
});

class ForgotPassword extends React.Component {
  state = {
    email: { value: "" },
    sendingMail: false,
    showEmailSentModal: false
  };

  render() {
    const { email, sendingMail, showEmailSentModal } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} medium>
            {I18n.t("onboarding.reset_password.page_header")}
          </Text>
          <TouchableOpacity
            accessibilityTraits="button"
            accessibilityComponentType="button"
            activeOpacity={1}
            onPress={this.onBackButtonPress}
            style={styles.backButtonWrapper}
            hitSlop={hitSlop}
          >
            <DaytIcon
              name="back-arrow"
              size={25}
              color={daytColors.placeholderGrey}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <FormInput
            label={I18n.t("common.form.email")}
            keyboardType={"email-address"}
            autoCapitalize="none"
            onChange={this.onChangeHandler}
            onFocus={this.onInputFocus}
            value={email.value}
            validations={["email"]}
            errorText={email.errorText}
            required
            autoFocus
            autoCorrect={false}
          />
        </View>
        <View style={styles.forgotPasswordBtnWrapper}>
          <TextButton
            size="big50Height"
            busy={sendingMail}
            onPress={this.handleSubmit}
            disabled={!email.isValid}
          >
            {I18n.t("onboarding.reset_password.button")}
          </TextButton>
        </View>

        <Text style={styles.forgotPasswordText} medium>
          {I18n.t("onboarding.reset_password.explanation")}
        </Text>

        <EmailSentModal
          show={showEmailSentModal}
          onClose={this.closeEmailSentModal}
          email={email.value}
        />
      </View>
    );
  }

  onBackButtonPress = () => {
    Keyboard.dismiss();
    navigationService.goBack();
  };

  onChangeHandler = changes => {
    this.setState(state => ({
      email: {
        ...state.email,
        ...changes
      }
    }));
  };

  //   handleSubmit = async () => {
  //     Keyboard.dismiss();
  //     const { apiQuery } = this.props;
  //     const { email } = this.state;
  //     this.setState({ sendingMail: true });
  //     try {
  //       await apiQuery({ query: { domain: 'auth', key: 'forgotPassword', params: { email: encodeURIComponent(email.value) } } });
  //     } catch (err) {
  //       const code = get(err, 'response.data.error.code');
  //       if (code !== 6) {
  //         // no such email exists error is hidden
  //         ErrorModal.showAlert();
  //       }
  //     } finally {
  //       this.setState({
  //         sendingMail: false,
  //         showEmailSentModal: true
  //       });
  //     }
  //   };

  //   closeEmailSentModal = () => {
  //     this.setState({ showEmailSentModal: false });
  //     navigationService.goBack();
  //   };
}

// ForgotPassword.propTypes = {
//   apiQuery: PropTypes.func
// };

// const mapDispatchToProps = { apiQuery };

// ForgotPassword = connect(
//   null,
//   mapDispatchToProps
// )(ForgotPassword);
// ForgotPassword = Screen({ modalError: true })(ForgotPassword);

export default ForgotPassword;
