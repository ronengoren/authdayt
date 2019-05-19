import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import Nav from './nav/Nav'
import Tabs from './auth/Tabs'


class App extends React.Component {
    state = {
    user: {},
    isLoading: true
  }
  
  render() {
          return (
      <Nav/>
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
  }
})


export default App;