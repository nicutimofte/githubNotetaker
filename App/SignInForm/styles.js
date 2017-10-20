'use strict';
import React, {
	StyleSheet
} from 'react-native';
const styles = StyleSheet.create({
	errorTextStyle: {
		color: '#E64A19',
		alignSelf: 'center',
		paddingTop: 10,
		paddingBottom: 10
	},
	inputStyle: {
		paddingRight: 5,
		paddingLeft: 5,
		paddingBottom: 2,
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
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '100%',
		borderColor: 'gray',
		borderBottomWidth: 1,
	}
});
export default styles;