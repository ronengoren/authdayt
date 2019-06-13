import React, {Component} from 'react';
import AppNavigator from './navigation/AppNavigator'
import friendReducer from './reducers/FriendReducer';
// redux
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
// Amplify
import aws_exports from '../aws-exports'
import Amplify, { Rehydrated} from 'aws-amplify';
import Profile from '../src/screens/Profile';
// ApolloServer
import { ApolloProvider } from 'react-apollo';
import { withAuthenticator } from 'aws-amplify-react-native';
import SignUpForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import { createStore, applyMiddleware } from 'redux';
import { setContext } from 'apollo-link-context';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cjwbj2hiy90l20162srbtmzib' });

const middlewareLink = setContext(() => ({
  headers: {
    authorization: localStorage.getItem('token') || null,
  }
}));

const link = middlewareLink.concat(httpLink);
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link
});

Amplify.configure(aws_exports);

const store = createStore(friendReducer)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
             <Profile/>
      </ApolloProvider>
    )
  }
}