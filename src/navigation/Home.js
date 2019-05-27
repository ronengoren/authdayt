import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { fonts, colors } from '../theme'

class Home extends React.Component {
  state = {
    username: '',
  }
  componentDidMount() {
    Auth.currentUserInfo()
      .then(data => {
        this.setState({
          username: data.username
        })
      })
      .catch(err => console.log('error: ', err))
  }

  handleSignOut = () => {
    Auth.signOut()
      .then(() => this.props.navigation.navigate('Authentication'))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Text style={styles.welcome}>Hi {this.state.username}!</Text>
          <Button
        title="Add some friends"
        onPress={() =>
          this.props.navigation.navigate('Friends')
        }
      />
      <Button
        title="Sign Out"
        onPress={this.handleSignOut}
      />
        </View>
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
    fontFamily: fonts.light,
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  registration: {
    fontFamily: fonts.base,
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};


export default connect(mapStateToProps)(Home);
