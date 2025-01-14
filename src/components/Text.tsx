import React, { FC } from 'react';
import {
	StyleProp,
	Text as DefaultText,
	TextProps,
	TextStyle,
} from 'react-native';
import { useSnapshot } from 'valtio';

import { injectedFontStyle } from '../utils/font';
import { dimensionState } from '../utils/state/dimension';
import { themeState } from '../utils/state/theme';

export type ScaledSizes = [
	desktop: number,
	tablet?: number,
	smallTablet?: number,
	mobile?: number,
];

type Props = TextProps & {
	style?: StyleProp<TextStyle>;
	responsiveSizes?: ScaledSizes;
};

const LightText: FC<Props> = ({ style, ...otherProps }) => {
	const { colors } = useSnapshot(themeState);
	const dynamicStyle = injectedFontStyle(style, { color: colors.text });

	return <DefaultText style={dynamicStyle} {...otherProps} />;
};

const ScaledText: FC<Props> = ({ style, responsiveSizes, ...otherProps }) => {
	const { colors } = useSnapshot(themeState);
	const { responsiveLevel } = useSnapshot(dimensionState);
	const fontSize = extractSizes(responsiveSizes || [14], responsiveLevel);
	const lineHeightFactor = (fontSize as number) > 20 ? 1.2 : 1.35;

	const dynamicStyle = injectedFontStyle(style, {
		color: colors.text,
		fontSize,
		lineHeight: (fontSize as number) * lineHeightFactor,
	});

	return <DefaultText style={dynamicStyle} {...otherProps} />;
};

export const Text: FC<Props> = ({ responsiveSizes, ...otherProps }) => {
	if (responsiveSizes) {
		return <ScaledText responsiveSizes={responsiveSizes} {...otherProps} />;
	}

	return <LightText {...otherProps} />;
};

export default Text;

const extractSizes = (sizes: ScaledSizes, level: number) => {
	for (let i = level; i >= 0; i -= 1) {
		if (sizes[i]) return sizes[i];
	}
};
