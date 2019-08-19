import React from "react";
import PropTypes from "prop-types";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { closeActionSheet } from "src/redux/general/actions";
import { apiCommand } from "src/redux/apiCommands/actions";
import { Text, View } from "src/components/basicComponents";
import { DaytIcon, AwesomeIcon } from "src/assets/icons";
import { daytFonts, daytFontWeights, daytColors } from "src/vars";
// import Logger from "/infra/reporting/Logger";
import { stylesScheme } from "src/schemas";

const styles = StyleSheet.create({
  modal: {
    backgroundColor: daytColors.paleBlack,
    height: "100%",
    width: "100%"
  },
  actionSheetOuterContainer: {
    position: "absolute",
    bottom: 20,
    left: 15,
    right: 15
  },
  container: {
    borderRadius: 10,
    backgroundColor: daytColors.white,
    width: "100%",
    marginBottom: 20
  },
  headerText: {
    color: daytColors.buttonGrey,
    fontSize: 14
  },
  actionSheetItemWrapRadius: {
    borderRadius: 10,
    backgroundColor: daytColors.white
  },
  actionSheetItemWrap: {
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%"
  },
  actionSheetItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    backgroundColor: daytColors.white,
    justifyContent: "center"
  },
  actionSheetItemWithIcon: {
    justifyContent: "flex-start"
  },
  actionSheetItemText: {
    fontSize: 16,
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium,
    lineHeight: 30,
    color: daytColors.black,
    textAlignVertical: "center"
  },
  actionSheetIcon: {
    lineHeight: 30,
    paddingRight: 20
  },
  actionSheetAwesomeIcon: {
    height: 20,
    paddingLeft: 2,
    paddingRight: 23
  },
  line: {
    height: 1,
    backgroundColor: daytColors.disabledGrey
  }
});

const ActionSheetItem = ({
  iconName,
  awesomeIconName,
  iconSize = 19,
  awesomeIconSize = 16,
  awesomeIconWeight = "solid",
  text,
  textStyle,
  color,
  onPress,
  testID
}) => {
  const item = (
    <View style={styles.actionSheetItemWrapRadius}>
      <View style={[styles.actionSheetItemWrap]}>
        <View
          style={[
            styles.actionSheetItem,
            (iconName || awesomeIconName) && styles.actionSheetItemWithIcon
          ]}
        >
          {iconName && (
            <DaytIcon
              name={iconName}
              size={iconSize}
              color={color || daytColors.black}
              style={styles.actionSheetIcon}
            />
          )}
          {!iconName && awesomeIconName && (
            <AwesomeIcon
              name={awesomeIconName}
              size={awesomeIconSize}
              weight={awesomeIconWeight}
              color={color || daytColors.black}
              style={styles.actionSheetAwesomeIcon}
            />
          )}
          <Text
            medium
            style={[styles.actionSheetItemText, textStyle, color && { color }]}
            testID="actionSheetItemText"
          >
            {text}
          </Text>
        </View>
      </View>
    </View>
  );

  return !onPress ? (
    item
  ) : (
    <TouchableOpacity onPress={onPress} testID={testID}>
      {item}
    </TouchableOpacity>
  );
};

ActionSheetItem.propTypes = {
  iconName: PropTypes.string,
  awesomeIconName: PropTypes.string,
  iconSize: PropTypes.number,
  awesomeIconSize: PropTypes.number,
  awesomeIconWeight: PropTypes.string,
  text: PropTypes.string,
  textStyle: stylesScheme,
  color: PropTypes.string,
  onPress: PropTypes.func,
  testID: PropTypes.string
};

const ActionSheetManager = ({ actionSheet, closeActionSheet, apiCommand }) => {
  if (!actionSheet) return null;

  const handleItemPress = option => {
    if (option.action) {
      option.action();
    }
    if (option.shouldClose) {
      closeActionSheet();
    }
  };

  const handleCancel = () => {
    if (actionSheet.onCancel) {
      setImmediate(actionSheet.onCancel);
    }
    closeActionSheet();
  };

  const renderCancelButton = () => (
    <ActionSheetItem
      onPress={handleCancel}
      text={I18n.t("action_sheets.cancel")}
    />
  );

  const renderHeader = header => (
    <View>
      <ActionSheetItem text={header.text} textStyle={styles.headerText} />
      <View style={styles.line} />
    </View>
  );

  const renderOptions = options => (
    <View>
      {options.map((option, i) => (
        <View key={option.id}>
          <ActionSheetItem
            onPress={() => handleItemPress(option)}
            text={option.text}
            color={option.color}
            iconName={option.iconName}
            awesomeIconName={option.awesomeIconName}
            awesomeIconSize={option.awesomeIconSize}
            awesomeIconWeight={option.awesomeIconWeight}
            iconSize={option.iconSize}
            testID={option.testID}
          />
          {i < options.length - 1 && <View style={styles.line} />}
        </View>
      ))}
    </View>
  );

  const deps = { apiCommand };
  const actionSheetDef =
    typeof actionSheet === "function" ? actionSheet(deps) : actionSheet;
  const { header } = actionSheetDef;
  let { options, hasCancelButton } = actionSheetDef;

  if (!Array.isArray(options)) {
    hasCancelButton = true;
    options = [];
    Logger.error("Actionsheet called with no options!", actionSheetDef);
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={!!actionSheet}
      onRequestClose={closeActionSheet}
    >
      <View style={styles.modal}>
        <View style={styles.actionSheetOuterContainer}>
          <View style={styles.container}>
            {header && renderHeader(header)}
            {renderOptions(options)}
          </View>
          {hasCancelButton && renderCancelButton()}
        </View>
      </View>
    </Modal>
  );
};

ActionSheetManager.propTypes = {
  closeActionSheet: PropTypes.func,
  apiCommand: PropTypes.func,
  actionSheet: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

const mapStateToProps = state => ({
  actionSheet: state.general.actionSheet
});

const mapDispatchToProps = { closeActionSheet, apiCommand };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionSheetManager);
