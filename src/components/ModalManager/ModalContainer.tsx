import React, { FC, useEffect, useRef } from 'react';
import {
	LayoutChangeEvent,
	LayoutRectangle,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import {
	modalActions,
	ModalConfigs,
	rectangleAnimatedStyle,
	rectangleBind,
} from '../../utils/store/modal';

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
	const { component: InnerComponent, bindingRectangle, withoutMask } = item;
	const layout = useRef<LayoutRectangle>();
	const top = useSharedValue(0);
	const left = useSharedValue(0);
	const opacity = useSharedValue(0);
	const pointerEvents = item.hide || withoutMask ? 'none' : 'auto';

	const maskStyle = useAnimatedStyle(() => ({
		opacity: interpolate(opacity.value, [0, 1], [0, 0.3], Extrapolate.CLAMP),
	}));

	const wrapperStyle = useAnimatedStyle(() => {
		return rectangleAnimatedStyle(opacity, item.animateDirection, {
			position: 'absolute',
			overflow: 'hidden',
			top: top.value,
			left: left.value,
			opacity: opacity.value,
		});
	}, []);

	useEffect(() => {
		opacity.value = withSpring(item.hide ? 0 : 1);
	}, [item.hide]);

	useEffect(() => {
		if (!layout.current) return;
		onInnerLayout({ nativeEvent: { layout: layout.current } } as never);
	}, [bindingRectangle]);

	const onInnerLayout = async ({ nativeEvent }: LayoutChangeEvent) => {
		const calculatedRectangle = await rectangleBind(
			bindingRectangle as never,
			nativeEvent.layout,
			item.bindingDirection,
		);

		layout.current = nativeEvent.layout;
		top.value = calculatedRectangle.y;
		left.value = calculatedRectangle.x;
	};

	const closeModal = () => {
		modalActions.hide(item.id as string);
	};

	return (
		<View pointerEvents={pointerEvents} style={styles.container}>
			{!withoutMask && (
				<TouchableWithoutFeedback onPress={closeModal}>
					<Animated.View style={[styles.mask, maskStyle]} />
				</TouchableWithoutFeedback>
			)}
			<Animated.View onLayout={onInnerLayout} style={wrapperStyle}>
				<InnerComponent />
			</Animated.View>
		</View>
	);
};

export default ModalContainer;
