import React from "react";
import { StyleSheet } from "react-native";
import { View } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    width: "100%",
    backgroundColor: daytColors.fillGrey,
    borderWidth: 1,
    borderColor: daytColors.disabledGrey
  }
});

const FormSectionSeparator = () => <View style={styles.separator} />;

export default FormSectionSeparator;
