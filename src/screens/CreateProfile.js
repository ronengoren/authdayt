import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TextInput, ScrollView, Keyboard } from 'react-native';



class CreateProfile extends React.Component {

  render() {
    return (
      <View style={styles.container}>
       <ScrollView>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.textInput}
      placeholder="Your name"
      maxLength={20}
      onBlur={Keyboard.dismiss}
    />
  </View>
</ScrollView>
      </View>
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
  }
})




export default CreateProfile;
