import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { modalActions, ModalConfigs } from '../../utils/store/modal';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
});

export const ModalContainer: FC<Props> = ({ item }) => {
	const opacity = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		backgroundColor: `rgba(0, 0, 0, ${opacity.value})`,
	}));

	useEffect(() => {
		opacity.value = withSpring(0.2);
	}, []);

	const closeModal = () => {
		opacity.value = withSpring(0, {}, () => {
			runOnJS(modalActions.hide)(item.id as string);
		});
	};

	return (
		<AnimatedTouchable
			style={[styles.container, animatedStyle]}
			activeOpacity={0.9}
			onPress={closeModal}
		>
			<Text>{item.id}</Text>
		</AnimatedTouchable>
	);
};

export default ModalContainer;
