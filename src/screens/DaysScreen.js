import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  ScrollView
} from "react-native";
import moment from "moment";

class DaysScreen extends Component {
  constructor() {
    super();
    this.state = {
      //default value of the date time
      date: ""
    };
  }
  render() {
    var currentDate = moment().format("dddd");
    var nextOneDay = moment()
      .add(1, "days")
      .format("dddd");
    var nextTwoDay = moment()
      .add(2, "days")
      .format("dddd");
    var nextThreeDay = moment()
      .add(3, "days")
      .format("dddd");
    var nextFourthDay = moment()
      .add(4, "days")
      .format("dddd");
    var nextFifthDay = moment()
      .add(5, "days")
      .format("dddd");
    var nextSixthDay = moment()
      .add(6, "days")
      .format("dddd");
    var nextSeventhDay = moment()
      .add(7, "days")
      .format("dddd");

    return (
      <View style={styles.MainContainer}>
        <Text style={styles.DaysScreen}>I'm Available</Text>
        <Text style={styles.DaysScreen}>Now!</Text>
        <View />
        <Text style={styles.DaysScreen}>Or</Text>

        <Text style={styles.DaysScreen}>{currentDate}</Text>
        <Text style={styles.DaysScreen}>{nextOneDay}</Text>
        <Text style={styles.DaysScreen}>{nextTwoDay}</Text>
        <Text style={styles.DaysScreen}>{nextThreeDay}</Text>
        <Text style={styles.DaysScreen}>{nextFourthDay}</Text>
        <Text style={styles.DaysScreen}>{nextFifthDay}</Text>
        <Text style={styles.DaysScreen}>{nextSixthDay}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100 + "%",
    width: 100 + "%",
    backgroundColor: "pink"
  },
  DaysScreen: {
    fontSize: 20
  }
});

export default DaysScreen;
