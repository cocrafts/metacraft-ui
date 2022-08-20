import { createElement } from 'react';
import { Text, TextStyle } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

import { MarkdownState } from '../internal';

export const text: ParserRule & ReactOutputRule = {
	...defaultRules.text,
	react: (node, output, state) => {
		const { key, color, fontSize, fontWeight, config } = state as MarkdownState;
		const { fontFamily, colors } = config;

		const style: TextStyle = {
			fontFamily,
			fontSize: fontSize || 15,
			fontWeight: fontWeight || '400',
			color: color || colors.text,
		};

		return createElement(Text, { key, style }, node.content);
	},
};

export default text;
