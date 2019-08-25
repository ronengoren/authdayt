import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { Text } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import GenericConfirmationModal from "./GenericConfirmationModal";

const styles = StyleSheet.create({
  bodyText: {
    paddingHorizontal: 20,
    marginBottom: 30,
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    color: daytColors.buttonGrey
  }
});

const DeleteModal = ({ onDelete, bodyText, ...props }) => (
  <GenericConfirmationModal
    confirmText={I18n.t("modals.delete.delete_button")}
    cancelText={I18n.t("modals.delete.cancel_button")}
    onConfirm={onDelete}
    {...props}
  >
    <Text style={styles.bodyText}>{bodyText}</Text>
  </GenericConfirmationModal>
);

DeleteModal.propTypes = {
  show: PropTypes.bool,
  bodyText: PropTypes.string,
  onDelete: PropTypes.func
};

export default DeleteModal;
