import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import Button from 'components/Button';

export const BackToHome: FC = () => {
	const linkTo = useLinkTo();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Welcome to Animation screen!</Text>
			<Text style={styles.text}>Slide to the right and enjoy the show</Text>
			<Button
				style={styles.button}
				title={'Go back Home'}
				onPress={() => linkTo('/home')}
			/>
		</View>
	);
};

export default BackToHome;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		textAlign: 'center',
		color: '#000',
	},
	button: {
		margin: 10,
	},
});
