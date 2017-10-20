import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './styles.js';
const TextFieldInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
	const { inputStyle, labelStyle, containerStyle } = styles;
	return (
		<View style={containerStyle}>
			<Text>{label}</Text>
			<TextInput
				autoCorrect={false}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				value={value}
				onChangeText={onChangeText}
				style={inputStyle}
				underlineColorAndroid={'transparent'}
			/>
		</View>
	);
};
export default TextFieldInput;