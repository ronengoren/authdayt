import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { fonts, colors } from '../theme';
import LoginModal from '../auth/LoginModal';

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modalVisible: false };
      this.onAuth = this.onAuth.bind(this)
    }
  
    static navigationOptions = {
      title: 'Home',
      headerLeft: false
    };

    onAuth = (credentials, profile) => {
      this.setState({modalVisible: false}, () => 
      this.props.navigation.navigate('Profile', {credentials: credentials, profile: profile}) )
    };

    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          <Button
            onPress={() => this.setState({modalVisible: true})}
            title="Log In"
          />
          <LoginModal modalVisible={this.state.modalVisible} onAuth={this.onAuth}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });