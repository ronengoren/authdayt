import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

class UserDaytsIcons extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>UserDaytsIcons</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 90,
    backgroundColor: "blue"
  }
});

export default UserDaytsIcons;
