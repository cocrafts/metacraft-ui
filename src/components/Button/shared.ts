import { ViewStyle } from 'react-native';
import {
	AnimatedStyleProp,
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

export type HoveredStyleFunc = (
	isHovered: SharedValue<boolean>,
) => AnimatedStyleProp<ViewStyle>;

export const useDefaultHoveredStyle: HoveredStyleFunc = (isHovered) =>
	useAnimatedStyle(() => ({
		backgroundColor: withTiming(
			isHovered.value ? 'rgb(112,185,232)' : 'rgb(82,156,222)',
			{ duration: 120 },
		),
	}));
