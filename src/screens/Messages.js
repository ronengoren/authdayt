import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator
} from "react-native";
import { Message } from "../components/Presentasion";
import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      showActivityIndicator: true,
      messages: []
    };
  }
  componentDidMount() {
    AsyncStorage.getItem(config.userIdKey).then(key => {
      const query = `?toUser=${key}`;
      console.log("queryqueryquery" + query);
      return fetch(`${config.baseUrl}/message${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
        // body: JSON.stringify(credentials)
      })
        .then(response => {
          return response.json();
        })
        .then(jsonResopnse => {
          this.setState({
            messages: jsonResopnse.data,
            showActivityIndicator: false
          });
        })
        .catch(err => {
          console.log(err.message);
          this.setState({ showActivityIndicator: false });
        });
    });
  }
  render() {
    const { messages } = this.state;
    const lastIndex = messages.length - 1;
    return (
      <View style={styles.container}>
        {this.state.showActivityIndicator ? (
          <ActivityIndicator animating size="large" />
        ) : null}
        {messages.map((message, i) => {
          const last = i === lastIndex;
          return <Message last={last} {...message} />;
        })}
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
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Messages;
