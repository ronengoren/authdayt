import React, { Component } from "react";
import { StyleSheet } from "react-native";
import I18n from "src/infra/localization";
import PropTypes from "prop-types";
import { Text, View, IconButton } from "src/components/basicComponents";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center"
  },
  roomsText: {
    width: 60,
    textAlign: "center"
  },
  filterButtonStyle: {
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: daytColors.paleGreyTwo
  }
});

class RoomsFilter extends Component {
  render() {
    const { rooms } = this.props;
    const canReduceRooms = rooms > 0;

    return (
      <View style={styles.container}>
        <Text size={16} lineHeight={19} color={daytColors.b30}>
          {I18n.t("filters.rooms.header")}
        </Text>
        <View style={styles.buttons}>
          <IconButton
            name="caret-down"
            onPress={this.handleLessRoomsPressed}
            disabled={!canReduceRooms}
            size="large"
            isAwesomeIcon
            weight="solid"
            iconSize={21}
            iconColor={canReduceRooms ? "azure" : "b70"}
            style={styles.filterButtonStyle}
          />
          <Text
            size={16}
            color={daytColors.b30}
            lineHeight={19}
            style={styles.roomsText}
          >
            {rooms}+
          </Text>
          <IconButton
            name="caret-up"
            onPress={this.handleMoreRoomsPressed}
            size="large"
            isAwesomeIcon
            weight="solid"
            iconSize={21}
            iconColor="azure"
            style={styles.filterButtonStyle}
          />
        </View>
      </View>
    );
  }

  handleLessRoomsPressed = () => {
    const { onRoomsChanged, rooms } = this.props;
    onRoomsChanged(rooms - 1);
  };

  handleMoreRoomsPressed = () => {
    const { onRoomsChanged, rooms } = this.props;
    onRoomsChanged(rooms + 1);
  };
}

RoomsFilter.propTypes = {
  rooms: PropTypes.number,
  onRoomsChanged: PropTypes.func.isRequired
};

export default RoomsFilter;
