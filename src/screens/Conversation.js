import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Message } from "../components/presentation";
import config from "../config";
import utils from "../utils";
class Conversation extends Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.state.params.currentConversation || ""
    };
  };
  componentDidMount() {
    const { user } = this.props.navigation.state.params;
    this.props.navigation.setParams({
      currentConversation: user
    });
    const query = `?fromUser=${user}`;
    utils
      .fetchMessages({ fromUser: user })
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
  render() {
    return (
      <View>
        {this.state.messages.map((message, i) => {
          return <Message {...message} />;
        })}
      </View>
    );
  }
}

export default Conversation;
