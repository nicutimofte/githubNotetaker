import React , { Component } from 'react';
import Profile from './Profile';

import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
	container:{
		marginTop: 65,
		flex: 1
	},
	image:{
		height: 350
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	}
})

export default class Dashboard extends Component {
	constructor(props){
		super(props);
	}
	
	makeBackground(btn) {
		const obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1,
		};
		if (btn === 0) {
			obj.backgroundColor = '#48BBEC';
		} else if (btn === 1 ) {
			obj.backgroundColor = '#E77AAE';
		} else {
			obj.backgroundColor = '#758BF4';
		}
		return obj;
	}
	
	goToProfile() {
		console.log("goint to profile")
		this.props.navigator.push({
			title: this.props.userInfo.name || 'Select an Option',
			component: Profile,
			passProps: {userInfo: this.props.userInfo}
		});
	}
	
	goToRepos() {
		console.log("goint to repos")
	}
	
	goToNotes() {
		console.log("going to notes")
	}
	
	render() {
		console.log("repos",this.props.userInfo)
		return (
			<View style={styles.container}>
				<Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
				<TouchableHighlight
					style={this.makeBackground(0)}
					onPress={this.goToProfile.bind(this)}
				  underlayColor="#88D4F5">
						<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}>View Repos</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor="#88D4F5">
					<Text style={styles.buttonText}>View Notes</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

// module.exports = Dashboard;