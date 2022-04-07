import React, { FC, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { modalActions, ModalConfigs } from '../../utils/store/modal';

interface Props {
	item: ModalConfigs;
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mask: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'black',
	},
});

export const ModalContainer: FC<Props> = ({ item }) => {
	const InnerComponent = item.component;
	const opacity = useSharedValue(0);
	const pointerEvents = item.hide ? 'none' : 'auto';

	const maskStyle = useAnimatedStyle(() => ({
		opacity: interpolate(opacity.value, [0, 1], [0, 0.3], Extrapolate.CLAMP),
	}));
	const wrapperStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: interpolate(opacity.value, [0, 1], [20, 0]) }],
	}));

	useEffect(() => {
		opacity.value = withSpring(item.hide ? 0 : 1);
	}, [item.hide]);

	const closeModal = () => {
		modalActions.hide(item.id as string);
	};

	return (
		<Animated.View pointerEvents={pointerEvents} style={styles.container}>
			<TouchableWithoutFeedback onPress={closeModal}>
				<Animated.View style={[styles.mask, maskStyle]} />
			</TouchableWithoutFeedback>
			<Animated.View style={wrapperStyle}>
				<InnerComponent />
			</Animated.View>
		</Animated.View>
	);
};

export default ModalContainer;
