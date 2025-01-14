import { StyleProp, StyleSheet, TextStyle } from 'react-native';

export const injectedFontStyle = (
	style: StyleProp<TextStyle> = {},
	defaultStyle: StyleProp<TextStyle> = {},
): StyleProp<TextStyle> => {
	const { fontFamily = 'Poppins' } = StyleSheet.flatten([style, defaultStyle]);

	return [defaultStyle, style, { fontFamily }];
};
