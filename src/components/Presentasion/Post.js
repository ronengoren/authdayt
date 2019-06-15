import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import config from "../../config/index";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      screenWidth: Dimensions.get("window").width
    };
  }

  likedToggled() {
    this.setState({
      liked: !this.state.liked
    });
  }

  render() {
    const imageHeight = Math.floor(this.state.screenWidth * 1.1);
    const imageSelection =
      this.props.item % 2 == 0
        ? "https://lh3.googleusercontent.com/zvsugaH6d7pOf7P70gedZFhl2ZhItHK5nXlA4zFlDrD8PDkFUbtDYf1uAYZs5VOLjQz3F6tOmitYnJ-v3Ip4UTKqaw"
        : "https://lh3.googleusercontent.com/w3C1x1m-C4q5nxMEtLDgPFEfntbAEHVhW5aqXUvzpYxNYrzYXcvJIX5lv-GT7FEWDw6gDgxly8OSscm5-9Q9AxXN0-8";
    const imageUri = imageSelection + "=s" + imageHeight + "-c";
    const barIconColor = this.state.liked ? "rgb(252,61,57)" : null;
    return (
      <View
        style={{
          flex: 1,
          width: 100 + "%"
        }}
      >
        <View style={styles.userBar}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.userPic}
              source={{
                uri:
                  "https://lh3.googleusercontent.com/5iI7gI1MVawamRBI3g4eLZDFoiFpyUt5xuliYraZJDzoL_tCPUoqOaMav6jSLuWYMWi6ScScP7OGdBzMEzTpFaqxGw"
              }}
            />
            <Text style={{ marginLeft: 10 }}> AriUWS </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 30 }}> ... </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.likedToggled();
            }}
          >
            <Image
              style={{ width: this.state.screenWidth, height: 400 }}
              source={{ uri: imageUri }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconBar}>
          <Image
            style={[
              styles.icon,
              {
                height: 50,
                width: 50,
                tintColor: barIconColor
              }
            ]}
            source={config.images.heartIcon}
          />
          {/* <Image style={[styles.icon, {height: 50, width: 50, tintColor: barIconColor}]} source={config.images.barIcon}/>
                    <Image style={[styles.icon, {height: 50, width: 50}]} source={config.images.cinemaIcon}/>
                    <Image style={[styles.icon, {height: 50, width: 50}]} source={config.images.partyIcon}/>
                    <Image style={[styles.icon, {height: 50, width: 50}]} source={config.images.restaurantIcon}/>
                    <Image style={[styles.icon, {height: 50, width: 50}]} source={config.images.villageIcon}/> */}
        </View>
        <View style={styles.iconBar}>
          <Image
            style={[
              styles.icon,
              {
                height: 30,
                width: 30
              }
            ]}
            source={config.images.heartIcon}
          />
          <Text> 128 Likes </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tempNav: {
    width: 100 + "%",
    height: 50,
    marginTop: 20,
    backgroundColor: "rgb(250,250,250)",
    borderBottomColor: "rgb(233,33,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center"
  },
  userBar: {
    width: 100 + "%",
    height: config.styleConstants.rowHeight,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },
  userPic: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  iconBar: {
    height: config.styleConstants.rowHeight,
    width: 100 + "%",
    borderColor: "rgb(233,33,233)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginLeft: 5
  }
});

export default Post;
