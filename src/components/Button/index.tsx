import { FC } from 'react';
import {
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	ViewStyle,
} from 'react-native';

interface Props {
	style?: ViewStyle;
	title?: string;
	titleStyle?: TextStyle;
	onPress?: () => void;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#3397fc',
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 18,
	},
	title: {
		color: '#FFFFFF',
	},
});

export const MetacraftButton: FC<Props> = ({
	style,
	title = 'Button Title',
	titleStyle,
	onPress,
}) => {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text style={[styles.title, titleStyle]}>{title}</Text>
		</TouchableOpacity>
	);
};

export default MetacraftButton;
