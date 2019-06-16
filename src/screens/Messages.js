import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import { Message } from "../components/Presentasion/Index";
import config from "../config";

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    return fetch(config.baseUrl + "message", {
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
        this.setState({ messages: jsonResopnse.data });
      })
      .catch(err => {
        console.log(JSON.stringify(err.message));
      });
  }
  render() {
    const { messages } = this.state;
    const lastIndex = messages.length - 1;

    return (
      <View style={styles.container}>
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
