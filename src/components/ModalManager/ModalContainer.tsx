import React, { FC, useEffect, useRef } from 'react';
import {
	LayoutChangeEvent,
	LayoutRectangle,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	ViewStyle,
} from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import {
	measureRelative,
	modalActions,
	ModalConfigs,
	modalState,
	rectangleAnimatedStyle,
	rectangleBind,
	referenceMap,
} from '../../utils/state/modal';

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
	const {
		component: InnerComponent,
		bindingRectangle,
		positionOffset,
		maskStyle,
		maskActiveOpacity = 0.5,
		withoutMask,
		fullWidth = true,
		fullHeight = false,
		onMaskTouchToClose = true,
		onClose,
	} = item;

	const layout = useRef<LayoutRectangle>();
	const top = useSharedValue(0);
	const left = useSharedValue(0);
	const height = useSharedValue(1);
	const width = useSharedValue(0);
	const opacity = useSharedValue(0);
	const pointerEvents = item.hide || withoutMask ? 'none' : 'auto';

	const maskAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				opacity.value,
				[0, 1],
				[0, maskActiveOpacity],
				Extrapolate.CLAMP,
			),
		};
	}, [opacity, maskActiveOpacity]);

	const wrapperStyle = useAnimatedStyle(() => {
		const baseStyle: ViewStyle = {
			position: 'absolute',
			top: top.value,
			left: left.value,
			opacity: opacity.value,
		};

		if (fullWidth) baseStyle.width = width.value;

		if (fullHeight) {
			baseStyle.height = height.value;
			baseStyle.bottom = 0;

			if (positionOffset?.y && positionOffset.y > 0) {
				baseStyle.height -= positionOffset.y;
				baseStyle.top = positionOffset.y;
			}
		}

		return rectangleAnimatedStyle(opacity, item.animateDirection, baseStyle);
	}, [opacity, top, left]);

	useEffect(() => {
		if (item.hide) {
			if (item.hideWithAnimation) {
				modalActions.destroy(item.id);
			} else {
				opacity.value = withSpring(0, {}, (finished) => {
					if (finished) {
						modalActions.destroy(item.id);
					}
				});
			}
		} else {
			opacity.value = withSpring(1);
		}
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
			positionOffset,
		);

		layout.current = nativeEvent.layout;
		top.value = calculatedRectangle.y;
		left.value = calculatedRectangle.x;
		width.value = calculatedRectangle.width;
		height.value = calculatedRectangle.height;
	};

	useEffect(() => {
		if (Platform.OS !== 'web') return;
		const actualBindingRef =
			referenceMap[item.id || 'default-modal'] || referenceMap.root;
		if (!actualBindingRef.current) return;

		const bindingObserver = new ResizeObserver(async () => {
			const safeId = item.id || 'default-modal';
			const updatedBindingRectangle = await measureRelative(
				referenceMap[safeId],
			);
			modalState.hashmap[safeId] = {
				...item,
				bindingRectangle: updatedBindingRectangle,
			};
		});
		bindingObserver.observe(actualBindingRef.current as never);

		return () => bindingObserver.disconnect();
	}, []);

	const closeModal = () => {
		if (!onMaskTouchToClose) return;
		modalActions.hide(item.id as string);
		onClose?.();
	};

	return (
		<View pointerEvents={pointerEvents} style={styles.container}>
			{!withoutMask && (
				<TouchableWithoutFeedback onPress={closeModal}>
					<Animated.View style={[styles.mask, maskAnimatedStyle, maskStyle]} />
				</TouchableWithoutFeedback>
			)}
			<Animated.View onLayout={onInnerLayout} style={wrapperStyle}>
				<InnerComponent config={item} />
			</Animated.View>
		</View>
	);
};

export default ModalContainer;
