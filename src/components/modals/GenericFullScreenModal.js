import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { View, Text } from "src/components/basicComponents";
import { daytColors, uiConstants } from "src/vars";

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: uiConstants.PHONE_BAR_HEIGHT,
    backgroundColor: daytColors.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 30,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: daytColors.white,
    borderBottomColor: daytColors.fillGrey
  },
  cancelButton: {
    fontSize: 16,
    lineHeight: 30,
    color: daytColors.placeholderGrey
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 30.0,
    textAlign: "center",
    color: daytColors.black
  },
  doneButton: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: "right",
    color: daytColors.green
  }
});

const GenericFullScreenModal = ({
  headerText,
  children,
  doneText,
  cancelText,
  onDoneAction,
  onCancelAction,
  doneTextColor = daytColors.green,
  cancelTextColor = daytColors.placeholderGrey
}) => (
  <View style={styles.modal}>
    <View style={styles.header}>
      {onCancelAction ? (
        <Text
          style={[styles.cancelButton, { color: cancelTextColor }]}
          onPress={onCancelAction}
          medium
        >
          {cancelText}
        </Text>
      ) : (
        <Text style={styles.cancelButton}>&nbsp;</Text>
      )}
      <Text style={styles.headerTitle} medium>
        {headerText}
      </Text>
      {onDoneAction ? (
        <Text
          style={[styles.doneButton, { color: doneTextColor }]}
          onPress={onDoneAction}
          medium
        >
          {doneText}
        </Text>
      ) : (
        <Text style={styles.doneButton}>&nbsp;</Text>
      )}
    </View>
    {children}
  </View>
);

GenericFullScreenModal.propTypes = {
  headerText: PropTypes.string,
  children: PropTypes.node,
  doneText: PropTypes.string,
  cancelText: PropTypes.string,
  onDoneAction: PropTypes.func,
  onCancelAction: PropTypes.func,
  doneTextColor: PropTypes.string,
  cancelTextColor: PropTypes.string
};

export default GenericFullScreenModal;
