import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { Message } from "../components/presentation";
import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";
import utils from "../utils";
import { Header } from "react-navigation";

class Messages extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: "Messages",
      headerRight: params.showIcon ? (
        <TouchableOpacity
          onPress={params.toggleCreateMessage}
          style={{ padding: 15 }}
        >
          <Image source={config.icons.create} />
        </TouchableOpacity>
      ) : null
    };
  };
  constructor() {
    super();
    this.state = {
      showActivityIndicator: true,
      showCreateMessage: false,
      messages: [],
      keyboardHeight: 0,
      newMessage: {
        toUser: "",
        message: ""
      }
    };
    this.toggleCreateMessage = this.toggleCreateMessage.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }
  componentWillMount() {
    this.props.navigation.setParams({
      toggleCreateMessage: this.toggleCreateMessage,
      showIcon: !this.state.showCreateMessage
    });
  }

  componentWillUnmount() {
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );

    utils
      .fetchMessages("message", {})
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

  _keyboardDidHide() {
    this.setState({
      keyboardHeight: 0
    });
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }
  navigateToConversation(item) {
    console.log(item);
    this.props.navigation.navigate("conversation", { user: item.fromUser });
  }

  updateNewMessage(text, field) {
    let newMessage = Object.assign({}, this.state.newMessage);
    newMessage[field] = text;
    this.setState({ newMessage: newMessage }, () => {
      console.log(this.state.newMessage);
    });
  }
  toggleCreateMessage() {
    this.setState({ showCreateMessage: !this.state.showCreateMessage }, () => {
      this.props.navigation.setParams({
        showIcon: !this.state.showCreateMessage
      });
    });
  }

  cancel() {
    this.toggleCreateMessage();
    this.updateNewMessage("", "toUser");
    this.updateNewMessage("", "message");
  }

  send() {
    console.log(this.state.newMessage);
    let params = this.state.newMessage;
    utils
      .createMessages(params)
      .then(data => {
        this.cancel();
        this.navigateToConversation(data);
      })
      .catch(err => alert("Sorry, something went wrong, please try again"));
  }
  render() {
    const { messages } = this.state;
    const lastIndex = messages.length - 1;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Modal
          onRequestClose={this.cancel}
          animationType="slide"
          visible={this.state.showCreateMessage}
          transparent={true}
        >
          <View style={styles.messageModal}>
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <Text style={styles.to}>TO:</Text>
              <TextInput
                autoFocus
                value={this.state.newMessage.toUser}
                onChangeText={text => this.updateNewMessage(text, "toUser")}
                style={styles.toInput}
              />
            </View>
            <View
              style={[
                { flexDirection: "column" },
                { bottom: this.state.keyboardHeight }
              ]}
            >
              <TextInput
                multiline={true}
                value={this.state.newMessage.message}
                onChangeText={text => this.updateNewMessage(text, "message")}
                style={[styles.messageInput]}
              />
              <View
                style={{
                  flexDirection: "row",
                  height: 60,
                  width: 100 + "%",
                  backgroundColor: "rgb(255,255,255)"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.cancel()}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.buttonText, { color: "red" }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.send()}
                  style={styles.button}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.buttonText, { color: "green" }]}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    height: 100 + "%",
    display: "flex",
    backgroundColor: "rgb(243,243,243)",
    flex: 1,
    justifyContent: "center",
    alignContent: "center"
  },
  messageModal: {
    backgroundColor: "rgb(243,243,243)",
    height: 100 + "%",
    width: 100 + "%",
    marginTop: Header.HEIGHT,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 60
  },
  toInput: {
    width: 100 + "%",
    height: 60,
    backgroundColor: "rgb(255,255,255)",
    fontSize: 36
  },
  to: {
    fontSize: 24,
    height: 100 + "%",
    alignSelf: "center",
    color: "blue",
    backgroundColor: "rgb(255,255,255)"
  },
  messageInput: {
    width: 100 + "%",
    height: 120,
    backgroundColor: "rgb(255,255,255)",
    fontSize: 16
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: "rgb(213,211,200)"
  },
  buttonText: {
    fontSize: 24
  }
});

export default Messages;
