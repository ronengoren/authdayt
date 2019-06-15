import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet
} from "react-native";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        login: "",
        password: ""
      }
    };
  }
  static navigationOptions = {
    title: "Please sign in"
  };

  updateText(text, field) {
    let newCredentials = Object.assign(this.state.credentials);
    newCredentials[field] = text;
    this.setState({
      credentials: newCredentials
    });
  }

  register() {
    alert(JSON.stringify(this.state.credentials));
    // this.props.navigation.navigate("main");
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
          value={this.state.login}
          placeholder={"username"}
          style={styles.input}
          autoCorrect={false}
          onChangeText={text => this.updateText(text, "login")}
        />

        <TextInput
          value={this.state.password}
          onChangeText={text => this.updateText(text, "password")}
          secureTextEntry
          autoCorrect={false}
          placeholder={"password"}
          style={styles.input}
        />
        <Button
          onPress={() => {
            this.register();
          }}
          title="Sign Up"
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

export default Register;
