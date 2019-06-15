import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
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

import gql from 'graphql-tag';
import Amplify, { API } from "aws-amplify";
// import PostsContainer from '../containers/PostsContainer';
import PropTypes from 'prop-types';
import {Query} from  'react-apollo';  
import aws_config from "../../aws-exports";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Feed from './Feed';
import Filters from './Filters';
import Messages from './Messages';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

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


const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjwfb4s2b10qo0131b6u3g3pj' }),
  cache: new InMemoryCache()
});




class Profile extends React.Component {
  
   static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "Profile",
          headerStyle: {
            backgroundColor: "#000000"
          },
          headerTitleStyle: {
            color: "#000000"
          }
        };
      };





  handleSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.createPost();
      this.setState({ text: '' });
    }
  };

  render() {
    const { navigation } = this.props;
    console.log(this.props)
    console.log("////////////////////////////////////////////////////")

    const name = navigation.getParam("name");
    const picture = navigation.getParam("picture");
    const user_id = navigation.getParam("user_id");

    
    return (
    <ApolloProvider client={client}>

      <View style={styles.container}>
          {name && (
            <View style={styles.profileContainer}>
              {/* <Image style={styles.picture} source={{ uri: picture }} /> */}

              <Text style={styles.usernameText}>{name}</Text>
              <Button onPress={this.logout} title="Logout" color={buttonStyle} />
              <Text>profile</Text>

            </View>
          )}
        </View>
            </ApolloProvider>

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







const TabNavigator = createMaterialBottomTabNavigator({
  Profile: { screen: Profile },
  Feed: { screen: Feed },
  Filters: { screen: Filters },
  "My Dayt's": { screen: Messages },
}, {
  initialRouteName: 'Feed',
  labeled: true,
  shifting: false,
  activeColor: 'black',
  inactiveColor: 'white',
  barStyle: { backgroundColor: '#000000' },
});

export default createAppContainer(TabNavigator);
