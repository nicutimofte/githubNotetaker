import React , { Component } from 'react';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';
import api from '../Utils/api';
import Charts from './Charts'
import firebase from 'firebase'

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
		this.state={
			isAdmin:null
		}
	}
	
	componentDidMount() {
		const slug = this.props.email.split('@')[0]
    firebase.database().ref(`users/${slug}`).once('value').then(user => {
    	console.log("user",user.val())
			this.setState({isAdmin: user.val().isAdmin})
		})
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
		this.props.navigator.push({
			title: 'Profile Page',
			component: Profile,
			passProps: {userInfo: this.props.userInfo}
		});
	}
	
	goToRepos() {
		api.getRepos(this.props.userInfo.login)
			.then((res) => {
				console.log('this',this.state.isAdmin)
				if (this.state.isAdmin===1) {
          this.props.navigator.push({
            title: 'Repositories',
            component: Repositories,
            passProps: {
              userInfo: this.props.userInfo,
              repos: res
            }
          });
				} else {
          this.props.navigator.push({
            title: 'Charts',
            component: Charts,
            passProps: {
              userInfo: this.props.userInfo,
              repos: res
            }
          });
				}
			})
	}
	
	goToNotes() {
		api.getNotes(this.props.userInfo.login)
			.then((res) => {
				res = res || {}
				this.props.navigator.push({
					title: 'Notes',
					component: Notes,
					passProps: {
						userInfo: this.props.userInfo,
						notes: res,
						email:this.props.email
					}
				});
			})
	}
	
	render() {
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