import { createElement } from 'react';
import { Text, TextStyle } from 'react-native';
import {
	blockRegex,
	defaultRules,
	ParserRule,
	ReactOutputRule,
} from 'simple-markdown';

const levelSizes = { 1: 24, 2: 22, 3: 20, 4: 18, 5: 16, 6: 15 };

export const heading: ParserRule & ReactOutputRule = {
	...defaultRules.heading,
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)+/),
	react: (node, output, state) => {
		const { key } = state;
		const fontSize = levelSizes[node.level as never] || 8;
		const fontWeight = '600';
		const style: TextStyle = {
			lineHeight: fontSize * 1.2,
			marginVertical: 12,
		};

		return createElement(
			Text,
			{ key, style },
			output(node.content, { ...state, fontSize, fontWeight }),
		);
	},
};

export default heading;
