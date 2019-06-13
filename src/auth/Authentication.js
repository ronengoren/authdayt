import React from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView, Image, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { Input, Button, ButtonGroup } from "react-native-elements";
import Amplify, { API } from "aws-amplify";
import aws_config from "../../aws-exports";


import Auth0 from 'react-native-auth0';
import LoginForm from './LoginForm';
import SignUpForm from './SignupForm';
import Config from 'react-native-config'
import DeviceInfo from 'react-native-device-info';
import SInfo from 'react-native-sensitive-info';
import { StackActions, NavigationActions } from 'react-navigation';
import RNRestart from 'react-native-restart';
import {
      headerColorStyle,
      headerTextColorStyle,
      buttonStyle
    } from "../assets/styles/colors.js";
import styles from "../assets/styles/Login";


Amplify.configure(aws_config);
Amplify.configure({
  API: {
    graphql_headers: async () => ({
        'My-Custom-Header': 'my value'
    })
  }
});







const auth0 = new Auth0({
      domain: Config.AUTH0_DOMAIN,
      clientId: Config.AUTH0_CLIENT_ID
    });


// const credentials = new Auth0({ domain: 'dayt.auth0.com', clientId: '36T4u5KGuKD8o2DI8HWDboFIpjshxrTT' });



export default class Authentication extends React.Component {
   static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Login",
      headerStyle: {
        backgroundColor: headerColorStyle
      },
      headerTitleStyle: {
        color: headerTextColorStyle
      }
    };
  };

  state = {
    hasInitialized: true
  };


  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#05a5d1"
          animating={!this.state.hasInitialized}
        />
        {this.state.hasInitialized && (
          <Button onPress={this.login} title="Login" color={buttonStyle} />
        )}
      </View>

    );
  }

  login = () => {
    auth0.webAuth
      .authorize({
        scope: Config.AUTHO_SCOPE,
        audience: Config.AUTH0_AUDIENCE,
        device: DeviceInfo.getUniqueID(),
        prompt: "login"
      })
      .then(res => {
        auth0.auth
          .userInfo({ token: res.accessToken })
          .then(data => {
            this.gotoAccount(data);
          })
          .catch(err => {
            console.log("err: ");
            console.log(JSON.stringify(err));
          });

        SInfo.setItem("accessToken", res.accessToken, {});
        SInfo.setItem("refreshToken", res.refreshToken, {});
      })
      .catch(error => {
        console.log("error occurrdzz");
        console.log(error);
      });
  };

  gotoAccount = data => {
    this.setState({
      hasInitialized: false
    });

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Profile",
          params: {
            id: data.user_id,
            name: data.name,
            picture: data.picture,
          }
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };
}

