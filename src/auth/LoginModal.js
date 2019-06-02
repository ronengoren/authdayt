import React, { Component } from 'react';
import {
    View,
    Modal
} from 'react-native';
import Authentication from './Authentication';

export default class LoginModal extends React.Component {
    constructor(props) {
      super(props);
    }
     state = {
    modalVisible: false,
  }
  
    render() {
      return (
    <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => console.log("Modal has been closed.")}
        >
          <Authentication />
        </Modal>
    </View>

      );
    }
  }