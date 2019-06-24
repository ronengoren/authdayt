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
  constructor() {
    super();
    this.state = {
      userId: "",
      profilePics: []
    };
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      if (this.props.navigation.state.params) {
        let newPics = Object.assign([], this.state.profilePics);
        newPics.push(this.props.navigation.state.params.newPic);
        this.setState({
          profilePics: newPics
        });
      }
    });

    fetch(`${config.baseUrl}api/photo?user=${this.state.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({ profilePics: jsonResponse.data });
      })
      .catch(err => {
        console.log(JSON.stringify(err.message));
      });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  logout() {
    AsyncStorage.removeItem(config.userIdKey).then(removed => {
      this.props.navigation.navigate("login");
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>My Profile</Text>
        <View
          style={{
            height: 100 + "%",
            width: 100 + "%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
        <View style={styles.profilePicContainer}>
          {/* {this.state.profilePics.map((pic, i) => {
            return (
              <Image
                key={pic.id}
                style={styles.profilePicThumb}
                source={{
                  uri: `${pic.url}=s${config.styleConstants.oneThirdWidth}-c`
                }}
              />
            );
          })} */}
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
        </View>
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
  },
  profilePicThumb: {
    width: config.styleConstants.oneThirdWidth,
    height: config.styleConstants.oneThirdWidth
  }
});

export default Profile;
