import React, { Component } from "react";
import I18n from "src/infra/localization";
import { connect } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "src/components/basicComponents";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";
import { postTypes, screenNames } from "src/vars/enums";
import { get } from "src/infra/utils";
import { navigationService } from "src/infra/navigation";

const BOARDS_DEFINITIONS = [
  {
    name: "job",
    iconName: "events-small",
    screenName: screenNames.CityResults,
    navigationParams: { postType: postTypes.JOB }
  },
  {
    name: "realEstate",
    iconName: "ownership",
    screenName: screenNames.CityResults,
    navigationParams: { postType: postTypes.REAL_ESTATE }
  },
  {
    name: "giveAndTake",
    iconName: "lock-outline",
    screenName: screenNames.CityResults,
    navigationParams: { postType: postTypes.GIVE_TAKE }
  },
  { name: "events", iconName: "private", screenName: screenNames.Events }
];

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 20
  },
  boardItem: {
    flex: 1,
    alignItems: "center"
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    marginBottom: 5,
    borderRadius: 25,
    backgroundColor: daytColors.veryLightBlue
  },
  text: {
    textAlign: "center"
  }
});

class BoardsHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        {BOARDS_DEFINITIONS.map(this.renderItem)}
      </View>
    );
  }

  renderItem = ({ name, iconName, screenName, navigationParams }) => {
    const count = this.props[name];

    return (
      <TouchableOpacity
        style={styles.boardItem}
        key={name}
        onPress={() => this.handleItemPressed({ screenName, navigationParams })}
        testID={`${name}BoardBtn`}
      >
        <View style={styles.iconWrapper}>
          <DaytIcon name={iconName} size={20} color={daytColors.b30} />
        </View>
        <Text
          size={13}
          lineHeight={15}
          color={daytColors.b30}
          style={styles.text}
        >
          {I18n.t(`home.boards.${name}`)}{" "}
        </Text>
        {!!count && (
          <Text size={11} lineHeight={15} color={daytColors.b60}>
            {count}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  handleItemPressed = ({ screenName, navigationParams }) => {
    navigationService.navigate(screenName, navigationParams);
  };
}

const mapStateToProps = state => {
  const { job, realEstate, giveAndTake, events } =
    get(state, "auth.appTotals", {}) || {};
  return {
    job,
    realEstate,
    giveAndTake,
    events
  };
};

// BoardsHeader = connect(mapStateToProps)(BoardsHeader);
export default BoardsHeader;
