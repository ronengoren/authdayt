import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MessageShort } from "../components/presentation";
import config from "../config";
import utils from "../utils";
import { FlatList } from "react-native-gesture-handler";
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
      .fetchMessages("message/me", { fromUser: user })
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
        <FlatList
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageShort
              sentMessage={
                item.fromUser === this.props.navigation.state.params.user
              }
              {...item}
            />
          )}
        />
      </View>
    );
  }
}

export default Conversation;
