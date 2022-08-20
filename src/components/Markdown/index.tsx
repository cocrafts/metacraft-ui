import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { useSnapshot } from 'valtio';

import { themeState } from '../../utils/state/theme';

import { MarkdownConfig, parse, reactOutput } from './internal';

interface Props {
	style?: ViewStyle;
	content: string;
}

export const Markdown: FC<Props> = ({ style, content }) => {
	const { colors, defaultFontFamily } = useSnapshot(themeState);
	const config: MarkdownConfig = { colors, fontFamily: defaultFontFamily };
	const syntaxTree = parse(content);

	return <View style={style}>{reactOutput(syntaxTree, { config })}</View>;
};

export default Markdown;
