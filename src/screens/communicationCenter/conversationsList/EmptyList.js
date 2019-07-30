import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import I18n from "src/infra/localization";
import { View, Text, TextButton } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { screenNames } from "src/vars/enums";
import { navigationService } from "src/infra/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: daytColors.white
  },
  icon: {
    marginBottom: 20
  },
  text: {
    color: daytColors.buttonGrey,
    textAlign: "center",
    marginBottom: 10
  },
  subTitle: {
    marginBottom: 50
  }
});

class EmptyList extends Component {
  state = {
    paddingBottom: 100
  };

  render() {
    const { paddingBottom } = this.state;

    return (
      <View
        style={[styles.container, { paddingBottom }]}
        onLayout={this.handleLayout}
      >
        <DaytIcon
          name="inbox"
          size={40}
          color={daytColors.buttonGrey}
          style={styles.icon}
        />
        <Text medium size={22} style={styles.text}>
          {I18n.t("communication_center.conversations.empty_state.header")}
        </Text>
        <Text size={15} style={[styles.text, styles.subTitle]}>
          {I18n.t("communication_center.conversations.empty_state.text")}
        </Text>
        <TextButton size="big" onPress={this.handlePress}>
          {I18n.t("communication_center.conversations.empty_state.button")}
        </TextButton>
      </View>
    );
  }

  calculatePadding = true;

  handlePress = () => {
    navigationService.navigate(screenNames.ChatUserSelector);
  };

  handleLayout = event => {
    const { x, y, width, height } = event.nativeEvent.layout; // eslint-disable-line no-unused-vars
    const { height: pageHeight } = Dimensions.get("window");

    if (this.calculatePadding) {
      this.calculatePadding = false;
      this.setState({ paddingBottom: pageHeight - height });
    }
  };
}

export default EmptyList;
