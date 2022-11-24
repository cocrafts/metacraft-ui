import React, { FC, useState } from 'react';
import { LayoutChangeEvent, View, ViewStyle } from 'react-native';
import { useSnapshot } from 'valtio';

import { themeState } from '../../utils/state/theme';
import { idleLayout } from '../../utils/style';

import { MarkdownConfig, parse, reactOutput } from './internal';

interface Props {
	style?: ViewStyle;
	content: string;
	configs?: Partial<MarkdownConfig>;
}

export const Markdown: FC<Props> = ({ style, content, configs }) => {
	const [layout, setLayout] = useState(idleLayout);
	const { dark, colors, defaultFontFamily, defaultFontSize } =
		useSnapshot(themeState);
	const syntaxTree = parse(content);

	const config: MarkdownConfig = {
		fontFamily: defaultFontFamily,
		fontSize: defaultFontSize,
		dark,
		colors,
		layout,
		...configs,
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
