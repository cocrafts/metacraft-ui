import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {},
});

export const DropdownContainer: FC = () => {
	return (
		<View style={styles.container}>
			<Text>DropdownContainer</Text>
		</View>
	);
};

export default DropdownContainer;
