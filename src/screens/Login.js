import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from "react-native";
import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        email: "",
        password: ""
      }
    };
  }
  static navigationOptions = {
    title: "Please Login"
  };

  componentDidMount() {
    AsyncStorage.getItem(config.userIdKey).then(item => {
      console.log(item);
    });
  }

  updateText(text, field) {
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
  }

  login() {
    let credentials = this.state.credentials;
    credentials.email = this.state.credentials.email.toLowerCase();
    fetch(config.baseUrl + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(jsonResopnse => {
        console.log(jsonResopnse.data.id);
        if (jsonResopnse.confirmation === "success") {
          AsyncStorage.setItem(config.userIdKey, jsonResopnse.data.id);
          this.props.navigation.navigate("main");
        } else {
          throw new Error(jsonResopnse.message);
        }
      })
      .catch(err => {
        alert(JSON.stringify(err.message));
      });
  }

  render() {
    return (
      <View
        style={{
          height: 100 + "%",
          width: 100 + "%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(252,61,57)"
        }}
      >
        <TextInput
          autoCapitalize="none"
          value={this.state.email}
          placeholder="Email"
          style={styles.input}
          autoCorrect={false}
          onChangeText={text => this.updateText(text, "email")}
        />

        <TextInput
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={text => this.updateText(text, "password")}
          secureTextEntry
          autoCorrect={false}
          placeholder="Password"
          style={styles.input}
        />
        <Button
          onPress={() => {
            this.login();
          }}
          title="Login"
        />
        <Button
          title="No account? Sign up here!"
          onPress={() => this.props.navigation.navigate("register")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 100 + "%",
    height: 50,
    marginHorizontal: 50,
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 10
  }
});

export default Login;
