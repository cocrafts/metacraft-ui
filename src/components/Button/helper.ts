import { ViewStyle } from 'react-native';
import {
	AnimatedStyleProp,
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { darken, getLuminance, lighten, transparentize } from 'color2k';

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

interface HoverColors {
	background: [string, string];
	border: [string, string];
}

export const getHoverColors = (
	background: string,
	border: string,
	outline?: boolean,
): HoverColors => {
	const isUltraDark = getLuminance(background) < 0.2;

	if (outline) {
		return {
			background: [transparentize(background, 0.99), background],
			border: [border, 'transparent'],
		};
	}

	return {
		background: [
			background,
			isUltraDark ? lighten(background, 0.2) : darken(background, 0.2),
		],
		border: ['transparent', 'transparent'],
	};
};
