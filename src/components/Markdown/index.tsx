import React, { FC, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { useSnapshot } from 'valtio';

import { themeState } from '../../utils/state/theme';
import { idleLayout } from '../../utils/style';

import { MarkdownConfig, parse, reactOutput } from './internal';

interface Props {
	style?: ViewStyle;
	content: string;
}

export const Markdown: FC<Props> = ({ style, content }) => {
	const [layout, setLayout] = useState(idleLayout);
	const { colors, defaultFontFamily } = useSnapshot(themeState);
	const syntaxTree = parse(content);

	const config: MarkdownConfig = {
		layout,
		colors,
		fontFamily: defaultFontFamily,
	};

	const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	return (
		<View onLayout={onLayout} style={style}>
			{reactOutput(syntaxTree, { config })}
		</View>
	);
};

export default Markdown;
