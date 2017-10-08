import React, { Component } from 'react-native';
let {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;


const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: '#48BBEC',
	},
	title:{
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff'
	},
	searchInput:{
		height: 58,
		padding: 4,
		marginRight: 5,
		fontSize: 23,
		borderColor: 'white',
		borderRadius: 8,
		color: 'white'
	},
	buttonText: {
		fontSize: 18,
		color: '#111',
		alignSelf: 'center'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	}
});

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: 'Nicu',
      isLoading: false,
      error: false
    }
  }
  
  handleChange(event) {
  	this.setState({
  		userName: event.nativeEvent.text
	  });
  }
  
  handleSubmit(event) {
  	//update our indicatorIOS spinner
	  this.setState({
	  	isLoading: true
	  })
	  console.log("SUBMIT:",this.state.userName)
	  // fetch data from github
	  //
  }
  
  render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Github user</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.userName}
          onChange={this.handleChange.bind(this)} />
	      <TouchableHighlight
	        style={styles.button}
	        onPress={this.handleSubmit.bind(this)}
	        underlayColor="white">
		      <Text style={styles.buttonText}>SEARCH</Text>
	      </TouchableHighlight>
      </View>
    )
  }
}

module.exports = Main;