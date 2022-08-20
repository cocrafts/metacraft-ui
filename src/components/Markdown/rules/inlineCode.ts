import React from 'react';
import { Text, TextStyle } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

import { MarkdownConfig } from '../internal';

export const inlineCode: ParserRule & ReactOutputRule = {
	...defaultRules.inlineCode,
	react: (node, output, state) => {
		const { color, config } = state;
		const { fontFamily, colors }: MarkdownConfig = config;

		const style: TextStyle = {
			fontFamily,
			fontWeight: '400',
			fontSize: 15,
			backgroundColor: colors.alt,
			borderRadius: 5,
			paddingHorizontal: 3,
			color: color || colors.text,
		};

		return React.createElement(Text, { key: state.key, style }, node.content);
	},
};

export default inlineCode;
