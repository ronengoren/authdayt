import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  FlatList
} from "react-native";
import { Message } from "../components/presentation";
import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";
import utils from "../utils";
class Messages extends Component {
  static navigationOptions = {
    title: "Messages"
  };
  constructor() {
    super();
    this.state = {
      showActivityIndicator: true,
      messages: []
    };
  }
  componentDidMount() {
    utils
      .fetchMessages({})
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
  }

  navigateToConversation(item) {
    console.log(item);
    this.props.navigation.navigate("conversation", { user: item.fromUser });
  }
  render() {
    const { messages } = this.state;
    const lastIndex = messages.length - 1;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.showActivityIndicator ? (
          <ActivityIndicator animating size="large" />
        ) : null}
        <FlatList
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Message
              {...item}
              nav={this.navigateToConversation.bind(this, {
                ...item
              })}
            />
          )}
        />
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
    justifyContent: "center"
  }
});

export default Messages;
