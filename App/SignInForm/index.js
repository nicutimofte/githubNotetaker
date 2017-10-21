import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, NavigatorIOS, } from 'react-native'
import firebase from 'firebase'
import TextFieldInput from './TextFieldInput'
import Main from '../Components/Main';
import styles from './styles.js'

class SignInForm extends Component {
	state = { email: '', password: '', error: '', loading: false, authed: false };
	onSignInPress() {
		this.setState({ error: '', loading: true });
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => { this.setState({ error: '', loading: false, authed: true }); })
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(() => {
						this.setState({ error: '', loading: false, authed: true });
					})
					.catch(() => {
						this.setState({ error: 'Authentication failed.', loading: false, });
					});
			});
	}
	renderButtonOrLoading() {
		if (this.state.loading) {
			return <View><ActivityIndicator /></View>
		}
		return <Button onPress={this.onSignInPress.bind(this)} title="Log in" />;
	}
	
	
	render() {
		const renderNavigator = (
			<NavigatorIOS
				style={styles.container}
				initialRoute={{
					title: 'Github Notetaker',
					component: Main
				}}
			/>
		)
		
		const renderLogin = (
			<View style={styles.loginFormStyle}>
				<TextFieldInput
					label='Email Address'
					placeholder='youremailaddress@domain.com'
					value={this.state.email}
					onChangeText={email => this.setState({ email })}
					autoCorrect={false}/>
				<TextFieldInput
					label='Password'
					autoCorrect={false}
					placeholder='Your Password'
					secureTextEntry
					value={this.state.password}
					onChangeText={password => this.setState({ password })}
				/>
				<Text style={styles.errorTextStyle}>{this.state.error}</Text>
				{this.renderButtonOrLoading()}
			</View>
		)
		console.log("state",this.state.authed)
		return (
			<View>
				{
					this.state.authed ?
						renderNavigator
						:renderLogin
				}
			</View>
		);
	}
}
export default SignInForm;