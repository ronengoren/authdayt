import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image
} from "react-native";

const MessageShort = props => {
  const cropParams = "=s40-c";
  const profileImg =
    "https://lh3.googleusercontent.com/5iI7gI1MVawamRBI3g4eLZDFoiFpyUt5xuliYraZJDzoL_tCPUoqOaMav6jSLuWYMWi6ScScP7OGdBzMEzTpFaqxGw";
  const croppedImg = profileImg + "=s40-c";
  const dir = !props.sentMessage
    ? { flexDirection: "row-reverse" }
    : { flexDirection: "row" };
  const containerStyle = [styles.container];
  containerStyle.push(dir);
  return (
    <View style={containerStyle}>
      <Text> </Text>
      <View style={styles.userCol}>
        <Image
          style={styles.profile}
          source={{
            uri: croppedImg
          }}
        />
      </View>
      <View style={styles.message}>
        {/* <Text style={styles.messageText}>{props.message}</Text> */}
        <Text style={styles.messageText}>{props.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    paddingHorizontal: 30,
    marginHorizontal: 15,
    marginTop: 15
  },
  message: {
    borderColor: "rgb(225,225,225)",
    backgroundColor: "rgb(255,255,255)",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 15,
    borderRadius: 10
  },
  userCol: {
    flexDirection: "row"
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 20
  },
  messageText: {
    fontSize: 14
  }
});

export default MessageShort;
