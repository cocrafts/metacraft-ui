import React, { FC, ReactNode } from 'react';
import {
	StyleProp,
	StyleSheet,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { getLuminance } from 'color2k';
import { ThemeState, themeState } from 'utils/state/theme';
import { useSnapshot } from 'valtio';

import Hoverable from '../Hoverable';
import Text from '../Text';

import { getHoverColors } from './helper';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
	style?: StyleProp<ViewStyle>;
	outline?: boolean;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	onPress?: () => void;
	children?: ReactNode;
	prefix?: ReactNode;
	suffix?: ReactNode;
}

export const Button: FC<Props> = ({
	style,
	outline,
	title,
	titleStyle,
	onPress,
	children,
	prefix,
	suffix,
}) => {
	const { colors } = useSnapshot<ThemeState>(themeState);
	const containerStyle = [
		styles.container,
		{ backgroundColor: colors.primary },
		style,
	];
	const { backgroundColor, borderColor } = StyleSheet.flatten(containerStyle);
	const lightBg = getLuminance(backgroundColor as string) > 0.5;
	const hoverColors = getHoverColors(
		backgroundColor as string,
		borderColor as string,
		outline,
	);

	const useHoveredStyle = (isHovered: SharedValue<boolean>) => {
		return useAnimatedStyle(() => {
			const [bg, hoveredBg] = hoverColors.background;
			const [border, hoveredBorder] = hoverColors.border;

			return {
				backgroundColor: withSpring(isHovered.value ? hoveredBg : bg),
				borderColor: withSpring(isHovered.value ? hoveredBorder : border),
			};
		}, [backgroundColor]);
	};

	return (
		<Hoverable style={containerStyle} animatedStyle={useHoveredStyle}>
			<AnimatedTouchable onPress={onPress}>
				{prefix}
				{children || (
					<Text style={[styles.title, lightBg && styles.darkTitle, titleStyle]}>
						{title}
					</Text>
				)}
				{suffix}
			</AnimatedTouchable>
		</Hoverable>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 100,
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 225, 0.1)',
	},
	title: {
		flex: 1,
		color: '#FFFFFF',
		fontWeight: '400',
		textAlign: 'center',
		paddingVertical: 6,
		paddingHorizontal: 14,
	},
	darkTitle: {
		color: '#222222',
	},
});
