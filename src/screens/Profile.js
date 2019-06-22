import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import config from "../config";

class Profile extends Component {
  logout() {
    AsyncStorage.removeItem(config.userIdKey).then(removed => {
      this.props.navigation.navigate("login");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>
        <View style={{ width: 100 + "%", flexDirection: "row" }} />
        <TouchableOpacity
          onPress={() => this.logout()}
          style={[styles.btn, { justifyContent: "center" }]}
        >
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    height: 100 + "%",
    display: "flex",
    flex: 1,
    backgroundColor: config.colors.purple
  },
  title: {
    fontSize: 36,
    color: "white",
    marginTop: 100,
    alignSelf: "center"
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  btnText: {
    fontSize: 24,
    color: "white"
  }
});

export default Profile;
