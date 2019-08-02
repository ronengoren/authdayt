import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { DaytIcon } from "src/assets/icons";
import { daytColors } from "src/vars";

const styles = StyleSheet.create({
  transparentBorder: {
    backgroundColor: daytColors.white70,
    height: 21,
    width: 21,
    borderRadius: 15,
    position: "absolute",
    left: 3,
    bottom: 47
  },
  counterWrapper: {
    backgroundColor: daytColors.black,
    height: 19,
    width: 19,
    paddingHorizontal: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 2,
    top: 2
  }
});

export class BadgeIcon extends Component {
  render = () => (
    <TouchableOpacity
      style={[styles.transparentBorder, this.props.style]}
      onPress={this.props.onPress}
    >
      <View style={styles.counterWrapper}>
        <DaytIcon name={this.props.icon} color={daytColors.white} size={11} />
      </View>
    </TouchableOpacity>
  );
}

BadgeIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  icon: PropTypes.string,
  onPress: PropTypes.func
};

export default BadgeIcon;
