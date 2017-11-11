import React, {Component} from 'react';
import Separator from './Helpers/Separator';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },

});

export default class Row extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      id: props.note.id,
      text: props.note.text,
      noteText: '',
      error: '',
      editingNote: null
    };
  }
  
  handleOnPress = (id,text) => {
    console.log("onpress",id,text)
    this.setState({ editingNote:id, noteText:text })
  }
  
  handleSave = () => {
    const text = this.state.noteText
    console.log("onsave")
    this.setState({ editingNote:null,text, noteText:''  })
  }
  
  render() {
    const { id, text } = this.state
    console.log("note",this.state.editingNote, this.state.noteText, text)
    return (
      <View>
        <View style={styles.rowContainer}>
          {this.state.editingNote !== null && this.state.editingNote === id
            ?	<View>
              <TextInput
              style={styles.searchInput}
              value={this.state.noteText}
              onChange={(noteText) => this.setState({noteText})}
            />
              <TouchableHighlight
                style={styles.button}
                onPress={this.handleSave}
                underlayColor="#88D4F5"
              >
                <Text style={styles.buttonText}> Save </Text>
              </TouchableHighlight>
            </View>
            :	<TouchableHighlight
              style={styles.button}
              onPress={()=>this.handleOnPress(id,text)}
              underlayColor="#88D4F5"
            >
              <Text style={styles.buttonText}> {text} </Text>
            </TouchableHighlight>
          }
        </View>
        <Separator/>
      </View>
    )
  }
}

