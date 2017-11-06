/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import SignInForm from './App/SignInForm'
import {
	AppRegistry,
	Platform,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
} from 'react-native';
import {
	FIREBASE_API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	MESSAGE_ID
} from 'react-native-dotenv';
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111',
	},
})
class githubNoteTaker extends React.Component {
	constructor(props){
		super(props);
	}
	
	componentWillMount() {
		firebase.initializeApp({
			apiKey: FIREBASE_API_KEY,
			authDomain: AUTH_DOMAIN,
			databaseURL: DATABASE_URL,
			projectId: FIREBASE_PROJECT_ID,
			storageBucket: FIREBASE_STORAGE_BUCKET,
			messagingSenderId: MESSAGE_ID
		});
	}
	render() {
		console.disableYellowBox = true
		return (
			<NavigatorIOS
				style={styles.container}
				initialRoute={{
					title: 'Sign In',
					component: SignInForm
				}}
			/>
		);
	}
}

AppRegistry.registerComponent('githubNoteTaker', () => githubNoteTaker);


