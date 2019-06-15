import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from './config/index';
import {PostFeed} from '../../components/container'

class MainFeed extends React.Component {
  render() {
   
    return (
      <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>
          <View style={styles.tempNav}>
            <Text>Feed</Text>
            </View>
            <PostFeed />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  tempNav: { 
    width: 100 + "%",
    height: 50, 
    marginTop: 20,
    backgroundColor: "rgb(250,250,250)",
    borderBottomColor: "rgb(233,33,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: 'center',
  },
 
});




export default MainFeed;
