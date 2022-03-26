import { FC } from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Hoverable from 'components/Hoverable';

import { HoveredStyleFunc, useDefaultHoveredStyle } from './shared';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
	style?: StyleProp<ViewStyle>;
	useHoveredStyle?: HoveredStyleFunc;
	title?: string;
	titleStyle?: TextStyle;
	onPress?: () => void;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#3397fc',
		borderRadius: 5,
		paddingVertical: 12,
		paddingHorizontal: 18,
	},
	title: {
		color: '#FFFFFF',
	},
});

export const MetacraftButton: FC<Props> = ({
	style,
	useHoveredStyle = useDefaultHoveredStyle,
	title = 'Button Title',
	titleStyle,
	onPress,
}) => {
	return (
		<Hoverable
			style={[styles.container, style]}
			useHoveredStyle={useHoveredStyle}
		>
			<AnimatedTouchable onPress={onPress}>
				<Text style={[styles.title, titleStyle]}>{title}</Text>
			</AnimatedTouchable>
		</Hoverable>
	);
};

export default MetacraftButton;
