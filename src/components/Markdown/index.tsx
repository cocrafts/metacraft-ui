import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';

import { parse, reactOutput } from './internal';

interface Props {
	style?: ViewStyle;
	content: string;
}

export const Markdown: FC<Props> = ({ style, content }) => {
	const syntaxTree = parse(content);

	return <View style={style}>{reactOutput(syntaxTree)}</View>;
};

export default Markdown;
