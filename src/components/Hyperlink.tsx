import React, { FC, ReactNode } from 'react';
import {
	Linking,
	Platform,
	StyleProp,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import Animated, {
	SharedValue,
	useAnimatedStyle,
	withSpring,
} from 'react-native-reanimated';
import { useSnapshot } from 'valtio';

import { ThemeState, themeState } from '../utils/state/theme';

import Hoverable from './Hoverable';
import Text from './Text';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
	style?: StyleProp<ViewStyle>;
	children?: ReactNode;
	title?: string;
	titleStyle?: StyleProp<TextStyle>;
	href?: string;
	target?: string;
	onPress?: (href?: string) => void;
}

export const Hyperlink: FC<Props> = ({
	style,
	children,
	title,
	titleStyle,
	href,
	target = '_blank',
	onPress,
}) => {
	const { colors } = useSnapshot<ThemeState>(themeState);
	const linkStyle = [{ color: colors.link }, titleStyle];
	const useBrowserHref = !!href && Platform.OS === 'web';

	const useHoveredStyle = (isHovered: SharedValue<boolean>) => {
		return useAnimatedStyle(() => {
			return {
				opacity: withSpring(isHovered.value ? 0.5 : 1),
			};
		}, []);
	};

	const onLinkPress = async () => {
		onPress?.(href);
		if (!useBrowserHref) await Linking.openURL(href as string);
	};

	const innerElement = children || <Text style={linkStyle}>{title}</Text>;

	return (
		<Hoverable style={style} animatedStyle={useHoveredStyle}>
			<AnimatedTouchable onPress={onLinkPress}>
				{useBrowserHref ? (
					<a href={href} target={target}>
						{innerElement}
					</a>
				) : (
					innerElement
				)}
			</AnimatedTouchable>
		</Hoverable>
	);
};

export default Hyperlink;
