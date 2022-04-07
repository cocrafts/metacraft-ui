import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/Button';
import { modalActions } from 'utils/store/modal';

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 20,
	},
});

export const HomeScreen: FC = () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Welcome to Metacraft UI</Text>
			<Text>
				Still too early to have something to show.. but this going to be fun!
			</Text>
			<Button
				style={styles.buttonContainer}
				onPress={() => modalActions.show({ id: 'Cloud Le' })}
			/>
		</View>
	);
};

export default HomeScreen;
