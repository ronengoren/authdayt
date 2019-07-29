import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { Text } from "src/components/basicComponents";
import { GenericConfirmationModal } from "src/components/modals";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  text: {
    marginTop: -10,
    marginBottom: 20,
    textAlign: "center"
  }
});

class DeclineFriendshipModal extends Component {
  render() {
    const { onCancel, onConfirm } = this.props;
    return (
      <GenericConfirmationModal
        show
        headerText={I18n.t("people.decline_friendship_modal.header")}
        confirmText={I18n.t("people.decline_friendship_modal.ok_button")}
        cancelText={I18n.t("people.decline_friendship_modal.cancel_button")}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <Text
          size={16}
          lineHeight={22}
          color={daytColors.b30}
          style={styles.text}
        >
          {I18n.t("people.decline_friendship_modal.explanation")}
        </Text>
      </GenericConfirmationModal>
    );
  }
}

DeclineFriendshipModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default DeclineFriendshipModal;
