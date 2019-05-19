import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import Home from './Home'

const routeConfig = {
  Home: { screen: Home },
}
const StackNav = createStackNavigator(routeConfig)


class Nav extends React.Component {
  render() {
    return (
      <StackNav />
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

export default createAppContainer(StackNav)
