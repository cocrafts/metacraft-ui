import React, { FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from 'components/Button';
import Text from 'components/Text';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
} from 'utils/state/modal';
import { themeState } from 'utils/state/theme';
import { useSnapshot } from 'valtio';

import Popup from './Popup';

export const HomeScreen: FC = () => {
	const containerRef = useRef<View>(null);
	const { colors } = useSnapshot(themeState);
	const containerStyle = { backgroundColor: colors.background };

	const showPopup = () => {
		modalActions.show({
			id: 'Cloud Le',
			component: Popup,
			bindingDirection: BindDirections.Inner,
			animateDirection: AnimateDirections.TopRight,
			bindingRef: containerRef,
			maskStyle: {
				backgroundColor: 'transparent',
			},
			positionOffset: {
				x: 0,
				y: 8,
			},
			context: { name: 'Cloud' },
		});
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<View ref={containerRef} style={{ width: 20 }}>
				<Text>W</Text>
			</View>
			<Text>
				Still too early to have something to show.. but this going to be fun!
			</Text>
			<Button
				outline
				style={styles.buttonContainer}
				onPress={showPopup}
				title="Show popup"
			/>
		</View>
	);
};

export default HomeScreen;

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
