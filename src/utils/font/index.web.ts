import { StyleSheet, TextStyle } from 'react-native';

export const injectedFontStyle = (
	style: TextStyle = {},
	defaultStyle: TextStyle = {},
): TextStyle[] => {
	const { fontFamily = 'Poppins' } = StyleSheet.flatten([style, defaultStyle]);

	return [defaultStyle, style, { fontFamily }];
};
