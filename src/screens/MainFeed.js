import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";
import config from "../config";
import { PostFeed } from "../components/container";

class MainFeed extends React.Component {
  constructor() {
    super();
    this.state = {
      userdayts: [
        require("../assets/images/daytTypesIcons/daytIcon85.png"),
        require("../assets/images/daytTypesIcons/daytIcon86.png"),
        require("../assets/images/daytTypesIcons/daytIcon76.png"),
        require("../assets/images/daytTypesIcons/daytIcon55.png"),
        require("../assets/images/daytTypesIcons/daytIcon8.png")
      ]
    };
  }
  render() {
    return (
      <View style={{ flex: 1, width: 100 + "%", height: 100 + "%" }}>
        <View style={styles.tempNav}>
          <Text style={styles.feedHeader}>dayts for Now-ish</Text>
          <View style={styles.userDaytsBar}>
            <FlatList
              // style={{ width: 100 + "%" }}
              data={this.state.userdayts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    alert("hey1");
                  }}
                >
                  <View style={styles.userDaytsImage}>
                    <Image
                      style={styles.UserImageThumbnail}
                      source={item}
                      resizeMode={"contain"}
                      horizontal={true}
                    />
                  </View>
                </TouchableOpacity>
              )}
              //Setting the number of column
              numColumns={5}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
        <PostFeed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tempNav: {
    width: 100 + "%",
    height: 100,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // justifyContent: "center",
    alignItems: "center"
  },
  feedHeader: {
    fontFamily: "DMSerifDisplay-Regular",
    fontSize: 20,
    color: "black"
  },
  userDaytsImage: {
    marginTop: 10,
    padding: 7,
    marginBottom: 35,
    width: 60,
    height: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 60 / 2
  },
  UserImageThumbnail: {
    width: 40,
    height: 40
  }
});

export default MainFeed;
