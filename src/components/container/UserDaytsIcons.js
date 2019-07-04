import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image
} from "react-native";

class UserDaytsIcons extends Component {
  constructor() {
    super();
    this.state = {
      userdayts: [
        require("../../assets/images/daytTypesIcons/daytIcon85.png"),
        require("../../assets/images/daytTypesIcons/daytIcon86.png"),
        require("../../assets/images/daytTypesIcons/daytIcon76.png"),
        require("../../assets/images/daytTypesIcons/daytIcon55.png"),
        require("../../assets/images/daytTypesIcons/daytIcon8.png")
      ]
    };
  }
  render() {
    // var icon = this.props.active
    //   ? require("../../assets/images/daytTypesIcons/daytIcon8.png")
    //   : null;
    // <Image source={icon} />;
    return (
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
    );
  }
}

const styles = StyleSheet.create({
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
  }
});

export default UserDaytsIcons;
