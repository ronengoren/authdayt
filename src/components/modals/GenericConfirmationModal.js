import React from "react";
import PropTypes from "prop-types";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  modal: {
    backgroundColor: daytColors.paleBlack,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  modalInnerWrapper: {
    backgroundColor: daytColors.white,
    borderRadius: 10
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 35,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 30,
    color: daytColors.black
  },
  actionsWrapper: {
    height: 61,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: daytColors.disabledGrey
  },
  cancelActionBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cancelActionText: {
    height: 30,
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center"
  },
  actionsSeparator: {
    height: "100%",
    width: 1,
    backgroundColor: daytColors.disabledGrey
  },
  confirmActionBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  confirmActionTxt: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center"
  }
});

const GenericConfirmationModal = ({
  show,
  headerText,
  headerComponent,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmTextColor = daytColors.red,
  cancelTextColor = daytColors.placeholderGrey,
  wrapperStyle
}) => {
  if (!show) {
    return null;
  }
  return (
    <Modal
      animationType="fade"
      transparent
      visible={show}
      onRequestClose={() => {}}
    >
      <View style={styles.modal}>
        <View style={[styles.modalInnerWrapper, wrapperStyle]}>
          {headerText ? (
            <Text style={styles.header} medium>
              {headerText}
            </Text>
          ) : (
            headerComponent
          )}
          {children}
          <View style={styles.actionsWrapper}>
            <TouchableOpacity
              accessibilityTraits="button"
              accessibilityComponentType="button"
              activeOpacity={1}
              onPress={onCancel}
              style={styles.cancelActionBtn}
            >
              <Text
                style={[styles.cancelActionText, { color: cancelTextColor }]}
              >
                {cancelText}
              </Text>
            </TouchableOpacity>
            <View style={styles.actionsSeparator} />
            <TouchableOpacity
              accessibilityTraits="button"
              accessibilityComponentType="button"
              activeOpacity={1}
              onPress={onConfirm}
              style={styles.confirmActionBtn}
            >
              <Text
                style={[styles.confirmActionTxt, { color: confirmTextColor }]}
                medium
                testID="modalConfirmBtn"
              >
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

GenericConfirmationModal.propTypes = {
  show: PropTypes.bool,
  headerText: PropTypes.string,
  headerComponent: PropTypes.node,
  children: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmTextColor: PropTypes.string,
  cancelTextColor: PropTypes.string,
  wrapperStyle: stylesScheme
};

export default GenericConfirmationModal;
