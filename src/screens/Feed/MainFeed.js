import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from 'react-native';



class MainFeed extends React.Component {

  render() {
    return (
      <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>
          <View style={styles.tempNav}>
            <Text>Feed</Text>
          </View>
          <View style={styles.userBar}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
          <Image 
          style={styles.userPic}
          source={{
            uri: "https://lh3.googleusercontent.com/5iI7gI1MVawamRBI3g4eLZDFoiFpyUt5xuliYraZJDzoL_tCPUoqOaMav6jSLuWYMWi6ScScP7OGdBzMEzTpFaqxGw"}}
            />
            <Text style={{ marginLeft: 10}}>Ari</Text>

          </View>
          <View/>
          </View>

          <Image 
          style={{ width: 100 + "%", height: 100}}
          source={{
            uri: "https://lh3.googleusercontent.com/w3C1x1m-C4q5nxMEtLDgPFEfntbAEHVhW5aqXUvzpYxNYrzYXcvJIX5lv-GT7FEWDw6gDgxly8OSscm5-9Q9AxXN0-8"}}
            />
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
  userBar: {
    width: 100 + "%",
    height: 50,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: 'row',
    marginHorizontal: 10,

  },
  userPic: {
    height: 40,
    width: 40, 
    borderRadius: 20,
  },
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
  }
})




export default MainFeed;
