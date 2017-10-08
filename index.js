/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Main from './App/Components/Main';
import {
	AppRegistry,
	Platform,
	StyleSheet,
	Text,
	View,
	NavigatorIOS,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111',
	}
});
 
class githubNoteTaker extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<NavigatorIOS
				style={styles.container}
				initialRoute={{
					title: 'Github Notetaker',
					component: Main
				}}
			/>
		);
	}
}

AppRegistry.registerComponent('githubNoteTaker', () => githubNoteTaker);


