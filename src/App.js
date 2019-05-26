import React, {Component} from 'react';
import AppNavigator from './nav/AppNavigator'
import friendReducer from './reducers/FriendReducer';
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
// Amplify
import aws_exports from '../aws-exports'
import Amplify from 'aws-amplify';
Amplify.configure(aws_exports);

const store = createStore(friendReducer)

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      possibleFriends: [
        'Allie',
        'Gator',
        'Lizzie',
      ],
      currentFriends: [],
    }
  }
  
  addFriend = (index) => {
    const {
      currentFriends,
      possibleFriends,
    } = this.state
  }

  render() {
      return (
        <Provider store={ store }>
        <AppNavigator
        />
      </Provider>
      )
  };
}



