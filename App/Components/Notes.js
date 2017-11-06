import React, {Component} from 'react';
import api from '../Utils/api';
import Separator from './Helpers/Separator';
import Badge from './Badge';
import Web_View from './Helpers/WebView'

import {
	View,
	ListView,
	Text,
	TextInput,
	StyleSheet,
	TouchableHighlight,
	Alert,
	Linking
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
		this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		this.state = {
			dataSource: this.ds.cloneWithRows(this.props.notes),
			note: '',
			error: ''
		};
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
	
	openPage(url) {
		console.log(url)
		this.props.navigator.push({
			component: Web_View,
			title: 'Web View',
			passProps: {url}
		})
	}
	
	handleSendEmail() {
		const note = this.state.note;
		const url = 'mailto:'+this.props.email+'?subject=githubNote&body='+note
		
		if (note === '') {
			this.showAlert();
			return;
		}
		
		this.openPage(url)
		
		Linking.canOpenURL(url)
			.then((supported) => {
				if (!supported) {
					console.error('Can\'t handle url: ' + url);
				} else {
					return Linking.openURL(url)
						.then((data) => console.error("then", data))
						.catch((err) => { throw err; });
				}
			})
			.catch((err) => console.error('An error occurred', err));
		
		this.setState({
			note: ''
		})
	}
	handleSubmit() {
		console.log("email",this.props.email)
		const note = this.state.note;
		if (note === '') {
			this.showAlert();
			return;
		}
		this.setState({
			note: ''
		})
		api.addNote(this.props.userInfo.login, note)
			.then((data) => {
				api.getNotes(this.props.userInfo.login)
					.then((data) => {
						this.setState({
							dataSource: this.ds.cloneWithRows(data)
						})
					})
			}).catch((err) => {
			console.log("Request failed", err)
			this.setState({error})
		})
	}
	
	renderRow(rowData) {
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text> {rowData} </Text>
				</View>
				<Separator/>
			</View>
		)
	}
	
	footer() {
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
						onPress={this.handleSubmit.bind(this)}
						underlayColor="#88D4F5"
					>
						<Text style={styles.buttonText}> Submit </Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.emailButton}
						onPress={this.handleSendEmail.bind(this)}
						underlayColor="#88D4F5"
					>
						<Text style={styles.buttonText}> Send email </Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
	
	render() {
		return (
			<View style={styles.container}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderHeader={() => <Badge userInfo={this.props.userInfo}/> }
					enableEmpySections={false}/>
				{this.footer()}
			</View>
		)
	}
}
