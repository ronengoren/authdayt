import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { View, Image, Text } from "src/components/basicComponents";
import { GenericHalfScreenModal } from "src/components/modals";
import { daytColors } from "src/vars";
import images from "src/assets/images";

const styles = StyleSheet.create({
  bodyWrapper: {
    flex: 1
  },
  emailImageWrapper: {
    height: 40,
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30
  },
  emailImage: {
    height: 40,
    width: 40
  },
  header: {
    paddingHorizontal: 35,
    marginBottom: 10,
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  text: {
    fontSize: 15,
    paddingHorizontal: 20,
    lineHeight: 25,
    textAlign: "center",
    color: daytColors.black
  },
  email: {
    fontSize: 15,
    lineHeight: 25,
    textAlign: "center",
    color: daytColors.black
  },
  goBtn: {
    height: 61,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderTopColor: daytColors.disabledGrey,
    borderTopWidth: 1
  },
  goBtnText: {
    fontSize: 18,
    lineHeight: 30,
    color: daytColors.green
  }
});

const EmailSentModal = ({ show, email, onClose }) => (
  <GenericHalfScreenModal show={show} height={375}>
    <View style={styles.bodyWrapper}>
      <View style={styles.emailImageWrapper}>
        <Image source={images.signIn.email} style={styles.emailImage} />
      </View>
      <Text style={styles.header} medium>
        {I18n.t("onboarding.password_reset_modal.title")}
      </Text>
      <Text style={styles.text}>
        {I18n.t("onboarding.password_reset_modal.description_before_email")}
      </Text>
      <Text style={styles.email} medium>
        {email}
      </Text>
      <Text style={styles.text}>
        {I18n.t("onboarding.password_reset_modal.description_after_email")}
      </Text>
      <TouchableOpacity
        accessibilityTraits="button"
        accessibilityComponentType="button"
        activeOpacity={1}
        onPress={onClose}
        style={styles.goBtn}
      >
        <Text style={styles.goBtnText} medium>
          {I18n.t("onboarding.password_reset_modal.dismiss_button")}
        </Text>
      </TouchableOpacity>
    </View>
  </GenericHalfScreenModal>
);

EmailSentModal.propTypes = {
  show: PropTypes.bool,
  email: PropTypes.string,
  onClose: PropTypes.func
};

export default EmailSentModal;
