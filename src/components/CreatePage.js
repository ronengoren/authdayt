import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { 
  View, 
  TextInput, 
  Button, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableHighlight 
} from 'react-native'

const createPostMutation = gql`
  mutation ($text: String!, $userId: ID!){
    createPost(text: $text, userId: $userId) {
      id
      text
      createdAt
    }
  }
`

class CreatePage extends React.Component {

  state = {
    text: '',
  }

  render () {

    return (
      <View style={styles.container}>

        <View style={styles.addImageContainer}>
         
        </View>
     
        <TextInput
          style={styles.descriptionInput}
          placeholder='Type a text...'
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />

        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.cancelButton}
            onPress={() => this.props.onComplete()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.saveButton}
            onPress={() => this._createPost()}
          >
            <Text style={styles.saveButtonText}>Create Post</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }

   _createPost = async () => {
     const {text} = this.state
     await this.props.createPostMutation({
       variables: {text}
     })
     this.props.onComplete()
   }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  addImageContainer: {
    backgroundColor: 'rgba(0,0,0,.03)',
  },
  addImage: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  photoPlaceholderContainer: {
    alignItems: 'center',
    height: 80,
  },
  photoPlaceholder: {
    backgroundColor: 'rgba(42,126,211,.1)',
    height: 80,
    width: 80,
  },
  imageUrlInput: {
    color: 'rgba(42,126,211,1)',
    height: 60,
  },
  descriptionInput: {
    paddingHorizontal: 20,
    height: 100,
    fontSize: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,174,96,1)',
    height: 45,
    borderRadius: 2,
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  cancelButtonText: {
    color: 'rgba(0,0,0,.5)',
  },
})

export default graphql(createPostMutation, {name: 'createPostMutation'})(CreatePage)