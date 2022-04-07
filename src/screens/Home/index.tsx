import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/Button';
import { modalActions } from 'utils/store/modal';

import Popup from './Popup';

const styles = StyleSheet.create({
	buttonContainer: {
		marginTop: 20,
	},
});

export const HomeScreen: FC = () => {
	const showPopup = () => {
		modalActions.show({
			id: 'Cloud Le',
			component: Popup,
		});
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Welcome to Metacraft UI</Text>
			<Text>
				Still too early to have something to show.. but this going to be fun!
			</Text>
			<Button style={styles.buttonContainer} onPress={showPopup} />
		</View>
	);
};

export default HomeScreen;
