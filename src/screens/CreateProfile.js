import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, ScrollView, Keyboard, TouchableOpacity, FlatList, ActivityIndicator, ListView } from 'react-native';
import { Button, Icon, Input, ListItem, List } from 'react-native-elements';
import Amplify, { Analytics, Storage, API, graphqlOperation, Connect } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import gql from 'graphql-tag';
import { graphql, compose, ApolloClient } from 'react-apollo';
import { ApolloProvider } from "react-apollo";
import Profile  from './Profile';
import Feed  from './Feed';
import AppSyncConfig from '../../aws-exports';
import { Rehydrated, S3Album } from 'aws-appsync-react';
import AWSAppSyncClient from 'aws-appsync';
import Ionicons from 'react-native-vector-icons/Ionicons';


const listProfiles = `query ListProfiles {
  listProfiles {
    items {
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
  state = {
  items: []
}

async componentDidMount() {
  try {
    const itemData = await API.graphql(graphqlOperation(listProfiles))
    console.log('itemData:', itemData)
    this.setState({
      items: itemData.data.listProfiles.items
    })
  } catch (err) {
    console.log('error fetching talks...', err)
  }
}

  renderLoading(){
    return(  <View style={styles.container}>
        <ActivityIndicator styleAttr='Large'/>
      </View>)
  }
  renderError(){
    return(  <View style={styles.container}>
                <Text style={styles.welcome}>
                  An error occured
                </Text>
      </View>)
  }
  renderList(dataArray){
 
    return(  <View style={styles.container}>
        {
              dataArray.map(row => (
                <Text key={row.id} style={styles.instructions}>{ row.firstName} {row.lastName}</Text>
              ))
        }
      </View>)
  }

  ProfileMutation = async () => {
    const ProfileDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };
    
    const newProfile = await API.graphql(graphqlOperation(addProfile, ProfileDetails));
    alert(JSON.stringify(newProfile));
  }

  render() {
  
    return (
      <View>
  <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollViewContent}
        >        
        <Text>create</Text>
         {
    this.state.items.map((item, index) => (
      <View key={index}>
        <Text>{item.id}</Text>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
      </View>
    ))
  }
 </ScrollView>
        </View>
    )
  }

}

const TabNavigator = createBottomTabNavigator({
  Home: CreateProfile,
  Profile: Profile,
  Feed: Feed,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
    }
  })
}
);

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
  },
   scrollview: {
    paddingTop: 50,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
})


export default createAppContainer(TabNavigator);
