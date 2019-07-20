import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  BackHandler,
  Platform,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { initSearchAddress } from "../../redux/searchAddress/actions";
import I18n from "../../infra/localization";
import { ErrorModal } from "../../components/modals";
import {
  setCommunity,
  updateUserLanguage,
  addToWaitingList,
  updateUserDestinationNeighborhood
} from "../../redux/auth/actions";
import { apiCommand } from "../../redux/apiCommands/actions";
import { updateProfile } from "../../redux/profile/actions";
// import { analytics } from '/infra/reporting';
import { navigationService } from "../../infra/navigation";
import { regexs } from "../../infra/utils/formValidations";
import { Text, View, ScrollView } from "../../components/basicComponents";
import { Screen } from "../../components";
import { daytColors, uiConstants } from "../../vars";
import { UserProfilePictureHeader } from "../../screens/signup";
import { get } from "../../infra/utils";
import { getRelevantOnboardingScreen } from "../../infra/utils/onboardingUtils";

import OnboardingInputField from "./OnboardingInputField";

const styles = StyleSheet.create({
  container: {
    backgroundColor: daytColors.paleGreyTwo
  },
  mainContent: {
    flex: 1
  },
  submitButton: {
    marginTop: 0,
    marginBottom: 22 + uiConstants.FOOTER_MARGIN_BOTTOM,
    textAlign: "center"
  }
});

class SetUserEmail extends React.Component {
  state = {
    email: ""
  };

  //   isFirstScreen = get(this.props, 'navigation.state.params.isFirstScreen', false); // eslint-disable-line react/sort-comp

  render() {
    return (
      <View>
        <Text>SetUserEmail</Text>
      </View>
      //   <ScrollView style={styles.container}>
      //     <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      //     <UserProfilePictureHeader subTitle={I18n.t('onboarding.set_user_email.subTitle')} />
      //     <View style={styles.mainContent}>{this.renderEmailField()}</View>
      //     {this.renderSubmitButton()}
      //   </ScrollView>
    );
  }

  //   componentDidMount() {
  //     if (Platform.OS === 'android' && this.isFirstScreen) {
  //       BackHandler.addEventListener('hardwareBackPress', this.androidBackButtonListener);
  //     }

  //     const { user } = this.props;
  //     analytics.viewEvents
  //       .entityView({
  //         screenName: 'OB - Set Email',
  //         origin: 'OB - Main Sign-up',
  //         entityId: user.id,
  //         entityName: user.name
  //       })
  //       .dispatch();
  //   }

  //   componentWillUnmount() {
  //     if (Platform.OS === 'android' && this.isFirstScreen) {
  //       BackHandler.removeEventListener('hardwareBackPress', this.androidBackButtonListener);
  //     }
  //   }

  //   renderEmailField() {
  //     return (
  //       <OnboardingInputField
  //         label={I18n.t(`onboarding.set_user_email.email_field.label`)}
  //         placeholderText={I18n.t('onboarding.set_user_email.email_field.placeholder')}
  //         placeholderIconName="envelope"
  //         onChange={({ value, isValid }) => this.setState({ email: value, isEmailValid: isValid })}
  //         validate={(email) => regexs.email.exec(email)}
  //         testID="signupSetEmail"
  //         inputProps={{
  //           keyboardType: 'email-address'
  //         }}
  //       />
  //     );
  //   }

  //   renderSubmitButton() {
  //     const { isEmailValid } = this.state;
  //     const isEnabled = !!isEmailValid && !this.isSubmitting;
  //     return (
  //       <TouchableOpacity activeOpacity={isEnabled ? 0.5 : 1} onPress={isEnabled ? this.next : null}>
  //         <Text bold size={16} lineHeight={19} color={isEnabled ? daytColors.green : daytColors.b70} style={styles.submitButton} testID="setEmailSubmitButton">
  //           {I18n.t('onboarding.set_user_email.next')}
  //         </Text>
  //       </TouchableOpacity>
  //     );
  //   }

  //   androidBackButtonListener = () => true;

  //   next = async () => {
  //     const { user, updateProfile, apiCommand } = this.props;
  //     const { email } = this.state;
  //     const updatedUser = { ...user, email };

  //     if (this.isSubmitting) {
  //       return;
  //     }
  //     this.isSubmitting = true;
  //     try {
  //       await apiCommand('users.changeEmail', { email });
  //       await updateProfile({ userId: user.id, delta: { user: updatedUser } });
  //       const nextScreen = getRelevantOnboardingScreen({ user: updatedUser });
  //       analytics.actionEvents.onboardingSetEmail({ userId: user.id, email }).dispatch();
  //       navigationService.navigate(nextScreen);
  //     } catch (err) {
  //       const { code, message } = get(err, 'response.data.error');
  //       if (!code && code !== 0) {
  //         ErrorModal.showAlert('Email change failed');
  //       } else {
  //         ErrorModal.showAlert('Email change failed', message);
  //       }
  //     } finally {
  //       this.isSubmitting = false;
  //     }
  //   };
}

// SetUserEmail.propTypes = {
//   user: PropTypes.object
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.user
// });

// const mapDispatchToProps = {
//   initSearchAddress,
//   setCommunity,
//   updateUserLanguage,
//   addToWaitingList,
//   updateUserDestinationNeighborhood,
//   apiCommand,
//   updateProfile
// };

// SetUserEmail = connect(mapStateToProps, mapDispatchToProps)(SetUserEmail);
// export default Screen({ modalError: true })(SetUserEmail);

export default SetUserEmail;
