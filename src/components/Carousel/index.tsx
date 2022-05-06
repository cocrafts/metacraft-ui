import React, { FC, ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import Button from '../Button';

interface Props {
	children: ReactNode[];
}

export const Carousel: FC<Props> = ({ children }) => {
	const transformHorizontal = useSharedValue(0);

	const carouselAnimated = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: withSpring(-transformHorizontal.value) }],
		};
	});

	let containerWidth: number;

	const measureCarouselContainer = (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;
		containerWidth = width;
	};

	const slideOnPress = (value: number) => {
		if (value < 0 && transformHorizontal.value > 0) {
			transformHorizontal.value -= containerWidth;
		}

		if (value > 0 && transformHorizontal.value < children.length - 1) {
			transformHorizontal.value += containerWidth;
		}
	};

	return (
		<View style={styles.container}>
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
			<View style={[styles.prevButton, styles.button]}>
				<Button title={'Prev'} onPress={() => slideOnPress(-containerWidth)} />
			</View>
			<View style={[styles.nextButton, styles.button]}>
				<Button title={'Next'} onPress={() => slideOnPress(containerWidth)} />
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
