import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions, StackActions } from "react-navigation";
import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';
import SInfo from 'react-native-sensitive-info';
import {
      headerColorStyle,
      headerTextColorStyle,
      buttonStyle
    } from "../assets/styles/colors";
import styles from "../assets/styles/Account";
  const auth0 = new Auth0({
      domain: Config.AUTH0_DOMAIN,
      clientId: Config.AUTH0_CLIENT_ID
    });
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Profile extends React.Component {
   static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: headerColorStyle
          },
          headerTitleStyle: {
            color: headerTextColorStyle
          }
        };
      };

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam("name");
    const picture = navigation.getParam("picture");
    return (
      <View style={styles.container}>
          {name && (
            <View style={styles.profileContainer}>
              <Image style={styles.picture} source={{ uri: picture }} />

              <Text style={styles.usernameText}>{name}</Text>
              <Button onPress={this.logout} title="Logout" color={buttonStyle} />
            </View>
          )}
        </View>
    )
  }
   logout = () => {
    console.log("logging out...");

    SInfo.deleteItem("accessToken", {});
    SInfo.deleteItem("refreshToken", {});

    this.gotoLogin();

    auth0.webAuth
      .clearSession()
      .then(res => {
        console.log("clear session ok");
        console.log(res);
      })
      .catch(err => {
        console.log("error clearing session.");
        console.log(err);
      });
  };

  gotoLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Authentication"
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };
}





export default Profile;
