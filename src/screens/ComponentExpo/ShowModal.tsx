import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ShowModal: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>ShowModal</Text>
		</View>
	);
};

export default ShowModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#000000',
	},
});
