/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import SignInForm from './App/SignInForm'
import OfflineNotes from './App/Components/OfflineNotes'
import api from './App/Utils/api'
import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native'

Reactotron
  .configure({
    name: 'githubNoteTaker'
  })
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage())
  .use(networking())
  .connect()

import {
	AppRegistry,
	StyleSheet,
	NavigatorIOS,
	NetInfo
} from 'react-native';
import {
	FIREBASE_API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	MESSAGE_ID
} from 'react-native-dotenv';

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: MESSAGE_ID
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111',
	},
})

class githubNoteTaker extends Component {
	constructor (props) {
		super(props)
		this.state={
			isConnected: true
		}
	}
  
  componentDidMount() {
		api.syncLocalNotes()
			
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
    
    NetInfo.isConnected.fetch().then(
      (isConnected) => { this.setState({ isConnected }); }
    );
  }
  
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }
  
  handleConnectionChange = (isConnected) => {
    this.setState({ isConnected });
    console.log(`is connected: ${this.state.isConnected}`);
  }
  
  
  render() {
		console.log("connected",this.state.isConnected)
    console.disableYellowBox = true
		const { isConnected } = this.state
    const props={
      notes:{
        "-KykC5fWDE1aKNEQaDI4":"1"
      }
    }
    return (
			this.state.isConnected === true
				? <NavigatorIOS
					style={styles.container}
					initialRoute={{
						title: 'Offline notes',
						component: OfflineNotes,
						passProps:props
					}}/>
				: <NavigatorIOS
					style={styles.container}
					initialRoute={{
						title: 'Sign In',
						component: SignInForm
					}}/>
    	)
	}
}

AppRegistry.registerComponent('githubNoteTaker', () => githubNoteTaker);


