import { LayoutRectangle } from 'react-native';
import { outputFor, parserFor, SingleASTNode } from 'simple-markdown';
import { ThemeColors } from 'utils/state/theme';

import rules from './rules';

export interface MarkdownConfig {
	fontFamily: string;
	dark: boolean;
	colors: ThemeColors;
	layout: LayoutRectangle;
}

export interface MarkdownState {
	key: string;
	config: MarkdownConfig;
	color?: string;
	fontSize?: number;
	fontWeight?:
		| 'normal'
		| 'bold'
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900'
		| undefined;
}

export const universalParser = parserFor(rules);
export const parse = (source: string): SingleASTNode[] => {
	return universalParser(`${source}\n\n`, { inline: false });
};
export const reactOutput = outputFor(rules, 'react' as never);
