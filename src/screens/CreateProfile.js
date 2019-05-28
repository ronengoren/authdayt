import React from 'react';
import { StyleSheet, 
    Text,
    View,
    StatusBar,
    Image, 
    TextInput, 
    ScrollView, 
    Keyboard, 
    TouchableOpacity,
    FlatList } from 'react-native';
    import { Button, Icon } from 'react-native-elements'

import {loadSettings,
        saveSettings
      } from '../storage/settingsStorage';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations"
import { listTodos } from "../graphql/queries"
import { Auth } from 'aws-amplify';


      
class CreateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={Todo: [],
                    note: ""

        } 

        handleInputChange = event => this.setState({ note: event.target.value })
       
        addNote = async event => {
            const { note, Todo } = this.state
    
            event.preventDefault()
    
            const input = {
                note
            }
    
            const result = await API.graphql(graphqlOperation(createTodo, { input }))
    
            const newNote = result.data.createTodo
            const updateTodo = [newNote, ...Todo]
            this.setState({ Todo: updateTodo, note: "" })
        }
      
      
     
      
      }

      _keyExtractor = (item, index) => item.id;
      
      async componentDidMount() {
        const result = await API.graphql(graphqlOperation(listTodos))
        this.setState({ Todo: result.data.listTodos.items })
        
      
        
      }
      handleSignOut = () => {
        Auth.signOut()
          .then(() => this.props.navigation.navigate('Authentication'))
          .catch(err => console.log(err));
      }

   
  render() {
   

    return (
      <View style={styles.container}>
       <ScrollView>
  <View style={styles.inputContainer}>
  <TouchableOpacity>
  <TextInput
    style={styles.textInput}
    editable={true}
    placeholder="Please enter your text"
    onBlur={Keyboard.dismiss}
    onChangeText={this.handleInputChange}
    pointerEvents="none"
    value={this.note}
     />
     <Text
     style={styles.saveButton}
     onPress={()=>{this.addNote}}
     >hi</Text>

  </TouchableOpacity>
  
    {/* <TextInput
      style={styles.textInput}
      placeholder="Add your note"
      maxLength={20}
      onBlur={Keyboard.dismiss}
      onChangeText={this.handleInputChange}
      value={this.state.note}
    />
     <TouchableOpacity
    style={styles.saveButton}
    onPress={()=>{console.log('press')}}
  >
    <Text style={styles.saveButtonText}>Create Profile</Text>
  </TouchableOpacity> */}
  <View style={styles.container}>
        <FlatList 
          data={this.state.Todo}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <Text  key={item.id} style={styles.item}>{item.name}</Text>}
          
        />
      </View>
  </View>
  <Button
        title="Sign Out"
        onPress={this.handleSignOut}
      />
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
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
})




export default CreateProfile;

