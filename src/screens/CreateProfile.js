import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, ScrollView, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import gql from 'graphql-tag';
import { graphql, compose, ApolloClient } from 'react-apollo';
import { ApolloProvider } from "react-apollo";
import Profile  from './Profile/Profile';
import Chat  from './Chat';
import Feed  from './Feed';
import AppSyncConfig from '../../aws-exports';
import { Rehydrated, S3Album } from 'aws-appsync-react';
import AWSAppSyncClient from 'aws-appsync';


const listProfiles = `query listProfiles {
  listProfiles{
    items{
      id
      name
      description
    }
  }
}`

const addProfile = `mutation createProfile($name:String! $description: String!) {
  createProfile(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`

class CreateProfile extends React.Component {
  ProfileMutation = async () => {
    const ProfileDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };
    
    const newProfile = await API.graphql(graphqlOperation(addProfile, ProfileDetails));
    alert(JSON.stringify(newProfile));
  }

  listQuery = async () => {
    console.log('listing Profiles');
    const allProfiles = await API.graphql(graphqlOperation(listProfiles));
    alert(JSON.stringify(allProfiles));
  }
  render() {
    return (
         <View>
          <Input
              label="Pick a file"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                this.uploadFile
              }
            />
      <Button
      title='GraphQL Query'
      onPress={ this.listQuery }
    />
     <Button
      title='GraphQL Mutation'
      onPress={ this.ProfileMutation }
    />
  {/* <S3Album level="private" path={"pictures/"} /> */}
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
