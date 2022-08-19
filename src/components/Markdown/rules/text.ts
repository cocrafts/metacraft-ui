import { createElement } from 'react';
import { Text, TextStyle } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

export const text: ParserRule & ReactOutputRule = {
	...defaultRules.text,
	react: (node, output, state) => {
		const { key, color, fontSize, fontWeight } = state;
		const style: TextStyle = {
			fontFamily: 'Poppins',
			fontSize: fontSize || 15,
			fontWeight: fontWeight || '400',
			color: color || '#383838',
		};

		return createElement(Text, { key, style }, node.content);
	},
};

export default text;
