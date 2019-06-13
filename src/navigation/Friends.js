import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFriend } from '../actions';



class Friends extends React.Component {
  render() {
    return (
      <View style={styles.container}>
     <Text> Choose day </Text>
      {
        this.props.friends.possible.map((friend, index) => (
          <Button
            key={ friend }
            title={ `${ friend }` }
            onPress={() =>
              this.props.addFriend(index)
            }
          />
        )
      )
      }
      <Button
        title="Back to home"
        onPress={() =>
          this.props.navigation.navigate('Home')
        }
      />
    </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addFriend,
  }, dispatch)
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(Friends);