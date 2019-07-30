import React, { Component } from "react";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import { View, Text } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40
  },
  icon: {
    marginBottom: 20
  },
  text: {
    textAlign: "center"
  }
});

class EmptyList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DaytIcon
          name="bell"
          size={40}
          color={daytColors.buttonGrey}
          style={styles.icon}
        />
        <Text
          medium
          size={22}
          color={daytColors.buttonGrey}
          style={styles.text}
        >
          {I18n.t("communication_center.notifications.empty_state")}
        </Text>
      </View>
    );
  }
}

export default EmptyList;
