import React from "react";
import PropTypes from "prop-types";
import { Modal, StyleSheet } from "react-native";
import { View, IconButton } from "src/components/basicComponents";
import { daytColors } from "src/vars";
import { uiConstants } from "src/vars/uiConstants";

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: daytColors.paleBlack
  },
  modalInner: {
    borderRadius: 10,
    shadowColor: daytColors.modalShadow,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    backgroundColor: daytColors.white
  },
  closeModalBtn: {
    position: "absolute",
    top: uiConstants.PHONE_BAR_HEIGHT,
    right: 15,
    width: 30,
    height: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    zIndex: 1
  }
});

const GenericHalfScreenModal = ({
  show,
  height,
  showCloseBtn = false,
  closeModal,
  children
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
      {showCloseBtn && (
        <IconButton
          name="close"
          style={styles.closeModalBtn}
          iconColor="white"
          iconSize={22}
          onPress={closeModal}
        />
      )}
      <View style={styles.modal}>
        <View style={[styles.modalInner, { height }]}>{children}</View>
      </View>
    </Modal>
  );
};

GenericHalfScreenModal.propTypes = {
  show: PropTypes.bool,
  height: PropTypes.number,
  showCloseBtn: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.object
};

export default GenericHalfScreenModal;
