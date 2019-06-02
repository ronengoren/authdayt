import React, {Component} from 'react';
import AppNavigator from './navigation/AppNavigator'
import friendReducer from './reducers/FriendReducer';
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
// Amplify
import aws_exports from '../aws-exports'
import Amplify, { Rehydrated} from 'aws-amplify';
import client from './client';
import Profile from '../src/screens/Profile';
// ApolloServer
import { ApolloProvider } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react-native';
import Auth0 from 'react-native-auth0';
import SignUpForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';

const auth0 = new Auth0({ domain: 'dayt.auth0.com', clientId: '36T4u5KGuKD8o2DI8HWDboFIpjshxrTT' });

Amplify.configure(aws_exports);

const store = createStore(friendReducer)

class App extends React.Component {
  constructor(props) {
    super(props);
  }
    static navigationOptions = {
      title: 'Home',
      headerLeft: false
    };
  render() {
      return (
        <ApolloProvider client={client} store={store}>
          <AppNavigator/>
    </ApolloProvider>
      )
  };
}

export default App;
