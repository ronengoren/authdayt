import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, ScrollView, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';


// import {loadSettings,
//         saveSettings
//       } from '../storage/settingsStorage';
import Amplify, { API, graphqlOperation } from "aws-amplify";
// import { createTodo } from "../graphql/mutations"
// import { listTodos } from "../graphql/queries"
import { Auth } from 'aws-amplify';
import gql from 'graphql-tag';
import { graphql, compose, ApolloClient } from 'react-apollo';
import { ApolloProvider } from "react-apollo";
import Profile  from './Profile/Profile';
import Chat  from './Chat';
import Feed  from './Feed';




// import { graphqlMutation } from 'aws-appsync-react';
import AppSyncConfig from '../../aws-exports';
import { Rehydrated } from 'aws-appsync-react';
import AWSAppSyncClient from 'aws-appsync';


// const client = new AWSAppSyncClient({
//     "url": "https://gtqfztktofhxbchdhpifotiz54.appsync-api.us-east-1.amazonaws.com/graphql",
// "region": "us-east-1",
//     auth: {
//         "type": "API_KEY",
//         "apiKey": "da2-tod75vhfqra3pkh6yjimdbkxje",
//     }
//   });
class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
       

      
    }
  render() {
   

    return (
      
         <View>
      <Text>create profile1 </Text>
    </View>
  

    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  homeContainer: {
    alignItems: 'center'
  },
  welcome: {
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  registration: {
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  },
  icon: {
    width: 26,
    height: 26
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    color: "white"
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})

const TabNavigator = createBottomTabNavigator({
  Home: CreateProfile,
  Settings: Profile,
  Chat: Chat,
  Feed: Feed,
}
);




export default createAppContainer(TabNavigator);
