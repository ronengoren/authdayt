import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Profile</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  homeContainer: {
    alignItems: "center"
  },
  welcome: {
    color: "rgba(0, 0, 0, .85)",
    marginBottom: 26,
    fontSize: 22,
    textAlign: "center"
  }
});

export default Profile;
