import React , {Component} from 'react';
import Badge from './Badge';
import Separator from './Helpers/Separator';
import {
	StyleSheet,
	View,
	ScrollView,
	TextTouchableHighlight,
} from 'react-native';

const styles = Stylesheet.create({
	container:{
		flex: 1,
	},
	rowContainer:{
		flexDirection: 1,
		flex: 1,
		padding: 10
	},
	name: {
		color: '#48BBEC',
		fontSize: 18,
		paddingBottom: 5,
	},
	stars:{
		color: '#48BBEC',
		fontSize: 14,
		paddingBottom: 5
	},
	description: {
		fontSize: 14,
		paddingBottom: 5
	}
})

class Repositories extends Component {
	openPage(url) {
		console.log(url)
	}
	render() {
		const repos = this.props.repos;
		const list = repos.map( (item, index) => {
			const desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text>:<View/>;
			return(
				<View key={index}>
					<View style={style.rowContainer}>
						<TouchableHighlight
							onPress={this.openPage.bind(this, repos[index].html_url)}
							underlayColor='transparent'>
							<Text style={styles.text}>{repos[index].name}</Text>
						</TouchableHighlight>
						<Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
					</View>
					<Separator/>
				</View>
			)
		})
		return(
			<ScrollView style={styles.container} >
				<Badge userInfo={this.props.userInfo}/>
			</ScrollView>
		)
	}
}

module.exports = Repositories;