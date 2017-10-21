'use strict';
import React, {
	StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111',
	},
	loginFormStyle: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		marginBottom:90,
		flexDirection: 'column',
		justifyContent: 'center',
		
	},
	errorTextStyle: {
		color: '#E64A19',
		alignSelf: 'center',
		paddingTop: 10,
		paddingBottom: 10
	},
	inputStyle: {
		color: 'black',
		fontSize: 18,
		fontWeight: '200',
		flex: 1,
		height: 100,
		width: 300,
		borderColor: 'gray',
		borderWidth: 1,
	},
	containerStyle: {
		height: 45,
		width: '100%',
		borderColor: 'gray',
	}
});
export default styles;