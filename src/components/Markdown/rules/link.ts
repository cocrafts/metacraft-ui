import React from 'react';
import { Linking } from 'react-native';
import { defaultRules, ParserRule, ReactOutputRule } from 'simple-markdown';

import Hyperlink from '../../Hyperlink';
import { MarkdownState } from '../internal';

export const link: ParserRule & ReactOutputRule = {
	...defaultRules.link,
	react: (node, output, state) => {
		const { config } = state as MarkdownState;
		const { colors } = config;

		return React.createElement(
			Hyperlink,
			{
				key: state.key,
				onPress: () => Linking.openURL(node.target),
			},
			output(node.content, { ...state, color: colors.link }),
		);
	},
};

export default link;
