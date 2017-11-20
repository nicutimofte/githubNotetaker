import React, {Component} from 'react';
import api from '../Utils/api';
import Row from './Row'
import Badge from './Badge';
import Web_View from './Helpers/WebView'
import { ConnectivityRenderer } from 'react-native-offline';

import {
  View,
  ListView,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  AsyncStorage
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
  emailButton: {
    height: 60,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#758BF4'
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
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default class Notes extends Component {
  constructor(props) {
    super(props)
    const notes = this.mapNotes(props.notes)
    console.log("notess",notes,props)
    
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      username:'timoftealexandru',
      dataSource: this.ds.cloneWithRows(notes),
      noteText: '',
      note: '',
      error: '',
      localNote: null,
      editingNote: null
    };
  }
  
  // async componentDidMount () {
  //   const { username } = this.state
  //   try{
  //     const value = await AsyncStorage.getItem(username)
  //     await AsyncStorage.removeItem(username, () => { console.log("success")})
  //     console.log("value", value)
  //     this.setState({localNote: value})
  //   } catch (err) {
  //     console.log("error:", err)
  //   }
  // }
  
  mapNotes = (notes) => {
    return notes
      ?Object.keys(notes).map(key =>{
        return {
          text: notes[key],
          id: key
        }
      })
      :null
  }
  
  handleChange(event) {
    this.setState({
      note: event.nativeEvent.text
    });
  }
  
  showAlert() {
    Alert.alert(
      'Note cannot be empty!',
      'Please type something',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
  
  async componentDidMount () {
    const { username } = this.state
    try {
      const value = await AsyncStorage.getItem(`username=${username}`)
      console.log("from local storage.. ", value)
      if ( value !== null ) {
        let ds = this.state.dataSource._dataBlob.s1.slice()
        ds.push({text: value, id: this.guidGenerator()})
        this.setState({dataSource: this.state.dataSource.cloneWithRows(ds)})
      }
    } catch (err) {
      console.log("error:", err)
    }
  }
  
  handleSubmit = async () => {
    const { note, username } = this.state
    if (note === '') {
      this.showAlert();
      return;
    }
    this.setState({
      note: ''
    })
    console.log("submit", this.state.username,note)
    try {
      //set added note to localstorage
      await AsyncStorage.setItem(`username=${username}`, note)
      const value = await AsyncStorage.getItem(`username=${username}`)
      console.log("value", value)
      let ds = this.state.dataSource._dataBlob.s1.slice()
      ds.push({text: value, id: this.guidGenerator()})
      this.setState({dataSource: this.state.dataSource.cloneWithRows(ds)})
    } catch (err) {
      console.log("error:", err)
    }
  }
  
  guidGenerator = () => {
    const S4 = () => {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()).toUpperCase()
  }
  
  handleEdit = (text,id) => {
    api.editNote(this.state.username, text, id)
      .then((data) => {
        api.getNotes(this.state.username)
          .then((data) => {
            console.log("edited",data)
            this.setState({
              dataSource: this.ds.cloneWithRows(this.mapNotes(data))
            })
          })
      }).catch((err) => {
      console.log("Request failed", err)
      this.setState({error})
    })
  }
  
  handleDelete = (id) => {
    api.deleteNote(this.state.username, id)
      .then((data) => {
        api.getNotes(this.state.username)
          .then((data) => {
            console.log("after delete",data)
            this.setState({
              dataSource: this.ds.cloneWithRows(this.mapNotes(data))
            })
          })
      }).catch((err) => {
      console.log("Request failed", err)
      this.setState({error})
    })
  }
  
  footer = () => {
    return (
      <View>
        <View style={styles.footerContainer}>
          <TextInput
            style={styles.searchInput}
            value={this.state.note}
            onChange={this.handleChange.bind(this)}
            placeholder="New Note"
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit}
            underlayColor="#88D4F5"
          >
            <Text style={styles.buttonText}> Submit </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
  
  renderRow = (note) => {
    return (
      <Row note={note} onDelete={this.handleDelete} onEdit={this.handleEdit}/>
    )
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderHeader={() => <TextInput
            style={styles.searchInput}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})}
            placeholder="Username"/> }
          enableEmpySections={false}/>
        {this.footer()}
      </View>
    )
  }
}
