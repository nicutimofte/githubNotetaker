import React, { Component } from 'react';
import Dashboard from './Dashboard'
const api = require('../../Utils/api');

const {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} = require('react-native');


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

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: 'timoftealexandru',
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
	  api.getBio(this.state.userName)
		  .then((res) => {
	  	  if (res.message === 'Not Found') {
	  	  	console.log("err",res)
	  	  	this.setState({
	  	  		error: 'User Not Found',
				    isLoading: false
			    })
		    } else {
	  	  	console.log('res:' , res)
          this.props.navigator.push({
            title: res.name || 'Select an Option',
			      component: Dashboard,
	          passProps: {userInfo: res}
		      });
          this.setState({
          	isLoading: false,
	          error: false,
	          userName: ''
          })
		    }
		  });
  }
  
  render(){
  	const showError = (
  		this.state.error ? <Text> {this.state.error} </Text> : <View></View>
	  )
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
	      <ActivityIndicator
		      animating={this.state.isLoading}
		      color="#111"
		      size="large">
	      </ActivityIndicator>
	      {showError}
      </View>
    )
  }
}

module.exports = Main;