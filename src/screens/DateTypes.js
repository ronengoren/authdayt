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
import config from "../config";
import UserDaytsIcons from "../components/container";
class DateTypes extends Component {
  constructor() {
    super();
    this.state = {
      images: [
        require("../assets/images/daytTypesIcons/daytIcon1.png"),
        require("../assets/images/daytTypesIcons/daytIcon2.png"),
        require("../assets/images/daytTypesIcons/daytIcon3.png"),
        require("../assets/images/daytTypesIcons/daytIcon4.png"),
        require("../assets/images/daytTypesIcons/daytIcon5.png"),
        require("../assets/images/daytTypesIcons/daytIcon6.png"),
        require("../assets/images/daytTypesIcons/daytIcon7.png"),
        require("../assets/images/daytTypesIcons/daytIcon8.png"),
        require("../assets/images/daytTypesIcons/daytIcon9.png"),
        require("../assets/images/daytTypesIcons/daytIcon10.png"),
        require("../assets/images/daytTypesIcons/daytIcon11.png"),
        require("../assets/images/daytTypesIcons/daytIcon12.png"),
        require("../assets/images/daytTypesIcons/daytIcon13.png"),
        require("../assets/images/daytTypesIcons/daytIcon14.png"),
        require("../assets/images/daytTypesIcons/daytIcon15.png"),
        require("../assets/images/daytTypesIcons/daytIcon16.png"),
        require("../assets/images/daytTypesIcons/daytIcon17.png"),
        require("../assets/images/daytTypesIcons/daytIcon18.png"),
        require("../assets/images/daytTypesIcons/daytIcon19.png"),
        require("../assets/images/daytTypesIcons/daytIcon20.png"),
        require("../assets/images/daytTypesIcons/daytIcon21.png"),
        require("../assets/images/daytTypesIcons/daytIcon22.png"),
        require("../assets/images/daytTypesIcons/daytIcon23.png"),
        require("../assets/images/daytTypesIcons/daytIcon24.png"),
        require("../assets/images/daytTypesIcons/daytIcon25.png"),
        require("../assets/images/daytTypesIcons/daytIcon26.png"),
        require("../assets/images/daytTypesIcons/daytIcon27.png"),
        require("../assets/images/daytTypesIcons/daytIcon28.png"),
        require("../assets/images/daytTypesIcons/daytIcon29.png"),
        require("../assets/images/daytTypesIcons/daytIcon30.png"),
        require("../assets/images/daytTypesIcons/daytIcon31.png"),
        require("../assets/images/daytTypesIcons/daytIcon32.png"),
        require("../assets/images/daytTypesIcons/daytIcon33.png"),
        require("../assets/images/daytTypesIcons/daytIcon34.png"),
        require("../assets/images/daytTypesIcons/daytIcon35.png"),
        require("../assets/images/daytTypesIcons/daytIcon36.png"),
        require("../assets/images/daytTypesIcons/daytIcon37.png"),
        require("../assets/images/daytTypesIcons/daytIcon38.png"),
        require("../assets/images/daytTypesIcons/daytIcon39.png"),
        require("../assets/images/daytTypesIcons/daytIcon40.png"),
        require("../assets/images/daytTypesIcons/daytIcon41.png"),
        require("../assets/images/daytTypesIcons/daytIcon42.png"),
        require("../assets/images/daytTypesIcons/daytIcon43.png"),
        require("../assets/images/daytTypesIcons/daytIcon44.png"),
        require("../assets/images/daytTypesIcons/daytIcon45.png"),
        require("../assets/images/daytTypesIcons/daytIcon46.png"),
        require("../assets/images/daytTypesIcons/daytIcon47.png"),
        require("../assets/images/daytTypesIcons/daytIcon48.png"),
        require("../assets/images/daytTypesIcons/daytIcon49.png"),
        require("../assets/images/daytTypesIcons/daytIcon50.png"),
        require("../assets/images/daytTypesIcons/daytIcon51.png"),
        require("../assets/images/daytTypesIcons/daytIcon52.png"),
        require("../assets/images/daytTypesIcons/daytIcon53.png"),
        require("../assets/images/daytTypesIcons/daytIcon54.png"),
        require("../assets/images/daytTypesIcons/daytIcon55.png"),
        require("../assets/images/daytTypesIcons/daytIcon56.png"),
        require("../assets/images/daytTypesIcons/daytIcon57.png"),
        require("../assets/images/daytTypesIcons/daytIcon58.png"),
        require("../assets/images/daytTypesIcons/daytIcon59.png"),
        require("../assets/images/daytTypesIcons/daytIcon60.png"),
        require("../assets/images/daytTypesIcons/daytIcon61.png"),
        require("../assets/images/daytTypesIcons/daytIcon62.png"),
        require("../assets/images/daytTypesIcons/daytIcon63.png"),
        require("../assets/images/daytTypesIcons/daytIcon64.png"),
        require("../assets/images/daytTypesIcons/daytIcon65.png"),
        require("../assets/images/daytTypesIcons/daytIcon66.png"),
        require("../assets/images/daytTypesIcons/daytIcon67.png"),
        require("../assets/images/daytTypesIcons/daytIcon68.png"),
        require("../assets/images/daytTypesIcons/daytIcon69.png"),
        require("../assets/images/daytTypesIcons/daytIcon70.png"),
        require("../assets/images/daytTypesIcons/daytIcon71.png"),
        require("../assets/images/daytTypesIcons/daytIcon72.png"),
        require("../assets/images/daytTypesIcons/daytIcon73.png"),
        require("../assets/images/daytTypesIcons/daytIcon74.png"),
        require("../assets/images/daytTypesIcons/daytIcon75.png"),
        require("../assets/images/daytTypesIcons/daytIcon76.png"),
        require("../assets/images/daytTypesIcons/daytIcon77.png"),
        require("../assets/images/daytTypesIcons/daytIcon78.png"),
        require("../assets/images/daytTypesIcons/daytIcon79.png"),
        require("../assets/images/daytTypesIcons/daytIcon80.png"),
        require("../assets/images/daytTypesIcons/daytIcon81.png"),
        require("../assets/images/daytTypesIcons/daytIcon82.png"),
        require("../assets/images/daytTypesIcons/daytIcon83.png"),
        require("../assets/images/daytTypesIcons/daytIcon84.png"),
        require("../assets/images/daytTypesIcons/daytIcon85.png"),
        require("../assets/images/daytTypesIcons/daytIcon86.png"),
        require("../assets/images/daytTypesIcons/daytIcon87.png"),
        require("../assets/images/daytTypesIcons/daytIcon88.png"),
        require("../assets/images/daytTypesIcons/daytIcon89.png"),
        require("../assets/images/daytTypesIcons/daytIcon90.png")
      ],
      userdayts: [
        require("../assets/images/daytTypesIcons/daytIcon85.png"),
        require("../assets/images/daytTypesIcons/daytIcon86.png"),
        require("../assets/images/daytTypesIcons/daytIcon76.png"),
        require("../assets/images/daytTypesIcons/daytIcon55.png"),
        require("../assets/images/daytTypesIcons/daytIcon8.png")
      ],
      dataSource: {},
      userDaytsDataSource: {}
    };
  }
  componentDidMount() {
    var that = this;
    let daytTypes = Array.apply(null, Array(90)).map((v, i) => {
      return { id: i, src: "http://placehold.it/200x200?text=" + (i + 1) };
    });
    that.setState({
      //Setting the data source
      dataSource: daytTypes
    });
  }
  render() {
    const { images } = this.state;

    return (
      <View style={styles.MainContainer}>
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
        <ScrollView>
          <FlatList
            // style={{ width: 100 + "%" }}
            data={this.state.images}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  alert("hey");
                }}
              >
                <View style={styles.image}>
                  <Image
                    style={styles.imageThumbnail}
                    source={item}
                    resizeMode={"contain"}
                  />
                </View>
              </TouchableOpacity>
            )}
            //Setting the number of column
            numColumns={5}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    // display: "flex",
    // flex: 1,
    // alignItems: "stretch",
    alignItems: "center",
    // justifyContent: "space-between",
    // paddingTop: 30,
    width: 100 + "%",
    backgroundColor: "white"
  },
  userDaytsBar: {
    alignItems: "center",

    height: 95,
    // backgroundColor: "pink",

    width: 100 + "%"
  },
  userDaytsImage: {
    marginTop: 30,
    padding: 7,
    margin: 3,

    width: 60,
    height: 60,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 60 / 2
  },
  UserImageThumbnail: {
    width: 40,
    height: 40
  },
  image: {
    backgroundColor: "white",

    alignItems: "center",

    // flex: 1,
    marginTop: 30,
    padding: 7,
    margin: 3,
    width: 70,
    height: 70,
    // backgroundColor: "whi",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 70 / 2

    // width: 100 + "%"
  },
  imageThumbnail: {
    width: 50,
    height: 50,
    // justifyContent: "space-between",
    // alignItems: "center",

    // borderColor: "#4c09a2",
    borderWidth: 2
    // borderRadius: 50 / 2
  },
  daytTypesBar: {
    // paddingTop: 70,
    // backgroundColor: "black",
    // height: 100,
    // width: 100 + "%"
  }
});

export default DateTypes;
