import React from "react";
import I18n from "src/infra/localization";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  DatePickerIOS
} from "react-native"; // eslint-disable-line react-native/split-platform-components
import {
  View,
  Text,
  Separator,
  TextButton,
  Switch
} from "src/components/basicComponents";
import { Screen, NativeDateTimePickerAndroid } from "src/components";
import { daytColors, daytFonts, daytFontWeights } from "src/vars";
import { translateDate } from "src/infra/utils/dateTimeUtils";
import { navigationService } from "src/infra/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: daytColors.fillGrey
  },
  upperPart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: daytColors.white
  },
  header: {
    height: 20,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium,
    fontSize: 20,
    lineHeight: 20,
    color: daytColors.black
  },
  subHeader: {
    height: 20,
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium,
    fontSize: 12,
    lineHeight: 20,
    textAlign: "center",
    color: daytColors.placeholderGrey
  },
  dateText: {
    maxWidth: 335,
    height: 30,
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center",
    color: daytColors.black
  },
  dateBottomLine: {
    width: "100%",
    maxWidth: 335,
    height: 2,
    backgroundColor: daytColors.black
  },
  lowerPart: {
    width: "100%",
    height: 280,
    backgroundColor: daytColors.white
  },
  toggleLine: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: daytColors.white,
    borderBottomColor: daytColors.disabledGrey,
    borderBottomWidth: 1
  },
  toggleLineText: {
    height: 22,
    fontFamily: daytFonts.medium,
    fontWeight: daytFontWeights.medium,
    fontSize: 15,
    lineHeight: 22.0,
    color: daytColors.black
  }
});
class EditProfileDate extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperPart}>
          <Text style={styles.header}>{"header"}</Text>
          <Text style={styles.subHeader}>{"subHeader"}</Text>
          <TouchableOpacity
            onPress={Platform.select({
              android: () => this.openNativeDatePickerAndroid()
            })}
          >
            {/* <Text style={styles.dateText}>{translateDate(date)}</Text> */}
          </TouchableOpacity>
          <View style={styles.dateBottomLine} />
        </View>
        <Separator height={5} />
        <View style={styles.lowerPart}>
          <View style={styles.toggleLine}>
            <Text style={styles.toggleLineText}>
              {I18n.t("profile.edit.date_privacy_toggle_label")}
            </Text>
            <Switch
            //   onChange={this.toggleVisibleInProfile}
            //   active={isVisibleInProfile}
            />
          </View>
        </View>
        <TextButton footerButton size="huge" onPress={this.onSave}>
          {I18n.t("common.buttons.save")}
        </TextButton>
      </View>
    );
  }
}

export default EditProfileDate;
