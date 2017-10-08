const React = require('react');

import {
	View,
	Text,
	StyleSheet
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

class Dashboard extends React.Component {
	render() {
		console.log("repos",this.props.userInfo)
		return (
			<View style={styles.container}>
				<Text> This is a dashboard</Text>
				<Text> CDS </Text>
			</View>
		)
	}
}

module.exports = Dashboard