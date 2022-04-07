import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 18,
		borderRadius: 8,
		backgroundColor: '#FFFFFF',
		width: 250,
		height: 180,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export const Popup: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Popup</Text>
		</View>
	);
};

export default Popup;
