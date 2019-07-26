import React from "react";
import PropTypes from "prop-types";
import { Keyboard, StyleSheet, TouchableOpacity, Alert } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
// import { setToken, changedPassword } from "/redux/auth/actions";
import { ApiCommandTextButton, FormInput } from "src/components";
import { View, Text } from "src/components/basicComponents";
// import { ErrorModal } from "/components/modals";
import { get } from "src/infra/utils";
// import { navigationService } from "/infra/navigation";
import { DaytIcon } from "src/assets/icons";
import { daytColors, uiConstants } from "src/vars";

const hitSlop = { left: 15, right: 5, top: 5, bottom: 5 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT
  },
  header: {
    width: "100%",
    height: 30,
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
  saveBtnWrapper: {
    marginHorizontal: 15,
    marginBottom: 20
  }
});
class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: { value: "", isValid: true },
      newPassword: { value: "" },
      confirmNewPassword: { value: "" }
    };
  }

  render() {
    const { oldPassword, newPassword, confirmNewPassword } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText} medium>
            {I18n.t("change_password.header")}
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
            key="oldPasswordInput"
            label={I18n.t("change_password.old_password_label")}
            autoCapitalize={"none"}
            secureTextEntry
            //   onChange={this.handleChangeHandlerWrapper('oldPassword')}
            value={oldPassword.value}
            errorText={oldPassword.errorText}
            required
            returnKeyType="next"
            onSubmitEditing={() => {
              this.newPasswordInput.focus();
            }}
            autoFocus
            autoCorrect={false}
          />
        </View>
      </View>
    );
  }
}

export default ChangePassword;
