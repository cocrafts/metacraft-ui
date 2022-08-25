import { createElement } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { MarkdownConfig } from 'components/Markdown/internal';
import { isString } from 'lodash';
import {
	defaultRules,
	ParserRule,
	ReactOutputRule,
	SingleASTNode,
} from 'simple-markdown';

export const list: ParserRule & ReactOutputRule = {
	...defaultRules.list,
	react: (node, output, state) => {
		const { color, config } = state;
		const { fontFamily, colors }: MarkdownConfig = config;
		const items = node.items || [];

		const textStyle: TextStyle = {
			fontFamily,
			fontSize: 15,
			fontWeight: '400',
			color: color || colors.text,
		};
		const bulletStyle: TextStyle = {
			...textStyle,
			marginRight: 6,
			fontSize: 12,
			color: colors.alt,
		};
		const orderedStyle: TextStyle = { ...textStyle, marginRight: 6 };
		const containerStyle: ViewStyle = { flexDirection: 'row' };

		const bullets = items.map((item: SingleASTNode[], i: number) => {
			const lineOutput = output(item, state) as string[];
			const [firstOutput, ...otherOutputs] = lineOutput;
			const startingText = isString(firstOutput) ? firstOutput : '';
			const checkListMatch = startingText.match(/^ *\[(.)] *.*/);
			const textContent = checkListMatch
				? [firstOutput?.substring?.(3), ...otherOutputs]
				: lineOutput;
			const textElement = createElement(
				Text,
				{ style: textStyle },
				textContent,
			);

			const generateListIcon = () => {
				if (node.ordered) {
					return createElement(Text, { style: orderedStyle }, `${i + 1}.`);
				} else {
					return createElement(Text, { style: bulletStyle }, '●');
				}
			};

			return createElement(
				View,
				{ key: `${state.key}#${i}`, style: containerStyle },
				generateListIcon(),
				textElement,
			);
		});

		return createElement(View, { key: state.key }, bullets);
	},
};

export default list;
