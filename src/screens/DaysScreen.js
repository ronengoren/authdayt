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
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.ScrollView}>
        <View style={styles.MainContainer}>
          <Text style={styles.dateChoose}>Date for</Text>
          <Text style={styles.daytHeader}>Dayt</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now}>Now-ish...</Text>
          </TouchableOpacity>
          <View />
          <Text style={styles.Or}>Or</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={currentDate}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={nextOneDay}>
              {nextOneDay}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={nextTwoDay}>
              {nextTwoDay}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={nextThreeDay}>
              {nextThreeDay}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={nextFourthDay}>
              {nextFourthDay}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={nextFifthDay}>
              {nextFifthDay}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigate("login");
            }}
          >
            <Text style={styles.Now} value={nextSixthDay}>
              {nextSixthDay}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ScrollView: {
    height: 100 + "%",
    width: 100 + "%"
  },
  MainContainer: {
    // justifyContent: "center",
    alignItems: "center",
    height: 100 + "%",
    width: 100 + "%"
    // backgroundColor: "pink"
  },
  dateChoose: {
    marginTop: 70,
    fontSize: 30,
    fontFamily: "DMSerifDisplay-Regular"
  },
  daytHeader: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 30,
    backgroundColor: "pink"
  },
  Now: {
    marginTop: 50,
    fontFamily: "DMSerifDisplay-Regular",
    width: 150,
    height: 150,
    fontSize: 30,
    borderRadius: 150 / 2,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    lineHeight: 150,
    textAlign: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  Or: {
    fontFamily: "DMSerifDisplay-Regular",
    lineHeight: 150
  }
});

export default DaysScreen;
