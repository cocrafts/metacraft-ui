import React, { FC, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import Button from 'components/Button';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
} from 'utils/store/modal';

import Popup from './Popup';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		marginTop: 20,
	},
});

export const HomeScreen: FC = () => {
	const containerRef = useRef<View>(null);
	const showPopup = () => {
		modalActions.show({
			id: 'Cloud Le',
			component: Popup,
			bindingDirection: BindDirections.Top,
			animateDirection: AnimateDirections.TopRight,
			bindingRef: containerRef,
		});
	};
	const linkTo = useLinkTo();

	return (
		<View style={styles.container}>
			<View ref={containerRef} style={{ width: 20 }}>
				<Text>W</Text>
			</View>
			<Text>
				Still too early to have something to show.. but this going to be fun!
			</Text>
			<Button style={styles.buttonContainer} onPress={showPopup} />
			<Button
				title={'Go to Animation screen'}
				style={styles.buttonContainer}
				onPress={() => linkTo('/animation')}
			/>
		</View>
	);
};

export default HomeScreen;
