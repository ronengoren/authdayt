import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  StatusBar
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
      },
      loginScreen: true
    };
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  static navigationOptions = {
    title: "Auth Screen"
  };

  componentDidMount() {
    AsyncStorage.getItem(config.userIdKey).then(item => {
      console.log(item);
    });
  }

  updateCredentials(text, field) {
    let credentials = Object.assign(this.state.credentials);
    credentials[field] = text;
    this.setState({
      credentials: credentials
    });
  }

  togglePage() {
    this.setState({ loginScreen: !this.state.loginScreen });
  }
  submit() {
    const authFunction = this.state.loginScreen ? this.login : this.register;
    let { credentials } = this.state;
    credentials.email = credentials.email.toLowerCase();
    authFunction(this.state.credentials);
  }

  login() {
    let credentials = this.state.credentials;
    credentials.email = this.state.credentials.email.toLowerCase();
    fetch(config.baseUrl + "api/" + "login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse.data.id);
        console.log("jsonResponse.data.id");

        if (jsonResponse.confirmation === "success") {
          AsyncStorage.setItem(config.userIdKey, jsonResponse.data.id);
          this.props.navigation.navigate({
            routeName: "profile",
            params: { user: config.userIdKey }
          });
        } else {
          throw new Error(jsonResponse.message);
        }
      })
      .catch(err => {
        alert(JSON.stringify(err.message));
      });
  }
  register() {
    fetch(config.baseUrl + "api/" + "signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.credentials)
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.confirmation === "success") {
          this.props.navigation.navigate("main");
        } else {
          throw new Error({
            message: "Sorry, something went wrong; please try again"
          });
        }
      })
      .catch(err => {
        alert(err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>
          {this.state.loginScreen ? "Login" : "Register"}
        </Text>
        <View style={styles.main}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            autoCapitalize="none"
            value={this.state.email}
            placeholder="Email"
            style={styles.input}
            autoCorrect={false}
            onChangeText={text => this.updateCredentials(text, "email")}
          />
          <Text style={styles.label}>Password</Text>

          <TextInput
            autoCapitalize="none"
            value={this.state.password}
            onChangeText={text => this.updateCredentials(text, "password")}
            secureTextEntry
            autoCorrect={false}
            placeholder="Password"
            style={styles.input}
          />
          <View style={{ width: 100 + "%", flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.togglePage();
              }}
            >
              <Text style={styles.btnText}>
                {this.state.loginScreen ? "New user?" : "Returning User?"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.submit()}
              style={[styles.btn, { justifyContent: "flex-end" }]}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  main: {
    justifyContent: "flex-start",
    flexDirection: "column",
    flex: 2
  },
  input: {
    width: 100 + "%",
    height: 60,
    backgroundColor: "rgb(255,255,255)"
  },
  title: {
    fontSize: 36,
    color: "white",
    marginTop: 40,
    alignSelf: "center"
  },
  label: {
    fontSize: 24,
    color: "white"
  },
  btn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    color: "white"
  },
  btnText: {
    fontSize: 24,
    color: "white"
  }
});

export default Login;
