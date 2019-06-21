import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image
} from "react-native";

const Message = props => {
  console.log(JSON.stringify(props));
  const style = [];
  style.push(styles.message);
  // if (props.last) {
  //   style.push({ borderBottomWidth: StyleSheet.hairlineWidth });
  // }
  // const cropParams = "=s40-c";
  const profileImg =
    "https://lh3.googleusercontent.com/5iI7gI1MVawamRBI3g4eLZDFoiFpyUt5xuliYraZJDzoL_tCPUoqOaMav6jSLuWYMWi6ScScP7OGdBzMEzTpFaqxGw";
  const croppedImg = profileImg + "=s40-c";
  return (
    <TouchableOpacity
      onPress={() => props.nav()}
      activeOpacity={0.7}
      style={style}
    >
      <View style={styles.topRow}>
        <View style={styles.userCol}>
          <Image
            style={styles.profile}
            source={{
              uri: croppedImg
            }}
          />
          <Text style={styles.user}>{props.fromUser}</Text>
        </View>
        <View style={styles.timeCol}>
          {/* <Text>{props.dateTime}</Text> */}
          <Text style={styles.date}>Yesterday</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.messageText}>{props.message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  message: {
    borderColor: "rgb(225,225,225)",
    backgroundColor: "rgb(255,255,255)",
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10
  },
  bottomRow: {
    flexDirection: "row"
  },
  topRow: {
    flexDirection: "row"
  },
  userCol: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  timeCol: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  profile: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  user: {
    fontSize: 20,
    marginLeft: 10
  },
  date: {
    color: "rgb(172, 184, 196)"
  },
  messageText: {
    fontSize: 14
  }
});

export default Message;
