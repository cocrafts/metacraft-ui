import React, { FC, ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import {
<<<<<<< HEAD
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
=======
	GestureHandlerRootView,
	PanGestureHandler,
>>>>>>> 98a5a4e745346bd042a9319aead9b300d16e336f
} from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import Button from '../Button';

interface Props {
	children: ReactNode[];
}

type AnimatedContext = {
	startPosition: number;
};

export const Carousel: FC<Props> = ({ children }) => {
	const transformHorizontal = useSharedValue(0);
	const containerWidth = useSharedValue(0);
<<<<<<< HEAD
	const childrenLength = useSharedValue(children.length);
=======
>>>>>>> 98a5a4e745346bd042a9319aead9b300d16e336f

	const carouselAnimated = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: withSpring(-transformHorizontal.value) }],
		};
	});

	const measureCarouselContainer = (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;
		containerWidth.value = width;
	};

	const slideOnPress = (value: number) => {
		if (value < 0 && transformHorizontal.value > 0) {
			transformHorizontal.value -= containerWidth.value;
		}

		if (
			value > 0 &&
<<<<<<< HEAD
			transformHorizontal.value < (childrenLength.value - 1) * value
=======
			transformHorizontal.value < (children.length - 1) * value
>>>>>>> 98a5a4e745346bd042a9319aead9b300d16e336f
		) {
			transformHorizontal.value += containerWidth.value;
		}
	};

<<<<<<< HEAD
	const gestureHandler = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		AnimatedContext
	>({
		onStart: (_, ctx) => {
=======
	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx: AnimatedContext) => {
>>>>>>> 98a5a4e745346bd042a9319aead9b300d16e336f
			ctx.startPosition = transformHorizontal.value;
		},
		onActive: (event, ctx) => {
			transformHorizontal.value = ctx.startPosition - event.translationX;
		},
		onEnd: (_, ctx) => {
			const changeWidth = transformHorizontal.value - ctx.startPosition;
			const percentWidthChange = 25;

<<<<<<< HEAD
			// Stop swiping to the left at the first slide
			if (transformHorizontal.value < 0) {
				transformHorizontal.value = 0;
			}
			// Stop swiping to the right at the last slide
			else if (
				transformHorizontal.value >
				(childrenLength.value - 1) * containerWidth.value
			) {
				transformHorizontal.value =
					(childrenLength.value - 1) * containerWidth.value;
			}
			// Handle change slide if swipe more than 25% width of container, change back to current slide if less than 25%
			else {
=======
			if (transformHorizontal.value < 0) {
				transformHorizontal.value = 0;
			} else if (
				transformHorizontal.value >
				(children.length - 1) * containerWidth.value
			) {
				transformHorizontal.value =
					(children.length - 1) * containerWidth.value;
			} else {
>>>>>>> 98a5a4e745346bd042a9319aead9b300d16e336f
				if (
					changeWidth > 0 &&
					(changeWidth / containerWidth.value) * 100 > percentWidthChange
				) {
					ctx.startPosition += containerWidth.value;
				} else if (
					changeWidth < 0 &&
					Math.abs((changeWidth / containerWidth.value) * 100) >
						percentWidthChange
				) {
					ctx.startPosition -= containerWidth.value;
				}
				transformHorizontal.value = ctx.startPosition;
			}
		},
	});

	return (
		<View style={styles.container}>
			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View
					style={[styles.carouselContainer, carouselAnimated]}
					// Measure carousel container width when View resize
					onLayout={measureCarouselContainer}
				>
					{children.map((child, index) => (
						<View style={styles.slideContainer} key={index}>
							{child}
						</View>
					))}
				</Animated.View>
			</PanGestureHandler>

			<View style={[styles.prevButton, styles.button]}>
				<Button
					title={'Prev'}
					onPress={() => slideOnPress(-containerWidth.value)}
				/>
			</View>
			<View style={[styles.nextButton, styles.button]}>
				<Button
					title={'Next'}
					onPress={() => slideOnPress(containerWidth.value)}
				/>
			</View>
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	carouselContainer: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	slideContainer: {
		width: '100%',
		height: '100%',
	},
	button: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		justifyContent: 'center',
	},
	prevButton: {
		left: 10,
	},
	nextButton: {
		right: 10,
	},
});
