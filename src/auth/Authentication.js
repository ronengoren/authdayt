import React from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView, Image, TouchableHighlight, ScrollView, ActivityIndicator } from 'react-native';
import { Input, Button, ButtonGroup } from "react-native-elements";
import Amplify, { API } from "aws-amplify";
import aws_config from "../../aws-exports";
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

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

const client = new ApolloClient({
  link: createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjwfb4s2b10qo0131b6u3g3pj' }),
  cache: new InMemoryCache()
});

const auth0 = new Auth0({
      domain: Config.AUTH0_DOMAIN,
      clientId: Config.AUTH0_CLIENT_ID
    });


const credentials = new Auth0({ domain: 'dayt.auth0.com', clientId: '36T4u5KGuKD8o2DI8HWDboFIpjshxrTT' });

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
    hasInitialized: false
  };

  componentDidMount() {
    console.log("boom panes!");
    SInfo.getItem("accessToken", {}).then(accessToken => {
      if (accessToken) {
        auth0.auth
          .userInfo({ token: accessToken })
          .then(data => {
            this.gotoAccount(data);
          })
          .catch(err => {
            SInfo.getItem("refreshToken", {}).then(refreshToken => {
              auth0.auth
                .refreshToken({ refreshToken: refreshToken })
                .then(newAccessToken => {
                  SInfo.setItem("accessToken", newAccessToken);
                  RNRestart.Restart();
                })
                .catch(err2 => {
                  console.log("err getting new access token");
                  console.log(err2);
                });
            });
          });
      } else {
        this.setState({
          hasInitialized: true
        });
        console.log("no access token");
      }
    });
  }

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
      hasInitialized: true
    });

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Profile",
          params: {
            name: data.name,
            picture: data.picture
          }
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };
}

  

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     formContainer: {
//         flex: 2,
//     },
//     headerContainer: {
//         flex: 1,
//         marginTop: 110,
//         marginBottom: 30,
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//     },
//     socialContainer: {
//         marginTop: 110,
//         flex: 2,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     tabContainer: {
//         marginTop: 60,
//         flex: 0.5,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         borderRadius: 1,
//         borderWidth: 0.5,
//         borderColor: '#d6d7da',
//     },
//     title: {
//         marginTop: 10,
//         width: 300,
//         textAlign: 'center',
//         fontSize: 26
//     },
//     socialIcon: {
//         marginTop: 10
//     },
//     logo: {
//        width: 300,
//        height: 400,

//     }
// });







// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
   
//   },
//   form: {
//     width: '90%',
//    }
// });




  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //     confirmationCode: '',
  //     modalVisible: false,
  //     selectedIndex: 0,
  //   };
  //   this.buttons = ['Sign Up', 'Sign In']
  // }
  // updateIndex = () => {
  //   // If selectedIndex was 0, make it 1.  If it was 1, make it 0
  //   const newIndex = this.state.selectedIndex === 0 ? 1 : 0
  //   this.setState({ selectedIndex: newIndex })
  // }
  // handleSignIn = () => {
  //   const { email, password } = this.state;
  //   Auth.signIn(email, password)
  //     // If we are successful, navigate to Home screen
  //     .then(user => this.props.navigation.navigate('Home'))
  //     // On failure, display error in console
  //     .catch(err => console.log(err));
  // }
  // handleSignUp = () => {
  //    // alert(JSON.stringify(this.state));
  //   const { email, password, confirmPassword } = this.state;
  //     // Make sure passwords match
  //     if (password === confirmPassword) {
  //     Auth.signUp({
  //       username: email,
  //       password,
  //       attributes: { email },
  //       })
  //       // On success, show Confirmation Code Modal
  //       .then(() => this.setState({ modalVisible: true }))
  //       // On failure, display error in console
  //       .catch(err => console.log(err));
  //   } else {
  //     alert('Passwords do not match.');
  //   }
  // }
  // handleConfirmationCode = () => {
  //   const { email, confirmationCode } = this.state;
  //   Auth.confirmSignUp(email, confirmationCode, {})
  //     .then(() => {
  //       this.setState({ modalVisible: false });
  //       this.props.navigation.navigate('Home')
  //     })
  //     .catch(err => console.log(err));
  // }




 {/* <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={this.state.selectedIndex}
        buttons={ this.buttons }
      />

     { this.state.selectedIndex === 0 ? (
  <View style={styles.form}>
    <Input
      label="Email"
      leftIcon={{ type: 'font-awesome', name: 'envelope' }}
      onChangeText={
        // Set this.state.email to the value in this Input box
        (value) => this.setState({ email: value })
      }
      placeholder="my@email.com"
    />
    <Input
      label="Password"
      leftIcon={{ type: 'font-awesome', name: 'lock' }}
      onChangeText={
        // Set this.state.email to the value in this Input box
        (value) => this.setState({ password: value })
      }
      placeholder="p@ssw0rd123"
      secureTextEntry
    />
    <Input
      label="Confirm Password"
      leftIcon={{ type: 'font-awesome', name: 'lock' }}
      onChangeText={
        // Set this.state.email to the value in this Input box
        (value) => this.setState({ confirmPassword: value })
      }
      placeholder="p@ssw0rd123"
      secureTextEntry
    />
    <Button
      title='Submit'
      onPress={ this.handleSignUp }
    />
  </View>
) : (
  <View style={styles.form}>
    <Input
      label="Email"
      leftIcon={{ type: 'font-awesome', name: 'envelope' }}
      onChangeText={
        // Set this.state.email to the value in this Input box
        (value) => this.setState({ email: value })
      }
      placeholder="my@email.com"
    />
    <Input
      label="Password"
      leftIcon={{ type: 'font-awesome', name: 'lock' }}
      onChangeText={
        // Set this.state.email to the value in this Input box
        (value) => this.setState({ password: value })
      }
      placeholder="p@ssw0rd123"
      secureTextEntry
    />
    <Button
      title='Submit'
      onPress={ this.handleSignIn }
    />
  </View>
) }
         
         <Modal
          visible={this.state.modalVisible}
        >
          <View
            style={styles.container}
          >
            <Input
              label="Confirmation Code"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the value in this Input box
                (value) => this.setState({ confirmationCode: value })
              }
            />
            <Button
              title='Submit'
              onPress={ this.handleConfirmationCode }
            />
          </View>
        </Modal> */}