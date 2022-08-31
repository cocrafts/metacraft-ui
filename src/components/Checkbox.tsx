import React, { FC, useEffect } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { useSnapshot } from 'valtio';

import { ThemeState, themeState } from '../utils/state/theme';

interface Props {
	style?: ViewStyle;
	size?: number;
	selected?: boolean;
	onSelect?: (value: boolean) => void;
}

export const Checkbox: FC<Props> = ({
	style,
	size = 18,
	selected,
	onSelect,
}) => {
	const { colors } = useSnapshot<ThemeState>(themeState);
	const innerSize = size - 4;
	const progress = useSharedValue(selected ? 1 : 0);

	const innerStyle = useAnimatedStyle(() => ({
		width: innerSize,
		height: innerSize,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: interpolateColor(
			progress.value,
			[0, 1],
			[colors.alt, 'white'],
		),
		backgroundColor: interpolateColor(
			progress.value,
			[0, 1],
			['white', colors.primary],
		),
	}));

	useEffect(() => {
		progress.value = withTiming(selected ? 1 : 0, { duration: 250 });
	}, [selected]);

	return (
		<TouchableOpacity
			disabled={!onSelect}
			style={style}
			onPress={() => onSelect?.(!selected)}
		>
			<Animated.View style={innerStyle} />
		</TouchableOpacity>
	);
};

Checkbox.defaultProps = {
	size: 18,
};

export default Checkbox;
