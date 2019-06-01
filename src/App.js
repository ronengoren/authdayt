import React, {Component} from 'react';
import AppNavigator from './navigation/AppNavigator'
import friendReducer from './reducers/FriendReducer';
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
// Amplify
import aws_exports from '../aws-exports'
import Amplify from 'aws-amplify';
import client from './client';

// ApolloServer
import { ApolloProvider } from 'react-apollo';

Amplify.configure(aws_exports);

const store = createStore(friendReducer)

export default class App extends React.Component {
  render() {
      return (
        <ApolloProvider client={client} store={store}>
          <AppNavigator />
    </ApolloProvider>
      )
  };
}
